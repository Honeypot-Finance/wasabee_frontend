import { observer, useLocalObservable } from "mobx-react-lite";
import launchpad from "@/services/launchpad";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { wallet } from "@/services/wallet";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { UploadImage } from "@/components/UploadImage/UploadImage";
import { useAccount } from "wagmi";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { WrappedToastify } from "@/lib/wrappedToastify";
import { SwapCard } from "@/components/SwapCard/MemeSwap";

const UpdateProjectModal = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(
        z
          .object({
            projectName: z.string(),
            description: z.string(),
            twitter: z.union([
              z.string().url().startsWith("https://x.com/"),
              z.string().url().startsWith("https://twitter.com/"),
              z.literal(""),
            ]),
            website: z.string().url().startsWith("https://").or(z.literal("")),
            telegram: z.union([
              z.string().startsWith("https://t.me/"),
              z.string().startsWith("@"),
              z.literal(""),
            ]),
          })
          .transform((data) => {
            const mutateTelegram = (telegram: string | undefined | null) => {
              if (telegram && telegram.startsWith("@")) {
                return `https://t.me/${telegram.split("@")[1]}`;
              }

              return telegram;
            };
            return {
              ...data,
              telegram: mutateTelegram(data.telegram),
            };
          })
      ),
    });
    const FormBody = observer(({ onClose }: any) => (
      <>
        <ModalHeader className="flex flex-col gap-1">
          Update {pair.launchedToken?.displayName}
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="relative w-full h-[5rem] border-dashed border-amber-950 hover:border-amber-500 border-3 rounded-2xl mb-5  transition-all text-white hover:text-amber-500">
              <UploadImage
                imagePath={pair.bannerUrl}
                blobName={pair.address + "_banner"}
                onUpload={async (url) => {
                  console.log(url);
                  await launchpad.updateProjectBanner.call({
                    banner_url: url,
                    pair: pair.address,
                    chain_id: wallet.currentChainId,
                  });
                  pair.bannerUrl = url;
                }}
                variant="banner"
              ></UploadImage>{" "}
              <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold pointer-events-none">
                Upload Banner
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <UploadImage
                imagePath={
                  !!pair.logoUrl ? pair.logoUrl : "/images/project_honey.png"
                }
                blobName={pair.address + "_logo"}
                onUpload={async (url) => {
                  console.log(url);
                  await launchpad.updateProjectLogo.call({
                    logo_url: url,
                    pair: pair.address,
                    chain_id: wallet.currentChainId,
                  });
                  pair.logoUrl = url;
                }}
              ></UploadImage>
              <div className="text align opacity-50 text-center">
                Click icon to upload new token icon
              </div>
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
            isLoading={launchpad.updateProject.loading}
            color="primary"
            onPress={async () => {
              handleSubmit(async (data) => {
                await launchpad.updateProject.call({
                  pair: pair.address,
                  chain_id: wallet.currentChainId,
                  projectName: data.projectName,
                  description: data.description,
                  twitter: data.twitter || "",
                  website: data.website || "",
                  telegram: data.telegram || "",
                });
                if (launchpad.updateProject.error) {
                  WrappedToastify.error({
                    message: "Update failed",
                    title: "Update Project Detail",
                  });
                  return;
                }
                await pair.getProjectInfo();
                WrappedToastify.success({
                  message: "Update success",
                  title: "Update Project Detail",
                });
                onClose();
              })();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </>
    ));
    return (
      <ModalContent>
        {(onClose) => <FormBody onClose={onClose}></FormBody>}
      </ModalContent>
    );
  }
);

const SuccessAction = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      // <div className="flex gap-[16px] justify-center items-center flex-col lg:flex-row">
      //   {wallet.account != pair.provider && (
      //     <Button
      //       className="w-full"
      //       isLoading={pair.claimLP.loading}
      //       onClick={() => {
      //         pair.claimLP.call();
      //       }}
      //       isDisabled={!pair.canClaimLP}
      //     >
      //       {pair.canClaimLP ? "Claim LP" : "Claim LP (Not available)"}
      //     </Button>
      //   )}

      //   <Link
      //     href={`/swap?inputCurrency=${pair.launchedToken?.address}&outputCurrency=${pair.raiseToken?.address}`}
      //     className="text-black font-bold w-full"
      //   >
      //     <Button className="w-full">
      //       <p>BUY Token</p>
      //       <p>
      //         <Copy
      //           onClick={(e) => {
      //             e.preventDefault();
      //           }}
      //           className=" absolute ml-[8px] top-[50%] translate-y-[-50%]"
      //           value={`${window.location.origin}/swap?inputCurrency=${pair.raiseToken?.address}&outputCurrency=${pair.launchedToken?.address}`}
      //         ></Copy>
      //       </p>
      //     </Button>{" "}
      //   </Link>
      // </div>
      <SwapCard outputAddress={pair.launchedToken?.address} />
    );
  }
);
const FailAction = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <div className="flex flex-col gap-[16px]">
        {pair instanceof FtoPairContract && pair.isProvider && (
          <Button
            className="w-full"
            isLoading={pair.withdraw.loading}
            onClick={() => {
              pair.withdraw.call();
            }}
          >
            Provider Withdraw
          </Button>
        )}
        {pair instanceof MemePairContract && pair.canRefund && (
          <Button
            className="w-full"
            onClick={() => {
              pair.refund.call();
            }}
            isLoading={pair.refund.loading}
            style={{
              backgroundColor: "green",
            }}
          >
            Refund LP
          </Button>
        )}
      </div>
    );
  }
);

const PauseAction = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
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
  }
);

const ProcessingAction = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    const acc = useAccount();
    const state = useLocalObservable(() => ({
      depositAmount: "0",
      setDepositAmount(val: string) {
        this.depositAmount = val;
      },
    }));
    return (
      pair.raiseToken && (
        <div className="flex flex-col gap-[16px]">
          <Input
            className="bg-[#2F200B] rounded-[10px]"
            value={state.depositAmount}
            placeholder="Deposit amount"
            min={0}
            type="number"
            isClearable={false}
            max={pair.raiseToken.balance.toFixed()}
            onChange={(e) => {
              state.setDepositAmount(e.target.value);
            }}
            onBlur={() => {
              state.setDepositAmount(Number(state.depositAmount).toString());
            }}
            defaultValue="0"
            endContent={
              <div className="flex items-center">
                <span className="mr-2">{pair.raiseToken.displayName}</span>
                <TokenLogo token={pair.raiseToken} />
              </div>
            }
          ></Input>
          <div className="flex items-center gap-[8px]">
            <div>Balance: {pair.raiseToken.balance.toFormat(5)}</div>
            <div
              onClick={() => {
                state.setDepositAmount(
                  pair.raiseToken?.balance.toFixed() ?? "0"
                );
                pair.raiseToken?.getBalance();
              }}
              className="  cursor-pointer text-[color:var(--Button-Gradient,#F7931A)] text-base ml-[8px] font-bold leading-3 tracking-[0.16px] underline"
            >
              Max
            </div>
          </div>
          <Button
            className="w-full"
            isDisabled={!Number(state.depositAmount)}
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
      )
    );
  }
);

const Action = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    switch (pair.ftoState) {
      case 0:
        return <SuccessAction pair={pair}></SuccessAction>;
      case 1:
        return <FailAction pair={pair}></FailAction>;
      case 2:
        // return <PauseAction pair={pair}></PauseAction>;
        return <></>;
      case 3:
        if (pair.isCompleted) {
          return <></>;
        }
        return <ProcessingAction pair={pair}></ProcessingAction>;
    }
  }
);

export default Action;
