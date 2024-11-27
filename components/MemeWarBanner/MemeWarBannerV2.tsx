import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { AsyncState, ValueState } from "@/services/utils";
import { wallet } from "@/services/wallet";
import { card, Input, Select, SelectItem } from "@nextui-org/react";
import { Button } from "../button";
import { animate, motion, Variants } from "framer-motion";
import { observer, useLocalObservable } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBalance } from "wagmi";
import { Token } from "@/services/contract/token";
import { DiscussionArea } from "../Discussion/DiscussionArea/DiscussionArea";
import { swap } from "@/services/swap";
import { liquidity } from "@/services/liquidity";
import { amountFormatted } from "@/lib/format";
import { MemeWarParticipant, memewarStore } from "@/services/memewar";
import { WarppedNextSelect } from "../wrappedNextUI/Select/Select";
import BigNumber from "bignumber.js";

const ANIMATION_DURATION = 500; //ms
const HP_BAR_URL = "/images/memewar/HP_BAR.png";

export interface Props {
  isEnd?: boolean;
}

export const MemeWarBannerV2 = observer((props: Props) => {
  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }

    memewarStore.reloadParticipants();
  }, [wallet.isInit]);

  useEffect(() => {
    if (!memewarStore.isInit) {
      return;
    }
    const startUpdateScoreInterval = async () => {
      memewarStore.updateAllParticipantScore().then(() => {
        setTimeout(() => {
          startUpdateScoreInterval();
        }, 1000);
      });
    };

    startUpdateScoreInterval();
  }, [memewarStore.isInit]);

  return memewarStore.isInit ? (
    <div className="lg:grid lg:grid-cols-[80%_20%] gap-2">
      <div>
        <div className="flex justify-between text-center">
          <h2 className="w-full text-center text-xl md:text-5xl font-[MEMEH] mb-2">
            MEME WAR
          </h2>
        </div>

        <div className="relative grid w-full aspect-video gap-2">
          {Object.values(memewarStore.sortedMemewarParticipants).map(
            (participant, idx) => {
              return (
                <MemeWarPariticipantCard
                  key={participant.pairAddress}
                  rank={(idx + 1).toString()}
                  {...participant}
                />
              );
            }
          )}
        </div>
        <div className="text-center">
          your tHpot balance:{" "}
          {amountFormatted(memewarStore.tHpotToken?.balance, {
            fixed: 2,
            decimals: 0,
            symbol: " tHPOT",
          }) || "loading..."}
        </div>
        <div className="grid md:grid-cols-2 mt-1 gap-5">
          <WarppedNextSelect
            items={Object.entries(memewarStore.memewarParticipants)}
            onChange={(e) => {
              memewarStore.setSelectedSupportParticipant(
                memewarStore.memewarParticipants[e.target.value].pair!
              );
            }}
          >
            {Object.entries(memewarStore.memewarParticipants).map(
              ([key, value]) => {
                return (
                  <SelectItem key={key} value={key}>
                    {value.participantName}
                  </SelectItem>
                );
              }
            )}
          </WarppedNextSelect>{" "}
          <div className="flex justify-center items-center gap-2">
            <Button
              isDisabled={false}
              onClick={async () => {
                if (
                  memewarStore.selectedSupportParticipantPair?.ftoState === 3
                ) {
                  memewarStore.selectedSupportParticipantPair.deposit.call({
                    amount: memewarStore.supportAmount.toFixed(0),
                  });
                } else {
                  if (
                    !memewarStore.tHpotToken ||
                    !memewarStore.selectedSupportParticipantPair ||
                    !memewarStore.selectedSupportParticipantPair.launchedToken
                  ) {
                    console.error("missing data");
                    return;
                  }
                  swap.setFromToken(memewarStore.tHpotToken);
                  swap.setToToken(
                    memewarStore.selectedSupportParticipantPair.launchedToken
                  );
                  swap.setFromAmount(memewarStore.supportAmount.toFixed(0));

                  await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(undefined);
                    }, 1000);
                  });

                  swap.swapExactTokensForTokens.call();
                }
              }}
            >
              Support
            </Button>
            <Input
              placeholder="Amount"
              onChange={(e) => {
                memewarStore.supportAmount = new BigNumber(e.target.value);
              }}
            />
          </div>
          <div className=" relative w-full flex justify-around items-center col-span-2 h-[200px] border-4 border-black rounded-[1rem] overflow-hidden">
            <Image
              src="/images/memewar/janivspot.webp"
              alt=""
              width={300}
              height={300}
              className="w-full h-full object-cover object-top absolute brightness-50"
            />
            <h3 className="z-10 text-3xl">Complete quest to earn prize</h3>
            <Link
              href={
                "https://www.cubquests.com/campaigns/berachaindevs?quest=honeypot-finance"
              }
              target="_blank"
            >
              <Button className="z-10">Explore</Button>
            </Link>
          </div>
        </div>
      </div>
      <DiscussionArea pairDatabaseId={-9999} isSide />
    </div>
  ) : (
    <div className="flex justify-center items-center h-[500px]">
      <h1>Loading...</h1>
    </div>
  );
});

export const MemeWarPariticipantCard = observer(
  (participant: MemeWarParticipant & { rank?: string }) => {
    //animate every time participant score changes
    const [currentScore, setCurrentScore] = useState(participant.currentScore);
    const [currentScale, setCurrentScale] = useState(1);

    useEffect(() => {
      if (currentScore.eq(participant.currentScore)) return;
      setCurrentScore(participant.currentScore);
      setCurrentScale(1.1);

      setTimeout(() => {
        setCurrentScale(1);
      }, ANIMATION_DURATION);
    }, [currentScore, participant.currentScore]);

    return (
      participant.pair && (
        <motion.div
          animate={{ scale: currentScale }}
          key={participant.pair.address}
          className="flex w-full items-center z-10 justify-center transition-all gap-4"
        >
          <h2 className="flex justify-center items-center font-[MEMEH] text-[3rem] w-[5rem]">
            {participant.rank == "1" ? "👑" : participant.rank}
          </h2>
          <Link href={`/launch-detail/${participant.pair.address}`}>
            <Image
              src={
                !!participant.iconUrl
                  ? participant.iconUrl
                  : participant.pair.logoUrl
              }
              alt=""
              width={100}
              height={100}
              className="w-10 h-10 md:w-20 md:h-20 object-contain rounded-full cursor-pointer"
            />
          </Link>
          <div className="relative flex flex-col justify-center items-center h-8 ">
            <div className="flex w-full justify-start items-start">
              {participant.participantName}
            </div>
            <div className="relative">
              <Image
                src={HP_BAR_URL}
                alt=""
                width={200}
                height={50}
                className="w-full h-full object-contain"
              />
              <h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-black">
                {participant.pair.ftoState != 0
                  ? participant.pair?.depositedRaisedToken?.toFixed(0) ||
                    "loading..."
                  : Math.max(
                      participant.currentScore.toNumber(),
                      participant.pair?.depositedRaisedToken?.toNumber() ?? 0
                    ).toLocaleString("en-US", {
                      style: "decimal",
                      maximumFractionDigits: 0,
                    })}
              </h3>
            </div>
          </div>
        </motion.div>
      )
    );
  }
);

export default MemeWarBannerV2;
