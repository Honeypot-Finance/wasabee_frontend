import React from "react";
import { DateValue, SelectItem } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
} from "@internationalized/date";
import { DatePickerField, NumberField, SelectField } from "./Components";
import { LBP_TYPE, PRICE_TYPE } from "@/types/launch-project";
import dayjs from "dayjs";

const PRICE_TYPE_OPTIONS = [
  { key: "lbp", value: PRICE_TYPE.LBP, label: "LBP" },
  // { key: "fixed", value: PRICE_TYPE.FIXED, label: "Fixed Price" },
];

const LBP_TYPE_OPTIONS = [
  { key: "buy-sell", value: LBP_TYPE.BUY_SELL, label: "Buy & Sell" },
  { key: "buy-only", value: LBP_TYPE.SELL_ONLY, label: "Buy Only" },
];

const SalesStructure = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const isPriceLbp = watch("priceType") === PRICE_TYPE.LBP;

  return (
    <div>
      <div className="text-xl leading-[26px] font-medium">Sales Structure</div>
      <div className="flex flex-col mt-9 gap-9">
        <div className="flex flex-col">
          <div className="text-base leading-5 font-medium">Sale price type</div>
          <div className="mt-2 font-medium text-[12px] leading-4 text-white/50">
            Choose between an LBP or a Fixed Price Sale
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <Controller
              name="priceType"
              control={control}
              render={({ field }) => (
                <SelectField
                  items={PRICE_TYPE_OPTIONS}
                  className="w-44"
                  selectedKeys={[field.value]}
                  disallowEmptySelection
                  onChange={(e) => field.onChange(e.target.value)}
                  isInvalid={!!errors.priceType}
                  errorMessage={errors.priceType?.message?.toString()}
                >
                  {PRICE_TYPE_OPTIONS.map((price) => (
                    <SelectItem key={price.key} value={price.value}>
                      {price.label}
                    </SelectItem>
                  ))}
                </SelectField>
              )}
            />
            {isPriceLbp && (
              <Controller
                name="lbpType"
                control={control}
                defaultValue={LBP_TYPE.BUY_SELL}
                render={({ field }) => (
                  <SelectField
                    items={LBP_TYPE_OPTIONS}
                    className="w-44"
                    selectedKeys={field.value ? [field.value] : undefined}
                    onChange={(e) => field.onChange(e.target.value)}
                    isInvalid={!!errors.lbpType}
                    errorMessage={errors.lbpType?.message?.toString()}
                    disallowEmptySelection
                  >
                    {LBP_TYPE_OPTIONS.map((price) => (
                      <SelectItem key={price.key} value={price.value}>
                        {price.label}
                      </SelectItem>
                    ))}
                  </SelectField>
                )}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base leading-5 font-medium">
            Configure Duration
          </div>

          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <DatePickerField
                label="Starting Date & Time"
                minValue={today(getLocalTimeZone())}
                value={parseAbsoluteToLocal(field.value.toISOString())}
                onChange={(value: DateValue | null) => {
                  if (value) {
                    field.onChange(value.toDate(getLocalTimeZone()));
                  }
                }}
                isInvalid={!!errors?.startTime}
                errorMessage={errors?.startTime?.message?.toString()}
              />
            )}
          />

          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <DatePickerField
                label="Ending Date & Time"
                minValue={today(getLocalTimeZone())}
                value={parseAbsoluteToLocal(field.value.toISOString())}
                onChange={(value: DateValue | null) => {
                  if (value) {
                    field.onChange(value.toDate(getLocalTimeZone()));
                  }
                }}
                isInvalid={!!errors?.endTime}
                errorMessage={errors?.endTime?.message?.toString()}
              />
            )}
          />
        </div>

        <div>
          <h3>Token Claim Delay</h3>
          <p className="text-white opacity-50 text-xs">
            {isPriceLbp
              ? "How much maximum you want to raise. The Sale will conclude once this number is reached."
              : "You can select to delay users claiming tokens at the conclusion of the sale to avoid front running of setting up liquidity pools. Select a time on the calendar that users can begin claiming tokens after the sale has concluded. "}
          </p>

          {isPriceLbp && (
            <div className="flex flex-col gap-3 mt-5">
              <Controller
                name="tokenClaimDelayHours"
                control={control}
                render={({ field }) => (
                  <NumberField
                    value={field.value}
                    onValueChange={(values) =>
                      field.onChange(Number(values.floatValue))
                    }
                    label="Hours"
                    placeholder="0"
                    isInvalid={!!errors?.tokenClaimDelayHours}
                    errorMessage={errors?.tokenClaimDelayHours?.message?.toString()}
                  />
                )}
              />
              <Controller
                name="tokenClaimDelayMinutes"
                control={control}
                render={({ field }) => (
                  <NumberField
                    value={field.value}
                    onValueChange={(values) =>
                      field.onChange(Number(values.floatValue))
                    }
                    label="Minutes"
                    placeholder="0"
                    isInvalid={!!errors?.tokenClaimDelayMinutes}
                    errorMessage={errors?.tokenClaimDelayMinutes?.message?.toString()}
                  />
                )}
              />
            </div>
          )}

          {!isPriceLbp && (
            <Controller
              name="tokenClaimDelay"
              control={control}
              render={({ field }) => (
                <DatePickerField
                  value={parseAbsoluteToLocal(field.value.toISOString())}
                  onChange={(value: DateValue | null) => {
                    field.onChange(value?.toDate(getLocalTimeZone()));
                  }}
                  isInvalid={!!errors?.tokenClaimDelay}
                  errorMessage={errors?.tokenClaimDelay?.message?.toString()}
                />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesStructure;
