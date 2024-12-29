import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { observer } from "mobx-react-lite";
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
import { LaunchType as projectType } from "@/pages/launch-token";
import CardContianer from "../../CardContianer/CardContianer";
import BigNumber from "bignumber.js";
import { wallet } from "@/services/wallet";
import {
  LaunchProgress,
  FtoProjectActions,
  MemeProjectActions,
} from "./components";
import { formatAmount } from "@/lib/algebra/utils/common/formatAmount";
import { Button } from "@/components/button/button-next";

export type launchCardVariants =
  | "list"
  | "detail"
  | "trending"
  | "simple"
  | "featured";

export const LaunchCardComponentContainer = ({
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
          className="ml-auto text-black"
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
        <div className="text-[#202020]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl">{pair?.launchedToken?.name}</h3>
              <p className="text-sm text-[#202020]/[0.67]">
                {pair?.launchedToken?.symbol}
              </p>
            </div>
            <Image
              alt="logo"
              width={48}
              height={48}
              objectFit="cover"
              className="rounded-full max-h-12"
              src={!!pair.logoUrl ? pair.logoUrl : "/images/empty-logo.png"}
            />
          </div>
          <LaunchProgress pair={pair} className="my-3" />
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
            {pair.state === 0 && (
              <>
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
                          (Number(pair.launchedToken.totalValueLockedUSD) <
                          0.001
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
              </>
            )}
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
        className="flex flex-col gap-y-4 bg-white px-4 py-6 border-none rounded-3xl shadow-[2px_2px_0px_0px_#925425] relative overflow-hidden"
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
              <p className="text-sm  text-[#202020]/[0.67]">
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

const SimpleLaunchCard = observer(
  ({ pair }: { pair: MemePairContract | FtoPairContract }) => {
    return (
      <Link
        href={`/launch-detail/${pair.address}`}
        className="flex flex-col gap-y-1 bg-white px-4 py-6 border-none rounded-3xl shadow-[2px_2px_0px_0px_#FFCD4D] relative overflow-hidden hover:scale-95 hover:shadow-[2px_2px_0px_0px_#FFCD4D] hover:opacity-90 cursor-pointer transition-all duration-100"
      >
        <div className="bg-[url('/images/pumping/inline-border.svg')] h-6 absolute top-0 left-0 w-full bg-contain bg-left-top bg-repeat-x"></div>
        <div className="flex gap-4 w-full">
          <div>
            <Image
              alt="logo"
              width={48}
              height={48}
              objectFit="cover"
              className="rounded-full"
              src={!!pair.logoUrl ? pair.logoUrl : "/images/empty-logo.png"}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="font-bold text-xl">{pair?.launchedToken?.name}</h3>
            <p className="text-sm text-[#202020]/[0.67]">
              {pair?.launchedToken?.symbol}
            </p>
          </div>
          <div className="flex-grow-[1] text-right text-sm flex flex-col justify-start items-end">
            <div>
              {pair.state === 3 &&
                pair?.participantsCount &&
                pair.participantsCount.toFormat(0) + " Participants"}
              {pair.state === 0 &&
                pair?.launchedToken?.holderCount &&
                pair?.launchedToken?.holderCount + " Holders"}
            </div>
            {pair.state === 0 && (
              <div className="font-bold text-lg">
                {formatAmount(pair.launchedToken?.derivedUSD ?? "0", 5)}$
              </div>
            )}
          </div>
        </div>

        {pair.state === 3 && <LaunchProgress pair={pair} />}

        {pair.state === 0 && (
          <div className="grid grid-cols-3 gap-1 text-black">
            <div className="text-lg font-bold text-right col-span-3 flex flex-row justify-start items-center">
              <p className="flex flex-row gap-2 items-start justify-between w-full text-left">
                <span>
                  Price Change:{" "}
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
                    {pair.priceChangeDisplay}
                  </span>
                </span>
                <div className="text-right flex flex-row gap-2 items-center *:flex-grow-[1]">
                  <span>TX:</span>
                  <span className="text-green-400">
                    {pair?.launchedTokenBuyCount?.toFixed(0) ?? 0}
                  </span>
                  <span>/</span>
                  <span className="text-red-400">
                    {pair?.launchedTokenSellCount?.toFixed(0) ?? 0}
                  </span>
                </div>
              </p>
            </div>
            <div>
              <p className="text-xs opacity-60">Volume</p>
              <p className="font-semibold">
                <span>
                  {pair?.launchedToken?.volumeUSD
                    ? "$ " +
                      formatAmount(pair.launchedToken?.volumeUSD ?? "0", 5)
                    : "--"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs opacity-60">TVL</p>
              <p className="font-semibold">
                <span>
                  {pair?.launchedToken?.totalValueLockedUSD
                    ? "$ " +
                      formatAmount(
                        pair.launchedToken?.totalValueLockedUSD ?? "0",
                        5
                      )
                    : "--"}
                </span>
              </p>
            </div>{" "}
            <div>
              <p className="text-xs opacity-60">Market Cap</p>
              <p className="font-semibold">
                <span>
                  {pair?.launchedToken?.derivedUSD
                    ? "$ " +
                      formatAmount(
                        (
                          Number(pair.launchedToken.derivedUSD) *
                          Number(
                            pair?.launchedToken?.totalSupplyWithoutDecimals.div(
                              Math.pow(10, 18)
                            )
                          )
                        ).toFixed(2)
                      )
                    : "--"}
                </span>
              </p>
            </div>
          </div>
        )}
      </Link>
    );
  }
);

const FeaturedLaunchCard = observer(
  ({
    pair,
    projectType,
  }: {
    pair: MemePairContract | FtoPairContract;
    projectType: projectType;
  }) => {
    return (
      <div className="flex min-h-[200px] bg-white px-4 py-6 border-none rounded-3xl shadow-[2px_2px_0px_0px_#FFCD4D] relative transition-all duration-100">
        <div className="bg-[url('/images/pumping/inline-border.svg')] h-6 absolute top-0 left-0 w-full bg-contain bg-left-top bg-repeat-x"></div>
        <div className="flex gap-4 w-full  flex-col sm:flex-row ">
          <div className="rounded-full overflow-hidden bg-gold-primary aspect-square flex items-center justify-center">
            <Image
              alt="logo"
              width={200}
              height={200}
              objectFit="cover"
              className="rounded-full h-full aspect-square object-contain"
              src={!!pair.logoUrl ? pair.logoUrl : "/images/empty-logo.png"}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-[3rem]">
                {pair?.launchedToken?.symbol}
              </h2>
              <p className="text-xl text-[#202020]/[0.67]">
                {pair?.launchedToken?.name}
              </p>
            </div>
            <div>
              <div className="font-bold text-xl">
                <span>Token Price: </span>
                <span>
                  {formatAmount(pair.launchedToken?.derivedUSD ?? "0", 5)}$
                </span>
              </div>{" "}
              <div className="font-bold text-xl">
                <span>Price Change: </span>
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
                  {pair.priceChangeDisplay}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 p-4 bg-yellow-300/30 rounded-3xl flex-grow border-2 border-black">
            <div className="flex gap-2 items-center *:flex-grow-[1] justify-between">
              <span>Market Cap:</span>{" "}
              <span className="text-right">
                {formatAmount(
                  pair.launchedToken?.totalValueLockedUSD ?? "0",
                  5
                )}
                $
              </span>
            </div>
            <hr />{" "}
            <div className="flex gap-2 items-center *:flex-grow-[1] justify-between">
              <span>TX:</span>
              <div className="text-right">
                <span className="text-green-400">
                  {pair?.launchedTokenBuyCount?.toFixed(0) ?? 0}
                </span>
                <span>/</span>
                <span className="text-red-400">
                  {pair?.launchedTokenSellCount?.toFixed(0) ?? 0}
                </span>
              </div>
            </div>
            <hr />
            <div className="flex gap-2 items-center *:flex-grow-[1] justify-between">
              <span>Holders:</span>

              <span className="text-right">
                {pair?.launchedToken?.holderCount ?? 0}
              </span>
            </div>
            <hr />
            <div className="flex gap-2 items-center *:flex-grow-[1] justify-between">
              <span>Volume:</span>
              <span className="text-right">
                {pair?.launchedToken?.volumeUSD
                  ? "$ " + formatAmount(pair.launchedToken?.volumeUSD ?? "0", 5)
                  : "--"}
              </span>
            </div>
            <hr />
            <div className="flex gap-2 items-center *:flex-grow-[1] justify-between">
              <span>TVL:</span>
              <span className="text-right">
                {pair?.launchedToken?.totalValueLockedUSD
                  ? "$ " +
                    formatAmount(
                      pair.launchedToken?.totalValueLockedUSD ?? "0",
                      5
                    )
                  : "--"}
              </span>
            </div>
          </div>
          <Link
            className="absolute bottom-0 right-0 w-[200px] transition-all duration-100 translate-y-1/2 -translate-x-1/4"
            href={`/launch-detail/${pair.address}`}
          >
            <Button className="w-full border-yellow-500">Token Details</Button>
          </Link>
        </div>
      </div>
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
        {!wallet.currentChain?.blacklist?.memeBlacklist?.includes(
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
            {type === "simple" && pair && <SimpleLaunchCard pair={pair} />}
            {type === "featured" && pair && (
              <FeaturedLaunchCard pair={pair} projectType={projectType} />
            )}
          </motion.div>
        ) : (
          <></>
        )}
      </>
    );
  }
);
