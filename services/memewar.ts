import { makeAutoObservable } from "mobx";
import { MemePairContract } from "./contract/memepair-contract";
import BigNumber from "bignumber.js";
import { liquidity } from "./liquidity";
import { get } from "lodash";
import { Token } from "./contract/token";
import { FtoPairContract } from "./contract/ftopair-contract";

type EventState = "preview" | "active" | "ended";
type MemeWarParticipant = {
  participantName: string;
  pairAddress: string;
  pair?: FtoPairContract;
  tokenAddress: string;
  token?: Token;
  iconUrl?: string;
  finalScore?: BigNumber;
  currentScore: BigNumber;
  isPairInitialized?: boolean;
};

const tHpotAddress = "0x0e3cc2c4fb9252d17d07c67135e48536071735d9";

export class MemewarStore {
  memewarState: EventState = "preview";
  memewarParticipants: Record<string, MemeWarParticipant> = {
    JANI: {
      participantName: "JANI",
      pairAddress: "0x2c504e661750e03aa9252c67e771dc059a521863",
      tokenAddress: "0x180f30908b7c92ff2d65609088ad17bf923b42dc",
      iconUrl: "/images/memewar/JANI_ICON.png",
      currentScore: new BigNumber(0),
      finalScore: new BigNumber(16_883_055),
    },
    POT: {
      participantName: "POT",
      pairAddress: "0x93f8beabd145a61067ef2fca38c4c9c31d47ab7e",
      tokenAddress: "0xfad73c80d67d3cb4a929d1c0faf33a820620ae41",
      iconUrl: "/images/memewar/POT_ICON.png",
      currentScore: new BigNumber(0),
      finalScore: new BigNumber(85_906_400),
    },
    BULLA: {
      participantName: "BULLA",
      pairAddress: "0xa8c0dda3dff715dd6093101c585d25addc5046c8",
      tokenAddress: "0x5da73142f3c8d8d749db4459b2fcc9024fad024e",
      iconUrl: "/images/memewar/BULLAS_ICON.png",
      currentScore: new BigNumber(0),
      finalScore: new BigNumber(28_600_103),
    },
    IVX: {
      participantName: "IVX",
      pairAddress: "0xa9edde04fc958264b1d6ad6153cffe26b1c79411",
      tokenAddress: "0x2da7ec28dae827ea513da752bc161e55147b4d66",
      iconUrl: "/images/memewar/IVX_ICON.png",
      currentScore: new BigNumber(0),
      finalScore: new BigNumber(695_585),
    },
  };
  selectedSupportParticipantPair: FtoPairContract | undefined = undefined;
  supportAmount = new BigNumber(0);
  tHpotToken: Token | undefined = undefined;

  get isInit() {
    return Object.values(this.memewarParticipants).every(
      (participant) => participant.isPairInitialized
    );
  }

  constructor() {
    makeAutoObservable(this);
  }

  reloadParticipants = async () => {
    this.tHpotToken = Token.getToken({ address: tHpotAddress });
    await this.tHpotToken.init();
    Object.keys(this.memewarParticipants).forEach((key) => {
      this.memewarParticipants[key].isPairInitialized = false;
      this.initParticipant(this.memewarParticipants[key].pairAddress);
    });

    console.log(this.memewarParticipants);
  };

  initParticipant = async (address: string) => {
    const participant = this.getParticipantByAddress(address);
    if (!participant) return;

    const pair = new FtoPairContract({ address });
    const token = Token.getToken({ address: participant.tokenAddress });
    await pair.init();
    await Promise.all([
      await pair.raiseToken?.init(),
      await pair.launchedToken?.init(),
      await token.init(),
    ]);
    const score = await this.loadScore(address);

    participant.pair = pair;
    participant.token = pair.launchedToken ?? token;
    participant.currentScore = score;

    participant.isPairInitialized = true;

    return pair;
  };

  getParticipantByAddress = (address: string) => {
    return Object.values(this.memewarParticipants).find(
      (participant) => participant.pairAddress === address
    );
  };

  loadScore = async (address: string): Promise<BigNumber> => {
    if (this.memewarState === "preview") {
      return new BigNumber(0);
    }
    if (this.memewarState === "ended") {
      return (
        this.getParticipantByAddress(address)?.finalScore || new BigNumber(0)
      );
    }

    const poolPair = await liquidity.getPairByTokens(
      address.toLowerCase(),
      tHpotAddress.toLowerCase()
    );

    await poolPair?.init();
    await poolPair?.getReserves();

    const launchTokenReserve =
      poolPair?.token0.address.toLowerCase() === address.toLowerCase()
        ? poolPair?.reserves?.reserve0
        : poolPair?.reserves?.reserve1;
    const hpotReserve =
      poolPair?.token0.address.toLowerCase() === tHpotAddress.toLowerCase()
        ? poolPair?.reserves?.reserve0
        : poolPair?.reserves?.reserve1;
    const launchTokenAmount =
      poolPair?.token0.address.toLowerCase() === address.toLowerCase()
        ? await poolPair?.token0.getTotalSupply()
        : await poolPair?.token1.getTotalSupply();

    if (!launchTokenReserve || !hpotReserve || !launchTokenAmount) {
      return new BigNumber(0);
    }

    return new BigNumber(
      (hpotReserve.toNumber() / launchTokenReserve.toNumber()) *
        (launchTokenAmount.toNumber() / Math.pow(10, 18))
    );
  };

  setSupportAmount = (amount: string) => {
    this.supportAmount = new BigNumber(amount);
  };

  setSelectedSupportParticipant = (address: string) => {
    this.selectedSupportParticipantPair =
      this.getParticipantByAddress(address)?.pair;
  };
}

export const memewarStore = new MemewarStore();
