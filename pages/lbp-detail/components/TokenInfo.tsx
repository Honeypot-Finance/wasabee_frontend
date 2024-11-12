import useMulticall3 from "@/components/hooks/useMulticall3";
import { ERC20ABI } from "@/lib/abis/erc20";
import { Divider } from "@nextui-org/react";
import { CallReturnContext } from "ethereum-multicall";
import React from "react";
import { formatUnits, parseEther, parseUnits } from "viem";

type Props = {
  tokenAddress ?: string
};

function formatErc20Data(data: CallReturnContext[]): { [key: string]: any } {
  if(data.length === 0) return {}
  let decimals = 1; // Default to 1 if decimals are not found

  // First, extract decimals from the data
  data.forEach((item) => {
    if (item.returnValues.length === 0) {
      throw new Error("Invalid ERC20 token address");
    }

    if (item.reference === "decimals") {
      decimals = Math.pow(10, item.returnValues[0]);
    }
  });

  return data.reduce((formattedData: {[key: string]: any}, item) => {
    
      formattedData[item.reference] = item.returnValues[0];
    
    return formattedData;
  }, {});
}

const TokenInfo = ({tokenAddress}: Props) => {

  const  {data} = useMulticall3({
    args: [
      {
        reference: "erc20",
        contractAddress: "0xF9a97b37d9f7d9f7968f267ad266b1f71f2B511D",
        abi: ERC20ABI,
        calls: [
          { reference: "name", methodName: "name", methodParameters: [] },
          { reference: "symbol", methodName: "symbol", methodParameters: [] },
          {
            reference: "decimals",
            methodName: "decimals",
            methodParameters: [],
          },
          {
            reference: "totalSupply",
            methodName: "totalSupply",
            methodParameters: [],
          },
        ],
      },
    ]
  })

  const tokenInfo = formatErc20Data(data?.results.erc20.callsReturnContext ?? [])



  return (
    <div className="">
      <div className="text-[34px] leading-[48px] font-bold">Token Info</div>
      <div className="mt-9">
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Name
          </div>
          <div className="uppercase text-xl font-medium text-white">
            {tokenInfo?.name ?? "Token Name"}
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Token Symbol
          </div>
          <div className="uppercase text-xl font-medium text-white">
            {tokenInfo?.symbol ?? "Token Symbol"}
          </div>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between px-7 items-center">
          <div className="uppercase text-sm font-bold text-[#F0A64A]">
            Total Supply
          </div>
          <div className="uppercase text-xl font-medium text-white">
            {new Intl.NumberFormat('en-DE').format(Number(formatUnits(BigInt(tokenInfo?.totalSupply?.hex ?? '0') , tokenInfo?.decimals ?? 18 )))}
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
            {tokenAddress}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
