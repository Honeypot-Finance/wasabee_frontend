import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { observer, useLocalObservable } from "mobx-react-lite";
import { wallet } from "@/services/wallet";
import launchpad from "@/services/launchpad";
import { Button } from "@/components/button";
import { NextLayoutPage } from "@/types/nextjs";
import { RocketSvg } from "@/components/svg/Rocket";
import { PeddingSvg } from "@/components/svg/Pedding";
import { DreampadSvg } from "@/components/svg/Dreampad";
import { now, getLocalTimeZone, fromDate } from "@internationalized/date";
// import { DatePicker } from "@/components/DatePicker";
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
import Instruction from "@/components/Instruction";
import GuideModal from "@/components/Instruction/GuideModal";

const positiveIntegerPattern = /^[1-9]\d*$/;

const FTOLaunchModal: NextLayoutPage = observer(() => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const state = useLocalObservable(() => ({
    pairAddress: "",
    setPairAddress(pairAddress: string) {
      this.pairAddress = pairAddress;
    },
  }));
  const onSubmit = async (data: {
    provider: string;
    raisedToken: string;
    tokenName: string;
    tokenSymbol: string;
    tokenAmount: number;
    poolHandler: string;
    raisingCycle: DateValue;
  }) => {
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
    <div className="md:p-6  md:max-w-full xl:max-w-[1200px] mx-auto mb-[30vh]">
      <div className=" flex items-center justify-center mt-[24px]">
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
          <div className="flex flex-col w-full sm:w-[584px] lg:w-[900px] items-center border-[color:var(--Button-Gradient,#F7931A)] bg-[#291C0A] py-4 px-[5px] rounded-[54px] border-2">
            <div className="flex items-center gap-2">
              <DreampadSvg />
              <span>Dreampad - FTO Launch</span>
            </div>
            <div className="mt-4 opacity-50 w-full sm:w-[409px] lg:w-[800px] text-center mb-4 ">
              Launch your token within three steps.{" "}
              {/* <span className="underline cursor-pointer">Read more</span> about
              Dreampad. */}
            </div>
            <form
              //@ts-ignore
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[22px] w-full px-4 sm:w-auto sm:px-0"
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
                <div>Token Name</div>
                <input
                  type="text"
                  {...register("tokenName", { required: true })}
                  className="outline-none w-full sm:w-[522px] h-[60px] lg:w-[800px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
                />
                {errors.tokenName && (
                  <span className="text-red-500">Token Name is required</span>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div>Token Symbol</div>
                <input
                  type="text"
                  {...register("tokenSymbol", { required: true })}
                  className="outline-none w-full sm:w-[522px] h-[60px] lg:w-[800px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
                />
                {errors.tokenSymbol && (
                  <span className="text-red-500">Token Symbol is required</span>
                )}
              </div>

              <Accordion variant="bordered" keepContentMounted>
                <AccordionItem
                  key="advanced"
                  aria-label="advanced"
                  title="Advanced Options"
                >
                  <div className="flex flex-col gap-4">
                    <div>Token Amount</div>
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
                      className="outline-none w-full  h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
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
                            minValue={now(getLocalTimeZone()) as any}
                            onBlur={onBlur} // notify when input is touched/blur
                            value={value}
                            variant="bordered"
                          />
                        );
                      }}
                    ></Controller>
                    {errors.rasing_cycle && (
                      <span className="text-red-500">
                        {"Please select an end date"}
                      </span>
                    )}
                  </div>{" "}
                  <div className="flex flex-col gap-4">
                    <label htmlFor="raisedToken">Raised Token</label>
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
                        className="outline-none w-full  h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
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
                <Button
                  type="submit"
                  isLoading={launchpad.createLaunchProject.loading}
                  className="text-black font-bold"
                >
                  Launch Token
                </Button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
});

// const MemePadInstruction = () => {
//   const title =
//     "Pot2Pump mode stops rugs by ensuring all tokens are safe and integrate perfectly with PoL";
//   const desc =
//     "Every token created with Pot2Pump mode is a fair-launch—no presales, no team allocations with a chance to mine BGT and other protocol interests.";
//   const stepTitle = "How it works";
//   const buttonText = "I'm ready to pump";
//   const steps = [
//     {
//       content: "Pick a coin that you like 💖",
//     },
//     {
//       content:
//         "Deposit your coin to create your LP position in the AMM pool 💸",
//     },
//     {
//       content: "Withdraw anytime with no gains or losses🚪",
//     },
//     {
//       content:
//         "Once $20k market cap is reached, Liquidity is locked & burned on HenloDEX 🔥 + distrubute deployer rewards!",
//     },
//     {
//       content:
//         "claim your LP position and earn txn fee, BGT, and other protocol interest",
//     },
//   ];

