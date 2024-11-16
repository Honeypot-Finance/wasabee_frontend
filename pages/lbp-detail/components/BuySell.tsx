import { Button } from "@/components/button";
import useMulticall3 from "@/components/hooks/useMulticall3";
import ArrowAltSvg from "@/components/svg/ArrowAlt";
import { config } from "@/config/wagmi";
import { useDebouncedCallback } from "@/hooks";
import { ERC20ABI } from "@/lib/abis/erc20";
import { LiquidityBootstrapPoolABI } from "@/lib/abis/LiquidityBootstrapPoolAbi";
import { cn } from "@/lib/tailwindcss";
import { WrappedToastify } from "@/lib/wrappedToastify";
import { formatErc20Data } from "@/services/lib/helper";
import { Input, Spinner } from "@nextui-org/react";
import { waitForTransactionReceipt } from "@wagmi/core";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
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

type SwapToken = {
  from?: number;
  to?: number;
};

const BuySell = ({ asset, share, allowSell, poolAddress }: Props) => {
  const [actionTab, setActionTab] = useState<"buy" | "sell">("buy");
  const account = useAccount();
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [swapToken, setSwapToken] = useState<SwapToken>({
    from: 0,
    to: 0,
  });

  const [tokens, setTokens] = useState<{
    asset: AssetToken;
    share: AssetToken;
  }>();

  const {
    data: buyFromData,
    refetch: buyFromRefetch,
    isLoading: isBuyFromLoading,
  } = useReadContract({
    address: poolAddress as Address,
    abi: LiquidityBootstrapPoolABI,
    functionName: "previewSharesOut",
    args: [BigInt(swapToken?.from || 0)],
    query: {
      enabled: poolAddress && Boolean(swapToken.from),
    },
  });

  const {
    data: buyToData,
    refetch: buyToRefetch,
    isLoading: isBuyToLoading,
  } = useReadContract({
    address: poolAddress as Address,
    abi: LiquidityBootstrapPoolABI,
    functionName: "previewAssetsIn",
    args: [BigInt(swapToken?.to || 0)],
    query: {
      enabled: poolAddress && Boolean(swapToken.to),
    },
  });

  const {
    data: sellFromData,
    refetch: sellFromRefetch,
    isLoading: isSellFromLoading,
  } = useReadContract({
    address: poolAddress as Address,
    abi: LiquidityBootstrapPoolABI,
    functionName: "previewAssetsOut",
    args: [BigInt(swapToken?.from || 0)],
    query: {
      enabled: allowSell && poolAddress && Boolean(swapToken.from),
    },
  });

  const {
    data: sellToData,
    refetch: sellToRefetch,
    isLoading: isSellToLoading,
  } = useReadContract({
    address: poolAddress as Address,
    abi: LiquidityBootstrapPoolABI,
    functionName: "previewSharesIn",
    args: [BigInt(swapToken?.to || 0)],
    query: {
      enabled: allowSell && poolAddress && Boolean(swapToken.to),
    },
  });

  const handleChangeTokenValue = useDebouncedCallback(
    (value: number | undefined, type: "from" | "to") => {
      if (actionTab === "buy" && type === "from") {
        setSwapToken((prev) => ({
          ...prev,
          from: value,
        }));
        buyFromRefetch();
      }
      if (actionTab === "buy" && type === "to") {
        setSwapToken((prev) => ({
          ...prev,
          to: value,
        }));
        buyToRefetch();
      }

      if (actionTab === "sell" && type === "from") {
        setSwapToken((prev) => ({
          ...prev,
          from: value,
        }));
        sellFromRefetch();
      }

      if (actionTab === "sell" && type === "to") {
        setSwapToken((prev) => ({
          ...prev,
          to: value,
        }));
        sellToRefetch();
      }
    },
    500
  );

  useEffect(() => {
    if (!isBuyFromLoading) {
      console.log("buyFromData:::", buyFromData);
      setSwapToken((prev) => ({
        ...prev,
        to: Number(buyFromData) || 0,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuyFromLoading]);

  useEffect(() => {
    if (!isBuyToLoading) {
      console.log("buyToData:::", buyToData);
      setSwapToken((prev) => ({
        ...prev,
        from: Number(buyToData) || 0,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuyToLoading]);

  useEffect(() => {
    if (!isSellFromLoading) {
      console.log("sellFromData:::", sellFromData);
      setSwapToken((prev) => ({
        ...prev,
        to: Number(sellFromData) || 0,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSellFromLoading]);

  useEffect(() => {
    if (!isSellToLoading) {
      console.log("sellToData:::", sellToData);
      setSwapToken((prev) => ({
        ...prev,
        from: Number(sellToData) || 0,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSellToLoading]);

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
            parseUnits(swapToken?.to?.toString() || "", tokens!.share.decimals),
            parseUnits(
              swapToken?.from?.toString() || "",
              tokens!.asset.decimals
            ),
            account.address as Address,
          ],
        });
      } else {
        response = await writeContractAsync({
          abi: LiquidityBootstrapPoolABI,
          address: poolAddress,
          functionName: "swapSharesForExactAssets",
          args: [
            parseUnits(swapToken?.to?.toString() || "", tokens!.share.decimals),
            parseUnits(
              swapToken?.from?.toString() || "",
              tokens!.asset.decimals
            ),
            account.address as Address,
          ],
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const { data, refetch } = useMulticall3({
    queryKey: ["tokens", tokens?.asset.address],
    contractCallContext: [
      {
        abi: ERC20ABI as any,
        contractAddress: tokens?.asset.address!,
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
          {
            methodName: "decimals",
            reference: "decimals",
            methodParameters: [],
          },
        ],
      },
    ],
    enabled: Boolean(tokens?.asset.address),
  });
  const userAsset =
    data?.results && formatErc20Data(data.results.erc20.callsReturnContext);

  useEffect(() => {
    setTokens({
      asset: asset,
      share: share,
    });
  }, [asset.name && share.name]);

  const handleChangeTab = (key: "buy" | "sell") => {
    if (key === "sell") {
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

  const isSufficientBalance =
    +formatUnits(userAsset?.balanceOf ?? 0, userAsset?.decimals ?? 0) -
      swapToken.from! >
    0;

  const isApproved = userAsset?.allowance === BigInt(0);

  const handleApproval = async () => {
    if (tokens?.asset) {
      try {
        setIsTxLoading(true);
        const txHash = await writeContractAsync({
          abi: ERC20ABI,
          address: tokens?.asset.address,
          functionName: "approve",
          args: [poolAddress, maxUint256],
        });

        await waitForTransactionReceipt(config, {
          hash: txHash,
          confirmations: 2,
          timeout: 1000 * 60 * 5,
        });

        await refetch();
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
                { "opacity-100": actionTab === key }
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
            <NumericFormat
              customInput={Input}
              placeholder="0.0"
              classNames={{
                inputWrapper:
                  "px-0 bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                input: "leading-6 text-[21px] font-bold",
              }}
              value={swapToken.from}
              onValueChange={({ floatValue }) =>
                handleChangeTokenValue(floatValue, "from")
              }
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
            <NumericFormat
              customInput={Input}
              placeholder="0.0"
              classNames={{
                inputWrapper:
                  "px-0 bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                input: "leading-6 text-[21px] font-bold",
              }}
              value={swapToken.to}
              onValueChange={({ floatValue }) =>
                handleChangeTokenValue(floatValue, "to")
              }
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
            {isTxLoading ? "Approving" : "Approval"}
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
