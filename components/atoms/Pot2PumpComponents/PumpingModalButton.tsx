import { observer } from "mobx-react-lite";
import { Button } from "@/components/button/button-next";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { popmodal } from "@/services/popmodal";
import { PumpingModal } from "./PumpingModal";
import { cn } from "@/lib/utils";

interface PumpingModalButtonProps {
  pair: MemePairContract | FtoPairContract;
  className?: string;
}

export const PumpingModalButton = observer(
  ({ pair, className, ...props }: PumpingModalButtonProps) => {
    const handleClick = () => {
      popmodal.openModal({
        content: <PumpingModal pair={pair} {...props} />,
        boarderLess: true,
      });
    };

    return (
      <Button
        onPress={handleClick}
        className={cn(className, "border-yellow-500")}
      >
        Pumping
      </Button>
    );
  }
);

export default PumpingModalButton;