//   return (
//     <Instruction
//       title={title}
//       desc={desc}
//       stepTitle={stepTitle}
//       buttonText={buttonText}
//       steps={steps}
//     />
//   );
// };

const MEMELaunchModal: NextLayoutPage = observer(() => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const state = useLocalObservable(() => ({
    pairAddress: "",
    setPairAddress(pairAddress: string) {
      this.pairAddress = pairAddress;
    },
  }));
  const onSubmit = async (data: {
    provider: string;
    raisedToken: string;
    tokenName: string;
    tokenSymbol: string;
    tokenAmount: number;
    poolHandler: string;
    //raisingCycle: DateValue;
  }) => {
    try {
      const [pairAddress] = await launchpad.createLaunchProject.call({
        ...data,
        // @ts-ignore
        tokenAmount: 1_000_000,
        raisedToken: wallet.currentChain?.contracts.ftoTokens[0]
          .address as string,
        launchType: "meme",
        raisingCycle: dayjs().unix(),
      });

      if (!!pairAddress) {
        state.setPairAddress(pairAddress);
        router.push(`/launch-detail/${pairAddress}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   const notice_read = store.get("pot2pump_notice_read");
  //   if (!notice_read) {
  //     openInstructionModal();
  //   }
  // }, []);

  // const openInstructionModal = () => {
  //   popmodal.openModal({
  //     content: <MemePadInstruction />,
  //     // actions: [
  //     //   {
  //     //     label: "Confirm",
  //     //     onPress: () => {
  //     //       popmodal.closeModal();
  //     //       store.set("pot2pump_notice_read", true);
  //     //     },
  //     //   },
  //     // ],
  //   });
  // };

  return (
    <div className="md:p-6 w-full mx-auto md:max-w-full xl:max-w-[1200px]  mb-[30vh]">
      <div className=" flex w-full items-center justify-center mt-[24px]">
        {launchpad.ftofactoryContract?.createFTO.loading ? (
          <div className="flex h-[566px] w-full md:w-[583px] justify-center items-center [background:#121212] rounded-[54px]">
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
          <div className="flex flex-col w-full sm:w-[584px] lg:w-[900px] items-center border-[color:var(--Button-Gradient,#F7931A)] bg-[#291C0A] py-4 px-[5px] rounded-[54px] border-2">
            <div className="flex items-center gap-2">
              <DreampadSvg />
              <span>
                Dreampad <br className="md:hidden" /> - MEME Launch
              </span>{" "}
              <FaQuestionCircle
                onClick={() =>
                  GuideModal?.openInstructionModal &&
                  GuideModal.openInstructionModal()
                }
                className="cursor-pointer hover:scale-150 transition-all"
              />
            </div>
            <form
              //@ts-ignore
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[22px] w-full px-4 sm:w-auto sm:px-0"
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
                <div>Token Name</div>
                <input
                  type="text"
                  {...register("tokenName", { required: true })}
                  className="outline-none w-full sm:w-[522px] h-[60px] lg:w-[800px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
                />
                {errors.tokenName && (
                  <span className="text-red-500">Token Name is required</span>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div>Token Symbol</div>
                <input
                  type="text"
                  {...register("tokenSymbol", { required: true })}
                  className="outline-none w-full sm:w-[522px] h-[60px] lg:w-[800px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
                />
                {errors.tokenSymbol && (
                  <span className="text-red-500">Token Symbol is required</span>
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
                <Button
                  type="submit"
                  isLoading={launchpad.createLaunchProject.loading}
                  className="text-black font-bold"
                >
                  Launch Token
                </Button>
              )}
            </form>
          </div>
        )}
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
    // {
    //   key: "fto",
    //   label: "FTO Launch",
    // },
    {
      key: "meme",
      label: "Pot2pump launch",
    },
  ];
  useEffect(() => {
    if (launchType) {
      setSelectedLaunch(launchType as LaunchType);
    }
  }, [launchType]);

  return (
    <div className="md:p-6  md:max-w-full xl:max-w-[1200px] mx-auto mb-[30vh]">
      <Dropdown>
        <DropdownTrigger>
          <NextButton variant="bordered">
            {selectedLaunch.toUpperCase()} Launch
            <BiSolidDownArrow />
          </NextButton>
        </DropdownTrigger>
        <DropdownMenu>
          {launchs.map((launch) => (
            <DropdownItem
              key={launch.key}
              onClick={() => setSelectedLaunch(launch.key as any)}
            >
              {launch.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <div className=" flex items-center justify-center mt-[24px]">
        {selectedLaunch === "fto" ? <FTOLaunchModal /> : <MEMELaunchModal />}
      </div>
    </div>
  );
});

export default LaunchTokenPage;