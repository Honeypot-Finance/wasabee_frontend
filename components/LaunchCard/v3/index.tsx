import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/button/button-next";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/tailwindcss";
import Image from "next/image";
import {
  OptionsDropdown,
  optionsPresets,
} from "../../OptionsDropdown/OptionsDropdown";
import { motion } from "framer-motion";
import { itemPopUpVariants } from "@/lib/animation";
import { MemePairContract } from "@/services/contract/memepair-contract";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import { AmountFormat } from "../../AmountFormat";
import { LaunchType as projectType } from "@/pages/launch-token";
import Countdown from "react-countdown";
import CardContianer from "../../CardContianer/CardContianer";
import BigNumber from "bignumber.js";
import { wallet } from "@/services/wallet";

type launchCardVariants = "list" | "detail" | "trending";

const ComponentContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 odd:last:col-span-2",
        className
      )}
    >
      {children}
    </div>
  );
};

//-------------------------------------Detail Components-------------------------------------//
const TimeLineComponent = observer(
  ({ pair }: { pair: MemePairContract | FtoPairContract }) => {
    const endedDisplay = <span>Ended!</span>;

    return (
      <ComponentContainer className="shrink-0 flex items-start">
        <h6 className="text-xs opacity-60">End Time</h6>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold">
            {pair?.endTime && (
              <Countdown
                date={Number(pair?.endTime) * 1000}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  if (completed || pair.state !== 3) {
                    return endedDisplay;
                  } else {
                    return (
                      <span>
                        {days ? `${days}d ` : ""}
                        {hours ? `${hours}h ` : ""}
                        {minutes ? `${minutes}m ` : ""}
                        {seconds ? `${seconds}s ` : ""}
                      </span>
                    );
                  }
                }}
              />
            )}
          </span>
        </div>
      </ComponentContainer>
    );
  }
);

const LaunchProgress = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    // 计算进度百分比
    const progressPercentage = new BigNumber(
      pair.depositedRaisedToken?.toNumber() ?? 0
    )
      .div(
        new BigNumber(
          (pair as MemePairContract).raisedTokenMinCap?.toNumber() ?? 0
        ).div(Math.pow(10, 18))
      )
      .times(100)
      .toFixed(2);

    // 计算进度值
    const progressValue =
      pair?.depositedRaisedToken && (pair as MemePairContract).raisedTokenMinCap
        ? (pair.depositedRaisedToken.toNumber() /
            (((pair as MemePairContract).raisedTokenMinCap?.toNumber() ?? 0) /
              Math.pow(10, 18))) *
          100
        : 0;

    // 如果进度超过100%，不显示组件
    if (Number(progressPercentage) >= 100) {
      return <div className="mt-4"></div>;
    }

    return (
      <div className="space-y-1.5 mt-4 text-[#202020]">
        <span className="text-sm opacity-70 space-x-1">
          <span>Progress</span>
          <span className="font-bold">({progressPercentage}%)</span>
        </span>
        <ProgressBar
          className="rounded-[24px] border border-black bg-white shadow-[2px_2px_0px_0px_#D29A0D]"
          value={progressValue}
        />
        <div className="flex items-center justify-between text-sm">
          <span className="space-x-0.5">
            <span>
              {(pair as MemePairContract)?.depositedRaisedToken?.toFormat(3)}
            </span>
            <span> {pair?.raiseToken?.displayName}</span>
          </span>
          <span className="font-bold">{progressPercentage}%</span>
        </div>
      </div>
    );
  }
);

const TotalLaunched = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <ComponentContainer>
        <h6 className="text-xs">Total launched</h6>
        <div className="flex items-center gap-2 text-sm">
          {/* <TotalRaisedSvg /> */}
          <span className="font-bold">
            {pair?.depositedLaunchedToken
              ? pair?.depositedLaunchedToken?.toFormat(0)
              : "-"}
            &nbsp;
            {pair?.launchedToken?.displayName}
          </span>
        </div>
      </ComponentContainer>
    );
  }
);

const Participants = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <ComponentContainer>
        <h6 className="text-xs">Participants</h6>
        <div className="flex items-center gap-2 text-sm">
          {/* <TotalRaisedSvg /> */}
          <span className="font-bold">
            {pair?.participantsCount ? pair.participantsCount.toFormat(0) : "-"}
          </span>
        </div>
      </ComponentContainer>
    );
  }
);

