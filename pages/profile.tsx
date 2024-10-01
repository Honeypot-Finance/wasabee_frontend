import { LaunchCard } from "@/components/LaunchCard";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import Pagination from "@/components/Pagination/Pagination";
import PoolLiquidityCard from "@/components/PoolLiquidityCard/PoolLiquidityCard";
import TokenBalanceCard from "@/components/TokenBalanceCard/TokenBalanceCard";
import { Copy } from "@/components/copy";
import { defaultContainerVariants, itemSlideVariants } from "@/lib/animation";
import { truncate } from "@/lib/format";
import launchpad, { defaultPairFilters } from "@/services/launchpad";
import { liquidity } from "@/services/liquidity";
import { wallet } from "@/services/wallet";
import {
  Card,
  CardBody,
  Tab,
  Tabs,
  Button as NextButton,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const MyLaunchTab = observer(() => {
  return (
    <Card className="next-card">
      <CardBody>
        <div className="flex">
          {/* <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "fto"}
            className={
              launchpad.currentLaunchpadType.value === "fto"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.setCurrentLaunchpadType("fto");
              launchpad.myLaunches.reloadPage();
            }}
          >
            FTO
          </NextButton> */}
          <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "meme"}
            className={
              launchpad.currentLaunchpadType.value === "meme"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.setCurrentLaunchpadType("meme");
              launchpad.myLaunches.reloadPage();
            }}
          >
            MEME
          </NextButton>
        </div>
        {!launchpad.myLaunches.isInit ? (
          <LoadingDisplay />
        ) : (
          <Pagination
            paginationState={launchpad.myLaunches}
            render={(project) => (
              <LaunchCard key={project.address} pair={project} action={<></>} />
            )}
            classNames={{
              base: "",
              itemsContainer: "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6",
              item: "",
            }}
          />
        )}
      </CardBody>
    </Card>
  );
});

const ParticipatedLaunchTab = observer(() => {
  return (
    <Card className="next-card">
      <CardBody>
        <div className="flex">
          {/* <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "fto"}
            className={
              launchpad.currentLaunchpadType.value === "fto"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.currentLaunchpadType.setValue("fto");
              launchpad.participatedPairs.reloadPage();
            }}
          >
            FTO
          </NextButton> */}
          <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "meme"}
            className={
              launchpad.currentLaunchpadType.value === "meme"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.currentLaunchpadType.setValue("meme");
              launchpad.participatedPairs.reloadPage();
            }}
          >
            MEME
          </NextButton>
        </div>
        {!launchpad.participatedPairs.isInit ? (
          <LoadingDisplay />
        ) : (
          <Pagination
            paginationState={launchpad.participatedPairs}
            render={(project) => (
              <LaunchCard key={project.address} pair={project} action={<></>} />
            )}
            classNames={{
              base: "",
              itemsContainer: "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6",
              item: "",
            }}
          />
        )}
      </CardBody>
    </Card>
  );
});

const PoolsTab = observer(() => {
  return (
    <Card className="next-card">
      <CardBody>
        <div className="flex w-full items-center">
          <div className="hidden md:flex w-full justify-between text-[#FAFAFC] gap-[0.5rem]">
            <div className="w-full">
              <h2 className="ml-[1rem] opacity-65 ">Pool</h2>
            </div>
            <div className="w-full flex">
              <h2 className=" opacity-65">Your Reserves</h2>
            </div>
            <div className="w-full flex ">
              <h2 className=" opacity-65">Asset Market Value</h2>
            </div>
          </div>
          <div className="flex justify-end w-[8rem]">
            <Link
              href={"https://tryghost.xyz/log"}
              target="_blank"
              className="flex p-2 gap-2 items-center"
            >
              <Image
                className="h-4"
                src="/images/partners/powered_by_ghost_light.png"
                alt=""
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
        <Pagination
          paginationState={liquidity.myPairPage}
          render={(pair) => (
            <PoolLiquidityCard
              showMyLiquidity={true}
              pair={pair}
              autoSize
            ></PoolLiquidityCard>
          )}
          classNames={{
            base: "",
            itemsContainer: "",
            item: "",
          }}
        />
      </CardBody>
    </Card>
  );
});

const PortfolioTab = observer(() => {
  return (
    <Card className="next-card">
      <CardBody>
        <motion.div
          variants={defaultContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {wallet?.currentChain?.validatedTokens &&
            wallet?.currentChain?.validatedTokens
              ?.filter((token) => token.balance.toNumber() > 0)
              .map((token) => (
                <motion.div variants={itemSlideVariants} key={token.address}>
                  <TokenBalanceCard token={token} autoSize></TokenBalanceCard>
                </motion.div>
              ))}
        </motion.div>
      </CardBody>
    </Card>
  );
});

export const Profile = observer(() => {
  const { chainId } = useAccount();

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    if (!liquidity.isInit) {
      liquidity.initPool();
      return;
    }
    launchpad.setCurrentLaunchpadType("meme");
    launchpad.showNotValidatedPairs = true;
    launchpad.myLaunches.reloadPage();
    launchpad.participatedPairs.reloadPage();
    liquidity.myPairPage.reloadPage();
  }, [wallet.isInit, liquidity.isInit]);

  return (
    <div className="m-auto flex justify-center items-start flex-col max-w-[800px] gap-2">
      <div>
        {wallet.isInit && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="flex h-10 w-10">
                <div
                  className="rounded-full w-full h-full "
                  style={{
                    backgroundImage: `linear-gradient(90deg, #${wallet.account
                      .substring(2, 8)
                      .toUpperCase()} 0%, #${wallet.account
                      .substring(
                        wallet.account.length - 6,
                        wallet.account.length
                      )
                      .toUpperCase()} 100%)`,
                  }}
                ></div>
              </div>
              <div className="grow">
                <p>My Account</p>
                <p className="w-full break-all">
                  {truncate(wallet.account, 10)} <Copy value={wallet.account} />
                </p>
              </div>
            </div>
            <div>
              <Link
                target="_blank"
                className="underline p-1"
                href={`https://bartio.beratrail.io/address/${wallet.account}`}
              >
                View on beratrail.io
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="w-full">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "bg-transparent flex-wrap sm:flex-nowrap",
            tab: "flex flex-col items-start gap-2.5 border-0  backdrop-blur-[100px] p-2.5 rounded-[10px]",
          }}
          className="next-tab"
          onSelectionChange={(key) => {
            if (key === "my-launch") {
              launchpad.pairFilterStatus = defaultPairFilters.myPairs.status;
            } else if (key === "participated-launch") {
              launchpad.pairFilterStatus =
                defaultPairFilters.participatedPairs.status;
            }
          }}
        >
          <Tab key="portfolio" title="Portfolio">
            <PortfolioTab />
          </Tab>
          <Tab key="my-launch" title="My Launch">
            <MyLaunchTab />
          </Tab>
          <Tab key="participated-launch" title="Participated Launch">
            <ParticipatedLaunchTab />
          </Tab>
          <Tab key="my-pools" title="My Pools">
            <PoolsTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
});

export default Profile;
