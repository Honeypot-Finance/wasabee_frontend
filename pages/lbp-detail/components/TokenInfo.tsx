import { Divider } from "@nextui-org/react";
import React from "react";
import { formatUnits } from "viem";

type Props = {
  tokenAddress?: string;
  token: {
    [key: string]: any;
  };
};

const TokenInfo = ({ tokenAddress, token }: Props) => {
  return (
    <div className="">
      <div className="text-[34px] leading-[48px] font-bold">Token Info</div>
      <div className="mt-9">
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Name
          </div>
          <div className="uppercase text-xl font-medium text-white">
            {token?.name ?? "Token Name"}
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Symbol
          </div>
          <div className="uppercase text-xl font-medium text-white">
            {token?.symbol ?? "Token Symbol"}
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Total Supply
          </div>
          <div className="uppercase text-xl font-medium text-white">
            {new Intl.NumberFormat("en-DE").format(
              Number(
                formatUnits(
                  BigInt(token?.totalSupply ?? "0"),
                  token?.decimals ?? 18
                )
              )
            )}
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Initial Supply
          </div>
          <div className="uppercase text-xl font-medium text-white"></div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Initial Market Cap
          </div>
          <div className="uppercase text-xl font-medium text-white"></div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Type
          </div>
          <div className="uppercase text-xl font-medium text-white">Erc20</div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Address
          </div>
          <div className="uppercase text-xl font-medium text-white">
            {tokenAddress}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
