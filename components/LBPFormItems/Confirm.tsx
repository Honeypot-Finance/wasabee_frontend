import React, { useState } from "react";
import { Button } from "../button";
import { useFormContext } from "react-hook-form";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
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
  status
}: {
  step: number;
  title: string;
  buttonTitle: string;
  onClick: () => void;
  isLoading: boolean;
  status?: 'idle' | 'pending' |'success' | 'error'
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



const Confirm = (props: Props) => {
  const { getValues } = useFormContext();
  const account = useAccount();

  const { writeContractAsync } = useWriteContract();
  const [approvalTokenStatus, setApprovalTokenStatus] = useState<{
    loading: boolean,
    status: 'idle' | 'pending' |'success' | 'error'
  }>({
    loading: false,
    status: 'idle'
  });
  const [createPoolLoading, setPoolLoading] = useState(false);
  const router = useRouter();

console.log(getValues())

const {startTime, endTime,projectTokenQuantity,customTotalSupplyType ,customTotalSupply} = getValues()

const {data}=  useReadContract({
  abi: LiquidityBootstrapPoolFactoryABI,
  address:LiquidityBootstrapPoolFactoryAddress,
  functionName: "factorySettings",
})

const [, platformFee, swapFee] = data ?? []

const SummaryItemData = [
  {
    title: "Swap Fee",
    value: `${swapFee ? swapFee / 1000 : 0}%`,
  },
  {
    title: "Platform Fee",
    value: `${platformFee ? platformFee / 1000 : 0}%`,
  },
  {
    title: "Project Token Quantity",
    value: projectTokenQuantity,
  },
  {
    title: "Collateral Token Quantity",
    value: customTotalSupplyType ? customTotalSupply : 0,
  },
  {
    title: "Start Time",
    value: dayjs(startTime).format("MM/DD/YYYY HH:mm"),
  },
  {
    title: "End Time",
    value: dayjs(endTime).format("MM/DD/YYYY HH:mm"),
  },
  {
    title: "Duration",
    value: `${(dayjs(endTime).unix() - dayjs(startTime).unix() / 86400).toFixed(2)}  Days`
  },
];

  const handleApprovalTokens = async () => {
    const { assetTokenAddress, projectToken } = getValues();
    try {
      setApprovalTokenStatus((prev) => ({...prev, loading: true, status: 'pending'}));
      const txHash1 = await writeContractAsync({
        abi: ERC20ABI,
        address: assetTokenAddress,
        functionName: "approve",
        args: [LiquidityBootstrapPoolFactoryAddress, maxUint256],
      });

      await waitForTransactionReceipt(config, { hash: txHash1 });

      const txHash2 = await writeContractAsync({
        abi: ERC20ABI,
        address: projectToken,
        functionName: "approve",
        args: [LiquidityBootstrapPoolFactoryAddress, maxUint256],
      });

      await waitForTransactionReceipt(config, { hash: txHash2 });
      setApprovalTokenStatus((prev) => ({ loading: false, status: 'success' }));

    } catch (error) {
      console.log(error);
      setApprovalTokenStatus((prev) => ({ loading: false, status: 'error' }));

    }
    WrappedToastify.success({ message: "Approved Token Successfully " });
  };


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
      vestingCliffTime,
      tokenClaimDelayHours,
      tokenClaimDelayMinutes,
      isVestingCliffTimeEnabled
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
              redemptionDelay: tokenClaimDelayHours * 60 * 60 + tokenClaimDelayMinutes * 60,
              weightStart: parseEther(`${startWeight/100}`),
              weightEnd: parseEther(`${endWeight/100}`),
              maxSharePrice: BigInt("1"),
              maxTotalAssetsIn: BigInt("0"),
              maxSharesOut: BigInt("0"),
              maxTotalAssetsInDeviation: 0,
              vestCliff: isVestingCliffTimeEnabled ? dayjs(vestingCliffTime).unix() : 0,
              vestEnd:isVestingCliffTimeEnabled ? dayjs(vestingEndTime).unix() : 0,
              virtualAssets: BigInt(0),
            },
            parseUnits(`${projectTokenQuantity}`, 18),
            parseUnits(`${assetTokenQuantity}`, 18),
            keccak256(projectToken),
          ],
        });

        const res = await waitForTransactionReceipt(config, { hash: txHash });

        console.log(res)

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

        router.push(`/lpb-detail/`);
      } catch (error) {
        console.log(error);
      }
      setPoolLoading(false);

    }
  };
  return (
    <div>
      <div className="text-xl font-medium">Quick Summary</div>
      <div className="flex flex-col gap-9">
        <div className="mt-3 flex flex-wrap gap-8 p-[10px]">
          {SummaryItemData.map((d) => (
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
              isLoading={approvalTokenStatus.loading}
              status={approvalTokenStatus.status}
            />
            <ApprovalsCard
              isLoading={createPoolLoading}
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
