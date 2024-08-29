import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const ANIMATION_DURATION = 100; //ms

export default function MemeWarBanner() {
  const attackDistance = useCallback(() => {
    //return number based on window size
    if (typeof window !== "undefined") {
      return window.innerWidth / 2;
    }
  }, []);

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
              width={200}
              height={50}
              className="absolute w-full top-0 left-0"
            ></Image>
          </div>
          <div id="player2_hp_bar_contianer" className="relative w-[40%]">
            <Image
              src="/images/memewar/BAR3.png"
              alt=""
              width={200}
              height={50}
              className="absolute w-full top-0 left-0"
            ></Image>
          </div>
        </div>
      </div>
      <div className="relative grow h-fullz-10">
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
  );
}
