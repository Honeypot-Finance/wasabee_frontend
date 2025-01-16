import { Input, InputProps } from "@nextui-org/react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { cn } from "@/lib/tailwindcss";

type NumberFieldProps = NumericFormatProps<InputProps>;

const NumberField = ({ className, classNames, ...props }: NumberFieldProps) => {
  return (
    <NumericFormat
      customInput={Input}
      placeholder="0"
      labelPlacement="outside"
      classNames={{
        label: "!font-normal !text-base top-[20px] !leading-[19.2px] !text-[#202020] !opacity-80 !left-0",
        input: "text-xl text-[#202020] group-data-[has-value=true]:text-[#202020]/80",
        inputWrapper:
          "bg-white border h-[64px] border-black text-black px-4 data-[hover=true]:bg-white group-data-[focus=true]:bg-white shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)]",
        base: cn(classNames?.base),
        clearButton: cn(classNames?.clearButton),
        description: cn(classNames?.description),
        errorMessage: cn(classNames?.errorMessage),
        helperWrapper: cn(classNames?.helperWrapper),
        innerWrapper: cn(classNames?.innerWrapper),
        mainWrapper: cn(classNames?.mainWrapper),
      }}
      className={className}
      allowNegative={false}
      thousandSeparator=","
      {...props}
    />
  );
};

export default NumberField;
