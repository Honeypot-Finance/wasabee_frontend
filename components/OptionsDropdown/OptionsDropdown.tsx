import { cn } from "@/lib/tailwindcss";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { SlOptions } from "react-icons/sl";
import { VscCopy } from "react-icons/vsc";
import { toast } from "react-toastify";

type optionItem = {
  icon: JSX.Element;
  display: string | JSX.Element;
  onClick?: () => void;
};

interface OptionsDropdownProps {
  className?: string;
  options: optionItem[];
}

export const optionsPresets = {
  copy: (copyText: string, displayText?: string, copysSuccessText?: string) => {
    return {
      icon: <VscCopy />,
      display: displayText ?? "Copy",
      onClick: () => {
        const c = copy(copyText);
        if (c) {
          toast.success(copysSuccessText ?? "Copied");
        } else {
          toast.error("Failed to copy");
        }
        // navigator.clipboard
        //   .write([
        //     new ClipboardItem({
        //       "text/plain": new Promise((resolve) => {
        //         resolve(
        //           new Blob([copyText], {
        //             type: "text/plain",
        //           })
        //         );
        //       }),
        //     }),
        //   ])
        //   .then(() => {
        //     toast.success(copysSuccessText ?? "Copied");
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //     toast.error("Failed to copy");
        //   });
      },
    };
  },
};

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
