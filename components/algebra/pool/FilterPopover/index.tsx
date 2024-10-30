import { usePositionFilterStore } from "@/services/algebra/state/positionFilterStore";
import { PositionsStatus } from "@/types/algebra/types/position-filter-status";
import { cn } from "@nextui-org/theme";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Switch } from "../../ui/switch";

const FilterPopover = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    filterStatus,
    actions: { setFilterStatus },
  } = usePositionFilterStore();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          size={"md"}
          className={cn(
            "bg-transparent border border-card-border/60",
            isOpen && "bg-card"
          )}
          aria-label="Update dimensions"
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={5}>
        <div className="flex flex-col gap-2">
          <label className="flex justify-between items-center">
            Open
            <Switch
              id="Open"
              checked={Boolean(filterStatus[PositionsStatus.OPEN])}
              onCheckedChange={() => setFilterStatus(PositionsStatus.OPEN)}
            />
          </label>
          <label className="flex justify-between items-center">
            On Farming
            <Switch
              id="On Farming"
              checked={Boolean(filterStatus[PositionsStatus.ON_FARMING])}
              onCheckedChange={() =>
                setFilterStatus(PositionsStatus.ON_FARMING)
              }
            />
          </label>
          <label className="flex justify-between items-center">
            Closed
            <Switch
              id="Closed"
              checked={Boolean(filterStatus[PositionsStatus.CLOSED])}
              onCheckedChange={() => setFilterStatus(PositionsStatus.CLOSED)}
            />
          </label>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
