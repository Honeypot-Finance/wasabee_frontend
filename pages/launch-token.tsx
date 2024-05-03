import { observer } from "mobx-react-lite";
import { NextLayoutPage } from "@/types/nextjs";
import { DreampadSvg } from "@/components/svg/Dreampad";
import { PeddingSvg } from "@/components/svg/Pedding";
import { useState } from "react";
import { RocketSvg } from "@/components/svg/Rocket";
import { ApprovedSvg } from "@/components/svg/Approved";
import { ViewSvg } from "@/components/svg/View";
import Link from "next/link";

const LauchTokenPage: NextLayoutPage = observer(() => {
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto flex items-center justify-center">
      {loading ? (
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
      ) : approved ? (
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
          <Link
            href="/launch"
            className="text-center mt-[60px] w-[521px] h-[60px] [background:linear-gradient(180deg,rgba(232,211,124,0.13)_33.67%,#FCD729_132.5%),#F7931A] px-6 py-3 rounded-2xl border-4 border-solid border-[rgba(247,147,26,0.37)] text-black font-bold"
          >
            Create new Token
          </Link>
        </div>
      ) : (
        <div className="flex flex-col w-[580.188px] items-center border-[color:var(--Button-Gradient,#F7931A)] bg-[#291C0A] py-4 px-[5px] rounded-[54px] border-2">
          <div className="flex items-center gap-2">
            <DreampadSvg />
            <span>Dreampad</span>
          </div>
          <div className="mt-4 opacity-50 w-[409px] text-center">
            Launch your token with in three steps.{" "}
            <span className="underline">Read more </span>about Dreampad.
          </div>
          <div className="flex flex-col gap-[22px]">
            <div className="flex flex-col gap-4">
              <div>Token Address</div>
              <input
                type="text"
                placeholder="Enter address"
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>Token Name</div>
              <input
                type="text"
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>Token Symbol</div>
              <input
                type="text"
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>Token Amount</div>
              <input
                type="text"
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>Pool Handler</div>
              <input
                type="text"
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>Compaign Duration(s)</div>
              <input
                type="text"
                className="outline-none w-[522px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
              />
            </div>
            <button
              className=" w-[518px] h-[60px] [background:linear-gradient(180deg,rgba(232,211,124,0.13)_33.67%,#FCD729_132.5%),#F7931A] px-6 py-3 rounded-2xl border-4 border-solid border-[rgba(247,147,26,0.37)] text-black font-bold"
              onClick={() => {
                setLoading(true);
                const timeId = setTimeout(() => {
                  clearTimeout(timeId);
                  setLoading(false);
                  setApproved(true);
                }, 1000);
              }}
            >
              Launch Token
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default LauchTokenPage;
