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
        label: cn("text-white text-xs opacity-50", classNames?.label),
        input: cn("font-semibold flex-1", classNames?.input),
        inputWrapper: cn(
          "bg-[#3E2A0FC4] rounded-xl border border-[#F7931AA8] group-data-[focus=true]:bg-[#3E2A0F] data-[hover=true]:bg-[#3E2A0F]",
          classNames?.inputWrapper
        ),
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
