import { Button } from "@/components/button";
import React, { useState } from "react";
import Confirm from "@/components/LBPFormItems/Confirm";
import CreateAndBranding from "@/components/LBPFormItems/CreateAndBranding";
import ProjectInfo from "@/components/LBPFormItems/ProjectInfo";
import Review from "@/components/LBPFormItems/Review";
import SalesStructure from "@/components/LBPFormItems/SalesStructure";
import SocialsAndCommunity from "@/components/LBPFormItems/SocialsAndCommunity";
import TermsConditions from "@/components/LBPFormItems/TermsConditions";
import TokenomicsAndPreview from "@/components/LBPFormItems/TokenomicsAndPreview";
import TokenVesting from "@/components/LBPFormItems/TokenVesting";
import Stepper from "@/components/Stepper";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAndBrandingForm,
  ProjectInfoForm,
  ReviewForm,
  SalesStructureForm,
  SocialCommunityForm,
  TermsAndConditionsForm,
  TokenomicsAndPreviewForm,
  TokenVestingForm,
} from "@/types/launch-project";
import {
  confirmationSchema,
  createAndBrandingSchema,
  DEFAULT_LAUNCH_PROJECT_FORM,
  projectInfoFormSchema,
  reviewSchema,
  salesStructureSchema,
  socialCommunitySchema,
  termsAndConditionsSchema,
  tokenomicsAndPreviewSchema,
  tokenVestingSchema,
} from "@/constants/launch-project";
import { LBPButton } from "@/components/LBPFormItems/Components";

const STEP_DATA = [
  {
    title: "Creation & Branding",
  },
  {
    title: "Sales Structure",
  },
  {
    title: "Tokenomics & Preview",
  },
  {
    title: "Token Vesting",
  },
  {
    title: "Project Info",
  },
  {
    title: "Socials & Community",
  },
  {
    title: "Review",
  },
  {
    title: "Terms & Conditions",
  },
  {
    title: "Confirm",
  },
];

type LaunchProjectForm = CreateAndBrandingForm &
  SalesStructureForm &
  TokenomicsAndPreviewForm &
  TokenVestingForm &
  ProjectInfoForm &
  SocialCommunityForm &
  ReviewForm &
  TermsAndConditionsForm;

const LaunchProject = () => {
  const [stepData, setStepData] = useState(
    STEP_DATA.map((item) => ({ ...item, isValid: false }))
  );
  const [currentStep, setCurrentStep] = useState<number>(0);

  const validationSchema = [
    createAndBrandingSchema,
    salesStructureSchema,
    tokenomicsAndPreviewSchema,
    tokenVestingSchema,
    projectInfoFormSchema,
    socialCommunitySchema,
    reviewSchema,
    termsAndConditionsSchema,
    confirmationSchema,
  ];

  const methods = useForm<LaunchProjectForm>({
    resolver: zodResolver(validationSchema[currentStep]),
    defaultValues: DEFAULT_LAUNCH_PROJECT_FORM,
    mode: "onChange",
    shouldUnregister: false,
  });

  const CurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <CreateAndBranding />;
      case 1:
        return <SalesStructure />;
      case 2:
        return <TokenomicsAndPreview />;
      case 3:
        return <TokenVesting />;
      case 4:
        return <ProjectInfo />;
      case 5:
        return <SocialsAndCommunity />;
      case 6:
        return <Review changeStep={setCurrentStep} />;
      case 7:
        return <TermsConditions />;
      case 8:
        return <Confirm />;
      default:
        return <div />;
    }
  };

  const handleNextStep = async () => {
    const isValid = await methods.trigger();
    if (isValid && currentStep < STEP_DATA.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      const step = [...stepData];
      step[currentStep].isValid = true;
      setStepData(step);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const onSubmit = () => {
    console.log("😻 ~ onSubmit ~ data:", methods.getValues());
  };

  return (
    <div className="md:p-6 md:max-w-full xl:max-w-[1440px] mx-auto mb-[30vh] grid grid-cols-3 gap-12">
      <div className="col-span-1 bg-[#271A0C] py-[60px] rounded-[28px] justify-center px-10">
        <Stepper
          steps={stepData}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
      <div className="col-span-2 py-20 pl-9">
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <CurrentStep />
            <div className="mt-12 flex items-center gap-8">
              {currentStep !== 0 && (
                <LBPButton type="button" onClick={handleBack}>
                  Back
                </LBPButton>
              )}
              {currentStep === 8 ? (
                <LBPButton type="submit" onClick={onSubmit}>
                  Submit
                </LBPButton>
              ) : (
                <LBPButton type="button" onClick={handleNextStep}>
                  {`Continue to ${STEP_DATA[currentStep + 1].title}`}
                </LBPButton>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LaunchProject;
