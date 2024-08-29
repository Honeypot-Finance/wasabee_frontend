import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Countdown from "react-countdown";
import { IoClose } from "react-icons/io5";
import { SlCursor } from "react-icons/sl";

const ANIMATION_DURATION = 500; //ms

export default function MemeWarBanner() {
  const [showBanner, setShowBanner] = useState(true);
  const [complete, setComplete] = useState(false);
  const [gameState, setGameState] = useState<{
    showPopBoard: boolean;
    popBoardRender: string;
    player1: {
      health: number;
      attack: number;
      animationVariants: {
        idle: { x: number };
        attack: { x: number };
        hit: { x: number; opacity: number };
        die: { x: number; y: number };
      };
      currentAnimation: string;
      animationTimeOut: NodeJS.Timeout | undefined;
    };
    player2: {
      health: number;
      attack: number;
      animationVariants: {
        idle: { x: number };
        attack: { x: number };
        hit: { x: number; opacity: number };
        die: { x: number; y: number };
      };
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
        idle: { x: 0 },
        attack: { x: 10 },
        hit: { x: -10, opacity: 0.5 },
        die: { x: 0, y: 100 },
      },
      currentAnimation: "idle",
      animationTimeOut: undefined,
    },
    player2: {
      health: 50,
      attack: 10,
      animationVariants: {
        idle: { x: 0 },
        attack: { x: -10 },
        hit: { x: 10, opacity: 0.5 },
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

  const gameOver = () => {
    console.log("Game Over");
  };

  const playAnimation = async (
    target: "player1" | "player2",
    animation: string
  ) => {
    if (target === "player1") {
      gameState.player1.animationTimeOut &&
        clearTimeout(gameState.player1.animationTimeOut);

      setGameState({
        ...gameState,
        player1: {
          ...gameState.player1,
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
      });
    } else {
      gameState.player2.animationTimeOut &&
        clearTimeout(gameState.player2.animationTimeOut);

      setGameState({
        ...gameState,
        player2: {
          ...gameState.player2,
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
      });
    }
  };

  const handleAttack = (target: "player1" | "player2") => {
    if (target === "player1") {
      setGameState({
        ...gameState,
        player1: {
          ...gameState.player1,
          health: gameState.player1.health - gameState.player2.attack,
        },
      });

      playAnimation("player1", "hit");
      playAnimation("player2", "attack");

      if (gameState.player1.health - gameState.player2.attack <= 0) {
        gameOver();
      }
    } else {
      setGameState({
        ...gameState,
        player2: {
          ...gameState.player2,
          health: gameState.player2.health - gameState.player1.attack,
        },
      });

      playAnimation("player2", "hit");
      playAnimation("player1", "attack");

      if (gameState.player2.health - gameState.player1.attack <= 0) {
        gameOver();
      }
    }
  };

  const variants = {
    hidden: { opacity: 0, y: "-50vh" },
    visible: { opacity: 1, y: 0 },
  };

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    if (complete) {
      return (
        <div className="text-white">
          The meme war has begun
          <SlCursor className="text-white ml-2" />
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-2 text-white">
        <div className="text-2xl font-bold">{days}D</div>
        <div className="text-2xl font-bold">{hours}H</div>
        <div className="text-2xl font-bold">{minutes}M</div>
        <div className="text-2xl font-bold">{seconds}S</div>
      </div>
    );
  };
  return (
    <motion.div
      initial="hidden"
      animate={showBanner ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 1 }}
      className="absolute w-screen h-[50vh] bg-yellow-800/90 z-50 flex flex-col justify-center items-center border-2 border-yellow-950"
    >
      {/* <Link
        href={"https://x.com/honeypotfinance/status/1828466294229721217"}
        target="_blank"
        className=" flex justify-center items-center font-[MEMEH] hover:scale-110 transition-all cursor-pointer"
      >
        Some thing big is coming!
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <LuMousePointerClick className="text-white ml-2" />
        </motion.div>
      </Link>
      <div className="w-full flex justify-center items-center">
        <Countdown
          date={new Date("2024-08-29T16:20:00")}
          renderer={({ days, hours, minutes, seconds }) =>
            renderer({ days, hours, minutes, seconds })
          }
          onComplete={() => {
            setComplete(true);
          }}
        />
      </div> */}
      <IoClose
        className="absolute right-2 top-2 cursor-pointer scale-[2] z-50"
        onClick={() => {
          setShowBanner(false);
        }}
      ></IoClose>
      <div className="relative grid w-full h-full">
        <div className="mt-10">
          {/** health bar */}
          <div className="flex w-full items-center justify-between">
            <div id="player1_hp_bar_contianer " className="w-[100px]">
              <div
                className="bg-red-500 h-4 w-full rounded-lg"
                style={{
                  maxWidth: `${gameState.player1.health * 2}%`,
                }}
              ></div>
            </div>
            <div id="player2_hp_bar_contianer" className="w-[100px]">
              <div
                className="bg-red-500 h-4 w-full rounded-lg"
                style={{
                  maxWidth: `${gameState.player2.health * 2}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="relative grow h-full">
          <motion.div
            initial="idle"
            variants={gameState.player1.animationVariants}
            animate={gameState.player1.currentAnimation}
            transition={{
              duration: ANIMATION_DURATION / 1000,
            }}
            onClick={() => handleAttack("player1")}
            className="absolute bottom-0 w-[50px] h-[50px] bg-red-400 cursor-pointer"
          >
            player 1
          </motion.div>

          <motion.div
            initial="idle"
            variants={gameState.player2.animationVariants}
            animate={gameState.player2.currentAnimation}
            transition={{
              duration: ANIMATION_DURATION / 1000,
            }}
            onClick={() => handleAttack("player2")}
            className="absolute bottom-0 right-0 w-[50px] h-[50px] bg-blue-400 cursor-pointer"
          >
            player 2
          </motion.div>
        </div>
        {gameState.showPopBoard && (
          <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] text-white">
            {gameState.popBoardRender}
          </div>
        )}
      </div>
    </motion.div>
  );
}
