import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { observer } from "mobx-react-lite";
import { LaunchDetailSwapCard } from "@/components/SwapCard/MemeSwap";

interface PumpingModalProps {
  pair: MemePairContract | FtoPairContract;
}
export const PumpingModal = observer(
  ({ pair, ...props }: PumpingModalProps) => {
    return (
      <LaunchDetailSwapCard
        noBoarder
        memePairContract={pair as unknown as MemePairContract}
        inputAddress={pair.raiseToken?.address ?? ""}
        outputAddress={pair.launchedToken?.address ?? ""}
      />
    );
  }
);
