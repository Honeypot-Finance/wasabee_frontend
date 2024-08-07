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
  name: string | JSX.Element;
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
        <Button className="absolute left-[0.5rem] top-[0.5rem] bg-transparent min-w-0">
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
            startContent={option.icon}
          >
            {option.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
