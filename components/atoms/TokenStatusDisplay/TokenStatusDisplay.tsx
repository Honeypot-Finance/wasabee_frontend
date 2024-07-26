import { cn } from "@/lib/tailwindcss";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { observer } from "mobx-react-lite";

interface TokenStatusDisplayProps {
  pair: FtoPairContract | null | undefined;
}

export const TokenStatusDisplay = observer(
  ({ pair }: TokenStatusDisplayProps) => {
    return (
      <div className="flex absolute top-[9px] right-2.5 flex-col gap-[5px] ">
        <div
          className={cn(
            "flex px-[8px] h-[29px] justify-center items-center gap-[5px]  rounded-[20px] ",
            pair?.ftoStatusDisplay?.color
          )}
        >
          <div className="rounded-full bg-current w-2 h-2"></div>
          <span className="text-ss  text-current">
            {pair?.ftoStatusDisplay?.status}
          </span>
        </div>{" "}
        {pair?.isValidated && (
          <div
            className={cn(
              "flex px-[8px] h-[29px] justify-center items-center gap-[5px] rounded-[20px]  bg-[#4bbdea58] text-white"
            )}
          >
            <div className="rounded-full bg-current w-2 h-2"></div>
            <span className="text-ss  text-current">Validated</span>
          </div>
        )}
      </div>
    );
  }
);

export default TokenStatusDisplay;
