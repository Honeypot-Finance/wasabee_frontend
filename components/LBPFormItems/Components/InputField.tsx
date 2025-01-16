import CheckedIcon from "@/components/svg/CheckedIcon";
import ErrorIcon from "@/components/svg/ErrorIcon";
import { cn } from "@/lib/tailwindcss";
import { Input, InputProps } from "@nextui-org/react";

const InputField = ({ className, classNames, ...props }: InputProps) => {
  return (
    <Input
      size="lg"
      labelPlacement="outside"
      classNames={{
        label: "!font-normal !text-base top-[20px] !leading-[19.2px] !text-[#202020] !opacity-80 !left-0",
        inputWrapper:
          "bg-white border h-[64px] border-black text-black px-4 data-[hover=true]:bg-white group-data-[focus=true]:bg-white",
        input: "text-xl text-[#202020] group-data-[has-value=true]:text-[#202020]/80",
        mainWrapper: "relative",
        helperWrapper: "absolute right-0 bottom-full text-sm text-[#D53F3F] leading-[16.8px] ",
        ...classNames,
      }}
      className={cn("w-full", className)}
      endContent={
        props.isInvalid ? <ErrorIcon /> : props.value ? <CheckedIcon /> : null
      }
      {...props}
    />
  );
};

export default InputField;
