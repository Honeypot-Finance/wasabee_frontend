import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { AsyncState, ValueState } from "@/services/utils";
import { wallet } from "@/services/wallet";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Button } from "../button";
import { motion, Variants } from "framer-motion";
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
import { memewarStore } from "@/services/memewar";
import { WarppedNextSelect } from "../wrappedNextUI/Select/Select";
import BigNumber from "bignumber.js";

const ANIMATION_DURATION = 100; //ms
const HP_BAR_URL = "/images/memewar/HP_BAR.png";

export interface Props {
  isEnd?: boolean;
}

export const MemeWarBannerV2 = observer((props: Props) => {
  const GameScreen = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<{
    showPopBoard: boolean;
    popBoardRender: string;
    player1: {
      health: number;
      attack: number;
      animationVariants: Variants;
      currentAnimation: string;
      animationTimeOut: NodeJS.Timeout | undefined;
    };
    player2: {
      health: number;
      attack: number;
      animationVariants: Variants;
      currentAnimation: string;
      animationTimeOut: NodeJS.Timeout | undefined;
    };
  }>({
    showPopBoard: false,
    popBoardRender: "Click on one of the characters to attack",
    player1: {
      health: 50,
      attack: 10,
      animationVariants: {
        idle: { x: 0, opacity: 1, y: 0 },
        attack: { x: `0px` },
        attackMiddle: { x: `0}px` },
        hit: { x: -10, y: 5, opacity: 0.8 },
        die: { x: 0, y: 100 },
      },
      currentAnimation: "idle",
      animationTimeOut: undefined,
    },
    player2: {
      health: 50,
      attack: 10,
      animationVariants: {
        idle: { x: 0, opacity: 1, y: 0 },
        attack: { x: `-0px` },
        attackMiddle: { x: `-0px` },
        hit: { x: 10, y: 5, opacity: 0.8 },
        die: { x: 0, y: 100 },
      },
      currentAnimation: "idle",
      animationTimeOut: undefined,
    },
  });

  useEffect(() => {
    if (!GameScreen.current) {
      return;
    }

    setGameState((prev) => {
      return {
        ...prev,
        player1: {
          ...prev.player1,
          animationVariants: {
            ...prev.player1.animationVariants,
            attack: { x: `${GameScreen.current!.clientWidth / 2}px` },
            attackMiddle: {
              x: `${GameScreen.current!.clientWidth / 4}px`,
            },
          },
        },
        player2: {
          ...prev.player2,
          animationVariants: {
            ...prev.player2.animationVariants,
            attack: { x: `-${GameScreen.current!.clientWidth / 2}px` },
            attackMiddle: {
              x: `-${GameScreen.current!.clientWidth / 4}px`,
            },
          },
        },
      };
    });
  }, [GameScreen.current?.clientWidth, GameScreen]);

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }

    memewarStore.reloadParticipants();
  }, [wallet.isInit]);

  const autoAttack = async (target: "player1" | "player2", count: number) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i === count) {
        clearInterval(interval);
        return;
      }

      handleAttack(target);
      i++;
    }, 200);
  };

  const playAnimation = async (
    target: "player1" | "player2",
    animation: string
  ) => {
    if (target === "player1") {
      gameState.player1.animationTimeOut &&
        clearTimeout(gameState.player1.animationTimeOut);

      setGameState((prev) => {
        return {
          ...prev,
          player1: {
            ...prev.player1,
            currentAnimation: animation,
            animationTimeOut: setTimeout(() => {
              setGameState({
                ...gameState,
                player1: {
                  ...gameState.player1,
                  currentAnimation: "idle",
                },
              });
            }, ANIMATION_DURATION),
          },
        };
      });
    } else {
      gameState.player2.animationTimeOut &&
        clearTimeout(gameState.player2.animationTimeOut);

      setGameState((prev) => {
        return {
          ...prev,
          player2: {
            ...prev.player2,
            currentAnimation: animation,
            animationTimeOut: setTimeout(() => {
              setGameState({
                ...gameState,
                player2: {
                  ...gameState.player2,
                  currentAnimation: "idle",
                },
              });
            }, ANIMATION_DURATION),
          },
        };
      });
    }
  };

  const handleAttackMiddle = () => {
    playAnimation("player1", "attackMiddle");
    playAnimation("player2", "attackMiddle");
  };

  const handleAttack = (target: "player1" | "player2") => {
    if (target === "player1") {
      playAnimation("player1", "hit");
      playAnimation("player2", "attack");
    } else {
      playAnimation("player2", "hit");
      playAnimation("player1", "attack");
    }
  };

  return memewarStore.isInit ? (
    <div className="lg:grid lg:grid-cols-[80%_20%] gap-2">
      <div ref={GameScreen}>
        <div className="flex justify-between text-center">
          <h2 className="w-full text-center text-xl md:text-5xl font-[MEMEH] mb-2">
            MEME WAR
          </h2>
        </div>

        <div className="relative grid grid-rows-[30%_1fr] w-full aspect-video">
          <Image
            src="/images/memewar/BG.png"
            className="absolute w-full h-full"
            alt=""
            width={1480}
            height={1480}
          />
          <div
            id="scoreboard"
            className="relative w-full h-full z-10 flex justify-between"
          >
            <Image
              src="/images/memewar/TOP_BANNER_V2.png"
              alt=""
              width={2000}
              height={500}
              className="absolute w-full h-full object-contain object-top top-0 z-0"
            />
            {Object.values(memewarStore.memewarParticipants).map(
              (participant) => {
                return (
                  participant.pair && (
                    <div
                      key={participant.pair.address}
                      className="flex flex-col items-center z-10"
                    >
                      <Link href={`/launch-detail/${participant.pair.address}`}>
                        <Image
                          src={participant.iconUrl ?? ""}
                          alt=""
                          width={100}
                          height={100}
                          className="w-10 h-10 md:w-20 md:h-20 object-contain"
                        />
                      </Link>
                      <div className="relative flex justify-center items-center h-8">
                        <Image
                          src={HP_BAR_URL}
                          alt=""
                          width={200}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                        <h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-black">
                          {participant.pair.ftoState != 0
                            ? participant.pair?.depositedRaisedToken?.toFixed(
                                0
                              ) || "loading..."
                            : Math.max(
                                participant.currentScore.toNumber(),
                                participant.pair?.depositedRaisedToken?.toNumber() ??
                                  0
                              ).toLocaleString("en-US", {
                                style: "decimal",
                                maximumFractionDigits: 0,
                              })}
                        </h3>
                      </div>
                    </div>
                  )
                );
              }
            )}
          </div>
          <div className="relative grow h-full z-10">
            <motion.div
              initial="idle"
              variants={gameState.player1.animationVariants}
              animate={gameState.player1.currentAnimation}
              transition={{
                duration: ANIMATION_DURATION / 1000,
              }}
              onClick={() => handleAttack("player1")}
              className="absolute left-0 h-full bottom-0 w-[80px] sm:w-[150px] md:w-[200px] lg:w-[300px] cursor-pointer"
            >
              <Image
                src="/images/memewar/JANIS.png"
                alt=""
                width={300}
                height={300}
                className="absolute w-full h-full object-contain object-bottom"
              />
            </motion.div>

            <Image
              onClick={() => handleAttackMiddle()}
              src="/images/memewar/BULLAS.png"
              alt=""
              width={300}
              height={300}
              className="absolute w-[80px] sm:w-[150px] md:w-[200px] lg:w-[300px] h-full object-contain object-bottom left-[50%] translate-x-[-50%] cursor-pointer"
            />

            <motion.div
              initial="idle"
              variants={gameState.player2.animationVariants}
              animate={gameState.player2.currentAnimation}
              transition={{
                duration: ANIMATION_DURATION / 1000,
              }}
              onClick={() => handleAttack("player2")}
              className="absolute w-[80px] h-full sm:w-[150px] md:w-[200px] lg:w-[300px] bottom-0 right-0 cursor-pointer"
            >
              <Image
                src="/images/memewar/POTS.png"
                alt=""
                width={300}
                height={300}
                className="absolute w-full h-full object-contain object-bottom"
              />
            </motion.div>
          </div>
          {gameState.showPopBoard && (
            <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] text-white z-50">
              {gameState.popBoardRender}
            </div>
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
                  memewarStore.selectedSupportParticipantPair.deposit
                    .call({
                      amount: memewarStore.supportAmount.toFixed(0),
                    })
                    .then(async () => {
                      handleAttackMiddle();
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

                  swap.swapExactTokensForTokens.call().then(async () => {
                    handleAttackMiddle();
                  });
                }

                //attack 3 times
                handleAttackMiddle();
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
              href={"https://www.cubquests.com/quests/jani-vs-pot"}
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

export default MemeWarBannerV2;
