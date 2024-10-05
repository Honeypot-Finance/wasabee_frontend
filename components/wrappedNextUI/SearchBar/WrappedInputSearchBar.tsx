import { cn, Input, InputProps } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";

interface WarppedNextInputSearchBarProps extends InputProps {}

export function WarppedNextInputSearchBar({
  classNames,
  className,
  ...props
}: WarppedNextInputSearchBarProps) {
  return (
    <Input
      startContent={<IoSearchOutline></IoSearchOutline>}
      placeholder="Search by name, symbol or address"
      className={cn(
        "border [background:var(--card-color,#271A0C)] rounded-2xl border-solid border-[rgba(225,138,32,0.10)]",
        className
      )}
      classNames={{
        inputWrapper: cn(
          "bg-transparent flex-1 data-[hover=true]:bg-transparent data-[focus=true]:!bg-transparent",
          classNames?.inputWrapper
        ),
        ...classNames,
      }}
      {...props}
    ></Input>
  );
}
