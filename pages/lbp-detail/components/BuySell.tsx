import { Button } from "@/components/button";
import useMulticall3 from "@/components/hooks/useMulticall3";
import ArrowAltSvg from "@/components/svg/ArrowAlt";
import { ERC20ABI } from "@/lib/abis/erc20";
import { LiquidityBootstrapPoolABI } from "@/lib/abis/LiquidityBootstrapPoolAbi";
import { cn } from "@/lib/tailwindcss";
import { WrappedToastify } from "@/lib/wrappedToastify";
import { formatErc20Data } from "@/services/lib/helper";
import { Input, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Address, formatUnits, maxUint256, parseUnits } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

type AssetToken = {
  name: string;
  symbol: string;
  decimals: number;
  address: Address;
  totalSupply: {
    type: "BigNumber";
    hex: string;
  };
};

type Props = {
  asset: AssetToken;
  share: AssetToken;
  allowSell: boolean;
  poolAddress: Address;
};

const BuySellTabs = [
  { title: "Buy", key: "buy" },
  { title: "Sell", key: "sell" },
];

const BuySell = ({ asset, share, allowSell, poolAddress }: Props) => {
  const [actionTab, setActionTab] = useState<"buy" | "sell">("buy");
  const account = useAccount();
  const [isTxLoading, setIsTxLoading] = useState(false);

  const [amounts, setAmounts] = useState({
    from: "",
    to: "",
  });

  const [tokens, setTokens] = useState<{
    asset: AssetToken;
    share: AssetToken;
  }>();

  const { writeContractAsync } = useWriteContract();

  const handleWriteContract = async () => {
    try {
      let response;

      if (actionTab === "buy") {
        response = await writeContractAsync({
          abi: LiquidityBootstrapPoolABI,
          address: poolAddress,
          functionName: "swapAssetsForExactShares",
          args: [
            parseUnits(amounts.to, tokens!.share.decimals),
            parseUnits(amounts.from, tokens!.asset.decimals),
            account.address,
          ],
        });
      } else {
        response = await writeContractAsync({
          abi: LiquidityBootstrapPoolABI,
          address: poolAddress,
          functionName: "swapSharesForExactAssets",
          args: [
            parseUnits(amounts.to, tokens!.share.decimals),
            parseUnits(amounts.from, tokens!.asset.decimals),
            account.address,
          ],
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const { data } = useMulticall3({
    queryKey: ["tokens", tokens?.asset.address],
    contractCallContext: [
      {
        abi: ERC20ABI as any,
        contractAddress: "0xF9a97b37d9f7d9f7968f267ad266b1f71f2B511D",
        reference: "erc20",
        calls: [
          {
            methodName: "balanceOf",
            reference: "balanceOf",
            methodParameters: [account?.address],
          },
          {
            methodName: "allowance",
            reference: "allowance",
            methodParameters: [account?.address, poolAddress],
          },
        ],
      },
    ],
    enabled: Boolean(tokens?.asset.address),
  });
  const userAsset =
    data?.results && formatErc20Data(data.results.erc20.callsReturnContext);
  console.log(userAsset);

  useEffect(() => {
    setTokens({
      asset: asset,
      share: share,
    });
  }, [asset.name && share.name]);

  const handleChangeTab = (key: "buy" | "sell") => {
    if (key == "sell") {
      setTokens({
        asset: share,
        share: asset,
      });
      setActionTab(key);
    } else {
      setTokens({
        asset: asset,
        share: share,
      });
      setActionTab(key);
    }
  };

  const handleOnChangeAmount = (amount: string, type: "from" | "to") => {
    if (type == "from") {
      setAmounts((prev) => ({ ...prev, from: amount }));
    }
    if (type == "to") {
      setAmounts((prev) => ({ ...prev, to: amount }));
    }
  };

  const isSufficientBalance = false;

  const isApproved = userAsset?.allowance === BigInt(0);

  const handleApproval = async () => {
    if (tokens?.asset) {
      try {
        setIsTxLoading(true);
        await writeContractAsync({
          abi: ERC20ABI,
          address: "0xF9a97b37d9f7d9f7968f267ad266b1f71f2B511D",
          functionName: "approve",
          args: [poolAddress, maxUint256],
        });
      } catch (e: any) {
        console.log(e);
        WrappedToastify.error(e.message);
      }
    }
    setIsTxLoading(false);
  };

  return (
    <div className={cn("relative p-5")}>
      {isTxLoading && (
        <div className="inset-0 absolute bg-black/20 z-10 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div className="flex gap-4">
        {BuySellTabs.map(({ title, key }) => {
          if (title === "Sell" && !allowSell) return null;
          return (
            <div
              key={key}
              onClick={() => handleChangeTab(key as "buy" | "sell")}
              className={cn(
                "font-bold text-[22px] leading-[30px] w-fit bg-gradient-to-b from-[#F7931A] to-[#FCD729] text-transparent bg-clip-text opacity-50 cursor-pointer",
                { "opacity-100": actionTab == key }
              )}
            >
              {title}
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-sm leading-3 font-normal text-white/50">
              From
            </div>
            <Input
              value={amounts.from}
              placeholder="0.0"
              classNames={{
                inputWrapper:
                  "px-0 bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                input: "leading-6 text-[21px] font-bold",
              }}
              onChange={(e) => handleOnChangeAmount(e.target.value, "from")}
            />
          </div>
          <div className="my-3 py-2.5">
            <div className="px-[22px] py-2 flex items-center gap-1 bg-[#3E2A0F] border border-[#F7931A1A] rounded-[30px]">
              <div className="size-5 rounded-full bg-[#C8EE44]"></div>
              <div className="font-bold text-sm leading-6">
                {tokens?.asset?.symbol}
              </div>
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
              value={amounts.to}
              classNames={{
                inputWrapper:
                  "px-0 bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                input: "leading-6 text-[21px] font-bold",
              }}
              onChange={(e) => handleOnChangeAmount(e.target.value, "to")}
            />
          </div>
          <div className="my-3 py-2.5">
            <div className="px-[22px] py-2 flex items-center gap-1 bg-[#3E2A0F] border border-[#F7931A1A] rounded-[30px]">
              <div className="size-5 rounded-full bg-[#C8EE44]"></div>
              <div className="font-bold text-sm leading-6">
                {tokens?.share?.symbol}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        {isApproved ? (
          <Button className="w-full" onClick={handleApproval}>
            Approval
          </Button>
        ) : (
          <Button
            isDisabled={!isSufficientBalance}
            className="w-full"
            onClick={handleWriteContract}
          >
            {isSufficientBalance ? "Buy" : "Insufficient balance"}
          </Button>
        )}
        <div className="text-sm cursor-pointer leading-3 font-normal text-center text-white/50">
          Add token name to wallet
        </div>
      </div>
    </div>
  );
};

export default BuySell;
