import { useRouter } from "next/router";
import { Logo } from "@/components/svg/logo";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import launchpad from "@/services/launchpad";
import { NextLayoutPage } from "@/types/nextjs";
import { AsyncState } from "@/services/utils";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { wallet } from "@/services/wallet";
import { Button } from "@/components/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";
import { amountFormatted, truncate } from "@/lib/format";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiLinkExternal } from "react-icons/bi";
import PopUp from "@/components/PopUp/PopUp";
import ShareSocialMedialPopUp from "@/components/ShareSocialMedialPopUp/ShareSocialMedialPopUp";
import { trpcClient } from "@/lib/trpc";
import ProjectStatus from "@/components/atoms/TokenStatusDisplay/TokenStatus";
import ProjectStatusDisplay from "@/components/atoms/TokenStatusDisplay/TokenStatusDisplay";
import { UploadImage } from "@/components/UploadImage/UploadImage";
import {
  OptionsDropdown,
  optionsPresets,
} from "@/components/OptionsDropdown/OptionsDropdown";
import { VscCopy } from "react-icons/vsc";
import { useAccount } from "wagmi";
import { SimplePriceFeedGraph } from "@/components/PriceFeedGraph/SimplePriceFeedGraph";
import { chart } from "@/services/chart";
import { DiscussionArea } from "@/components/Discussion/DiscussionArea/DiscussionArea";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { WrappedToastify } from "@/lib/wrappedToastify";
import Countdown from "react-countdown";
import ProgressBar from "@/components/atoms/ProgressBar/ProgressBar";
import BigNumber from "bignumber.js";

import Action from "./componets/Action";
import Tabs from "./componets/Tabs";
import PriceFeedGraph from "@/components/PriceFeedGraph/PriceFeedGraph";
import { swap } from "@/services/swap";

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

