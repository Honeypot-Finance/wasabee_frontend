import { cn } from "@/lib/tailwindcss";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { observer } from "mobx-react-lite";

interface TokenStatusDisplayProps {
  pair: FtoPairContract | null | undefined;
}

export const TokenStatusDisplay = observer(
  ({ pair }: TokenStatusDisplayProps) => {
    return (
      <div
        className={cn(
          "flex px-[8px] h-[29px] justify-center items-center gap-[5px] absolute  rounded-[20px] right-2.5 top-[9px]",
          pair?.ftoStatusDisplay?.color
        )}
      >
        <div className="rounded-full bg-current w-2 h-2"></div>
        <span className="text-ss  text-current">
          {pair?.ftoStatusDisplay?.status}
        </span>
      </div>
    );
  }
);

export default TokenStatusDisplay;
