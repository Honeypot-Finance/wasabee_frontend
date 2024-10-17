import { SelectItemProps, SelectProps } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";

export function WarppedNextSelect<T extends object>(props: SelectProps<T>) {
  return (
    <Select
      {...props}
      classNames={{
        popoverContent: "bg-[#271A0C] brightness-150",
        ...props.classNames,
      }}
    />
  );
}