const FtoView = observer(() => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { pair: pairAddress } = router.query;
  const [votes, setVotes] = useState({
    rocket_count: 0,
    fire_count: 0,
    poo_count: 0,
    flag_count: 0,
  });
  const state = useLocalObservable(() => ({
    pair: new AsyncState(async ({ pairAddress }: { pairAddress: string }) => {
      const pairInfo = await trpcClient.projects.getProjectInfo.query({
        pair: pairAddress,
        chain_id: wallet.currentChainId,
      });

      const pair =
        pairInfo?.project_type === "meme"
          ? new MemePairContract({ address: pairAddress as string })
          : new FtoPairContract({ address: pairAddress as string });
      console.log(pair);
      await pair.init();
      pair.raiseToken?.init(true, {
        loadIndexerTokenData: true,
      });
      pair.launchedToken?.init(true, {
        loadIndexerTokenData: true,
      });
      return pair;
    }),
  }));

  const account = useAccount();

  // remind provider to edit project details
  useEffect(() => {
    if (
      !state.pair.value ||
      !state.pair.value.isInit ||
      !state.pair.value.isProvider
    )
      return;

    if (
      !state.pair.value.logoUrl ||
      !state.pair.value.projectName ||
      !state.pair.value.description ||
      !state.pair.value.twitter ||
      !state.pair.value.website ||
      !state.pair.value.telegram
    ) {
      WrappedToastify.warn({
        message: (
          <div>
            <ul className="list-disc list-inside">
              {!state.pair.value.logoUrl && (
                <li className="text-orange-400">no icon</li>
              )}
              {!state.pair.value.projectName && (
                <li className="text-orange-400">no project name</li>
              )}
              {!state.pair.value.description && (
                <li className="text-orange-400">no description</li>
              )}
              {!state.pair.value.twitter && (
                <li className="text-orange-400">no twitter link</li>
              )}
              {!state.pair.value.website && (
                <li className="text-orange-400">no website link</li>
              )}
              {!state.pair.value.telegram && (
                <li className="text-orange-400">no telegram link</li>
              )}
            </ul>
            <p>
              Click{" "}
              <span
                onClick={() => {
                  onOpen();
                  toast.dismiss();
                }}
                className="text-blue-500 cursor-pointer"
              >
                here
              </span>{" "}
              to update the project
            </p>
          </div>
        ),
        options: {
          autoClose: false,
        },
      });
      return () => toast.dismiss();
    }
  }, [
    pairAddress,
    account.address,
    state.pair.value?.isProvider,
    state.pair.value,
    onOpen,
  ]);

  useEffect(() => {
    if (!wallet.isInit || !pairAddress) {
      return;
    }
    state.pair
      .call({
        pairAddress: pairAddress as string,
      })
      .then(() => {
        console.log("social: ", state.pair.value?.socials);
      });

    refreshVotes();
  }, [wallet.isInit, pairAddress]);

  useEffect(() => {
    if (!state.pair.value) {
      return;
    }
    chart.setCurrencyCode("USD");
    chart.setTokenNumber(0);
    chart.setChartTarget(state.pair.value?.launchedToken ?? undefined);
    chart.setChartLabel(state.pair.value?.launchedToken?.displayName + "/USD");
  }, [state.pair.value]);

  // useEffect(() => {
  //   if (!state.pair.value) return;
  //   if (router.query.edit == "true" && state.pair.value?.isProvider) {
  //     onOpen();
  //   }
  // }, [onOpen, router.query, state.pair.value, state.pair.value?.isProvider]);

  function refreshVotes() {
    trpcClient.projects.getProjectVotes
      .query({ pair: pairAddress as string })
      .then((data) => {
        setVotes(data);
      });
  }

  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto pb-[20vh]">
      {state.pair.value && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            base: "max-h-[70vh] overflow-y-scroll",
          }}
        >
          <UpdateProjectModal pair={state.pair.value}></UpdateProjectModal>
        </Modal>
      )}
      <Breadcrumbs
        breadcrumbs={[
          {
            title: "Projects",
            href: "/launch",
          },
          {
            title: state.pair.value?.launchedToken?.displayName || "-",
            href: "/launch-token",
          },
        ]}
      ></Breadcrumbs>
      <div className="flex justify-center mt-[24px]">
        <div className="flex gap-[20px] flex-wrap min-h-[425px]">
          <div className="flex-1 flex basis-full sm:basis-0 w-full sm:min-w-[500px] flex-col items-center  shrink-0 [background:#271B0C] rounded-2xl">
            <div className="relative flex h-[119px] shrink-0 self-stretch [background:radial-gradient(50%_50%_at_50%_50%,#9D5E28_0%,#FFCD4D_100%)] rounded-[12px_12px_0px_0px] overflow-hidden">
              {state.pair.value?.bannerUrl && (
                <Image
                  src={state.pair.value?.bannerUrl}
                  alt="banner"
                  layout="fill"
                  objectFit="cover"
                ></Image>
              )}
            </div>
            <div className="relative flex-1 w-full h-full px-[29px] pb-[26px]">
              <ProjectStatusDisplay pair={state.pair.value} />
              <div className=" relative translate-y-[-50%] w-[65px] h-[65px] [background:#271B0C] rounded-[11.712px] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center [background:#ECC94E] rounded-[11.712px] overflow-hidden">
                  <Image
                    src={
                      !!state.pair.value?.logoUrl
                        ? state.pair.value.logoUrl
                        : "/images/project_honey.png"
                    }
                    alt="honey"
                    fill
                  ></Image>
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <div>
                  <div>
                    <div className="text-[rgba(255,255,255,0.66)] text-base font-medium leading-[normal]">
                      {state.pair.value?.launchedToken?.displayName}
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
                    return social.name === "website" ? (
                      <PopUp
                        info="warning"
                        trigger={
                          <div key={social.name}>
                            <span className="cursor-pointer">
                              <Image
                                src={social.icon}
                                width={23}
                                height={23}
                                alt={social.name}
                              ></Image>
                            </span>
                          </div>
                        }
                        contents={
                          <div>
                            <h2 className="text-red-500 text-[2rem]">
                              Caution!
                            </h2>
                            <p>
                              This project is not verified, are you sure you
                              want to proceed to the website?
                            </p>
                            <div className="flex justify-end">
                              <Link
                                className="text-blue-500 text-right flex"
                                href={social.link}
                                target="_blank"
                              >
                                <Button>
                                  Proceed
                                  <BiLinkExternal />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        }
                      ></PopUp>
                    ) : (
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
              {state.pair.value?.launchedToken?.address && (
                <span className="flex justify-end flex-row ml-2 absolute right-4 bottom-4">
                  <ShareSocialMedialPopUp
                    shareUrl={window.location.href}
                    shareText={
                      "Checkout our Token " + state.pair.value?.projectName
                    }
                    text="Share this project"
                  />
                </span>
              )}
            </div>
          </div>
          <div className="text-left relative flex-1 flex basis-full w-full sm:basis-0 sm:min-w-[500px]  flex-col gap-[10px] shrink-0 [background:#271B0C] rounded-2xl py-[12px] px-[24px]">
            <div className="flex absolute right-[24px] top-[12px]">
              <OptionsDropdown
                className=""
                options={[
                  optionsPresets.copy({
                    copyText: state.pair?.value?.launchedToken?.address ?? "",
                    displayText: "Copy Token address",
                    copysSuccessText: "Token address copied",
                  }),
                  optionsPresets.share({
                    shareUrl: `${window.location.origin}/launch-detail/${state.pair?.value?.address}`,
                    displayText: "Share this project",
                    shareText:
                      "Checkout this Token: " + state.pair?.value?.projectName,
                  }),
                  optionsPresets.importTokenToWallet({
                    token: state.pair?.value?.launchedToken,
                  }),
                  optionsPresets.viewOnExplorer({
                    address: state.pair?.value?.address ?? "",
                  }),
                  {
                    icon: <LuFileEdit />,
                    display: "Update Project",
                    onClick: () => {
                      if (!state.pair.value) return;

                      if (
                        state.pair.value.provider.toLowerCase() !==
                        wallet.account.toLowerCase()
                      ) {
                        WrappedToastify.warn({
                          message: "You are not the owner of this project",
                        });
                        return;
                      }

                      onOpen();
                    },
                  },
                ]}
              />
            </div>
            <div>
              <div className="text-[rgba(255,255,255,0.66)] text-[15.958px] font-bold leading-[normal]">
                Token Raised
              </div>{" "}
              <div className="text-[color:var(--Button-Gradient,var(--card-stroke,#F7931A))] text-[16.727px] font-normal leading-[normal]">
                {amountFormatted(state.pair.value?.depositedRaisedToken, {
                  decimals: 0,
                  fixed: 3,
                })}{" "}
                {state.pair.value?.raiseToken?.displayName}
              </div>
            </div>
            {/* // TODO: raised progress */}
            {/* <div></div> */}
            <div>
              <div className="text-[rgba(255,255,255,0.66)] text-sm font-medium leading-[normal]">
                Token address
              </div>

              <Copy
                className={"w-full"}
                content="Copy address"
                value={state.pair.value?.launchedToken?.address ?? ""}
                displayContent={
                  <span className="mt-[8px] flex  h-[41px] justify-between items-center [background:#3B2912] px-3 py-0 rounded-[10px] cursor-pointer hover:brightness-150 active:brightness-75 select-none">
                    {state.pair.value?.launchedToken?.address}
                  </span>
                }
              />
            </div>

            <div className="grid grid-cols-2">
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
                    decimals: 0,
                    fixed: 3,
                    prefix: "$",
                  })}
                </div>
              </div>

              <div>
                <div className="flex gap-[4px] text-white text-[12.165px] font-bold leading-[normal]">
                  <Image
                    src="/images/wallet.png"
                    alt="price"
                    width={12}
                    height={12}
                  ></Image>
                  {state.pair.value?.ftoState === 0
                    ? "Market Cap"
                    : "Est. Market Cap"}
                </div>
                <div className="text-[#FFCD4D]  text-base font-medium leading-[normal] mt-[4px]">
                  {amountFormatted(state.pair.value?.marketValue, {
                    decimals: 0,
                    fixed: 3,
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
                <div className="text-[#FFCD4D] text-base font-medium leading-[normal] mt-[4px]">
                  {state.pair.value?.startTimeDisplay
                    ? new Date(
                        state.pair.value?.startTimeDisplay
                      ).toLocaleDateString()
                    : "--"}
                  <br />
                  {state.pair.value?.startTimeDisplay
                    ? new Date(
                        state.pair.value?.startTimeDisplay
                      ).toLocaleTimeString()
                    : "--"}
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
                  {state.pair.value?.endTimeDisplay
                    ? new Date(
                        state.pair.value?.endTimeDisplay
                      ).toLocaleDateString()
                    : "--"}
                  <br />
                  {state.pair.value?.endTimeDisplay
                    ? new Date(
                        state.pair.value?.endTimeDisplay
                      ).toLocaleTimeString()
                    : "--"}
                </div>
              </div>
            </div>
            <p>Token Vote</p>
            <hr />
            <div className="flex gap-5">
              {Object.entries(votes).map(([key, value]) => {
                return (
                  <div
                    key={key}
                    onClick={() => {
                      if (!wallet.account || !state.pair.value?.address) return;

                      trpcClient.projects.createOrUpdateProjectVotes
                        .mutate({
                          project_pair: state.pair.value?.address,
                          wallet_address: wallet.account,
                          vote: key.split("_")[0],
                        })
                        .then(() => {
                          refreshVotes();
                        });
                    }}
                    className="mt-[8px] flex-1 flex flex-col  justify-center items-center [background:#3B2912] px-3 py-3 rounded-[10px] hover:[background:#FFCD4D] active:[background:#F0A000] cursor-pointer select-none"
                  >
                    <p>
                      {(key.split("_")[0] === "rocket" && "🚀") ||
                        (key.split("_")[0] === "fire" && "🔥") ||
                        (key.split("_")[0] === "poo" && "💩") ||
                        (key.split("_")[0] === "flag" && "🚩")}
                    </p>
                    <p>{value}</p>
                  </div>
                );
              })}
            </div>
            <div>{state.pair.value?.ftoState}</div>
            {state.pair.value?.ftoState === 0 && (
              <SimplePriceFeedGraph></SimplePriceFeedGraph>
            )}
          </div>
        </div>
      </div>
      {/** Comment section */}
      <div className="flex justify-center mt-[24px] ">
        <div className="w-[100vw] lg:w-full lg:min-w-[1000px] lg:max-w-[1000px]">
          {state.pair.value && (
            <DiscussionArea
              pairDatabaseId={state.pair.value.databaseId ?? -1}
            ></DiscussionArea>
          )}
        </div>
      </div>
    </div>
  );
});

