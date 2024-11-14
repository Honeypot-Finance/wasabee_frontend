import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { REVIEW_RIGHT } from "@/types/launch-project";
import { useReadContract } from "wagmi";
import { ERC20ABI } from "@/lib/abis/erc20";
import dayjs from "dayjs";

const EditBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="text-end text-white/50 text-xs leading-4 flex items-center justify-end">
      <div
        className="flex items-center gap-1.5 hover:cursor-pointer px-2 py-1 rounded-full hover:bg-white/20"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            opacity="0.5"
            d="M11.6597 2.16094L9.84048 0.340328C9.62051 0.12036 9.32861 0 9.01871 0C8.70744 0 8.41553 0.12036 8.19695 0.340328L0.576934 7.95896C0.504994 8.0309 0.457957 8.12497 0.444123 8.22596L0.00418737 11.4701C-0.0151809 11.6154 0.0332397 11.7607 0.136998 11.863C0.225538 11.9516 0.344515 12 0.467641 12C0.488393 12 0.509145 11.9986 0.529896 11.9958L3.77407 11.5559C3.87507 11.5421 3.96914 11.495 4.04108 11.4231L11.6583 3.80586C11.8783 3.58589 11.9987 3.29398 11.9987 2.98409C12 2.67282 11.8797 2.38091 11.6597 2.16094ZM3.49185 10.6498L1.01272 10.9859L1.3489 8.5068L6.7471 3.1086L8.89005 5.25156L3.49185 10.6498ZM10.9984 3.14457L9.55134 4.59165L7.40977 2.4487L8.85547 1.00161C8.91357 0.94351 8.98136 0.935209 9.01733 0.935209C9.0533 0.935209 9.12109 0.94351 9.17919 1.00161L10.9984 2.82084C11.0565 2.87895 11.0648 2.94674 11.0648 2.98271C11.0648 3.01868 11.0565 3.08647 10.9984 3.14457Z"
            fill="white"
          />
        </svg>
        <span>Edit</span>
      </div>
    </div>
  );
};

const Content = ({
  title,
  value,
  valueClassName,
  isLoading,
}: {
  title: string;
  value?: string;
  valueClassName?: string;
  isLoading?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base leading-5 font-medium">{title}</div>
      <div
        className={clsx(
          "font-medium text-[12px] leading-4 text-white/50",
          valueClassName
        )}
      >
        {value}
      </div>
      {isLoading && (
        <div className="animate-pulse bg-neutral-400 h-2.5 w-10 rounded-full"></div>
      )}
    </div>
  );
};

const Review = ({ changeStep }: { changeStep: (step: number) => void }) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  console.log(getValues())

  const {projectTokenQuantity,assetTokenName, endWeight,startWeight, endTime,startTime} = getValues()

  const projectToken = watch("projectToken");

  const duration = (dayjs(endTime).unix() - dayjs(startTime).unix()) / 86400;

  const { data: projectTokenName, isLoading } = useReadContract({
    abi: ERC20ABI,
    address: projectToken,
    functionName: "name",
  });

  const { data: projectTokenSym, isLoading: isLoadingSymbol} = useReadContract({
    abi: ERC20ABI,
    address: projectToken,
    functionName: "symbol",
  });

  return (
    <div className="flex flex-col gap-[38px] max-w-[752px]">
      <div className="font-medium">
        <div className="text-xl leading-[26px]">Token Sale Summary</div>
        <div className="text-[12px] leading-4 text-white/50">
          Please review all aspects before finishing
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <EditBtn onClick={() => changeStep(0)} />
        <Content
          title={"Project Token Contract Address"}
          value={projectToken}
        />
        <div className="flex">
          <div className="flex-1">
            <Content
              title={"Token Name"}
              value={projectTokenName}
              isLoading={isLoading}
            />
          </div>
          <div className="flex-1">
            <Content title={"Token Ticker"} value={projectTokenSym} isLoading={isLoadingSymbol}/>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <EditBtn onClick={() => changeStep(2)} />
        <div className="flex gap-8">
          <Content title={"Project Token Quantity"} value={`${projectTokenQuantity} ${projectTokenSym}`} />
          {/* <Content title={"Collateral Token Quantity"} value={"10M DAI "} /> */}
        </div>
        <div className="flex gap-8">
          <Content
            title={"Price Range"}
            value={""}
          />
          <Content title={"Liquidity"} value={"1"} />
        </div>
        <div className="flex gap-8">
          <Content title={"Starting Weigh"} value={`${startWeight}% ${projectTokenSym} ${100 - startWeight}% ${assetTokenName}`} />
          <Content title={"End Weight"} value={`${endWeight}% ${projectTokenSym} ${100 - endWeight}% ${assetTokenName}`} />
        </div>
        <div className="flex gap-8">
          <Content title={"Token Claim Time"} value={"2024/10/31 00:00:00"} />
        </div>
        <div className="flex gap-8">
          <Content title={"Start Time"} value={"10/24/2024,12:00 AM"} />
          <Content title={"End Time"} value={"10/31/2024,12:00 AM"} />
          <Content title={"Duration"} value={`in${duration}days`} />
        </div>
        <div className="flex gap-8">
          <Content title={"Platform Fee"} value={"0.3%"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <EditBtn onClick={() => changeStep(4)} />
        <Content
          title={"Description"}
          value={"123qweddddasd"}
          valueClassName="!text-white"
        />
        <div className="mt-[10px]">
          <div className="text-base leading-5 font-medium ">Rights</div>
          <Controller
            name="rights"
            control={control}
            render={({ field }) => (
              <CheckboxGroup
                label="Select rights"
                value={field.value}
                onValueChange={(values) => field.onChange(values)}
              >
                <Checkbox
                  value={REVIEW_RIGHT.PAUSE_LBP}
                  radius="sm"
                  classNames={{
                    wrapper: "group-data-[selected=true]:after:bg-[#865215]",
                    icon: "text-black",
                  }}
                >
                  Pause LBP
                </Checkbox>
                <Checkbox
                  value={REVIEW_RIGHT.UNPAUSE_LBP}
                  radius="sm"
                  classNames={{
                    wrapper: "group-data-[selected=true]:after:bg-[#865215]",
                    icon: "text-black",
                  }}
                >
                  Unpause LBP
                </Checkbox>
              </CheckboxGroup>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
