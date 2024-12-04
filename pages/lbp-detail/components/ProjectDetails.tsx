import { useState } from "react";
import { observer } from "mobx-react-lite";
import TokenInfo, { TokenInfoProps } from "./TokenInfo";
import CardContianer from "@/components/CardContianer/CardContianer";

const universalMenuItems = [
  { label: "Token Info", key: "info" },
  { label: "About the Project", key: "about" },
  { label: "Transactions", key: "txs" },
];

interface ProjectDetailsProps extends TokenInfoProps {}

const ProjectDetails = observer(
  ({ token, tokenAddress }: ProjectDetailsProps) => {
    const [tab, setTab] = useState(universalMenuItems[0].key);
    return (
      <>
        <div className="hidden sm:flex items-center gap-x-1 md:text-xs ml-3">
          {universalMenuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={[
                "px-2 md:px-8 pt-2 pb-1 rounded-t-2xl",
                tab === item.key
                  ? "bg-[#9D5E28] text-white"
                  : "bg-[#3B2712] text-[#A46617]",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </div>
        <CardContianer addtionalClassName="block">
          {tab === "info" && (
            <TokenInfo token={token} tokenAddress={tokenAddress} />
          )}

          {tab === "about" && (
            <TokenInfo token={token} tokenAddress={tokenAddress} />
          )}

          {tab === "txs" && (
            <TokenInfo token={token} tokenAddress={tokenAddress} />
          )}
        </CardContianer>
      </>
    );
  }
);

export default ProjectDetails;
