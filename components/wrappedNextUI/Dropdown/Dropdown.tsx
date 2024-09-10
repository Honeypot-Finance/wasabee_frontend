import {
  Dropdown,
  DropdownMenu,
  DropdownMenuProps,
  DropdownProps,
} from "@nextui-org/react";

export function WarppedNextDropdownMenu(props: DropdownMenuProps) {
  return (
    <DropdownMenu
      classNames={{
        base: "bg-[#271A0C] border-0",
      }}
      {...props}
    />
  );
}

export function WarppedNextDropdown(props: DropdownProps) {
  return (
    <Dropdown
      classNames={{
        base: "bg-[#271A0C] border-0",
      }}
      {...props}
    />
  );
}
