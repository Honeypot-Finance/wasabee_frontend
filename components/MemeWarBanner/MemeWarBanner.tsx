import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { AsyncState, ValueState } from "@/services/utils";
import { wallet } from "@/services/wallet";
import { Input } from "@nextui-org/react";
import { Button } from "../button";
import { motion, Variants } from "framer-motion";
import { useLocalObservable } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useBalance } from "wagmi";
import { Token } from "@/services/contract/token";

const ANIMATION_DURATION = 100; //ms

const JANI_FTO_ADDRESS = "0x2c504e661750e03aa9252c67e771dc059a521863";
const POTS_FTO_ADDRESS = "0x93f8beabd145a61067ef2fca38c4c9c31d47ab7e";

const tHpotAddress = "0xfc5e3743E9FAC8BB60408797607352E24Db7d65E";

export default function MemeWarBanner() {
  const attackDistance = useCallback(() => {
    //return number based on window size
    if (typeof window !== "undefined") {
      return window.innerWidth / 2;
    }
  }, []);
  const [JANI_SUPPORT_AMOUNT, setJANI_SUPPORT_AMOUNT] = useState("");
  const [POTS_SUPPORT_AMOUNT, setPOTS_SUPPORT_AMOUNT] = useState("");

  const state = useLocalObservable(() => ({
    JANI_pair: new AsyncState(async () => {
      const pair = new FtoPairContract({ address: JANI_FTO_ADDRESS });
      await pair.init();
      pair.raiseToken?.init();
      pair.launchedToken?.init();
      return pair;
    }),
    POTS_pair: new AsyncState(async () => {
      const pair = new FtoPairContract({ address: POTS_FTO_ADDRESS });
      await pair.init();
      pair.raiseToken?.init();
      pair.launchedToken?.init();
      return pair;
    }),
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

    state.JANI_pair.call();
    state.POTS_pair.call();
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
        <h3>
          JANI SCORE: {state.JANI_pair.value?.depositedRaisedToken?.toFixed(2)}
        </h3>
        <h2 className="w-full text-center text-xl md:text-5xl font-[MEMEH] mb-2">
          MEME WAR
        </h2>
        <h3>
          POT SCORE: {state.POTS_pair.value?.depositedRaisedToken?.toFixed(2)}
        </h3>
      </div>
      <div className="relative grid w-full aspect-video">
        <Image
          src="/images/memewar/BG.png"
          className="absolute w-full h-full"
          alt=""
          width={1480}
          height={1480}
        />
        <Image
          src="/images/memewar/TOP_BANNER.png"
          alt=""
          width={200}
          height={200}
          className="absolute top-0 left-0 w-full"
        />
        <div className="z-10">
          {/** health bar */}
          <div className="flex w-full justify-between">
            <div id="player1_hp_bar_contianer" className="relative w-[40%]">
              <Image
                src="/images/memewar/BAR2.png"
                alt=""
                width={300}
                height={10}
                className="absolute w-full top-0 left-0"
              ></Image>
            </div>
            <div id="player2_hp_bar_contianer" className="relative w-[40%]">
              <Image
                src="/images/memewar/BAR3.png"
                alt=""
                width={300}
                height={10}
                className="absolute w-full top-0 left-0"
              ></Image>
            </div>
          </div>
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
            className="absolute left-0 bottom-0 w-[80px] sm:w-[150px] md:w-[200px] lg:w-[300px] cursor-pointer"
          >
            <Image
              src="/images/memewar/JANIS.png"
              alt=""
              width={300}
              height={300}
            />
          </motion.div>

          <motion.div
            initial="idle"
            variants={gameState.player2.animationVariants}
            animate={gameState.player2.currentAnimation}
            transition={{
              duration: ANIMATION_DURATION / 1000,
            }}
            onClick={() => handleAttack("player2")}
            className="absolute w-[80px] sm:w-[150px] md:w-[200px] lg:w-[300px] bottom-0 right-0 cursor-pointer"
          >
            <Image
              src="/images/memewar/POTS.png"
              alt=""
              width={300}
              height={300}
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
        <div className="flex justify-center items-center gap-2">
          <Button
            isDisabled={
              JANI_SUPPORT_AMOUNT == "" || Number(JANI_SUPPORT_AMOUNT) <= 0
            }
            onClick={() => {
              state.JANI_pair.value?.deposit
                .call({
                  amount: JANI_SUPPORT_AMOUNT,
                })
                .then(async () => {
                  await state.JANI_pair.value?.raiseToken?.getBalance();
                  state.JANI_pair.value?.getDepositedRaisedToken();
                  autoAttack("player2", 3);
                });

              //attack 3 times
              autoAttack("player2", 3);
            }}
          >
            Support JANI
          </Button>
          <Input
            placeholder="Amount"
            onChange={(e) => setJANI_SUPPORT_AMOUNT(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Input
            placeholder="Amount"
            onChange={(e) => setPOTS_SUPPORT_AMOUNT(e.target.value)}
          />
          <Button
            isDisabled={
              POTS_SUPPORT_AMOUNT == "" || Number(JANI_SUPPORT_AMOUNT) <= 0
            }
            onClick={() => {
              state.POTS_pair.value?.deposit
                .call({
                  amount: POTS_SUPPORT_AMOUNT,
                })
                .then(async () => {
                  await state.POTS_pair.value?.raiseToken?.getBalance();
                  state.POTS_pair.value?.getDepositedRaisedToken();
                  autoAttack("player1", 3);
                });

              //attack 3 times
              autoAttack("player1", 3);
            }}
          >
            Support POT
          </Button>
        </div>
      </div>
    </>
  );
}
