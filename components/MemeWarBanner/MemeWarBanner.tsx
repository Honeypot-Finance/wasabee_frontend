import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { AsyncState, ValueState } from "@/services/utils";
import { wallet } from "@/services/wallet";
import { Input } from "@nextui-org/react";
import { Button } from "../button";
import { motion, Variants } from "framer-motion";
import { observer, useLocalObservable } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useBalance } from "wagmi";
import { Token } from "@/services/contract/token";

const ANIMATION_DURATION = 100; //ms
const HP_BAR_URL = "/images/memewar/HP_BAR.png";

const JANI_FTO_ADDRESS = "0x2c504e661750e03aa9252c67e771dc059a521863";
const POTS_FTO_ADDRESS = "0x93f8beabd145a61067ef2fca38c4c9c31d47ab7e";
const BULLA_FTO_ADDRESS = "0xa8c0dda3dff715dd6093101c585d25addc5046c8";
const IVX_FTO_ADDRESS = "0xa9edde04fc958264b1d6ad6153cffe26b1c79411";

const tHpotAddress = "0xfc5e3743E9FAC8BB60408797607352E24Db7d65E";

export const MemeWarBanner = observer(() => {
  const attackDistance = useCallback(() => {
    //return number based on window size
    if (typeof window !== "undefined") {
      return window.innerWidth / 2;
    }
    return 0;
  }, []);

  const initPair = useCallback(async (address: string) => {
    const pair = new FtoPairContract({ address });
    await pair.init();
    pair.raiseToken?.init();
    pair.launchedToken?.init();
    return pair;
  }, []);

  const state = useLocalObservable(() => ({
    pairs: {
      JANI: {
        ADDRESS: JANI_FTO_ADDRESS,
        SUPPORT_AMOUNT: "",
        set_SUPPORT_AMOUNT: (amount: string) => {
          state.pairs.JANI.SUPPORT_AMOUNT = amount;
        },
        pair: new AsyncState(async () => initPair(JANI_FTO_ADDRESS)),
        icon: "/images/memewar/JANI_ICON.png",
      },
      POT: {
        ADDRESS: POTS_FTO_ADDRESS,
        SUPPORT_AMOUNT: "",
        set_SUPPORT_AMOUNT: (amount: string) => {
          state.pairs.POT.SUPPORT_AMOUNT = amount;
        },
        pair: new AsyncState(async () => initPair(POTS_FTO_ADDRESS)),
        icon: "/images/memewar/POT_ICON.png",
      },
      BULLA: {
        ADDRESS: BULLA_FTO_ADDRESS,
        SUPPORT_AMOUNT: "",
        set_SUPPORT_AMOUNT: (amount: string) => {
          state.pairs.BULLA.SUPPORT_AMOUNT = amount;
        },
        pair: new AsyncState(async () => initPair(BULLA_FTO_ADDRESS)),
        icon: "/images/memewar/BULLAS_ICON.png",
      },
      IVX: {
        ADDRESS: IVX_FTO_ADDRESS,
        SUPPORT_AMOUNT: "",
        set_SUPPORT_AMOUNT: (amount: string) => {
          state.pairs.IVX.SUPPORT_AMOUNT = amount;
        },
        pair: new AsyncState(async () => initPair(IVX_FTO_ADDRESS)),
        icon: "/images/memewar/IVX_ICON.png",
      },
    },
    T_HPOT_TOKEN: new AsyncState(async () => {
      const token = await Token.getToken({
        address: tHpotAddress,
      });
      await token.init();
      return token;
    }),
  }));

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }

    Object.values(state.pairs).forEach((pair) => {
      pair.pair.call();
    });

    state.T_HPOT_TOKEN.call();
  }, [wallet.isInit]);

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
        attack: { x: `${attackDistance()}px` },
        attackMiddle: { x: `${attackDistance() / 2}px` },
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
        attack: { x: `-${attackDistance()}px` },
        attackMiddle: { x: `-${attackDistance() / 2}px` },
        hit: { x: 10, y: 5, opacity: 0.8 },
        die: { x: 0, y: 100 },
      },
      currentAnimation: "idle",
      animationTimeOut: undefined,
    },
  });

  const showPopBoard = (text: string) => {
    setGameState({
      ...gameState,
      showPopBoard: true,
      popBoardRender: text,
    });
  };

  const hidePopBoard = () => {
    setGameState({
      ...gameState,
      showPopBoard: false,
      popBoardRender: "",
    });
  };

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

  return (
    <>
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
          {Object.values(state.pairs).map((pair) => {
            return (
              <div
                key={pair.pair.value?.address}
                className="flex flex-col items-center z-10"
              >
                <Image
                  src={pair.icon}
                  alt=""
                  width={100}
                  height={100}
                  className="w-10 h-10 md:w-20 md:h-20 object-contain"
                />
                <div className="relative flex justify-center items-center h-8">
                  <Image
                    src={HP_BAR_URL}
                    alt=""
                    width={200}
                    height={50}
                    className="w-full h-full object-contain"
                  />
                  <h3 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-black">
                    {pair.pair.value?.depositedRaisedToken?.toFixed(0) ||
                      "loading..."}
                  </h3>
                </div>
              </div>
            );
          })}
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
        {state.T_HPOT_TOKEN.value?.balance?.toFixed(2) || "loading..."}
      </div>
      <div className="grid md:grid-cols-2 mt-1 gap-5">
        {
          //render all pairs
          Object.entries(state.pairs).map(([key, value]) => {
            return (
              <div key={key}>
                <h3>{key}</h3>
                <div className="flex justify-center items-center gap-2">
                  <Button
                    isDisabled={
                      value.SUPPORT_AMOUNT == "" ||
                      Number(value.SUPPORT_AMOUNT) <= 0
                    }
                    onClick={() => {
                      value.pair.value?.deposit
                        .call({
                          amount: value.SUPPORT_AMOUNT,
                        })
                        .then(async () => {
                          await value.pair.value?.raiseToken?.getBalance();
                          value.pair.value?.getDepositedRaisedToken();
                          handleAttackMiddle();
                        });

                      //attack 3 times
                      handleAttackMiddle();
                    }}
                  >
                    Support {key}
                  </Button>
                  <Input
                    placeholder="Amount"
                    onChange={(e) => value.set_SUPPORT_AMOUNT(e.target.value)}
                  />
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  );
});

export default MemeWarBanner;
