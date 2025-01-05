import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { observer, useLocalObservable } from "mobx-react-lite";
import { wallet } from "@/services/wallet";
import launchpad from "@/services/launchpad";
import { Button } from "@/components/button/button-next";
import { Button as FTOButton } from "@/components/button";
import { NextLayoutPage } from "@/types/nextjs";
import { RocketSvg } from "@/components/svg/Rocket";
import { PeddingSvg } from "@/components/svg/Pedding";
import { DreampadSvg } from "@/components/svg/Dreampad";
import { now, getLocalTimeZone, fromDate } from "@internationalized/date";
import { dayjs } from "@/lib/dayjs";
import {
  Accordion,
  AccordionItem,
  DateValue,
  Dropdown,
  Button as NextButton,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SelectItem,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { Copy } from "@/components/copy";
import { BiSolidDownArrow } from "react-icons/bi";
import { WarppedNextSelect } from "@/components/wrappedNextUI/Select/Select";
import { WrappedNextDatePicker } from "@/components/wrappedNextUI/DatePicker/DatePicker";
import { FaQuestionCircle } from "react-icons/fa";
import { popmodal } from "@/services/popmodal";
import store from "store2";
import { cn } from "@/lib/tailwindcss";
// import { UploadImage } from "@/components/UploadImage/UploadImage";
import BigNumber from "bignumber.js";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { Token } from "@/services/contract/token";

const positiveIntegerPattern = /^[1-9]\d*$/;

const inputBaseClass =
  "w-full bg-white rounded-[12px] md:rounded-[16px] px-3 md:px-4 py-2 md:py-[18px] text-black outline-none border border-black shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] placeholder:text-black/50 text-sm md:text-base font-medium h-[40px] md:h-[60px]";

const labelBaseClass = "text-black text-sm md:text-base font-medium";

// 添加表单类型定义
type FormValues = {
  provider: string;
  raisedToken: string;
  tokenName: string;
  tokenSymbol: string;
  tokenAmount: number;
  description?: string;
  twitter: string;
  website: string;
  telegram: string;
  logoUrl: string;
  bannerUrl: string;
  raisingCycle: DateValue;
  poolHandler?: string;
};

const FTOLaunchModal: NextLayoutPage = observer(() => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const state = useLocalObservable(() => ({
    pairAddress: "",
    setPairAddress(pairAddress: string) {
      this.pairAddress = pairAddress;
    },
  }));
  const onSubmit = async (data: FormValues) => {
    try {
      const [pairAddress] = await launchpad.createLaunchProject.call({
        ...data,
        // @ts-ignore
        launchType: "fto",
        raisingCycle: Math.floor(
          (data.raisingCycle.toDate(getLocalTimeZone()).getTime() -
            Date.now()) /
            1000
        ),
      });

      state.setPairAddress(pairAddress);
      router.push(`/launch-detail/${pairAddress}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex w-full items-center justify-center">
      {launchpad.ftofactoryContract?.createFTO.loading ? (
        <div className="flex h-[566px] w-full sm:w-[583px] justify-center items-center [background:#121212] rounded-[54px]">
          <div className="flex flex-col items-center">
            <div className="relative">
              <PeddingSvg />
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <RocketSvg />
              </div>
            </div>
            <div className="text-gold-primary mt-[59px] font-bold">
              Transaction Pending
            </div>
            <div className="text-[#868B9A] mt-2 w-[250px] text-xs text-center">
              We have received your transaction just waiting for approval
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full sm:w-[584px] lg:w-[900px] items-center bg-[#291C0A] py-4 md:py-12 px-4 md:px-8 rounded-3xl md:rounded-[54px] relative overflow-hidden">
          <div className="flex items-center gap-2">
            <DreampadSvg />
            <span>Dreampad - FTO Launch</span>
          </div>

          <div className="mt-4 opacity-50 w-full sm:w-[409px] lg:w-[800px] text-center mb-4">
            Launch your token within three steps.
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[22px] w-full"
          >
            <div className="flex-col gap-4 hidden">
              <label htmlFor="provider">Token Provider</label>
              {wallet.account && (
                <input
                  type="text"
                  {...register("provider")}
                  defaultValue={wallet.account}
                  className="outline-none w-full sm:w-[522px] lg:w-[800px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl cursor-not-allowed"
                />
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm md:text-base font-medium">
                Token Name <span className="text-red-500 text-[10px]">*</span>
              </label>
              <input
                type="text"
                {...register("tokenName", { required: true })}
                className={inputBaseClass}
              />
              {errors.tokenName && (
                <span className="text-red-500 text-sm md:text-sm">
                  Token Name is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-sm md:text-base font-medium">
                Token Symbol <span className="text-red-500 text-xs">*</span>
              </label>
              <input
                type="text"
                {...register("tokenSymbol", { required: true })}
                className={inputBaseClass}
              />
              {errors.tokenSymbol && (
                <span className="text-red-500">Token Symbol is required</span>
              )}
            </div>

            <div className="custom-dashed-less-round">
              <Accordion variant="bordered">
                <AccordionItem
                  key="advanced"
                  aria-label="advanced"
                  title="Advanced Options"
                  classNames={{
                    title: "text-white/50 text-sm md:text-base",
                    trigger: "text-white/50 text-sm md:text-base h-[36px] md:h-[56px] flex items-center",
                    content: "space-y-3",
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <label className="text-sm md:text-base font-medium">
                      Token Amount <span className="text-red-500 text-[10px]">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("tokenAmount", {
                        required: "Token Amount is required",
                        pattern: {
                          value: positiveIntegerPattern,
                          message: "Token Amount should be a positive integer",
                        },
                        value: 1_000_000,
                      })}
                      className="outline-none w-full h-[40px] md:h-[60px] bg-[#2F200B] px-3 md:px-4 py-2 md:py-[18px] rounded-[12px] md:rounded-[16px]"
                      defaultValue={1_000_000}
                    />
                    {errors.tokenAmount && (
                      <span className="text-red-500">
                        {errors.tokenAmount.message as any}
                      </span>
                    )}
                  </div>
                  <div className="flex-col gap-4 hidden">
                    <label htmlFor="poolHandler">Pool Handler</label>
                    {wallet.currentChain?.contracts?.routerV2 && (
                      <input
                        defaultValue={wallet.currentChain?.contracts?.routerV2}
                        value={wallet.currentChain?.contracts?.routerV2}
                        // defaultValue={'0x1a12as1212'}
                        type="text"
                        {...register("poolHandler", {})}
                        className="outline-none w-full  h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl cursor-not-allowed"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>Campaign End</div>
                    <Controller
                      control={control}
                      name="raisingCycle"
                      defaultValue={fromDate(
                        dayjs().add(48, "hour").toDate(),
                        getLocalTimeZone()
                      )}
                      render={({ field: { onChange, onBlur, value, ref } }) => {
                        return (
                          <WrappedNextDatePicker
                            ref={ref}
                            hideTimeZone
                            onChange={onChange} // send value to hook form
                            minValue={now(getLocalTimeZone())}
                            onBlur={onBlur} // notify when input is touched/blur
                            value={value}
                            variant="bordered"
                          />
                        );
                      }}
                    ></Controller>
                    {errors.raisingCycle && (
                      <span className="text-red-500">
                        {"Please select an end date"}
                      </span>
                    )}
                  </div>{" "}
                  <div className="flex flex-col gap-4">
                    <label className="text-sm md:text-base font-medium">
                      Raised Token <span className="text-red-500 text-[10px]">*</span>
                    </label>
                    {wallet.currentChain?.contracts.ftoTokens && (
                      <WarppedNextSelect
                        required
                        selectionMode="single"
                        classNames={{
                          trigger:
                            "bg-transparent data-[hover=true]:bg-transparent",
                        }}
                        defaultSelectedKeys={"all"}
                        {...register("raisedToken", {
                          required: true,
                          value: wallet.currentChain?.contracts.ftoTokens[0]
                            .address as string,
                        })}
                        className="outline-none w-full h-[40px] md:h-[60px] bg-[#2F200B] px-3 md:px-4 py-2 md:py-[18px] rounded-[12px] md:rounded-[16px]"
                      >
                        {wallet.currentChain?.contracts.ftoTokens.map(
                          (token, idx) => (
                            <SelectItem
                              key={token.address as string}
                              value={token.address}
                            >
                              {token.symbol}
                            </SelectItem>
                          )
                        )}
                      </WarppedNextSelect>
                    )}
                    {errors.raisedToken && (
                      <span className="text-red-500">
                        Rasied Token is required
                      </span>
                    )}
                  </div>
                </AccordionItem>
              </Accordion>
            </div>

            {(state.pairAddress && (
              <div className="flex items-center">
                Pair Address:&nbsp;
                <Link
                  className="text-primary"
                  href={`/launch-detail/${state.pairAddress}`}
                  target="_blank"
                >
                  {state.pairAddress}
                </Link>
                <Copy className="ml-[8px]" value={state.pairAddress}></Copy>
              </div>
            )) || (
              <FTOButton
                type="submit"
                isLoading={launchpad.createLaunchProject.loading}
                className="w-full bg-black text-white font-bold rounded-[12px] md:rounded-[16px] px-3 py-2 md:py-[18px] border-2 border-black hover:bg-black/90 text-sm md:text-base h-[40px] md:h-[60px]"
              >
                Launch Token
              </FTOButton>
            )}
          </form>

          <div className="bg-[url('/images/pool-detail/bottom-border.svg')] bg-left-top h-3 md:h-6 absolute -bottom-1 left-0 w-full bg-contain"></div>
        </div>
      )}
    </div>
  );
});

const MemePadInstruction = () => {
  const InstructionMarker = ({ className }: { className?: string }) => (
    <div
      className={cn(
        "w-9 h-9 bg-[#271A0C] rounded-[50%] flex justify-center items-center",
        className
      )}
    >
      <div className="w-6 h-6 bg-[#FFCD4D10]  rounded-[50%] flex justify-center items-center">
        <div className="w-3 h-3 bg-[#FFCD4D] rounded-[50%]"></div>
      </div>
    </div>
  );
  const steps = [
    {
      content: "Pick a coin that you like 💖",
    },
    {
      content:
        "Deposit your coin to create your LP position in the AMM pool 💸",
    },
    {
      content: "Withdraw anytime with no gains or losses🚪",
    },
    {
      content:
        "Once $20k market cap is reached, Liquidity is locked & burned on HenloDEX 🔥 + distrubute deployer rewards!",
    },
    {
      content:
        "claim your LP position and earn txn fee, BGT, and other protocol interest",
    },
  ];
  return (
    <div className="p-3 md:p-5 flex flex-col gap-4 md:gap-5">
      <p className="text-base md:text-xl">
        Pot2Pump mode stops rugs by ensuring all tokens are safe and integrate
        perfectly with PoL
      </p>
      <p className="font-sans font-light text-xs md:text-base">
        Every token created with Pot2Pump mode is a fair-launch—no presales, no
        team allocations with a chance to mine BGT and other protocol interests.
      </p>
      <h2 className="text-lg md:text-2xl">How it works</h2>
      <div className="relative">
        <ul className="flex flex-col pl-3 md:pl-5 text-base md:text-lg font-sans font-light list-none">
          {steps.map((step, idx) => (
            <li key={idx} className="flex relative">
              <div className="flex flex-col items-center ">
                {idx !== 0 && (
                  <div className="w-[1px] flex-1 bg-[#FFCD4D]"></div>
                )}
                <InstructionMarker />
                {idx !== steps.length - 1 && (
                  <div className="w-[1px] flex-1 bg-[#FFCD4D]"></div>
                )}
              </div>
              <div
                className={cn(
                  "bg-[#3e2a0f] px-3 md:px-5 py-2 ml-4 md:ml-8 rounded-[2rem] relative overflow-visible text-xs md:text-base",
                  idx !== 0 && idx !== steps.length - 1
                    ? "my-2"
                    : idx === 0
                      ? "mb-2"
                      : "mt-2"
                )}
              >
                {step.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="w-full mt-2 md:mt-4"
        onClick={() => {
          popmodal.closeModal();
          store.set("pot2pump_notice_read", true);
        }}
      >
        I&apos;m ready to pump
      </Button>
    </div>
  );
};

const MEMELaunchModal: NextLayoutPage = observer(() => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const state = useLocalObservable(() => ({
    pairAddress: "",
    setPairAddress(pairAddress: string) {
      this.pairAddress = pairAddress;
    },
  }));
  const onSubmit = async (data: FormValues) => {
    try {
      const [pairAddress] = await launchpad.createLaunchProject.call({
        ...data,
        tokenAmount: wallet.currentChain.raisedTokenData.find(
          (token) => token.address === data.raisedToken
        )?.amount,
        launchType: "meme",
        raisingCycle: dayjs().unix(),
      });

      state.setPairAddress(pairAddress);
      router.push(`/launch-detail/${pairAddress}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const notice_read = store.get("pot2pump_notice_read");
    if (!notice_read) {
      openInstructionModal();
    }
  }, []);

  const openInstructionModal = () => {
    popmodal.openModal({
      content: <MemePadInstruction />,
    });
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col w-full md:w-[584px] lg:w-[900px] items-center border-[color:var(--Button-Gradient,#F7931A)] bg-[#FFCD4D] py-4 md:py-12 px-4 md:px-8 rounded-3xl md:rounded-[54px] relative overflow-hidden">
        <div className="bg-[url('/images/pumping/outline-border.png')] h-[20px] md:h-[50px] absolute top-0 left-0 w-full bg-contain bg-[left_-90px_top] bg-repeat-x"></div>

        <div className="flex items-center gap-2">
          <DreampadSvg />
          <span className="text-black text-base md:text-xl font-bold text-center">
            Dreampad - MEME Launch
          </span>{" "}
          <FaQuestionCircle
            onClick={() => openInstructionModal()}
            className="cursor-pointer hover:scale-150 transition-all text-black"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-[24px] md:rounded-[32px] bg-white space-y-5 px-4 md:px-8 py-4 md:py-6 custom-dashed mx-3 md:mx-6 mt-4 md:mt-6"
        >
          <div className="flex flex-col gap-4 hidden">
            <label htmlFor="provider">Token Provider</label>
            {wallet.account && (
              <input
                type="text"
                {...register("provider")}
                defaultValue={wallet.account}
                className="outline-none w-full sm:w-[522px] lg:w-[800px] h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl cursor-not-allowed"
              />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <label className={labelBaseClass}>
              Token Name <span className="text-red-500 text-[10px]">*</span>
            </label>
            <input
              type="text"
              {...register("tokenName", { required: true })}
              className={inputBaseClass}
            />
            {errors.tokenName && (
              <span className="text-red-500 text-sm md:text-sm">
                Token Name is required
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <label className={labelBaseClass}>
              Token Symbol <span className="text-red-500 text-xs">*</span>
            </label>
            <input
              type="text"
              {...register("tokenSymbol", { required: true })}
              className={inputBaseClass}
            />
            {errors.tokenSymbol && (
              <span className="text-red-500">Token Symbol is required</span>
            )}
          </div>

          <div className="custom-dashed-less-round">
            <Accordion variant="bordered">
              <AccordionItem
                key="advanced"
                aria-label="advanced"
                title="Advanced Options"
                classNames={{
                  title: "text-black/50 text-sm md:text-base",
                  trigger: "h-9 md:h-14 flex items-center",
                  content: "space-y-3",
                }}
              >
                {/* <div className="relative w-full h-[5rem] border-dashed border-black hover:border-black/70 border-2 rounded-2xl mb-5 transition-all text-black hover:text-black/70">
                  <Controller
                    control={control}
                    name="bannerUrl"
                    render={({ field: { onChange, value } }) => (
                      <>
                        <UploadImage
                          blobName={"banner"}
                          imagePath={value}
                          onUpload={onChange}
                          variant="banner"
                        />
                        {!value && (
                          <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none">
                            Upload Banner
                          </h3>
                        )}
                      </>
                    )}
                  />
                </div> */}
                {wallet.isInit && (
                  <div className="flex flex-col gap-2">
                    <label className={labelBaseClass}>
                      Raise Token <span className="text-red-500">*</span>
                    </label>
                    <WarppedNextSelect
                      isRequired
                      defaultSelectedKeys={[
                        wallet.currentChain.raisedTokenData[0].address,
                      ]}
                      items={wallet.currentChain?.raisedTokenData}
                      {...register("raisedToken")}
                    >
                      {wallet.currentChain?.raisedTokenData.map((token) => (
                        <SelectItem
                          key={token.address}
                          value={token.address}
                          startContent={
                            <TokenLogo
                              size={24}
                              token={Token.getToken({
                                address: token.address,
                              })}
                              addtionalClasses="rounded-full"
                            />
                          }
                        >
                          {token.symbol} -{" "}
                          {new BigNumber(token.amount.toString())
                            .div(10 ** 18)
                            .toString()}
                          &nbsp;tokens
                        </SelectItem>
                      ))}
                    </WarppedNextSelect>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className={labelBaseClass}>
                    Description{" "}
                    <span className="text-black/50">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register("description")}
                    className={inputBaseClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelBaseClass}>
                    Twitter <span className="text-black/50">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register("twitter")}
                    className={inputBaseClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelBaseClass}>
                    Website <span className="text-black/50">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register("website")}
                    className={inputBaseClass}
                  />
                </div>

                <div className="flex flex-col gap-2 pb-4">
                  <label className={labelBaseClass}>
                    Telegram <span className="text-black/50">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register("telegram")}
                    className={inputBaseClass}
                  />
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          {state.pairAddress ? (
            <div className="flex items-center text-black">
              Pair Address:&nbsp;
              <Link
                className="text-primary"
                href={`/launch-detail/${state.pairAddress}`}
                target="_blank"
              >
                {state.pairAddress}
              </Link>
              <Copy className="ml-[8px]" value={state.pairAddress}></Copy>
            </div>
          ) : (
            <Button
              type="submit"
              isLoading={launchpad.createLaunchProject.loading}
              className="w-full bg-black text-white font-bold rounded-[12px] md:rounded-[16px] px-3 py-2 md:py-[18px] border-2 border-black hover:bg-black/90 text-sm md:text-base h-[40px] md:h-[60px]"
            >
              Launch Token
            </Button>
          )}
        </form>

        <div className="bg-[url('/images/pool-detail/bottom-border.svg')] bg-left-top h-3 md:h-6 absolute -bottom-1 left-0 w-full bg-contain"></div>
      </div>
    </div>
  );
});

export type LaunchType = "fto" | "meme";

const LaunchTokenPage: NextLayoutPage = observer(() => {
  const router = useRouter();
  const { launchType } = router.query || {};
  const [selectedLaunch, setSelectedLaunch] = useState<LaunchType>("fto");
  
  const launchs = [
    {
      key: "fto",
      label: "FTO Launch",
    },
    {
      key: "meme",
      label: "Pot2pump launch",
    },
  ];

  // Handle launch type changes from URL
  useEffect(() => {
    if (launchType) {
      setSelectedLaunch(launchType as LaunchType);
    }
  }, [launchType]);

  // Handle launch type selection and update URL
  const handleLaunchTypeChange = (type: LaunchType) => {
    setSelectedLaunch(type);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, launchType: type }
    }, undefined, { shallow: true });
  };

  return (
    <div className="w-full md:p-6 md:max-w-full xl:max-w-[1200px] mx-auto">
      <div className="flex flex-col px-4 md:px-0 w-full md:w-[584px] lg:w-[900px] mx-auto">
        <Dropdown>
          <DropdownTrigger>
            <NextButton variant="bordered" className="md:w-fit justify-between">
              {selectedLaunch.toUpperCase()} Launch
              <BiSolidDownArrow />
            </NextButton>
          </DropdownTrigger>
          <DropdownMenu 
            className="w-[calc(100vw-48px)] md:w-auto min-w-[200px]"
            itemClasses={{
              base: "data-[hover=true]:bg-[#FFCD4D] data-[hover=true]:text-black"
            }}
          >
            {launchs
              .filter((launch) => launch.key !== selectedLaunch)
              .map((launch) => (
                <DropdownItem
                  key={launch.key}
                  onPress={() => handleLaunchTypeChange(launch.key as LaunchType)}
                >
                  {launch.label}
                </DropdownItem>
              ))}
          </DropdownMenu>
        </Dropdown>
        <div className="flex items-center justify-center mt-4 md:mt-8">
          {selectedLaunch === "fto" ? <FTOLaunchModal /> : <MEMELaunchModal />}
        </div>
      </div>
    </div>
  );
});

export default LaunchTokenPage;
