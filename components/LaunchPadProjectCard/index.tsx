import clsx from "clsx";
import { observer } from "mobx-react-lite";
import React from "react";
import Image from "next/image";

type IProjectCardStatus = "live" | "comming";

type ILaunchPadProjectCard = {
  status: IProjectCardStatus;
  coverImg: string;
};

const ProjectCardStatus = observer(
  ({ status }: { status: IProjectCardStatus }) => {
    return (
      <div className="flex items-center">
        <div
          className={clsx(
            "flex justify-center items-center w-[18px] h-[18px] rounded-full",
            {
              "bg-[#F7941D1A]": status === "comming",
              "bg-[#43d9a3]/10": status === "live",
            }
          )}
        >
          <div
            className={clsx(
              "flex justify-center items-center w-[8px] h-[8px] rounded-full",
              {
                "bg-[#F7941D]": status === "comming",
                "bg-[#43d9a3]": status === "live",
              }
            )}
          ></div>
        </div>
        <div className="font-bold text-white text-[1rem] leading-[1.3rem] min-w-[110px] text-center">
          {status == "live" ? "Live now" : "Comming soon"}
        </div>
      </div>
    );
  }
);

type ITokenInfo = {
  symbol: string;
  name: string;
  author: string;
  description?: string;
};

const TokenInfo = observer(
  ({ symbol, name, author, description }: ITokenInfo) => {
    return (
      <div className="flex flex-col gap-[6px]">
        <div className="flex">
          <div className="w-[52px] h-[52px] rounded-full overflow-hidden relative">
            <Image src={symbol} fill alt={name} />
          </div>
          <div className="">
            <div>{name}</div>
            <div>{author}</div>
          </div>
        </div>
        {description && (
          <p className="line-clamp-2 text-sm leading-[18px] text-[#FFFFFF8C]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum
          </p>
        )}
      </div>
    );
  }
);

const LaunchPadProjectCard = observer(({ status }: ILaunchPadProjectCard) => {
  return (
    <div
      className={clsx(
        "max-w-[18.5rem] w-full rounded-[20px] bg-[#1D1407] border border-[#F7931A0D] overflow-hidden"
      )}
    >
      <div className="h-[78px] relative w-full bg-[radial-gradient(ellipse_at_center, #FFCD4D, #83C2E9)]">
        <Image
          alt="Cover Image"
          src="https://images.unsplash.com/photo-1730456588662-3d95038308f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-fit "
          fill={true}
        />
      </div>
      <ProjectCardStatus status={status} />
    </div>
  );
});

export default LaunchPadProjectCard;
