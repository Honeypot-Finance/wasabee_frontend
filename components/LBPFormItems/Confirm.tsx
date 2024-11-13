import React, { useState } from "react";
import { Button } from "../button";
import { useFormContext } from "react-hook-form";
import { useAccount, useWriteContract } from "wagmi";
import { ERC20ABI } from "@/lib/abis/erc20";
import {
  decodeEventLog,
  keccak256,
  maxUint256,
  parseEther,
  parseUnits,
} from "viem";
import { LiquidityBootstrapPoolFactoryAddress } from "@/services/chain";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { WrappedToastify } from "@/lib/wrappedToastify";
import { LiquidityBootstrapPoolFactoryABI } from "@/lib/abis/LiquidityBootstrapPoolFactory";
import dayjs from "dayjs";
import { useRouter } from "next/router";

type Props = {};

const SummaryItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="text-[12px] leading-4 font-medium">{title}</div>
      <div className="text-[12px] leading-4 font-medium">{value}</div>
    </div>
  );
};

const ApprovalsCard = ({
  step,
  title,
  buttonTitle,
  onClick,
  isLoading,
}: {
  step: number;
  title: string;
  buttonTitle: string;
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="py-5 px-7 flex flex-col gap-4 items-center bg-[#211708] border border-[#F7931A1A] rounded-[20px]">
      <div className="text-[12px] leading-4">Step {step}</div>
      <div>{title}</div>
      <div className="w-36 h-[2px] bg-[#37240A]" />
      <Button
        styleMode="plain"
        className="rounded-full outline-0 border-0"
        disabled={isLoading}
        onClick={onClick}
      >
        {!isLoading ? buttonTitle : "Loading..."}
      </Button>
    </div>
  );
};

const data = [
  {
    title: "Swap Fee",
    value: "2%",
  },
  {
    title: "Platform Fee",
    value: "3%",
  },
  {
    title: "Project Token Quantity",
    value: "1USDC",
  },
  {
    title: "Collateral Token Quantity",
    value: "10M DAI",
  },
  {
    title: "Start Time",
    value: "10/24/2024, 12:00 AM",
  },
  {
    title: "End Time",
    value: "10/31/2024, 12:00 AM",
  },
  {
    title: "Duration",
    value: "7 days",
  },
];

const Confirm = (props: Props) => {
  const { getValues } = useFormContext();
  const account = useAccount();

  const { writeContractAsync } = useWriteContract();
  const [isApprovalLoading, setIsApprovalLoading] = useState(false);
  const [createPoolLoading, setPoolLoading] = useState(false);
  const router = useRouter();

  const handleApprovalTokens = async () => {
    const { assetTokenAddress, projectToken } = getValues();
    console.log(assetTokenAddress, projectToken);
    try {
      setIsApprovalLoading(true);
      const txHash1 = await writeContractAsync({
        abi: ERC20ABI,
        address: assetTokenAddress,
        functionName: "approve",
        args: [LiquidityBootstrapPoolFactoryAddress, maxUint256],
      });

      await waitForTransactionReceipt(config, { hash: txHash1 });

      await writeContractAsync({
        abi: ERC20ABI,
        address: projectToken,
        functionName: "approve",
        args: [LiquidityBootstrapPoolFactoryAddress, maxUint256],
      });

      await waitForTransactionReceipt(config, { hash: txHash1 });
    } catch (error) {
      console.log(error);
    }
    WrappedToastify.success({ message: "Approved Token Successfully " });
    setIsApprovalLoading(false);
  };

  console.log(getValues());

  const handleCreatePool = async () => {
    const {
      assetTokenAddress,
      projectToken,
      lbpType,
      startTime,
      endTime,
      startWeight,
      endWeight,
      projectTokenQuantity,
      assetTokenQuantity,
      vestingEndTime,
    } = getValues();
    const sellingAllowed = lbpType === "buy-sell";
    if (account.address) {
      try {
        setPoolLoading(true);
        const txHash = await writeContractAsync({
          abi: LiquidityBootstrapPoolFactoryABI,
          address: LiquidityBootstrapPoolFactoryAddress,
          functionName: "createLiquidityBootstrapPool",
          args: [
            {
              asset: assetTokenAddress,
              share: projectToken,
              creator: account.address,
              whitelistMerkleRoot:
                "0x0000000000000000000000000000000000000000000000000000000000000000",
              sellingAllowed: sellingAllowed,
              saleStart: dayjs(startTime).unix(),
              saleEnd: dayjs(endTime).unix(),
              minAssetsIn: BigInt(0),
              minPercAssetsSeeding: 0,
              minSharesSeeding: BigInt(0),
              redemptionDelay: 0,
              weightStart: parseEther(`${startWeight}`),
              weightEnd: parseEther(`${endWeight}`),
              maxSharePrice: parseEther("0"),
              maxTotalAssetsIn: parseEther("0"),
              maxSharesOut: parseEther("0"),
              maxTotalAssetsInDeviation: 0,
              vestCliff: 0,
              vestEnd: dayjs(vestingEndTime).unix(),
              virtualAssets: BigInt(0),
            },
            parseUnits(`${projectTokenQuantity}`, 18),
            parseUnits(`${assetTokenQuantity}`, 18),
            keccak256(projectToken),
          ],
        });

        const res = await waitForTransactionReceipt(config, { hash: txHash });

        res.logs.forEach((log) => {
          try {
            const decode = decodeEventLog({
              abi: LiquidityBootstrapPoolFactoryABI,
              data: log.data,
              topics: log.topics,
            });
            if (decode.eventName == "PoolCreated") {
              const poolAddress = decode.args.pool;
              router.push(`/lpb-detail/${poolAddress}`);
            }
          } catch (error) {
            console.log(error);
          }
        });

        setPoolLoading(false);
        router.push(`/lpb-detail/`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="text-xl font-medium">Quick Summary</div>
      <div className="flex flex-col gap-9">
        <div className="mt-3 flex flex-wrap gap-8 p-[10px]">
          {data.map((d) => (
            <SummaryItem title={d.title} value={d.value} key={d.value} />
          ))}
        </div>
        <div>
          <div className="text-base leading-5 font-medium pl-[10px]">
            Final Approvals
          </div>
          <div className="flex gap-3.5 mt-3.5">
            <ApprovalsCard
              step={1}
              title={"Approve"}
              buttonTitle="Approve"
              onClick={handleApprovalTokens}
              isLoading={isApprovalLoading}
            />
            <ApprovalsCard
              isLoading={false}
              onClick={handleCreatePool}
              step={2}
              title={"Schedule Sale "}
              buttonTitle="Approve"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
