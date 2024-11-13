import CheckedIcon from "@/components/svg/CheckedIcon";
import ErrorIcon from "@/components/svg/ErrorIcon";
import { cn } from "@/lib/tailwindcss";
import { Input, InputProps } from "@nextui-org/react";

const InputField = ({ className, classNames, ...props }: InputProps) => {
  return (
    <Input
      size="md"
      labelPlacement="outside"
      classNames={{
        label: "text-white text-base",
        inputWrapper:
          "bg-bistre/80 rounded-xl border border-[#F7931AA8] group-data-[focus=true]:bg-[#3E2A0F] data-[hover=true]:bg-[#3E2A0F]",
        mainWrapper: "relative",
        helperWrapper: "absolute -top-1 -translate-y-full right-0",
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
