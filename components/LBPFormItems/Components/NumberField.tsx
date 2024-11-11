import { Input, InputProps } from "@nextui-org/react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

type NumberFieldProps = NumericFormatProps<InputProps>;

const NumberField = ({ className, classNames, ...props }: NumberFieldProps) => {
  return (
    <NumericFormat
      customInput={Input}
      placeholder="0"
      labelPlacement="outside"
      classNames={{
        label: "text-white text-xs opacity-50",
        input: "font-semibold flex-1",
        inputWrapper:
          "bg-[#3E2A0FC4] rounded-xl border border-[#F7931AA8] group-data-[focus=true]:bg-[#3E2A0F] data-[hover=true]:bg-[#3E2A0F]",
        ...classNames,
      }}
      className={className}
      allowNegative={false}
      thousandSeparator=","
      {...props}
    />
  );
};

export default NumberField;
