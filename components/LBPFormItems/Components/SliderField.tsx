/* eslint-disable @next/next/no-img-element */
import { Slider, SliderProps } from "@nextui-org/react";
import NumberField from "./NumberField";

type SliderFieldProps = {
  label: string;
  firstTokenIcon?: string;
  firstTokenName?: string;
  secondTokenIcon?: string;
  secondTokenName?: string;
} & SliderProps;

const SliderField = (props: SliderFieldProps) => {
  const {
    label,
    firstTokenIcon,
    firstTokenName,
    secondTokenIcon,
    secondTokenName,
    ...rest
  } = props;
  return (
    <div>
      <label className="text-xs text-white/50">{label}</label>
      <div className="w-full flex items-center justify-between mt-2">
        {firstTokenName && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={firstTokenIcon}
                alt={firstTokenName}
                width={18}
                height={18}
              />
              <span className="text-sm">{firstTokenName}</span>
            </div>
            <NumberField
              className="w-16 h-8"
              classNames={{
                inputWrapper: "min-h-8",
              }}
              suffix="%"
              isAllowed={(values) => {
                const { floatValue } = values;
                const value = floatValue || 0;
                return 0 <= value && value <= 100;
              }}
              value={Number(rest.value)}
              onValueChange={(values) => {
                rest.onChange?.(values.floatValue || 0);
              }}
            />
          </div>
        )}

        {secondTokenName && (
          <div className="flex items-center gap-3">
            <NumberField
              className="w-16 h-8"
              classNames={{
                inputWrapper: "min-h-8",
              }}
              suffix="%"
              isAllowed={(values) => {
                const { floatValue } = values;
                const value = floatValue || 0;
                return 0 <= value && value <= 100;
              }}
              value={100 - Number(rest.value)}
              onValueChange={(values) => {
                rest.onChange?.(100 - (values.floatValue || 0));
              }}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm">{secondTokenName}</span>
              <img
                src={secondTokenIcon}
                alt={secondTokenName}
                width={18}
                height={18}
              />
            </div>
          </div>
        )}
      </div>
      <Slider
        size="md"
        step={1}
        minValue={0}
        maxValue={100}
        aria-label={label}
        classNames={{
          track: "h-2 border-s-[#8c5b21]",
          filler: "bg-[#8c5b21]",
          thumb: "bg-[#8c5b21] after:bg-white after:w-3 after:h-3",
        }}
        className="mt-2"
        {...rest}
      />
    </div>
  );
};

export default SliderField;
