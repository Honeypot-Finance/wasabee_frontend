import { liquidity } from "@/services/liquidity";
import { NextLayoutPage } from "@/types/nextjs";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Table } from "@/components/table/index";
import { trpc, trpcClient } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useAccount } from "wagmi";
import { PaginationState } from "@/services/utils";
import { Button } from "@/components/button";
import { Input } from "../components/input/index";
import { LuPlus } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { set } from "lodash";
import Link from "next/link";
import { Copy } from "@/components/copy";
import { wallet } from "@/services/wallet";
import { chainsMap } from "@/lib/chain";
import { networksMap } from "@/services/chain";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import ShareSocialMedialPopUp from "@/components/ShareSocialMedialPopUp/ShareSocialMedialPopUp";
import PopUp from "@/components/PopUp/PopUp";
import { RemoveLiquidity } from "@/components/LPCard";
import { GhostPair } from "@/services/indexer/indexerTypes";
import { motion } from "framer-motion";
import PoolLiquidityCard from "@/components/PoolLiquidityCard/PoolLiquidityCard";
import { defaultContainerVariants, itemSlideVariants } from "@/lib/animation";
import HoneyStickSvg from "@/components/svg/HoneyStick";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import Image from "next/image";

const PoolsPage: NextLayoutPage = observer(() => {
  const { chainId } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    liquidity.initPool();
  }, [wallet.isInit]);

  useEffect(() => {
    if (wallet.isInit && liquidity.isInit) {
      setLoading(false);
      liquidity.pairPage.reloadPage();
      liquidity.myPairPage.reloadPage();
    }
  }, [wallet.isInit, liquidity.isInit]);

  // const state = useLocalObservable(() => ({
  //   columns: [
  //     {
  //       key: "name",
  //       label: "Pool Name",
  //     },
  //     {
  //       key: "liquidity",
  //       label: "Liquidity",
  //     },
  //   ],
  //   pagination: new PaginationState({}),
  //   searchValue: "",
  //   setSearchValue(value: string) {
  //     this.searchValue = value;
  //   },

  //   get columnsMap() {
  //     return this.columns.reduce((acc, column) => {
  //       acc[column.key] = column;
  //       return acc;
  //     }, {} as Record<string, (typeof this.columns)[number]>);
  //   },

  //   get filteredPairs() {
  //     return liquidity.pairs.filter((pair) => {
  //       return (
  //         pair.poolName
  //           .toLowerCase()
  //           .includes(this.searchValue.toLowerCase()) ||
  //         pair.address.toLowerCase().includes(this.searchValue.toLowerCase()) ||
  //         pair.token0.address
  //           .toLowerCase()
  //           .includes(this.searchValue.toLowerCase()) ||
  //         pair.token1.address
  //           .toLowerCase()
  //           .includes(this.searchValue.toLowerCase())
  //       );
  //     });
  //   },
  //   get pairsByPage() {
  //     return this.filteredPairs.slice(
  //       state.pagination.offset,
  //       state.pagination.end
  //     );
  //   },
  // }));

  return (
    <div className="flex flex-col items-center">
      <div className="w-[800px] max-w-full relative space-y-4">
        <div className="flex top-0 md:absolute items-center right-0 md:flex-row flex-col md:gap-[16px] gap-[8px]">
          <Input
            defaultValue={liquidity.pairPage.filter.searchString}
            onChange={(e) => {
              liquidity.pairPage.updateFilter({
                searchString: e.target.value,
              });
            }}
            onClear={() => {
              liquidity.pairPage.updateFilter({
                searchString: "",
              });
            }}
            startContent={<IoSearchOutline></IoSearchOutline>}
            placeholder="Search by name, symbol or address"
            classNames={{
              innerWrapper: "w-[369px] h-[32px]",
            }}
            className=" border [background:var(--card-color,#271A0C)] rounded-2xl border-solid border-[rgba(225,138,32,0.10)]"
          ></Input>
          <Button
            onClick={() => {
              router.push("/pool");
            }}
            styleMode="plain"
            className="md:w-[170px] h-[41px] gap-2.5"
          >
            Create Pool
          </Button>
        </div>

        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "bg-transparent",
            base: "!mt-0",
            tab: "flex flex-col items-start gap-2.5 border-0  backdrop-blur-[100px] p-2.5 rounded-[10px]",
          }}
          className="next-tab"
        >
          <Tab key="all" title="All Pools">
            {" "}
            <div className="flex w-full items-center">
              <div className="flex w-full justify-start text-[#FAFAFC]">
                <h2 className="ml-[3rem] opacity-65 w-[13rem] mr-2">Pool</h2>
                <h2 className="ml-[1rem] opacity-65">Reserves</h2>
              </div>
              <div className="flex justify-end">
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
            <Card className="[background:#1D1407] rounded-[20px]">
              <CardBody className="">
                {liquidity.pairPage.pageItems.value.map((pair) => (
                  <motion.div variants={itemSlideVariants} key={pair.address}>
                    <PoolLiquidityCard
                      showMyLiquidity={false}
                      pair={pair}
                      autoSize
                    ></PoolLiquidityCard>
                  </motion.div>
                ))}
                <div className="flex justify-around my-5">
                  {liquidity.pairPage.pageInfo.hasNextPage && (
                    <Button
                      onClick={() => {
                        liquidity.pairPage.loadMore();
                      }}
                      isDisabled={liquidity.pairPage.isLoading}
                    >
                      {liquidity.pairPage.isLoading
                        ? "Loading..."
                        : "Load More"}
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="my" title="My Pools">
            <div className="flex w-full items-center">
              <div className="flex w-full justify-start text-[#FAFAFC]">
                <h2 className="ml-[3rem] opacity-65 w-[13rem] mr-2">Pool</h2>
                <h2 className="ml-[1rem] opacity-65">Reserves</h2>
              </div>
              <div className="flex justify-end">
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
            <Card className="[background:#1D1407] rounded-[20px]">
              <CardBody>
                <motion.div
                  variants={defaultContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {liquidity.isInit ? (
                    liquidity.myPairPage.pageItems.value.length > 0 ? (
                      liquidity.myPairPage.pageItems.value.map((pair) => (
                        <motion.div
                          variants={itemSlideVariants}
                          key={pair.address}
                        >
                          <PoolLiquidityCard
                            showMyLiquidity={true}
                            pair={pair}
                            autoSize
                          ></PoolLiquidityCard>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col justify-center items-center">
                        <HoneyStickSvg />
                        <div className="text-[#eee369] mt-2  text-[3rem] text-center">
                          List is empty
                        </div>
                      </div>
                    )
                  ) : (
                    <LoadingDisplay />
                  )}
                </motion.div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
});

export default PoolsPage;
