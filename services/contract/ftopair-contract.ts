import { BaseContract } from ".";
import { wallet } from "../wallet";
import { getContract } from "viem";
import { AsyncState } from "../utils";
import { makeAutoObservable } from "mobx";
import { MUBAI_FTO_PAIR_ABI } from "@/lib/abis/ftoPair";
import BigNumber from "bignumber.js";
import { Token } from "./token";
import { dayjs } from "@/lib/dayjs";

export class FtoPairContract implements BaseContract {
  address = "";
  name: string = "";
  abi = MUBAI_FTO_PAIR_ABI;
  raiseToken = new Token({});
  launchedToken = new Token({});
  depositedRaisedToken: BigNumber | null = null;
  depositedLaunchedToken: BigNumber | null = null;
  endTime: string = '';
  ftoState: number = -1;

  constructor(args: Partial<FtoPairContract>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get contract() {
    return getContract({
      address: this.address as `0x${string}`,
      abi: this.abi,
      client: { public: wallet.publicClient, wallet: wallet.walletClient },
    });
  }

  get facadeContract() {
    return wallet.contracts.ftofacade;
  }

  get price() {
    return this.depositedRaisedToken && this.depositedLaunchedToken
      ? this.depositedRaisedToken.div(this.depositedLaunchedToken)
      : undefined;
  }

  get remainTime() {
    const now = dayjs();
    console.log('this.endTime', this.endTime)
    if (!this.endTime) {
        return '-'
    }
    const targetTime = dayjs(new BigNumber(this.endTime.toString()).multipliedBy(1000).toNumber());
    if (!targetTime.isValid()) {
       return 'Invalid Date'
    }
    const diffDays = now.diff(targetTime, "days");

    if (Math.abs(diffDays) >= 1) {
      return `${diffDays} ${diffDays > 0 ? "days later" : "days ago"}`;
    }

    const diffHours = now.diff(targetTime, "hours");

    if (Math.abs(diffHours) >= 1) {
      return `${diffHours} ${diffHours > 0 ? "hours later" : "hours ago"}`;
    }

    const diffMinutes = now.diff(targetTime, "minutes");
    return `${diffMinutes} ${
      diffMinutes > 0 ? "minutes later" : "minutes ago"
    }`;
  }

  deposit = new AsyncState(async (amount: string) => {
    await Promise.all([
      this.raiseToken.approveIfNoAllowance({
        amount,
        spender: this.facadeContract.address,
      }),
      this.facadeContract.deposit.call([
        this.raiseToken.address as `0x${string}`,
        this.launchedToken.address as `0x${string}`,
        BigInt(amount),
        BigInt(0),
      ]),
    ]);
  });

  get ftoStatusAction() {
    switch (this.ftoState) {
      case 0:
        return {
          status: "success",
        };
      case 1:
        return {
          status: "Fail",
        };
      case 2:
        return {
          status: "Paused",
        };
      case 3:
        return {
          status: "Processing",
        };
    }
  }

  async init() {
    await Promise.all([
      this.getRaisedToken(),
      this.getLaunchedToken(),
      this.getDepositedRaisedToken(),
      this.getDepositedLaunchedToken(),
      this.getEndTime(),
      this.getFTOState(),
    ]);
  }

  async getRaisedToken() {
    const res = (await this.contract.read.raisedToken()) as `0x${string}`;
    this.raiseToken = new Token({ address: res });
    this.raiseToken.init();
  }

  async getLaunchedToken() {
    const res = (await this.contract.read.launchedToken()) as `0x${string}`;
    this.launchedToken = new Token({ address: res });
    this.launchedToken.init();
  }

  async getDepositedRaisedToken() {
    const res = (await this.contract.read.depositedRaisedToken()) as bigint;
    this.depositedRaisedToken = new BigNumber(res.toString());
  }

  async getDepositedLaunchedToken() {
    const res = (await this.contract.read.depositedLaunchedToken()) as bigint;
    this.depositedLaunchedToken = new BigNumber(res.toString());
  }

  async getEndTime() {
    const res = await this.contract.read.endTime();
    this.endTime = res.toString()
  }
  async getFTOState() {
    const res = await this.contract.read.FTOState();
    this.ftoState = res;
  }
}
