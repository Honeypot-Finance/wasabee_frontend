import { Input, InputProps } from "@nextui-org/react";

export const SwapAmount = ({
    label,
    inputProps,
  }: {
    label: string;
    inputProps?: InputProps;
  }) => {
    return (
      <div>
        <div className="text-sub text-sm font-normal leading-3 tracking-[0.14px]">
          {label}
        </div>
        <Input
          type="number"
          placeholder="0.0"
          classNames={{
            inputWrapper: "bg-transparent",
          }}
          className="mt-[8px] text-white text-right text-[21px] font-bold leading-6 placeholder:text-[rgba(255,255,255,0.50)]"
          {...inputProps}
        />
      </div>
    );
  };