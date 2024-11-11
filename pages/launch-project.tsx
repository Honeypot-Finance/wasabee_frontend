import { Button } from "@/components/button";
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
import launchPadLbp, { PoolSettings } from "@/services/launchpadlbp";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { keccak256, parseEther } from "viem";

const StepsData = [
  {
    key: "1",
    title: "Creation & Branding",
    isActive: true,
    isValidated: true,
  },
  {
    key: "2",
    title: "Sales Structure",
    isActive: true,
    isValidated: false,
  },
  {
    key: "3",
    title: "Tokenomics & Preview",
    isActive: false,
    isValidated: false,
  },
  {
    key: "4",
    title: "Token Vesting",
    isActive: false,
    isValidated: false,
  },
  {
    key: "5",
    title: "Project Info",
    isActive: false,
    isValidated: false,
  },
  {
    key: "6",
    title: "Socials & Community",
    isActive: false,
    isValidated: false,
  },
  {
    key: "7",
    title: "Review",
    isActive: false,
    isValidated: false,
  },
  {
    key: "8",
    title: "Terms & Conditions",
    isActive: false,
    isValidated: false,
  },
  {
    key: "9",
    title: "Confirm",
    isActive: false,
    isValidated: false,
  },
];

const LaunchProject = () => {
  const [activeTab, setActiveTab] = useState("2");

  const methods = useForm({});

  const CurrentStep = () => {
    switch (activeTab) {
      case "1":
        return <CreateAndBranding />;
      case "2":
        return <SalesStructure />;
      case "3":
        return <TokenomicsAndPreview />;
      case "4":
        return <TokenVesting />;
      case "5":
        return <ProjectInfo />;
      case "6":
        return <SocialsAndCommunity />;
      case "7":
        return <Review />;
      case "8":
        return <TermsConditions />;
      case "9":
        return <Confirm />;
      default:
        return <div />;
    }
  };

  const CreateLBP = async () => {
    const args:PoolSettings = {
      asset: `0x3E70A4Ca1295DaA7E8Ca2204b0fBcaDE69B9C43e`,
      share: `0xF9a97b37d9f7d9f7968f267ad266b1f71f2B511D`,
      creator: `0xf8184eFf83C646B56A955bc46F2F5723563eb5ED`,
      virtualAssets: parseEther('0.0000000001'),
      maxSharePrice: BigInt(0),
      maxSharesOut: BigInt(0),
      maxTotalAssetsIn: BigInt(0),
      maxTotalAssetsInDeviation: 0,
      weightStart: BigInt(0),
      weightEnd: BigInt(0),
      saleStart: 0,
      saleEnd: 0,
      vestCliff: 0,
      vestEnd: 0,
      redemptionDelay: 0,
      sellingAllowed: false,
      whitelistMerkleRoot: `0x0000000000000000000000000000000000000000000000000000000000000000`,
      minAssetsIn: BigInt(100),
      minPercAssetsSeeding: 0,
      minSharesSeeding: BigInt(0),
    }

     const pairAddress =  await launchPadLbp.createLiquidityBootstrapPool.call({
      args,
      assets: BigInt(100),
      shares: BigInt(100),
      salt: keccak256("0x")
     })
  }

  return (
    <div className="md:p-6  md:max-w-full xl:max-w-[1440px] mx-auto mb-[30vh] flex">
      <div className="flex-[0.35] bg-[#271A0C] py-[60px] rounded-[28px] justify-center">
        <Stepper data={StepsData} />
      </div>
      <div className="flex-[0.65] py-20 pl-9">
        <FormProvider {...methods}>
          <CurrentStep />
        </FormProvider>
      </div>
      <Button>Click</Button>
    </div>
  );
};

export default LaunchProject;
