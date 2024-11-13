import React from "react";
import { Button } from "../button";

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
}: {
  step: number;
  title: string;
  buttonTitle: string;
}) => {
  return (
    <div className="py-5 px-7 flex flex-col gap-4 items-center bg-[#211708] border border-[#F7931A1A] rounded-[20px]">
      <div className="text-[12px] leading-4">Step {step}</div>
      <div>{title}</div>
      <div className="w-36 h-[2px] bg-[#37240A]" />
      <Button
        styleMode="plain"
        className="rounded-full outline-0 border-0"
        disabled={true}
      >
        {buttonTitle}
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
              title={"Approve USDC"}
              buttonTitle="Approve"
            />
            <ApprovalsCard
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
