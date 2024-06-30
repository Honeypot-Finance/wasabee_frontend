import { useRouter } from "next/router";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";
import launchpad from "@/services/launchpad";
import { NextLayoutPage } from "@/types/nextjs";
import { AsyncState } from "@/services/utils";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { wallet } from "@/services/wallet";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";
import { amountFormatted } from "@/lib/format";
import { Copy } from "@/components/copy";
import { LuFileEdit } from "react-icons/lu";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
const UpdateProjectAction = observer(({ pair }: { pair: FtoPairContract }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const FormBody = observer(({onClose}: any) => <>
  <ModalHeader className="flex flex-col gap-1">
    Update {pair.launchedToken.displayName}
  </ModalHeader>
  <ModalBody>
    <div>
      <div className="flex flex-col gap-4">
        <div>Project Name</div>
        <input
          type="text"
          {...register("projectName", {
            value: pair.projectName,
            required: "Project name is required",
          })}
          className="outline-none w-full  h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
        />
        {errors.projectName && (
          <span className="text-red-500">
            {errors.projectName.message as any}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div>Description</div>
        <input
          type="text"
          {...register("description", {
            value: pair.description,
            required: "Description is required",
          })}
          className="outline-none w-full  h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
        />
        {errors.description && (
          <span className="text-red-500">
            {errors.description.message as any}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div>Twitter</div>
        <input
          type="text"
          {...register("twitter", {
            value: pair.twitter,
          })}
          className="outline-none w-full  h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
        />
        {errors.twitter && (
          <span className="text-red-500">
            {errors.twitter.message as any}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div>Website</div>
        <input
          type="text"
          {...register("website", {
            value: pair.website,
          })}
          className="outline-none w-full  h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
        />
        {errors.website && (
          <span className="text-red-500">
            {errors.website.message as any}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div>Telegram</div>
        <input
          type="text"
          {...register("telegram", {
            value: pair.telegram,

          })}
          className="outline-none w-full  h-[60px] bg-[#2F200B] pl-3 pr-4 py-3 rounded-2xl"
        />
        {errors.telegram && (
          <span className="text-red-500">
            {errors.telegram.message as any}
          </span>
        )}
      </div>
    </div>
  </ModalBody>
  <ModalFooter>
    <Button variant="light" onPress={onClose}>
      Close
    </Button>
    <Button
      isLoading={launchpad.updateFtoProject.loading}
      color="primary"
      onPress={async () => {
        handleSubmit(async (data) => {
          await launchpad.updateFtoProject.call({
            pair: pair.address,
            chain_id: wallet.currentChainId,
            projectName: data.projectName,
            description: data.description,
            twitter: data.twitter || "",
            website: data.website || "",
            telegram: data.telegram || "",
          });
          if (launchpad.updateFtoProject.error) {
            toast.error("Update failed");
            return;
          }
          await pair.getProjectInfo()
          toast.success("Update success");
          onClose();
        })();
      }}
    >
      Submit
    </Button>
  </ModalFooter>
</>)
  return (
    <>
      <LuFileEdit onClick={() => {
        if (pair.provider.toLowerCase() !== wallet.account.toLowerCase()) {
          toast.warning("You are not the owner of this project")
          return
        }
        onOpen()
      }} className="cursor-pointer"></LuFileEdit>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
              <FormBody onClose={onClose}></FormBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});

const SuccessAction = observer(({ pair }: { pair: FtoPairContract }) => {
  return (
    <div className=" flex flex-col gap-[16px]">
      <Button
        className="w-full"
        isLoading={pair.claimLP.loading}
        onClick={() => {
          pair.claimLP.call();
        }}
      >
        Claim LP
      </Button>
    </div>
  );
});
const FailAction = observer(({ pair }: { pair: FtoPairContract }) => {
  return pair.isProvider ? (
    <div className="flex flex-col gap-[16px]">
      <Button
        className="w-full"
        isLoading={pair.withdraw.loading}
        onClick={() => {
          pair.withdraw.call();
        }}
      >
        Provider Withdraw
      </Button>
    </div>
  ) : (
    <></>
  );
});

const PauseAction = observer(({ pair }: { pair: FtoPairContract }) => {
  return pair.isProvider ? (
    <div className="flex flex-col gap-[16px]">
      <Button
        className="w-full"
        isLoading={pair.resume.loading}
        onClick={() => {
          pair.resume.call();
        }}
      >
        Resume
      </Button>
    </div>
  ) : (
    <></>
  );
});

const ProcessingAction = observer(({ pair }: { pair: FtoPairContract }) => {
  const state = useLocalObservable(() => ({
    depositAmount: "0",
    setDepositAmount(val: string) {
      this.depositAmount = val;
    },
  }));
  return pair.isProvider ? (
    <div className="flex flex-col gap-[16px]">
      <Button
        className="w-full"
        isLoading={pair.pause.loading}
        onClick={() => {
          pair.pause.call();
        }}
      >
        Pause
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-[16px]">
      <Input
        className="bg-[#2F200B] rounded-[10px]"
        value={state.depositAmount}
        placeholder="Deposit amount"
        min={0}
        type="number"
        max={pair.raiseToken.balance.toFixed()}
        onChange={(e) => {
          state.setDepositAmount(e.target.value);
        }}
        defaultValue="0"
        endContent={pair.raiseToken.displayName}
      ></Input>
      <div className="flex items-center gap-[8px]">
        <div>Balance: {pair.raiseToken.balance.toFormat()}</div>
        <div
          onClick={() => {
            state.setDepositAmount(pair.raiseToken.balance.toFixed());
          }}
          className="  cursor-pointer text-[color:var(--Button-Gradient,#F7931A)] text-base ml-[8px] font-bold leading-3 tracking-[0.16px] underline"
        >
          Max
        </div>
      </div>
      <Button
        className="w-full"
        isLoading={pair.deposit.loading}
        onClick={() => {
          pair.deposit.call({
            amount: state.depositAmount,
          });
        }}
      >
        Deposit
      </Button>
    </div>
  );
});

const Action = observer(({ pair }: { pair: FtoPairContract }) => {
  switch (pair.ftoState) {
    case 0:
      return <SuccessAction pair={pair}></SuccessAction>;
    case 1:
      return <FailAction pair={pair}></FailAction>;
    case 2:
      return <PauseAction pair={pair}></PauseAction>;
    case 3:
      if (pair.isCompleted) {
        return <></>;
      }
      return <ProcessingAction pair={pair}></ProcessingAction>;
  }
});

const LaunchPage: NextLayoutPage = observer(() => {
  const router = useRouter();
  const { pair: pairAddress } = router.query;
  const state = useLocalObservable(() => ({
    pair: new AsyncState<
      FtoPairContract,
      ({ pairAddress }: { pairAddress: string }) => Promise<FtoPairContract>
    >(async ({ pairAddress }: { pairAddress: string }) => {
      const pair = new FtoPairContract({ address: pairAddress as string });
      pair.init();
      return pair;
    }),
  }));
  useEffect(() => {
    if (!wallet.isInit || !pairAddress) {
      return;
    }
    state.pair.call({
      pairAddress: pairAddress as string,
    });
  }, [wallet.isInit, pairAddress]);

  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          {
            title: "Projects",
            href: "/launch",
          },
          {
            title: state.pair.value?.launchedToken.displayName || "-",
            href: "/launch-token",
          },
        ]}
      ></Breadcrumbs>
      <div className="flex justify-center mt-[24px]">
        <div className="flex gap-[20px] flex-wrap min-h-[425px]">
          <div className="flex-1 flex   basis-full sm:basis-0  sm:min-w-[500px] flex-col items-center  shrink-0 [background:#271B0C] rounded-2xl">
            <div className="h-[119px] shrink-0 self-stretch [background:radial-gradient(50%_50%_at_50%_50%,#9D5E28_0%,#FFCD4D_100%)] rounded-[12px_12px_0px_0px]"></div>
            <div className="relative w-full px-[29px] pb-[26px]">
              <div className=" relative translate-y-[-50%] w-[65px] h-[65px] [background:#271B0C] rounded-[11.712px] p-[3px]">
                <div className="w-full h-full flex items-center justify-center [background:#ECC94E] rounded-[11.712px]">
                  <Image
                    src="/images/project_honey.png"
                    alt="honey"
                    width={36}
                    height={36}
                  ></Image>
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <div>
                  <div>
                    <div className="text-[rgba(255,255,255,0.66)] text-base font-medium leading-[normal]">
                      {state.pair.value?.launchedToken.displayName}
                    </div>
                    <div className="text-white text-[32px] font-medium leading-[normal]">
                      {state.pair.value?.projectName}
                    </div>
                  </div>
                  <div></div>
                </div>
                <div>{state.pair.value?.description}</div>
                <div>
                  {state.pair.value && (
                    <Action pair={state.pair.value}></Action>
                  )}
                </div>
                <div className="flex gap-[10px] justify-center">
                  {state.pair.value?.socials.map((social) => {
                    return (
                      <div key={social.name}>
                        <Link href={social.link} target="_blank">
                          <Image
                            src={social.icon}
                            width={23}
                            height={23}
                            alt={social.name}
                          ></Image>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="text-left relative flex-1 flex basis-full  sm:basis-0 sm:min-w-[500px]  flex-col gap-[10px] shrink-0 [background:#271B0C] rounded-2xl py-[12px] px-[24px]">
            <div className=" absolute right-[24px] top-[12px]">
              {state.pair.value?.isInit && (
                <UpdateProjectAction
                  pair={state.pair.value}
                ></UpdateProjectAction>
              )}
            </div>
            <div>
              <div className="text-[rgba(255,255,255,0.66)] text-[15.958px] font-bold leading-[normal]">
                Token Raised
              </div>
              <div className="text-[color:var(--Button-Gradient,var(--card-stroke,#F7931A))] text-[16.727px] font-normal leading-[normal]">
                {amountFormatted(state.pair.value?.depositedRaisedToken)}{" "}
                {state.pair.value?.raiseToken.displayName}
              </div>
            </div>
            {/* // TODO: raised progress */}
            {/* <div></div> */}
            <div>
              <div className="text-[rgba(255,255,255,0.66)] text-sm font-medium leading-[normal]">
                Token address
              </div>
              <div className="mt-[8px] flex  h-[41px] justify-between items-center [background:#3B2912] px-3 py-0 rounded-[10px]">
                {state.pair.value?.raiseToken.address}{" "}
                {state.pair.value?.raiseToken.address && (
                  <Copy value={state.pair.value?.raiseToken.address}></Copy>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div>
                <div className="flex gap-[4px] text-white text-[12.165px] font-bold leading-[normal]">
                  <Image
                    src="/images/wallet.png"
                    alt="price"
                    width={12}
                    height={12}
                  ></Image>
                  Token Price
                </div>
                <div className="text-[#FFCD4D]  text-base font-medium leading-[normal] mt-[4px]">
                  {amountFormatted(state.pair.value?.price, {
                    prefix: "$",
                  })}
                </div>
              </div>
              <div>
                <div className="flex gap-[4px] text-white  text-[12.165px] font-bold leading-[normal]">
                  <Image
                    src="/images/calendar.png"
                    alt="price"
                    width={12}
                    height={12}
                  ></Image>
                  Start Date
                </div>
                <div className="text-[#FFCD4D]  text-base font-medium leading-[normal] mt-[4px]">
                  {state.pair.value?.startTimeDisplay}
                </div>
              </div>
              <div>
                <div className="flex gap-[4px] text-white  text-[12.165px] font-bold leading-[normal]">
                  <Image
                    src="/images/calendar.png"
                    alt="price"
                    width={12}
                    height={12}
                  ></Image>
                  End Date
                </div>
                <div className="text-[#FFCD4D]  text-base font-medium leading-[normal] mt-[4px]">
                  {state.pair.value?.endTimeDisplay}
                </div>
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
          {/* <LaunchCard
          type="detail"
          className=" w-[450px] max-w-full p-[24px]"
          pair={state.pair.value}
          action={state.pair.value && <Action pair={state.pair.value}></Action>}
        ></LaunchCard> */}
          {/* <div  className="max-w-full w-[600px]">
          <div className="flex">
            <div>Website</div>
            <div>Twitter</div>
            <div>Telegram</div>
          </div>
          <div>
            Introducing $WINE - The Liquid Gold of Memecoins $WINE is the
            ultimate memecoin, blending humor with the refined world of wine.
            Designed for those who appreciate a good laugh as much as a fine
            vintage, $WINE is the liquid gold of digital currencies.
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
});

export default LaunchPage;