const TotalRaised = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <ComponentContainer>
        <h6 className="text-xs">Total raised</h6>
        <div className="flex items-center gap-2 text-sm">
          {/* <TotalRaisedSvg /> */}
          <span className="font-bold">
            {pair?.depositedRaisedToken
              ? pair.depositedRaisedToken.toFormat(3)
              : "-"}
            &nbsp;
            {pair?.raiseToken?.displayName}
          </span>
        </div>
      </ComponentContainer>
    );
  }
);

const TokenPrice = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <div className="flex flex-col items-center gap-1  odd:last:col-span-2">
        <h6 className="text-xs">Token Price</h6>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold">
            <AmountFormat amount={pair?.price?.toFixed()}></AmountFormat>{" "}
            {pair?.raiseToken?.displayName}
          </span>
        </div>
      </div>
    );
  }
);

const UserDeposited = observer(({ pair }: { pair: FtoPairContract }) => {
  return (
    <ComponentContainer>
      <h6 className="text-xs">Your Deposit</h6>
      <div className="flex items-center gap-2 text-sm">
        {/* <TotalRaisedSvg /> */}
        <span className="font-bold">
          {pair?.userDepositedRaisedToken
            ? (
                pair.userDepositedRaisedToken.toNumber() /
                Math.pow(10, pair.raiseToken?.decimals ?? 18)
              ).toFixed(3)
            : "-"}
          &nbsp;
          {pair?.raiseToken?.displayName}
        </span>
      </div>
    </ComponentContainer>
  );
});

//-------------------------------------Action Components-------------------------------------//
const ClaimAction = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <>
        {pair.canClaimLP && (
          <div>
            <Button
              className="w-full"
              onClick={() => {
                pair.claimLP.call();
              }}
              style={{
                backgroundColor: "green",
              }}
            >
              Claim LP
            </Button>
          </div>
        )}
      </>
    );
  }
);

const RefundAction = observer(({ pair }: { pair: MemePairContract }) => {
  return (
    <>
      {pair.canRefund && (
        <div>
          <Button
            className="w-full"
            onClick={() => {
              pair.refund.call();
            }}
            style={{
              backgroundColor: "green",
            }}
          >
            Refund
          </Button>
        </div>
      )}
    </>
  );
});

const ToTokenDetailsPage = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <Link href={`/launch-detail/${pair?.address}`}>
        <Button className="w-full">View Token</Button>
      </Link>
    );
  }
);

const BuyToken = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <>
        {pair.state === 0 && (
          <Link
            href={`/swap?inputCurrency=${pair.raiseToken?.address}&outputCurrency=${pair.launchedToken?.address}`}
          >
            <Button className="w-full">Buy Token</Button>
          </Link>
        )}
      </>
    );
  }
);

const AddLP = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <>
        {pair.state === 0 && (
          <Link
            href={`/pool?inputCurrency=${pair.launchedToken?.address}&outputCurrency=${pair.raiseToken?.address}`}
          >
            <Button className="w-full">Add LP</Button>
          </Link>
        )}
      </>
    );
  }
);

//-------------------------------------Launch Card-------------------------------------//
const MemeProjectDetails = observer(
  ({ pair, type }: { pair: MemePairContract; type: launchCardVariants }) => {
    console.log("pair.ftoState", pair.state);
    return (
      <>
        {pair.state === 3 && (
          <>
            <TotalRaised pair={pair} />
            <Participants pair={pair} />
          </>
        )}
      </>
    );
  }
);

const FtoProjectDetails = observer(
  ({ pair, type }: { pair: FtoPairContract; type: launchCardVariants }) => {
    return (
      <>
        <TimeLineComponent pair={pair} />
        <TotalLaunched pair={pair} />
        <TotalRaised pair={pair} />
        {pair.state === 3 && (
          <>
            <UserDeposited pair={pair} />
          </>
        )}
        {pair.state === 0 && (
          <>
            <TokenPrice pair={pair} />
          </>
        )}
      </>
    );
  }
);

const MemeProjectActions = observer(
  ({ pair, type }: { pair: MemePairContract; type: launchCardVariants }) => {
    return (
      <>
        <ClaimAction pair={pair} />
        <RefundAction pair={pair} />
        <ToTokenDetailsPage pair={pair} />
        <BuyToken pair={pair} />
        <AddLP pair={pair} />
      </>
    );
  }
);

