import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Countdown from "react-countdown";
import { IoClose } from "react-icons/io5";
import { LuMousePointerClick, LuTextCursor } from "react-icons/lu";
import { SlCursor } from "react-icons/sl";

export default function MemeWarBanner() {
  const [showBanner, setShowBanner] = useState(true);
  const [complete, setComplete] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: -100 },
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
      className="absolute w-screen h-[100px] bg-yellow-800/90 z-50 flex flex-col justify-center items-center border-2 border-yellow-950"
    >
      <Link
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
          date={Date.UTC(2024, 8, 29, 16, 20).toLocaleString()}
          renderer={({ days, hours, minutes, seconds }) =>
            renderer({ days, hours, minutes, seconds })
          }
          onComplete={() => {
            setComplete(true);
          }}
        />
      </div>
      <IoClose
        className="absolute right-2 top-2 cursor-pointer scale-[2]"
        onClick={() => {
          setShowBanner(false);
        }}
      ></IoClose>
    </motion.div>
  );
}
