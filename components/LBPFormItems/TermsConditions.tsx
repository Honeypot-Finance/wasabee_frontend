import { Checkbox } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const TermsConditions = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  return (
    <div>
      <div className="font-medium">
        <div className="text-xl leading-[26px]">Terms and Conditions</div>
        <div className="text-[12px] leading-4 text-white/50">
          You must read and agree.
        </div>
      </div>
      <div className="mt-[10px]">
        <Controller
          name="isConfirmTerms"
          control={control}
          render={({ field }) => (
            <div>
              <Checkbox
                radius="sm"
                classNames={{
                  wrapper: "group-data-[selected=true]:after:bg-[#865215]",
                  icon: "text-black",
                }}
                isSelected={field.value}
                onValueChange={field.onChange}
                isInvalid={!!errors.isConfirmTerms}
              >
                I have read and understood the{" "}
                <Link
                  href={"/"}
                  target="_blank"
                  className="underline text-[#ecc94e]"
                >
                  Terms and Conditions.
                </Link>
              </Checkbox>
              {errors.isConfirmTerms && (
                <div className="text-[12px] leading-4 text-red-500">
                  {errors.isConfirmTerms.message?.toString()}
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default TermsConditions;
