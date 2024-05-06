import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/button";
import { ViewSvg } from "@/components/svg/View";
import { NextLayoutPage } from "@/types/nextjs";
import launchpad from "@/services/launchpad";
import { RocketSvg } from "@/components/svg/Rocket";
import { PeddingSvg } from "@/components/svg/Pedding";
import { ApprovedSvg } from "@/components/svg/Approved";
import { DreampadSvg } from "@/components/svg/Dreampad";
import { wallet } from "@/services/wallet";

const positiveIntegerPattern = /^[1-9]\d*$/;
const minimumTimePattern = /^(6[1-9]|[7-9][0-9]|[1-9][0-9]{2,})$/;

const LauchTokenPage: NextLayoutPage = observer(() => {
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      console.log(data);
      const res = await launchpad.createFTO(
        data as {
          provider: string;
          raisedToken: string;
          tokenName: string;
          tokenSymbol: string;
          tokenAmount: number;
          poolHandler: string;
          rasing_cycle: string;
        }
      );
      console.log('createFTORes', res);
      setApproved(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto flex items-center justify-center">
      {launchpad.ftofactoryContract?.createFTO.loading ? (
        <div className="flex h-[566px] w-[583px] justify-center items-center [background:#121212] rounded-[54px]">
          <div className="flex flex-col items-center">
            <div className="relative">
              <PeddingSvg />
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <RocketSvg />
              </div>
            </div>
            <div className="text-gold-primary mt-[59px] font-bold">
              Transaction Pending
            </div>
            <div className="text-[#868B9A] mt-2 w-[250px] text-xs text-center">
              We have received your transaction just waiting for approval
            </div>
          </div>
        </div>
      ) : !launchpad.ftofactoryContract?.createFTO.error && approved ? (
        <div className="w-[583px] h-[576px] shrink-0 border border-[color:var(--Button-Gradient,#F7931A)] [background:#121212] rounded-[40px] border-solid flex flex-col items-center pt-[84px]">
          <ApprovedSvg />
          <div className="text-[#43D9A3] mt-[27px] font-bold">
            Transaction Approved
          </div>
          <div className="text-[#868B9A] mt-2  text-xs text-center">
            Your transaction has been approved.
          </div>
          <div className="text-gray-500 text-xs flex items-center gap-1 mt-[5px]">
            View on Minstscan <ViewSvg />
          </div>
          <Button className="w-[521px] h-[60px] mx-auto mt-[60px]">
            <Link href="/launch" className="text-black font-bold">
              Create new Token
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col w-[580.188px] items-center border-[color:var(--Button-Gradient,#F7931A)] bg-[#291C0A] py-4 px-[5px] rounded-[54px] border-2">
          <div className="flex items-center gap-2">
            <DreampadSvg />
            <span>Dreampad</span>
          </div>
          <div className="mt-4 opacity-50 w-[409px] text-center">
            Launch your token with in three steps.{" "}
            <span className="underline cursor-pointer">Read more </span>about
            Dreampad.
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[22px]"
          >
            <div className="flex flex-col gap-4">
              <label htmlFor="provider">Token Provider</label>
              <input
                type="text"
                {...register("provider", { required: true })}
                value={wallet.account}
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="raisedToken">Token Address</label>
              <input
                type="text"
                {...register("raisedToken", { required: true })}
                value={wallet.currentChain?.contracts?.ftoToken}
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>Token Name</div>
              <input
                type="text"
                {...register("tokenName", { required: true })}
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
              {errors.tokenName && (
                <span className="text-red-500">Token Name is required</span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div>Token Symbol</div>
              <input
                type="text"
                {...register("tokenSymbol", { required: true })}
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
              {errors.tokenSymbol && (
                <span className="text-red-500">Token Symbol is required</span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div>Token Amount</div>
              <input
                type="text"
                {...register("tokenAmount", {
                  required: "Token Amount is required",
                  pattern: {
                    value: positiveIntegerPattern,
                    message: "Token Amount should be a positive integer",
                  },
                })}
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
              {errors.tokenAmount && (
                <span className="text-red-500">
                  {errors.tokenAmount.message as any}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="poolHandler">Pool Handler</label>
              <input
                type="text"
                {...register("poolHandler", { required: true })}
                value={wallet.currentChain?.contracts?.routerV2}
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>Compaign Duration(s)</div>
              <input
                type="number"
                {...register("rasing_cycle", {
                  required: "Rasing Cycle is required",
                  pattern: {
                    value: minimumTimePattern,
                    message: "Raising Cycle should be over 60s",
                  },
                })}
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
              {errors.rasing_cycle && (
                <span className="text-red-500">
                  {errors.rasing_cycle.message as any}
                </span>
              )}
            </div>
            <Button type="submit" className="text-black font-bold">
              Launch Token
            </Button>
          </form>
        </div>
      )}
    </div>
  );
});

export default LauchTokenPage;
