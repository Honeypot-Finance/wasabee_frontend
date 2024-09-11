import { DatePickerProps, DatePicker } from "@nextui-org/react";

export function WrappedNextDatePicker(props: DatePickerProps) {
  return (
    <DatePicker
      {...props}
      classNames={{
        calendarContent: "bg-[#271A0C]",
        ...props.classNames,
      }}
      calendarProps={{
        classNames: {
          base: "bg-[#271A0C] text-white",
          pickerWrapper: "bg-[#271A0C]",
          cellButton: "bg-[#271A0C] text-white",
          ...props.calendarProps?.classNames,
        },
      }}
      timeInputProps={{
        classNames: {
          base: "bg-[#271A0C] text-white",
          ...props.timeInputProps?.classNames,
        },
      }}
    ></DatePicker>
  );
}
