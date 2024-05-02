import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { DropdownSvg } from "../svg/dropdown";
import { observer, useLocalObservable } from "mobx-react-lite";
import { HTMLAttributes } from "react";
import clsx from "clsx";

const SelectItem = ({ children, className, ...props }: { children: React.ReactNode } & HTMLAttributes<any>) => {
  return (
    <div className={clsx("flex h-[30px] px-[8px] flex-col justify-center items-center shrink-0 [background:#523914] rounded-lg", className)} {...props}>{children}</div>
  );
};

export const Slippage = observer(
  ({ onSelect, ...props }: { onSelect: (value: number) => void } & Partial<PopoverProps>) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const state = useLocalObservable(() => ({
      value: 0,
    }));
    return (
      <Popover
        isOpen={isOpen}
        onOpenChange={(isOpen) => {
          isOpen ? onOpen() : onClose();
        }}
        placement="bottom"
        classNames={{
          base: [
            // arrow color
            "before:bg-default-200",
          ],
          content: [
            "py-3 px-4 border border-default-200",
            "bg-gradient-to-br from-white to-default-300",
            "dark:from-default-100 dark:to-default-50",
          ],
        }}
        {...props}
      >
        <PopoverTrigger>
          <Button className="inline-flex h-10 justify-between items-center shrink-0 [background:rgba(247,147,26,0.05)] px-[14.369px] py-[7.184px] rounded-[30px] border-solid border-[rgba(247,147,26,0.10)]">
            {`Slippage  ${state.value}%`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex max-w-full flex-col items-center gap-4 border border-[color:var(--card-stroke,#F7931A)] [background:var(--card-color,#271A0C)] rounded-xl border-solid">
          {(titleProps) => (
            <div className="w-full flex flex-col gap-[12px]">
              <div className="text-[#D9D7E0]  text-md font-bold leading-[normal]">Setting</div>
              <div className="flex items-center">
                <div className="text-[color:var(--Neutral-300,#D9D7E0)] text-xs font-normal leading-[normal]">Slippage</div>
                <div className="flex gap-[5px] ml-[24px]">
                  <SelectItem>0.01%</SelectItem>
                  <SelectItem>0.5%</SelectItem>
                  <SelectItem>
                    <Input></Input>
                  </SelectItem>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-[color:var(--Neutral-300,#D9D7E0)] text-xs font-normal leading-[normal]">Transaction Deadline</div>
                <SelectItem className="ml-[12px]">
                  <Input></Input>
                </SelectItem>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }
);
