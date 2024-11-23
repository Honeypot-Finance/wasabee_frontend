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
import Image from "next/image";
import { amountFormatted, truncate } from "@/lib/format";
import { Copy } from "@/components/copy";
import { Skeleton } from "@nextui-org/skeleton";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpcClient } from "@/lib/trpc";
import ProjectStatus from "@/components/atoms/TokenStatusDisplay/TokenStatus";
import { UploadImage } from "@/components/UploadImage/UploadImage";
import { VscCopy } from "react-icons/vsc";
import { useAccount } from "wagmi";
import { chart } from "@/services/chart";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { WrappedToastify } from "@/lib/wrappedToastify";
import Countdown from "react-countdown";
import ProgressBar from "@/components/atoms/ProgressBar/ProgressBar";
import BigNumber from "bignumber.js";
import Action from "./componets/Action";
import Tabs from "./componets/Tabs";
import CountdownTimer from "./componets/Countdown";
import ProjectTitle from "./componets/ProjectTitle";
import TokenRaised from "./componets/TokenRaised";
import SaleProgress from "./componets/SaleProgress";
import TokenAddress from "./componets/TokenAddress";
import TokenDetails from "./componets/TokenDetails";

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

  const pair = useMemo(() => state.pair.value, [state.pair.value]);

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
    <div className="px-2 md:px-6 xl:max-w-[1200px] mx-auto pb-[20vh]">
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
                width={state.pair.value?.logoUrl ? 77 : 44}
                height={state.pair.value?.logoUrl ? 77 : 44}
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
            <ProjectTitle
              name={pair?.launchedToken?.name}
              displayName={pair?.launchedToken?.displayName}
            />
          </div>
          <div className="flex items-center md:gap-x-8 gap-x-0 justify-between md:justify-start">
            <CountdownTimer
              endTime={pair?.endTime}
              ftoState={state.pair.value?.ftoState}
              endTimeDisplay={state.pair.value?.endTimeDisplay}
            />
            {/* TODO: update style */}
            <ProjectStatus
              isValidated={pair?.isValidated}
              ftoStatusDisplayColor={pair?.ftoStatusDisplay?.color}
              ftoStatusDisplayStatus={pair?.ftoStatusDisplay?.status}
            />
          </div>
        </div>
        <div className="bg-[#271A0C] p-5 rounded-2xl space-y-3 col-span-2 lg:col-span-1">
          <TokenRaised
            depositedRaisedToken={pair?.depositedRaisedToken}
            raiseTokenDerivedUSD={pair?.raiseToken?.derivedUSD}
            raisedTokenMinCap={pair?.raiseToken?.balance}
            raiseTokenDecimals={pair?.raiseToken?.decimals}
          />

          <SaleProgress
            ftoStatusDisplayStatus={pair?.ftoStatusDisplay?.status}
            raiseTokenBalance={pair?.raiseToken?.balance}
            raiseTokenDecimals={pair?.raiseToken?.decimals}
            depositedRaisedToken={pair?.depositedRaisedToken}
          />

          <TokenAddress address={pair?.launchedToken?.address} />

          <TokenDetails
            price={pair?.price}
            depositedRaisedToken={pair?.depositedRaisedToken}
            startTimeDisplay={pair?.startTimeDisplay}
            endTimeDisplay={pair?.endTimeDisplay}
          />

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

  useEffect(() => {
    if (!state.pair.value?.launchedToken) {
      return;
    }
    chart.setCurrencyCode("USD");
    chart.setTokenNumber(0);
    chart.setChartTarget(state.pair.value.launchedToken);
    chart.setChartLabel(state.pair.value.launchedToken?.displayName + "/USD");
    console.log("chart", chart);
  }, [state.pair.value?.launchedToken]);

  function refreshVotes() {
    trpcClient.projects.getProjectVotes
      .query({ pair: pairAddress as string })
      .then((data) => {
        setVotes(data);
      });
  }

  const pair = useMemo(() => state.pair.value, [state.pair.value]);

  return (
    <div className="px-2 md:px-6 xl:max-w-[1200px] mx-auto pb-[20vh]">
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
                width={state.pair.value?.logoUrl ? 77 : 44}
                height={state.pair.value?.logoUrl ? 77 : 44}
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
            <ProjectTitle
              name={pair?.launchedToken?.name}
              displayName={pair?.launchedToken?.displayName}
            />
          </div>
          <div className="flex items-center md:gap-x-8 gap-x-0 justify-between md:justify-start">
            <CountdownTimer
              endTime={pair?.endTime}
              ftoState={state.pair.value?.ftoState}
              endTimeDisplay={state.pair.value?.endTimeDisplay}
            />
            {/* TODO: update style */}
            <ProjectStatus
              isValidated={pair?.isValidated}
              ftoStatusDisplayColor={pair?.ftoStatusDisplay?.color}
              ftoStatusDisplayStatus={pair?.ftoStatusDisplay?.status}
            />
          </div>
        </div>
        <div className="bg-[#271A0C] p-5 rounded-2xl space-y-3 col-span-2 lg:col-span-1">
          <TokenRaised
            depositedRaisedToken={pair?.depositedRaisedToken}
            raiseTokenDerivedUSD={pair?.raiseToken?.derivedUSD}
            raisedTokenMinCap={pair?.raisedTokenMinCap}
            raiseTokenDecimals={pair?.raiseToken?.decimals}
          />

          <SaleProgress
            ftoStatusDisplayStatus={pair?.ftoStatusDisplay?.status}
            raiseTokenBalance={pair?.raisedTokenMinCap}
            raiseTokenDecimals={pair?.raiseToken?.decimals}
            depositedRaisedToken={pair?.depositedRaisedToken}
          />

          <TokenAddress address={pair?.launchedToken?.address} />

          <TokenDetails
            price={pair?.price}
            depositedRaisedToken={pair?.depositedRaisedToken}
            startTimeDisplay={pair?.startTimeDisplay}
            endTimeDisplay={pair?.endTimeDisplay}
          />

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
