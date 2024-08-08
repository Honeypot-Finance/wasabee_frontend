import { cn } from "@/lib/tailwindcss";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { SlOptions } from "react-icons/sl";

type optionItem = {
  icon: JSX.Element;
  display: string | JSX.Element;
  onClick?: () => void;
};

interface OptionsDropdownProps {
  className?: string;
  options: optionItem[];
}

export function OptionsDropdown(props: OptionsDropdownProps) {
  return (
    <Dropdown className="text-3xl">
      <DropdownTrigger>
        <Button className={cn("bg-transparent min-w-0", props.className)}>
          <SlOptions
            size={20}
            className="cursor-pointer hover:text-[#F7931A]"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        {props.options.map((option, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              option.onClick && option.onClick();
            }}
            onTouchStart={() => {
              option.onClick && option.onClick();
            }}
            startContent={option.icon}
          >
            {option.display}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
