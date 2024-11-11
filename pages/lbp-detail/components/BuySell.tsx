import { Button } from "@/components/button";
import ArrowAltSvg from "@/components/svg/ArrowAlt";
import { cn } from "@/lib/tailwindcss";
import {  Input } from "@nextui-org/react";
import React, { useState } from "react";

type Props = {};

const BuySellTabs = [
  { title: "Buy", key: "buy" },
  { title: "Sell", key: "sell" },
];

const BuySell = (props: Props) => {
  const [actionTab, setActionTab] = useState<"buy" | "sell">("buy");

  return (
    <div>
      <div className="flex gap-4">
        {BuySellTabs.map(({ title, key }) => (
          <div
            key={key}
            onClick={() => setActionTab(key as "buy" | "sell")}
            className={cn(
              "font-bold text-[22px] leading-[30px] w-fit bg-gradient-to-b from-[#F7931A] to-[#FCD729] text-transparent bg-clip-text opacity-50 cursor-pointer",
              { "opacity-100": actionTab == key }
            )}
          >
            {title}
          </div>
        ))}
      </div>
      <div className="mt-1 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-sm leading-3 font-normal text-white/50">
              From
            </div>
            <Input
              placeholder="0.0"
              classNames={{
                inputWrapper:
                  "px-0 bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                  input: "leading-6 text-[21px] font-bold"
              }}
            />
          </div>
          <div className="my-3 py-2.5">
            <div className="px-[22px] py-2 flex items-center gap-1 bg-[#3E2A0F] border border-[#F7931A1A] rounded-[30px]">
                <div className="size-5 rounded-full bg-[#C8EE44]"></div>
                <div className="font-bold text-sm leading-6">Hunny</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 px-1">
          <div className="h-[1px] flex-grow bg-[#F7931A33]" />
          <div className="my-1 size-[30px] flex items-center justify-center rounded-full bg-[#F7931A1A]">
            <ArrowAltSvg />
          </div>
          <div className="h-[1px] flex-grow bg-[#F7931A33]" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-sm leading-3 font-normal text-white/50">
              To
            </div>
            <Input
              placeholder="0.0"
              classNames={{
                inputWrapper:
                  "px-0 bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                  input: "leading-6 text-[21px] font-bold"
              }}
            />
          </div>
          <div className="my-3 py-2.5">
            <div className="px-[22px] py-2 flex items-center gap-1 bg-[#3E2A0F] border border-[#F7931A1A] rounded-[30px]">
                <div className="size-5 rounded-full bg-[#C8EE44]"></div>
                <div className="font-bold text-sm leading-6">Hunny</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <Button className="w-full">Buy</Button>
        <div className="text-sm cursor-pointer leading-3 font-normal text-center text-white/50">Add token name to wallet</div>
      </div>
    </div>
  );
};

export default BuySell;