const FtoProjectActions = ({
  pair,
  type,
}: {
  pair: FtoPairContract;
  type: launchCardVariants;
}) => {
  return (
    <>
      <ClaimAction pair={pair} />
      <ToTokenDetailsPage pair={pair} />
      <BuyToken pair={pair} />
      <AddLP pair={pair} />
    </>
  );
};

const ProjectDetail = ({
  projectType,
  pair,
  type,
}: {
  projectType: projectType;
  pair: FtoPairContract | MemePairContract;
  type: launchCardVariants;
}) => {
  if (projectType === "meme") {
    return (
      <MemeProjectDetails
        pair={pair as MemePairContract}
        type={type}
      ></MemeProjectDetails>
    );
  } else {
    return (
      <FtoProjectDetails
        pair={pair as FtoPairContract}
        type={type}
      ></FtoProjectDetails>
    );
  }
};

const ProjectActions = ({
  projectType,
  pair,
  type,
}: {
  projectType: projectType;
  pair: FtoPairContract | MemePairContract;
  type: launchCardVariants;
}) => {
  if (projectType === "meme") {
    return (
      <MemeProjectActions
        pair={pair as MemePairContract}
        type={type}
      ></MemeProjectActions>
    );
  } else {
    return (
      <FtoProjectActions
        pair={pair as FtoPairContract}
        type={type}
      ></FtoProjectActions>
    );
  }
};