const MemeView = observer(() => {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { pair: pairAddress } = router.query;
  const [votes, setVotes] = useState({
    rocket_count: 0,
    fire_count: 0,
    poo_count: 0,
    flag_count: 0,
  });
  const state = useLocalObservable(() => ({
    pair: new AsyncState(async ({ pairAddress }: { pairAddress: string }) => {
      const pair = new MemePairContract({ address: pairAddress as string });
      await pair.init();
      pair.raiseToken?.init(true, {
        loadIndexerTokenData: true,
      });
      pair.launchedToken?.init(true, {
        loadIndexerTokenData: true,
      });
      console.log(pair);
      return pair;
    }),
  }));

  const account = useAccount();

  // remind provider to edit project details
  useEffect(() => {
    if (
      !state.pair.value ||
      !state.pair.value.isInit ||
      !state.pair.value.isProvider
    )
      return;

    if (
      !state.pair.value.logoUrl ||
      !state.pair.value.projectName ||
      !state.pair.value.description ||
      !state.pair.value.twitter ||
      !state.pair.value.website ||
      !state.pair.value.telegram
    ) {
      WrappedToastify.warn({
        message: (
          <div>
            <ul className="list-disc list-inside">
              {!state.pair.value.logoUrl && (
                <li className="text-orange-400">no icon</li>
              )}
              {!state.pair.value.projectName && (
                <li className="text-orange-400">no project name</li>
              )}
              {!state.pair.value.description && (
                <li className="text-orange-400">no description</li>
              )}
              {!state.pair.value.twitter && (
                <li className="text-orange-400">no twitter link</li>
              )}
              {!state.pair.value.website && (
                <li className="text-orange-400">no website link</li>
              )}
              {!state.pair.value.telegram && (
                <li className="text-orange-400">no telegram link</li>
              )}
            </ul>
            <p>
              Click{" "}
              <span
                onClick={() => {
                  onOpen();
                  toast.dismiss();
                }}
                className="text-blue-500 cursor-pointer"
              >
                here
              </span>{" "}
              to update the project
            </p>
          </div>
        ),
        options: {
          autoClose: false,
        },
      });
      return () => toast.dismiss();
    }
  }, [
    pairAddress,
    account.address,
    state.pair.value?.isProvider,
    state.pair.value,
    onOpen,
    router.query.edit,
    router,
  ]);

  useEffect(() => {
    if (!wallet.isInit || !pairAddress) {
      return;
    }
    state.pair.call({
      pairAddress: pairAddress as string,
    });

    refreshVotes();
  }, [wallet.isInit, pairAddress]);

  function refreshVotes() {
    trpcClient.projects.getProjectVotes
      .query({ pair: pairAddress as string })
      .then((data) => {
        setVotes(data);
      });
  }

  const pair = useMemo(() => state.pair.value, [state.pair.value]);

  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto pb-[20vh]">
      {state.pair.value && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            base: "max-h-[70vh] overflow-y-scroll",
          }}
        >
          <UpdateProjectModal pair={state.pair.value}></UpdateProjectModal>
        </Modal>
      )}
      <div className="grid grid-cols-2 gap-4 xl:w-[1170px]">
        <div className="bg-[#271A0C] col-span-2 px-5 py-2.5 rounded-[30px] flex md:items-center md:justify-between md:flex-row flex-col gap-2 md:gap-0">
          <div className="flex items-center gap-x-4 md:gap-x-[7.5px]">
            <div className="size-10 md:size-[77px] bg-[#ECC94E] flex items-center justify-center rounded-full">
              <Image
                alt={state.pair.value?.launchedToken?.name || "honey"}
                width={44}
                height={44}
                className="rounded-full hidden md:inline-block"
                src={
                  !!state.pair.value?.logoUrl
                    ? state.pair.value.logoUrl
                    : "/images/project_honey.png"
                }
              />
              <Image
                alt={state.pair.value?.launchedToken?.name || "honey"}
                width={20}
                height={20}
                className="rounded-full md:hidden"
                src={
                  !!state.pair.value?.logoUrl
                    ? state.pair.value.logoUrl
                    : "/images/project_honey.png"
                }
              />
            </div>
            <div className="flex flex-col gap-x-[7.5px] md:text-2xl">
              <div>{state.pair.value?.launchedToken?.name}</div>
              <div>{state.pair.value?.launchedToken?.displayName}</div>
            </div>
          </div>
          <div className="flex items-center md:gap-x-8 gap-x-0 justify-between md:justify-start">
            <div className="flex flex-col gap-y-2.5">
              {/* TODO: gradient color */}
              <div className="text-[#F7931A] xs:text-lg md:text-xl">
                Ends In
              </div>
              {state.pair.value?.endTime && (
                <Countdown
                  date={Number(state.pair.value?.endTime) * 1000}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed || state.pair.value?.ftoState !== 3) {
                      return state.pair.value?.endTimeDisplay;
                    } else {
                      return (
                        <div className="flex items-start md:gap-x-2">
                          <div className="flex flex-col items-center gap-y-1.5">
                            <span className="text-base">{days}</span>
                            <span className="text-xs text-white/45">Days</span>
                          </div>

                          <div>:</div>

                          <div className="flex flex-col items-center gap-y-1.5">
                            <span className="text-base">{hours}</span>
                            <span className="text-xs text-white/45">Hours</span>
                          </div>

                          <div>:</div>

                          <div className="flex flex-col items-center gap-y-1.5">
                            <span className="text-base">{minutes}</span>
                            <span className="text-xs text-white/45">
                              Minutes
                            </span>
                          </div>

                          <div>:</div>

                          <div className="flex flex-col items-center gap-y-1.5">
                            <span className="text-base">{seconds}</span>
                            <span className="text-xs text-white/45">
                              Seconds
                            </span>
                          </div>
                        </div>
                      );
                    }
                  }}
                />
              )}
            </div>
            {/* TODO: update style */}
            <ProjectStatus pair={state.pair.value} />
          </div>
        </div>
        <div className="bg-[#271A0C] p-5 rounded-2xl space-y-3 col-span-2 lg:col-span-1">
          {/* Token Raised */}
          <div className="flex flex-col gap-y-2">
            <div className="text-white md:text-base text-sm font-bold leading-[normal]">
              Token Raised
            </div>
            <div className="text-[color:var(--Button-Gradient,var(--card-stroke,#F7931A))]">
              <span className="font-bold">
                $
                {(pair?.depositedRaisedToken ?? BigNumber(0))
                  .multipliedBy(pair?.raiseToken?.derivedUSD ?? 1)
                  .toFixed(3)}
              </span>
              <span className="text-sm">
                / $
                {(pair?.raisedTokenMinCap ?? BigNumber(0))
                  .div(10 ** (pair?.raiseToken?.decimals ?? 0))
                  .multipliedBy(pair?.raiseToken?.derivedUSD ?? BigNumber(1))
                  .toFixed(3)}
              </span>
            </div>
          </div>
          {/* raised progress */}
          <div className="space-y-2">
            <div className="text-white text-sm font-bold leading-[normal]">
              Sale progress
            </div>
            <ProgressBar
              label={
                (
                  ((pair?.depositedRaisedToken ?? BigNumber(0)).toNumber() /
                    ((pair?.raisedTokenMinCap ?? BigNumber(1)).toNumber() /
                      Math.pow(10, 18))) *
                  100
                ).toFixed(2) + "%"
              }
              value={
                ((pair?.depositedRaisedToken ?? BigNumber(0)).toNumber() /
                  ((pair?.raisedTokenMinCap ?? BigNumber(1)).toNumber() /
                    Math.pow(10, 18))) *
                100
              }
            />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#FFCD4D]">
                  {pair?.ftoStatusDisplay?.status === "success"
                    ? (pair?.raisedTokenMinCap ?? BigNumber(0))
                        .div(10 ** (pair?.raiseToken?.decimals ?? 0))
                        .toFixed()
                    : (pair?.depositedRaisedToken ?? BigNumber(0)).toFixed()}
                </span>
                <span className="text-xs">
                  /
                  {(pair?.raisedTokenMinCap ?? BigNumber(0))
                    .div(10 ** (pair?.raiseToken?.decimals ?? 0))
                    .toFixed()}
                </span>
              </div>
            </div>
          </div>

          {/* Token Address */}
          <div>
            <div className="text-white text-sm font-medium leading-[normal]">
              Token address
            </div>

            <Copy
              className={"w-full"}
              content="Copy address"
              value={state.pair.value?.launchedToken?.address ?? ""}
              displayContent={
                <div className="relative">
                  <span className="mt-[8px] flex  h-[41px] justify-between items-center [background:#3B2912] px-3 py-0 rounded-[10px] cursor-pointer hover:brightness-150 active:brightness-75 select-none">
                    {truncate(
                      state.pair.value?.launchedToken?.address || "",
                      28
                    )}
                  </span>
                  <VscCopy className="size-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                </div>
              }
            />
          </div>

          <div className="grid grid-cols-4 *:margin">
            <div className="flex flex-col items-center">
              <div className="flex gap-[4px] text-white text-[12.165px] font-bold leading-[normal]">
                Token Price
              </div>
              <div className="text-[#FFCD4D] text-xs font-medium leading-[normal] mt-[4px]">
                {amountFormatted(state.pair.value?.price, {
                  decimals: 0,
                  fixed: 3,
                  prefix: "$",
                })}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex gap-[4px] text-white text-[12.165px] font-bold leading-[normal]">
                Funds Raised
              </div>
              <div className="text-[#FFCD4D] text-xs font-medium leading-[normal] mt-[4px]">
                {amountFormatted(pair?.depositedRaisedToken, {
                  decimals: 0,
                  fixed: 3,
                  prefix: "$",
                })}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-[4px] text-white text-xs font-bold leading-[normal]">
                {/* TODO: fix different size display */}
                <Image
                  width={12}
                  height={12}
                  alt="Start Date"
                  src="/images/calendar.png"
                />
                <span>Start Date</span>
              </div>
              <div className="text-[#FFCD4D]  text-xs font-medium leading-[normal] mt-[4px]">
                {pair?.startTimeDisplay && pair?.startTimeDisplay !== "-"
                  ? new Date(pair.startTimeDisplay).toLocaleDateString()
                  : "--"}
                <br />
                {pair?.startTimeDisplay && pair?.startTimeDisplay !== "-"
                  ? new Date(pair.startTimeDisplay).toLocaleTimeString()
                  : "--"}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex gap-1 text-white text-xs font-bold leading-[normal]">
                <Image
                  width={12}
                  height={12}
                  alt="End Date"
                  src="/images/calendar.png"
                />
                <span>End Date</span>
              </div>
              <div className="text-[#FFCD4D] text-xs font-medium leading-[normal] mt-[4px]">
                {pair?.endTimeDisplay && pair?.endTimeDisplay !== "-"
                  ? new Date(pair?.endTimeDisplay).toLocaleDateString()
                  : "--"}
                <br />
                {state.pair.value?.endTimeDisplay &&
                pair?.endTimeDisplay !== "-"
                  ? new Date(
                      state.pair.value?.endTimeDisplay
                    ).toLocaleTimeString()
                  : "--"}
              </div>
            </div>
          </div>
          <hr />
          <p className="text-white/65 text-sm mt-2.5">Rank Project</p>
          <div className="flex gap-5">
            {Object.entries(votes).map(([key, value]) => {
              return (
                <div
                  key={key}
                  onClick={() => {
                    if (!wallet.account || !state.pair.value?.address) return;

                    trpcClient.projects.createOrUpdateProjectVotes
                      .mutate({
                        project_pair: state.pair.value?.address,
                        wallet_address: wallet.account,
                        vote: key.split("_")[0],
                      })
                      .then(() => {
                        refreshVotes();
                      });
                  }}
                  className="mt-[8px] flex-1 flex flex-col  justify-center items-center [background:#3B2912] px-3 py-3 rounded-[10px] hover:[background:#FFCD4D] active:[background:#F0A000] cursor-pointer select-none"
                >
                  <p>
                    {(key.split("_")[0] === "rocket" && "🚀") ||
                      (key.split("_")[0] === "fire" && "🔥") ||
                      (key.split("_")[0] === "poo" && "💩") ||
                      (key.split("_")[0] === "flag" && "🚩")}
                  </p>
                  <p>{value}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[#271A0C] p-5 rounded-2xl space-y-3 col-span-2 lg:col-span-1">
          {pair && <Action pair={pair} />}
        </div>
      </div>

      <div className="w-full flex items-center justify-between my-4 md:my-12">
        <div className="text-lg md:text-xl">Project Details</div>
        <div className="flex items-center gap-x-1">
          <Logo />
          <span className='text-[#FFCD4D] [font-family:"Bebas_Neue"] text-lg md:text-3xl'>
            Honeypot Finance
          </span>
        </div>
      </div>

      <Tabs pair={pair} />
    </div>
  );
});

const LaunchPage: NextLayoutPage = observer(() => {
  const router = useRouter();
  const { pair: pairAddress } = router.query;
  const [projectInfo, setProjectInfo] = useState<{
    name: string | null;
    description: string | null;
    provider: string;
    project_type: string | null;
    id: number;
    twitter: string | null;
    telegram: string | null;
    website: string | null;
    logo_url: string | null;
    banner_url: string | null;
  } | null>(null);

  useEffect(() => {
    if (!pairAddress || !wallet.isInit) {
      return;
    }
    trpcClient.projects.getProjectInfo
      .query({
        pair: pairAddress as string,
        chain_id: wallet.currentChainId,
      })
      .then((data) => {
        setProjectInfo(data);
      });
  }, [pairAddress, wallet.isInit]);

  return (
    <div>
      {projectInfo && projectInfo?.project_type === "meme" ? (
        <MemeView></MemeView>
      ) : (
        <FtoView></FtoView>
      )}
    </div>
  );
});

export default LaunchPage;
