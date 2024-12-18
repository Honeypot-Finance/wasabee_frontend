import React from "react";
import Countdown from "react-countdown";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface CountdownTimerProps {
  endTime?: string;
  ftoState?: number;
  endTimeDisplay?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endTime,
  ftoState,
  endTimeDisplay,
}) => {
  const formatEndTimeDisplay = (timestamp: string) => {
    try {
      const date = new Date(parseInt(timestamp) * 1000);
      return format(date, "yyyy-MM-dd HH:mm:ss");
    } catch {
      return endTimeDisplay;
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-2.5">
      {/* TODO: gradient color */}
      <div className="xs:text-lg md:text-xl">Ends In</div>
      {endTime ? (
        <Countdown
          date={parseInt(endTime) * 1000}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed || ftoState !== 3) {
              return formatEndTimeDisplay(endTime);
            } else {
              return (
                <div className="flex items-end md:gap-x-2">
                  <div className="flex flex-col-reverse items-center gap-y-1.5">
                    <span className="text-base border border-[#000] bg-[#FFCD4D] rounded-lg size-8 text-center leading-8">
                      {days}
                    </span>
                    <span className="text-xs text-[#333]/80">Days</span>
                  </div>

                  <div className="font-bold">:</div>

                  <div className="flex flex-col-reverse items-center gap-y-1.5">
                    <span className="text-base border border-[#000] bg-[#FFCD4D] rounded-lg size-8 text-center leading-8">
                      {hours}
                    </span>
                    <span className="text-xs text-[#333]/80">Hours</span>
                  </div>

                  <div className="font-bold">:</div>

                  <div className="flex flex-col-reverse items-center gap-y-1.5">
                    <span className="text-base border border-[#000] bg-[#FFCD4D] rounded-lg size-8 text-center leading-8">
                      {minutes}
                    </span>
                    <span className="text-xs text-[#333]/80">Minutes</span>
                  </div>

                  <div className="font-bold">:</div>

                  <div className="flex flex-col-reverse items-center gap-y-1.5">
                    <span className="text-base border border-[#000] bg-[#FFCD4D] rounded-lg size-8 text-center leading-8">
                      {seconds}
                    </span>
                    <span className="text-xs text-[#333]/80">Seconds</span>
                  </div>
                </div>
              );
            }
          }}
        />
      ) : (
        <Skeleton className="rounded-lg h-11 w-[210px] " />
      )}
    </div>
  );
};

export default CountdownTimer;
