import { DatePickerProps, DatePicker } from "@nextui-org/react";

const DatePickerField = (props: DatePickerProps) => {
  return (
    <div className="date-picker-wrapper">
      <DatePicker
        classNames={{
          calendarContent: "bg-bistre",
          calendar: "date-picker-calendar",
          ...props.classNames,
        }}
        timeInputProps={{
          classNames: {
            base: "bg-bistre text-white",
            inputWrapper: "bg-bistre",
            ...props.timeInputProps?.classNames,
          },
        }}
        variant="bordered"
        hideTimeZone
        showMonthAndYearPickers
        className="w-fit mt-3"
        labelPlacement="outside"
        {...props}
      ></DatePicker>
    </div>
  );
};

export default DatePickerField;
