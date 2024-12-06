import { Button } from "@/components/button";
import useMulticall3 from "@/components/hooks/useMulticall3";
import ArrowAltSvg from "@/components/svg/ArrowAlt";
import { config } from "@/config/wagmi";
import { useDebouncedCallback } from "@/hooks";
import { ERC20ABI } from "@/lib/abis/erc20";
import { LiquidityBootstrapPoolABI } from "@/lib/abis/LiquidityBootstrapPoolAbi";
import { berachainBartioTestnet } from "@/lib/chain";
import { createPublicClientByChain } from "@/lib/client";
import { cn } from "@/lib/tailwindcss";
import { WrappedToastify } from "@/lib/wrappedToastify";
import { formatErc20Data } from "@/services/lib/helper";
import { Input, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { share } from "@trpc/server/observable";
import { waitForTransactionReceipt } from "@wagmi/core";
import { hash } from "crypto";
import { type } from "os";
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
  refetchArgs: () => void;
};

const BuySellTabs = [
  { title: "Buy", key: "buy" },
  { title: "Sell", key: "sell" },
];

type SwapToken = {
  from?: number;
  to?: number;
};

const client = createPublicClientByChain(berachainBartioTestnet);

const BuySell = ({
  asset,
  share,
  allowSell,
  poolAddress,
  refetchArgs,
}: Props) => {
  const [actionTab, setActionTab] = useState<"buy" | "sell">("buy");
  const account = useAccount();
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [swapToken, setSwapToken] = useState<SwapToken>({
    from: undefined,
    to: undefined,
  });

  const [tokens, setTokens] = useState<{
    asset: AssetToken;
    share: AssetToken;
  }>();

  const { mutateAsync: previewSharesOut, error: previewSharesOutError } =
    useMutation({
      mutationKey: ["previewSharesOut", poolAddress],
      mutationFn: async (value: bigint) => {
        const res = await client.readContract({
          address: poolAddress as Address,
          abi: LiquidityBootstrapPoolABI,
          functionName: "previewSharesOut",
          args: [value],
        });
        return res;
      },
    });

  const { mutateAsync: previewAssetsIn, error: previewAssetsInError } =
    useMutation({
      mutationKey: ["previewAssetsIn", poolAddress],
      mutationFn: async (value: bigint) => {
        const res = await client.readContract({
          address: poolAddress as Address,
          abi: LiquidityBootstrapPoolABI,
          functionName: "previewAssetsIn",
          args: [value],
        });
        return res;
      },
    });

  const { mutateAsync: previewAssetsOut, error: previewAssetsOutError } =
    useMutation({
      mutationKey: ["previewAssetsOut", poolAddress],
      mutationFn: async (value: bigint) => {
        const res = await client.readContract({
          address: poolAddress as Address,
          abi: LiquidityBootstrapPoolABI,
          functionName: "previewAssetsOut",
          args: [value],
        });
        return res;
      },
    });

  const { mutateAsync: previewSharesIn, error: previewSharesInError } =
    useMutation({
      mutationKey: ["previewSharesIn", poolAddress],
      mutationFn: async (value: bigint) => {
        const res = await client.readContract({
          address: poolAddress as Address,
          abi: LiquidityBootstrapPoolABI,
          functionName: "previewSharesIn",
          args: [value],
        });
        return res;
      },
    });

  const handleChangeTokenValue = useDebouncedCallback(
    async (value: number | undefined, type: "from" | "to") => {
      console.log(value);
      if (value) {
        try {
          if (actionTab === "buy" && type === "from") {
            const data = await previewSharesOut(
              parseUnits(`${value}`, tokens?.asset.decimals ?? 18)
            );

            const formatedData = data
              ? +formatUnits(data, tokens?.share.decimals ?? 18)
              : 0;

            setSwapToken((prev) => ({
              ...prev,
              from: value,
              to: formatedData,
            }));
          }
          if (actionTab === "buy" && type === "to") {
            const data = await previewAssetsIn(
              parseUnits(`${value}`, tokens?.share.decimals ?? 18)
            );
            const formatedData = data
              ? +formatUnits(data, tokens?.asset.decimals ?? 18)
              : 0;
            setSwapToken((prev) => ({
              ...prev,
              to: value,
              from: formatedData,
            }));
          }

          if (actionTab === "sell" && type === "from") {
            const data = await previewAssetsOut(
              parseUnits(`${value}`, tokens?.share.decimals ?? 18)
            );

            const formatedData = data
              ? +formatUnits(data, tokens?.asset.decimals ?? 18)
              : 0;

            setSwapToken((prev) => ({
              ...prev,
              from: value,
              to: formatedData,
            }));
          }

          if (actionTab === "sell" && type === "to") {
            const data = await previewSharesIn(
              parseUnits(`${value}`, tokens?.asset.decimals ?? 18)
            );

            const formatedData = data
              ? +formatUnits(data, tokens?.share.decimals ?? 18)
              : 0;
            setSwapToken((prev) => ({
              ...prev,
              from: formatedData,
              to: value,
            }));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Else");
        setSwapToken({ from: undefined, to: undefined });
      }
    },
    500
  );

  const { writeContractAsync } = useWriteContract();

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
      (swapToken?.from ?? 0) >
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
        WrappedToastify.success({ message: "Approved successfully" });
      } catch (e: any) {
        console.log(e);
        WrappedToastify.error({ message: "Approval Failed" });
      }
    }
    setIsTxLoading(false);
  };

  const handleWriteContract = async () => {
    setIsTxLoading(true);
    try {
      let hash;

      if (actionTab === "buy") {
        hash = await writeContractAsync({
          abi: LiquidityBootstrapPoolABI,
          address: poolAddress,
          functionName: "swapExactAssetsForShares",
          args: [
            parseUnits(
              swapToken?.from?.toString() || "",
              tokens!.asset.decimals
            ),
            parseUnits(swapToken?.to?.toString() || "", tokens!.share.decimals),
            account.address as Address,
          ],
        });
      } else {
        hash = await writeContractAsync({
          abi: LiquidityBootstrapPoolABI,
          address: poolAddress,
          functionName: "swapExactAssetsForShares",
          args: [
            parseUnits(
              swapToken?.from?.toString() || "",
              tokens!.asset.decimals
            ),
            parseUnits(swapToken?.to?.toString() || "", tokens!.share.decimals),
            account.address as Address,
          ],
        });
      }
      if (hash) {
        await waitForTransactionReceipt(config, {
          hash: hash,
          confirmations: 2,
          timeout: 1000 * 60 * 5,
        });

        WrappedToastify.success({ message: "Transaction Successfully" });
      }
    } catch (error: any) {
      console.log(error);
      WrappedToastify.error({
        message: "Something went wrong! Please try again!",
      });
    }
    setIsTxLoading(false);
    refetchArgs();
    setSwapToken({ from: undefined, to: undefined });
  };

  const isInValidInput = Boolean(
    previewSharesOutError ||
      previewAssetsInError ||
      previewAssetsOutError ||
      previewSharesInError
  );

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
              value={swapToken.from ?? ""}
              onChange={({ target }) =>
                handleChangeTokenValue(Number(target.value), "from")
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
              value={swapToken.to ?? ""}
              onChange={({ target }) =>
                handleChangeTokenValue(Number(target.value), "to")
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
      {isInValidInput && (
        <span className="text-[12px] text-red-800">Input amount too large</span>
      )}
      <div className="mt-5 flex flex-col gap-4">
        {" "}
        {isApproved ? (
          <Button
            className="w-full"
            onClick={handleApproval}
            isDisabled={isInValidInput}
          >
            {isTxLoading ? "Approving" : "Approval"}
          </Button>
        ) : (
          <Button
            isDisabled={!isSufficientBalance || isInValidInput}
            className="w-full"
            onClick={handleWriteContract}
          >
            {isSufficientBalance ? "Buy" : "Insufficient balance"}
          </Button>
        )}
        <div className="text-sm cursor-pointer leading-3 font-normal text-center text-white/50">
          {/* Add token name to wallet */}
        </div>
      </div>
    </div>
  );
};

export default BuySell;