//-------------------------------------Launch Card Variants-------------------------------------//
const DetailLaunchCard = observer(
  ({
    pair,
    action,
    projectType,
    type,
  }: {
    pair: FtoPairContract | MemePairContract;
    action: React.ReactNode;
    projectType: projectType;
    type: launchCardVariants;
  }) => {
    return (
      <div className="flex flex-col gap-y-4 bg-white px-4 py-6 border-none rounded-3xl shadow-[2px_2px_0px_0px_#FFCD4D] relative overflow-hidden">
        <OptionsDropdown
          className="absolute right-0 top-[1rem] text-black"
          options={[
            optionsPresets.copy({
              copyText: pair?.launchedToken?.address ?? "",
              displayText: "Copy Token address",
              copysSuccessText: "Token address copied",
            }),
            optionsPresets.importTokenToWallet({
              token: pair?.launchedToken,
            }),
            optionsPresets.share({
              shareUrl: `${window.location.origin}/launch-detail/${pair?.address}`,
              displayText: "Share this project",
              shareText:
                projectType === "meme"
                  ? "My Meme FTO eats bonding burves for breakfast. Inflate & innovation with Boneypot. Den moon 🌙: " +
                    pair?.projectName
                  : "Checkout this Token: " + pair?.projectName,
            }),
            optionsPresets.viewOnExplorer({
              address: pair?.address ?? "",
            }),
          ]}
        />
        <div className="bg-[url('/images/pumping/inline-border.svg')] h-6 absolute top-0 left-0 w-full bg-contain bg-left-top bg-repeat-x"></div>
        <Image
          alt="banner"
          width={256}
          height={0}
          objectFit="cover"
          className="mx-auto w-fit h-[108px] bg-contain rounded-xl"
          src={
            !!pair.bannerUrl
              ? pair.bannerUrl
              : "/images/pumping/trade-card-bg.png"
          }
        />
        <div className="text-[#202020]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl">{pair?.launchedToken?.name}</h3>
              <p className="text-sm text-muted-foreground text-[#202020]/[0.67]">
                {pair?.launchedToken?.symbol}
              </p>
            </div>
            <Image
              alt="logo"
              width={48}
              height={48}
              objectFit="cover"
              className="rounded-full"
              src={!!pair.logoUrl ? pair.logoUrl : "/images/empty-logo.png"}
            />
          </div>

          <LaunchProgress pair={pair} />

          <div className="grid grid-cols-2 gap-4 text-black">
            <div>
              <p className="text-xs opacity-60">Total Raised Token</p>
              <p className="font-semibold">
                <span>
                  {pair?.depositedRaisedToken && pair.raiseToken
                    ? "$" +
                      pair.depositedRaisedToken
                        .multipliedBy(pair?.raiseToken?.derivedUSD || 0)
                        .toFormat(3)
                    : "-"}
                  &nbsp;
                  {pair?.raiseToken?.displayName}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-60">Participants Count</p>
              <p className="font-semibold">
                <span>
                  {pair?.participantsCount
                    ? pair.participantsCount.toFormat(0)
                    : "-"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs opacity-60">Volume</p>
              <p className="font-semibold">
                <span>
                  {pair?.launchedToken?.volumeUSD
                    ? "$ " +
                      (Number(pair.launchedToken.volumeUSD) < 0.001
                        ? "<0.001"
                        : Number(pair.launchedToken.volumeUSD).toFixed(3))
                    : "--"}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-60">TVL</p>
              <p className="font-semibold">
                <span>
                  {pair?.launchedToken?.totalValueLockedUSD
                    ? "$ " +
                      (Number(pair.launchedToken.totalValueLockedUSD) < 0.001
                        ? "<0.001"
                        : Number(
                            pair.launchedToken.totalValueLockedUSD
                          ).toFixed(3))
                    : "--"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs opacity-60">Current Price</p>
              <p className="font-semibold">
                <span>
                  {pair?.launchedToken?.derivedUSD
                    ? "$ " +
                      (Number(pair.launchedToken.derivedUSD) < 0.001
                        ? "<0.001"
                        : Number(pair.launchedToken.derivedUSD).toFixed(3))
                    : "--"}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-60">Price Change</p>
              <p className="font-semibold">
                <span
                  className={cn(
                    Number(pair?.launchedToken?.initialUSD) &&
                      Number(pair?.launchedToken?.derivedUSD) &&
                      (Number(pair?.launchedToken?.derivedUSD) >
                      Number(pair?.launchedToken?.initialUSD)
                        ? "text-green-500"
                        : "text-red-500")
                  )}
                >
                  {pair?.launchedToken?.derivedUSD &&
                  Number(pair?.launchedToken?.derivedUSD) &&
                  pair?.launchedToken?.initialUSD &&
                  Number(pair.launchedToken.initialUSD)
                    ? Number(pair.launchedToken.derivedUSD) >
                      Number(pair.launchedToken.initialUSD)
                      ? `${((Number(pair.launchedToken.derivedUSD) / Number(pair.launchedToken.initialUSD)) * 100).toFixed(2)}%`
                      : `-${((Number(pair.launchedToken.initialUSD) / Number(pair.launchedToken.derivedUSD)) * 100).toFixed(2)}%`
                    : "--"}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#202020]"></div>
        <div className="flex flex-col text-black">
          <TimeLineComponent pair={pair} />
          <div className="w-full mt-[16px] flex gap-4 flex-col sm:flex-row justify-center sm:items-end flex-wrap *:basis-1 grow-[1] *:grow-[1]">
            <ProjectActions projectType={projectType} pair={pair} type={type} />
            {action}
          </div>
        </div>
      </div>
    );
  }
);

const TrendingLaunchCard = observer(
  ({
    pair,
    projectType,
  }: {
    pair: FtoPairContract | MemePairContract;
    projectType: projectType;
  }) => {
    return projectType === "meme" ? (
      <Link
        className="flex flex-col bg-white px-4 py-6 border-none rounded-3xl shadow-[2px_2px_0px_0px_#925425] relative overflow-hidden"
        href={`/launch-detail/${pair.address}`}
      >
        <div className="bg-[url('/images/pumping/inline-border.png')] bg-top h-6 absolute top-0 left-0 w-full bg-contain"></div>
        <Image
          alt="banner"
          width={256}
          height={0}
          objectFit="cover"
          className="w-full h-[108px] rounded-xl"
          src={
            !!pair.bannerUrl
              ? pair.bannerUrl
              : "/images/pumping/trade-card-bg.png"
          }
        />
        <div className="text-[#202020]">
          <div className="flex justify-between items-start mt-4">
            <div>
              <h3 className="font-bold text-xl">{pair?.launchedToken?.name}</h3>
              <p className="text-sm text-muted-foreground text-[#202020]/[0.67]">
                {pair?.launchedToken?.symbol}
              </p>
            </div>
            <Image
              alt="logo"
              width={48}
              height={48}
              objectFit="cover"
              className="rounded-full"
              src={!!pair.logoUrl ? pair.logoUrl : "/images/empty-logo.png"}
            />
          </div>

          <div className="space-y-1.5 mt-4 text-black">
            <span className="text-sm text-[#202020]/80">Total Raised</span>
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                {pair?.depositedRaisedToken
                  ? pair.depositedRaisedToken.toFormat(0)
                  : "-"}
              </span>
              <span>
                {(pair as MemePairContract).raisedTokenMinCap &&
                  ((pair as MemePairContract).raisedTokenMinCap
                    ?.div(Math.pow(10, 18))
                    .toFixed(0) ??
                    0)}
                &nbsp;
                {pair?.raiseToken?.displayName}
              </span>
            </div>
            <ProgressBar
              className="rounded-[24px] border border-black bg-white shadow-[2px_2px_0px_0px_#D29A0D]"
              value={
                pair?.depositedRaisedToken &&
                (pair as MemePairContract).raisedTokenMinCap
                  ? (pair.depositedRaisedToken.toNumber() /
                      (((
                        pair as MemePairContract
                      ).raisedTokenMinCap?.toNumber() ?? 0) /
                        Math.pow(10, 18))) *
                    100
                  : 0
              }
            />
            <div className="flex justify-end text-sm">
              <span className="font-bold">
                {(pair as MemePairContract)?.depositedRaisedToken &&
                (pair as MemePairContract).raisedTokenMinCap
                  ? new BigNumber(
                      (
                        pair as MemePairContract
                      ).depositedRaisedToken?.toNumber() ?? 0
                    )
                      .div(
                        new BigNumber(
                          (
                            pair as MemePairContract
                          ).raisedTokenMinCap?.toNumber() ?? 0
                        ).div(Math.pow(10, 18))
                      )
                      .times(100)
                      .toFixed(2)
                  : "-"}{" "}
                %
              </span>
            </div>
          </div>
        </div>
      </Link>
    ) : (
      <CardContianer addtionalClassName="z-[-1] cursor-pointer">
        {(pair.bannerUrl || pair.logoUrl) && (
          <Image
            className="opacity-[0.5] z-[-1] "
            src={!!pair.bannerUrl ? pair.bannerUrl : pair.logoUrl}
            alt="banner"
            layout="fill"
            objectFit="cover"
          ></Image>
        )}
        <Link
          href={`/launch-detail/${pair.address}`}
          className="flex w-full flex-col gap-2 justify-center items-center flex-grow-[1] basis-1"
        >
          <div className="flex flex-col gap-2 justify-center items-center flex-grow-[1] basis-1">
            <div className="w-14 flex items-center justify-center rounded-lg bg-gold-primary aspect-square overflow-hidden">
              <Image
                src={!!pair?.logoUrl ? pair.logoUrl : "/images/empty-logo.png"}
                alt="honey"
                width={100}
                height={100}
                objectFit="cover"
                className="w-full h-full"
              ></Image>
            </div>
            <h4 className="text-white text-center text-[1rem] font-bold flex items-center">
              <div className=" relative">
                {pair?.launchedToken?.name} <br />({pair?.launchedToken?.symbol}
                )
              </div>
            </h4>{" "}
            <motion.div className="flex flex-col items-center gap-1">
              <h6 className="opacity-50 text-xs">Total raised</h6>
              <div className="flex items-center gap-2 text-sm">
                {/* <TotalRaisedSvg /> */}
                <span className="font-bold">
                  {pair?.depositedRaisedToken
                    ? pair.depositedRaisedToken.toFormat(0)
                    : "-"}{" "}
                  &nbsp;
                  {pair?.raiseToken?.displayName}
                </span>
              </div>
            </motion.div>
          </div>
        </Link>
      </CardContianer>
    );
  }
);

export const LaunchCardV3 = observer(
  ({
    pair,
    action,
    type,
    className,
  }: {
    type?: launchCardVariants;
    pair?: FtoPairContract | MemePairContract | null;
    action: React.ReactNode;
  } & Partial<HTMLAttributes<any>>) => {
    const projectType: projectType =
      pair instanceof MemePairContract ? "meme" : "fto";

    return (
      <>
        {!wallet.currentChain.blacklist?.memeBlacklist?.includes(
          pair?.address?.toLowerCase() || ""
        ) ? (
          <motion.div
            initial="hidden"
            animate="visible"
            whileInView="visible"
            variants={itemPopUpVariants}
            className={cn("w-full", className)}
          >
            {(!type || type === "detail") && pair && (
              // FIXME: height issue
              <DetailLaunchCard
                pair={pair}
                action={action}
                type="detail"
                projectType={projectType}
              />
            )}

            {type === "list" && pair && <div>To be implemented</div>}

            {type === "trending" && pair && (
              <TrendingLaunchCard pair={pair} projectType={projectType} />
            )}
          </motion.div>
        ) : (
          <></>
        )}
      </>
    );
  }
);
