import { liquidity } from "@/services/liquidity";
import { NextLayoutPage } from "@/types/nextjs";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Table } from "@/components/table/index";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
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

const PoolsPage: NextLayoutPage = observer(() => {
  const { chainId } = useAccount();
  const router = useRouter();
  const { data: pairsMap, isLoading } = trpc.pair.getPairs.useQuery(
    {
      chainId: chainId as number,
      blockAddress: networksMap[chainId as number].blacklist?.poolBlacklist,
    },
    {
      enabled: !!chainId,
      refetchOnWindowFocus: false,
    }
  );
  const state = useLocalObservable(() => ({
    columns: [
      {
        key: "name",
        label: "Pool Name",
      },
      {
        key: "liquidity",
        label: "Liquidity",
      },
    ],
    pagination: new PaginationState({}),
    searchValue: "",
    setSearchValue(value: string) {
      this.searchValue = value;
    },

    get columnsMap() {
      return this.columns.reduce((acc, column) => {
        acc[column.key] = column;
        return acc;
      }, {} as Record<string, (typeof this.columns)[number]>);
    },
    get filteredPairs() {
      return liquidity.pairs.filter((pair) => {
        return (
          pair.poolName
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          pair.address.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          pair.token0.address
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          pair.token1.address
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
        );
      });
    },
    get pairsByPage() {
      return this.filteredPairs.slice(
        state.pagination.offset,
        state.pagination.end
      );
    },
  }));

  useEffect(() => {
    if (pairsMap) {
      liquidity.initPool(Object.values(pairsMap));
      state.pagination.setTotal(liquidity.pairs.length);
    }
  }, [pairsMap]);

  return (
    <div className="flex flex-col  items-center">
      <div className="w-[800px] max-w-full relative">
        <div className="flex top-0 md:absolute right-0 md:flex-row flex-col md:gap-[16px] gap-[8px]">
          <Input
            value={state.searchValue}
            onChange={(e) => {
              state.setSearchValue(e.target.value);
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
            className=" w-[170px] h-[41px] gap-2.5"
          >
            <LuPlus />
            Create Pool
          </Button>
        </div>
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "bg-transparent",
            tab: "flex flex-col items-start gap-2.5 border-0  backdrop-blur-[100px] p-2.5 rounded-[10px]",
          }}
          className="next-tab"
        >
          <Tab key="all" title="All Pools">
            <Card className="[background:#1D1407] rounded-[20px]">
              <CardBody className="">
                <Table
                  rowKey="address"
                  pagination={state.pagination}
                  isLoading={isLoading}
                  columns={[
                    {
                      title: "",
                      render(value, row) {
                        return (
                          <div className="flex items-center gap-[12px]">
                            <TokenLogo
                              token={row.token0}
                              addtionalClasses="translate-x-[10px]"
                            ></TokenLogo>
                            <TokenLogo
                              token={row.token1}
                              addtionalClasses="translate-x-[-10px]"
                            ></TokenLogo>
                          </div>
                        );
                      },
                    },
                    {
                      title: "Pool Name",
                      dataKey: "poolName",
                    },
                    {
                      title: "Liquidity",
                      dataKey: "liquidityDisplay",
                    },
                    {
                      title: "Action",
                      dataKey: "_action",
                      render(value, row) {
                        return (
                          <div className="flex gap-[12px]">
                            <Link
                              className="flex items-center gap-[6px]"
                              href={`/pool?inputCurrency=${row.token0.address}&outputCurrency=${row.token1.address}`}
                            >
                              <Button>
                                <p>Add</p>
                                <div>
                                  <ShareSocialMedialPopUp
                                    shareUrl={`${window.location.origin}/pool?inputCurrency=${row.token0.address}&outputCurrency=${row.token1.address}`}
                                    shareText="Add Liquidity to this pool"
                                  />
                                </div>
                              </Button>
                            </Link>
                            <Button styleMode="plain">
                              <Link
                                className="flex items-center gap-[6px]"
                                href={`/swap?inputCurrency=${row.token0.address}&outputCurrency=${row.token1.address}`}
                              >
                                <p>Swap</p>

                                <ShareSocialMedialPopUp
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  shareUrl={`${window.location.origin}/swap?inputCurrency=${row.token0.address}&outputCurrency=${row.token1.address}`}
                                  shareText="Swap with this pool"
                                />
                              </Link>
                            </Button>
                          </div>
                        );
                      },
                    },
                  ]}
                  datasource={state.pairsByPage}
                ></Table>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="my" title="My Pools">
            <Card className="[background:#1D1407] rounded-[20px]">
              <CardBody>
                <Table
                  rowKey="address"
                  columns={[
                    {
                      title: "",
                      render(value, row) {
                        return (
                          <div className="flex items-center gap-[12px]">
                            <TokenLogo
                              token={row.token0}
                              addtionalClasses="translate-x-[10px]"
                            ></TokenLogo>
                            <TokenLogo
                              token={row.token1}
                              addtionalClasses="translate-x-[-10px]"
                            ></TokenLogo>
                          </div>
                        );
                      },
                    },
                    {
                      title: "Pool Name",
                      dataKey: "poolName",
                    },
                    {
                      title: "Liquidity",
                      dataKey: "liquidityDisplay",
                    },
                    {
                      title: "Action",
                      dataKey: "_action",
                      render(value, row) {
                        return (
                          <div className="flex gap-[12px]">
                            <PopUp
                              info="normal"
                              trigger={
                                <Button
                                  onPress={(e) => {
                                    liquidity.setCurrentRemovePair(row);
                                  }}
                                >
                                  Remove LP
                                </Button>
                              }
                              contents={
                                <RemoveLiquidity
                                  noCancelButton
                                ></RemoveLiquidity>
                              }
                            />
                          </div>
                        );
                      },
                    },
                  ]}
                  datasource={liquidity.myPairs}
                ></Table>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
});

// export const getStaticProps = async (context: any) => {
//   // prefetch `post.byId`
//   const pairsMap = await trpcClient.pair.getPairs.query();
//   return {
//     props: {
//       pairs: Object.values(pairsMap),
//     },
//     revalidate: 5,
//   };
// };

export default PoolsPage;
