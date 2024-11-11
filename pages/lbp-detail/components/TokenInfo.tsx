import { Divider } from "@nextui-org/react";
import React from "react";

type Props = {};

const TokenInfo = () => {
  return (
    <div className="">
      <div className="text-[34px] leading-[48px] font-bold">Token Info</div>
      <div className="mt-9">
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Name
          </div>
          <div className="uppercase text-xl font-medium text-white">
            Honey Token
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Symbol
          </div>
          <div className="uppercase text-xl font-medium text-white">
            Hunny
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Total Supply
          </div>
          <div className="uppercase text-xl font-medium text-white">
            200,000
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Initial Supply
          </div>
          <div className="uppercase text-xl font-medium text-white">
            2000
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
          Initial Market Cap
          </div>
          <div className="uppercase text-xl font-medium text-white">
            $394,039
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Type
          </div>
          <div className="uppercase text-xl font-medium text-white">
            Erc20
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Address
          </div>
          <div className="uppercase text-xl font-medium text-white">
            0x2354236347689
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
