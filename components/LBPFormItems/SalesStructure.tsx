import React from "react";
import SelectField from "./Components/SelectField";
import { DateValue, Input, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
} from "@internationalized/date";
import { WrappedNextDatePicker } from "../wrappedNextUI/DatePicker/DatePicker";
import { NumericFormat } from "react-number-format";

enum PRICE_TYPE {
  LBP = "lbp",
  FIXED = "fixed",
}

enum LBP_TYPE {
  BUY_SELL = "buy-sell",
  SELL_ONLY = "sell-only",
}

const PRICE_TYPE_OPTIONS = [
  { key: "lbp", value: PRICE_TYPE.LBP, label: "LBP" },
  { key: "fixed", value: PRICE_TYPE.FIXED, label: "Fixed Price" },
];

const LBP_TYPE_OPTIONS = [
  { key: "buy-sell", value: LBP_TYPE.BUY_SELL, label: "Buy & Sell" },
  { key: "sell-only", value: LBP_TYPE.SELL_ONLY, label: "Sell Only" },
];

type SalesStructureForm = {
  priceType: PRICE_TYPE;
  lbpType?: LBP_TYPE;
  startTime: Date;
  endTime: Date;
  tokenClaimDelayHours?: number;
  tokenClaimDelayMinutes?: number;
  tokenClaimDelay: Date;
};

const SalesStructure = () => {
  const salesStructureSchema = yup.object().shape({
    priceType: yup
      .mixed<PRICE_TYPE>()
      .oneOf(Object.values(PRICE_TYPE))
      .required("Price type is required"),
    lbpType: yup.mixed<LBP_TYPE>(),
    startTime: yup.date().required("Start time is required"),
    endTime: yup.date().required("End time is required"),
    tokenClaimDelayHours: yup.number(),
    tokenClaimDelayMinutes: yup.number(),
    tokenClaimDelay: yup.date().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<SalesStructureForm>({
    resolver: yupResolver(salesStructureSchema),
    defaultValues: {
      priceType: PRICE_TYPE.LBP,
      lbpType: undefined,
      startTime: new Date(),
      endTime: new Date(),
      tokenClaimDelayHours: undefined,
      tokenClaimDelayMinutes: undefined,
      tokenClaimDelay: new Date(),
    },
  });

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
                  onChange={(e) => field.onChange(e.target.value)}
                  isInvalid={!!errors.priceType}
                  errorMessage={errors.priceType?.message}
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
                render={({ field }) => (
                  <SelectField
                    items={LBP_TYPE_OPTIONS}
                    className="w-44"
                    selectedKeys={field.value ? [field.value] : undefined}
                    onChange={(e) => field.onChange(e.target.value)}
                    isInvalid={!!errors.lbpType}
                    errorMessage={errors.lbpType?.message}
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
              <WrappedNextDatePicker
                label="Starting Date & Time"
                variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                className="w-fit mt-3"
                labelPlacement="outside"
                value={parseAbsoluteToLocal(field.value.toISOString())}
                onChange={(value: DateValue) => {
                  setValue("startTime", value.toDate(getLocalTimeZone()));
                }}
              />
            )}
          />

          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <WrappedNextDatePicker
                label="Ending Date & Time"
                variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                className="w-fit mt-3"
                labelPlacement="outside"
                value={parseAbsoluteToLocal(field.value.toISOString())}
                onChange={(value: DateValue) => {
                  setValue("endTime", value.toDate(getLocalTimeZone()));
                }}
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
                  <NumericFormat
                    customInput={Input}
                    value={field.value}
                    onValueChange={(values) =>
                      field.onChange(Number(values.floatValue))
                    }
                    label="Hours"
                    placeholder="0"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-white text-xs opacity-50",
                      input: "font-semibold",
                      inputWrapper:
                        "bg-[#3E2A0FC4] rounded-xl border border-[#F7931AA8] group-data-[focus=true]:bg-[#3E2A0F] data-[hover=true]:bg-[#3E2A0F]",
                    }}
                    allowNegative={false}
                    thousandSeparator=","
                  />
                )}
              />
              <Controller
                name="tokenClaimDelayMinutes"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    customInput={Input}
                    value={field.value}
                    onValueChange={(values) =>
                      field.onChange(Number(values.floatValue))
                    }
                    label="Minutes"
                    placeholder="0"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-white text-xs opacity-50",
                      input: "font-semibold",
                      inputWrapper:
                        "bg-[#3E2A0FC4] rounded-xl border border-[#F7931AA8] group-data-[focus=true]:bg-[#3E2A0F] data-[hover=true]:bg-[#3E2A0F]",
                    }}
                    allowNegative={false}
                    thousandSeparator=","
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
                <WrappedNextDatePicker
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  className="w-fit mt-3"
                  labelPlacement="outside"
                  value={parseAbsoluteToLocal(field.value.toISOString())}
                  onChange={(value: DateValue) => {
                    setValue("endTime", value.toDate(getLocalTimeZone()));
                  }}
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
