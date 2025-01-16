import { Select, SelectProps } from "@nextui-org/react";
import { cn } from "@/lib/tailwindcss";

const SelectField = <T extends object>(props: SelectProps<T>) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="font-normal text-base leading-[19.2px] text-[#202020] opacity-80">{props.label}</label>
      <Select
        aria-label="Select"
        classNames={{
          trigger:
            "bg-white h-[64px] border border-black text-black px-4",
          selectorIcon: 'right-4',
          value: '!text-[#202020] text-[20px] leading-[24px] !text-opacity-100',
        }}

        className={cn("min-w-40", props.className)}
        {...props}
        label={undefined}
      />
    </div>
  );
};

export default SelectField;
