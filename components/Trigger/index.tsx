import React from "react";
import { cn } from "@/lib/tailwindcss";

interface TriggerProps<T extends string = string> {
  tab: T;
  options: T[];
  className?: string;
  callback?: Function;
  capitalize?: boolean;
  setTab: (tab: T) => void;
}

export function Trigger({
  tab,
  setTab,
  options,
  callback,
  className,
  capitalize,
}: TriggerProps) {
  return (
    <div
      className={cn(
        "flex rounded-2xl border border-[#202020] bg-white p-4 shadow-[4px_4px_0px_0px_#202020,-4px_4px_0px_0px_#202020] py-2 px-3.5",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            setTab(option);
            callback && callback();
          }}
          className={cn(
            "flex-1 px-3 py-1.5 text-sm font-medium transition-all rounded-lg text-center",
            tab === option
              ? "bg-[#202020] text-white"
              : "text-[#202020] hover:bg-[#20202010]"
          )}
        >
          {capitalize
            ? option.charAt(0).toUpperCase() + option.slice(1)
            : option}
        </button>
      ))}
    </div>
  );
}
