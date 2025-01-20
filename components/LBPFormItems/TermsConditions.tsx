import { Checkbox } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormContainer } from "./Components";
interface TermsConditionProps {
  title: string;
  description: string;
}

function TermsCondition({ title, description }: TermsConditionProps) {
  return (
    <div className="">
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}

const TermsConditions = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  return (
    <FormContainer>
      <div className="mb-[34px]">
        <h2 className="text-2xl leading-[26px]">Terms & Condition</h2>
        <p className="text-sm text-[#202020]/80 mt-3 mb-6">
          You must read and agree.
        </p>
        <p className="w-[656px] text-sm text-[#202020]">
          Welcome to Honeypot . By accessing or using this website
          [www.honeypot.com], you agree to be bound by these Terms. Please read
          them carefully.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-[68px]">
        {TERMS_AND_CONDITIONS.map(({ title, description }, index) => (
          <>
            <TermsCondition title={title} description={description} key={index} />
            {
              index !== TERMS_AND_CONDITIONS.length - 1 && <div className='h-[1px] w-full bg-black' />
            }
          </>
        ))}
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
                  wrapper: "group-data-[selected=true]:after:bg-white group-data-[hover=true]:before:!bg-white group-data-[selected=true]:after:border",

                }}
                isSelected={field.value}
                onValueChange={field.onChange}
                isInvalid={!!errors.isConfirmTerms}
              >
                <span className='text-base text-[#0F0F0F]'>I have read and understood the</span>{" "}
                <Link
                  href={"/"}
                  target="_blank"
                  className="underline text-[#0F0F0F] font-extrabold"
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
    </FormContainer>
  );
};

export default TermsConditions;

const TERMS_AND_CONDITIONS = [
  {
    title: "Acceptance of Terms",
    description:
      "By using this Site, you agree to these Terms and our [Privacy Policy]. If you don’t agree, please do not use this Site",
  },
  {
    title: "Changes to Terms",
    description:
      'We reserve the right to update or modify these Terms at any time without prior notice. Any changes will be posted on this page, and the "Effective Date" will be updated. By continuing to use the Site after such changes, you agree to the modified Terms.',
  },
  {
    title: "Changes to Terms",
    description:
      'We reserve the right to update or modify these Terms at any time without prior notice. Any changes will be posted on this page, and the "Effective Date" will be updated. By continuing to use the Site after such changes, you agree to the modified Terms.',
  },
  {
    title: "Changes to Terms",
    description:
      'We reserve the right to update or modify these Terms at any time without prior notice. Any changes will be posted on this page, and the "Effective Date" will be updated. By continuing to use the Site after such changes, you agree to the modified Terms.',
  },
];
