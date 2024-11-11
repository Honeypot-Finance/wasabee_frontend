import { Select, SelectProps } from "@nextui-org/react";
import { cn } from "@/lib/tailwindcss";

const SelectField = <T extends object>(props: SelectProps<T>) => {
  return (
    <div className="flex flex-col gap-2 w-fit">
      <label className="font-medium text-base leading-5">{props.label}</label>
      <Select
        size="md"
        classNames={{
          trigger:
            "bg-bistre/80 rounded-xl border border-[#F7931AA8] data-[hover=true]:bg-bistre/80",
          listboxWrapper: "bg-bistre/80",
          popoverContent: "bg-[#35230E]",
          label: "text-white text-base text-left text-nowrap",
        }}
        className={cn("min-w-40", props.className)}
        {...props}
        label={undefined}
      />
    </div>
  );
};

export default SelectField;
