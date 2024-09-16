import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/button";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/tailwindcss";
import ProjectStatusDisplay from "../atoms/TokenStatusDisplay/TokenStatusDisplay";
import Image from "next/image";
import {
  OptionsDropdown,
  optionsPresets,
} from "../OptionsDropdown/OptionsDropdown";
import { motion } from "framer-motion";
import { itemPopUpVariants } from "@/lib/animation";
import { MemePairContract } from "@/services/contract/memepair-contract";
import ProgressBar from "../atoms/ProgressBar/ProgressBar";
import { AmountFormat } from "../AmountFormat";
import { LaunchType as projectType } from "@/pages/launch-token";
import Countdown from "react-countdown";

const ComponentComtainer = ({
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
      <ComponentComtainer>
        <h6 className="opacity-50 text-xs">End Time</h6>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold">
            {
              //pair?.remainTime
            }
            {pair?.endTime && (
              <Countdown
                date={Number(pair?.endTime) * 1000}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  if (completed || pair.ftoState !== 3) {
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
      </ComponentComtainer>
    );
  }
);

const LaunchProgress = observer(({ pair }: { pair: MemePairContract }) => {
  return (
    <>
      {pair.depositedRaisedToken && pair.raisedTokenMinCap && (
        <ComponentComtainer>
          <h6 className="opacity-50 text-xs">Progress</h6>
          <div className="flex items-center gap-2 text-sm w-[80%]">
            <ProgressBar
              label={
                (
                  (pair.depositedRaisedToken.toNumber() /
                    (pair.raisedTokenMinCap.toNumber() / Math.pow(10, 18))) *
                  100
                ).toFixed(2) + "%"
              }
              value={
                (pair.depositedRaisedToken.toNumber() /
                  (pair.raisedTokenMinCap.toNumber() / Math.pow(10, 18))) *
                100
              }
            />
          </div>
        </ComponentComtainer>
      )}
    </>
  );
});

const TotalLaunched = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <ComponentComtainer>
        <h6 className="opacity-50 text-xs">Total launched</h6>
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
      </ComponentComtainer>
    );
  }
);

const TotalRaised = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <ComponentComtainer>
        <h6 className="opacity-50 text-xs">Total raised</h6>
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
      </ComponentComtainer>
    );
  }
);

const TokenPrice = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <div className="flex flex-col items-center gap-1  odd:last:col-span-2">
        <h6 className="opacity-50 text-xs">Token Price</h6>
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
    <ComponentComtainer>
      <h6 className="opacity-50 text-xs">Your Deposit</h6>
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
    </ComponentComtainer>
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
        {pair.ftoState === 0 && (
          <Link
            href={`/swap?inputCurrency=${pair.launchedToken?.address}&outputCurrency=${pair.raiseToken?.address}`}
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
        {pair.ftoState === 0 && (
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
const MemeProjectDetails = observer(({ pair }: { pair: MemePairContract }) => {
  console.log("pair.ftoState", pair.ftoState);
  return (
    <>
      <TimeLineComponent pair={pair} />
      {pair.ftoState === 3 && (
        <>
          <LaunchProgress pair={pair} />
          <TotalRaised pair={pair} />
          <TokenPrice pair={pair} />
        </>
      )}
    </>
  );
});

const FtoProjectDetails = observer(({ pair }: { pair: FtoPairContract }) => {
  return (
    <>
      <TimeLineComponent pair={pair} />
      <TotalLaunched pair={pair} />
      <TotalRaised pair={pair} />
      <UserDeposited pair={pair} />
    </>
  );
});

const MemeProjectActions = observer(({ pair }: { pair: MemePairContract }) => {
  return (
    <>
      <ClaimAction pair={pair} />
      <RefundAction pair={pair} />
      <ToTokenDetailsPage pair={pair} />
      <BuyToken pair={pair} />
      <AddLP pair={pair} />
    </>
  );
});

const FtoProjectActions = ({ pair }: { pair: FtoPairContract }) => {
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
}: {
  projectType: projectType;
  pair: FtoPairContract | MemePairContract;
}) => {
  if (projectType === "meme") {
    return (
      <MemeProjectDetails pair={pair as MemePairContract}></MemeProjectDetails>
    );
  } else {
    return (
      <FtoProjectDetails pair={pair as FtoPairContract}></FtoProjectDetails>
    );
  }
};

const ProjectActions = ({
  projectType,
  pair,
}: {
  projectType: projectType;
  pair: FtoPairContract | MemePairContract;
}) => {
  if (projectType === "meme") {
    return (
      <MemeProjectActions pair={pair as MemePairContract}></MemeProjectActions>
    );
  } else {
    return (
      <FtoProjectActions pair={pair as FtoPairContract}></FtoProjectActions>
    );
  }
};

export const LaunchCard = observer(
  ({
    pair,
    action,
    type,
    className,
  }: {
    type?: "list" | "detail";
    pair?: FtoPairContract | MemePairContract | null;
    action: React.ReactNode;
  } & Partial<HTMLAttributes<any>>) => {
    const projectType: projectType =
      pair instanceof MemePairContract ? "meme" : "fto";

    return (
      <motion.div
        variants={itemPopUpVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "flex h-full flex-col justify-center items-center gap-2 border bg-[#1D1407] backdrop-blur-[13.5px] px-2.5 py-3 rounded-[20px] border-solid border-[rgba(247,147,26,0.10)] relative",
          className
        )}
        whileInView="visible"
      >
        {pair && (
          <>
            <ProjectStatusDisplay pair={pair} />
            <OptionsDropdown
              className="absolute left-[0.5rem] top-[0.5rem] "
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
            <div className="w-14 flex items-center justify-center rounded-lg bg-gold-primary aspect-square overflow-hidden object-cover">
              <Image
                src={
                  !!pair?.logoUrl ? pair.logoUrl : "/images/project_honey.png"
                }
                alt="honey"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              ></Image>
            </div>
            <h4 className="text-white text-center text-[1rem] font-bold flex items-start  h-[1.5em] overflow-hidden">
              <div className=" relative ">
                {pair?.launchedToken?.name} ({pair?.launchedToken?.symbol})
              </div>{" "}
            </h4>{" "}
            <div
              className={cn(
                "grid items-start gap-6 text-white mt-2 justify-between w-full break-all",
                type === "detail"
                  ? "sm:grid-cols-4 grid-cols-2"
                  : " grid-cols-2"
              )}
            >
              <ProjectDetail projectType={projectType} pair={pair} />
            </div>
            <div className="w-full mt-[16px] flex gap-4 flex-col sm:flex-row justify-center sm:items-end flex-wrap *:basis-1 grow-[1] *:grow-[1]">
              <ProjectActions projectType={projectType} pair={pair} />
              {action}
            </div>
          </>
        )}
      </motion.div>
    );
  }
);
