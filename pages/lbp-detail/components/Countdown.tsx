import React from "react";
import Countdown from "react-countdown";
import { Skeleton } from "@nextui-org/skeleton";

interface CountdownTimerProps {
  label: string;
  date: any;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ label, date }) => {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <div className="text-[#F7931A] xs:text-lg md:text-xl">{label}</div>
      ) : (
        <Skeleton className="rounded-lg h-11 w-[210px] bg-white/40" />
      )}
      {date ? (
        <div>
          <Countdown
            date={date}
            renderer={({ days, hours, minutes, seconds }) => {
              return (
                <div className="flex items-start md:gap-x-2">
                  <div className="flex flex-col items-center gap-y-1.5">
                    <span className="text-base">{days}</span>
                    <span className="text-xs text-white/45">Days</span>
                  </div>
                  <div>:</div>
                  <div className="flex flex-col items-center gap-y-1.5">
                    <span className="text-base">{hours}</span>
                    <span className="text-xs text-white/45">Hours</span>
                  </div>
                  <div>:</div>
                  <div className="flex flex-col items-center gap-y-1.5">
                    <span className="text-base">{minutes}</span>
                    <span className="text-xs text-white/45">Minutes</span>
                  </div>
                  <div>:</div>
                  <div className="flex flex-col items-center gap-y-1.5">
                    <span className="text-base">{seconds}</span>
                    <span className="text-xs text-white/45">Seconds</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      ) : (
        <Skeleton className="rounded-lg h-11 w-[210px] bg-white/40" />
      )}
    </div>
  );
};

export default CountdownTimer;
