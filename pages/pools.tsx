import { liquidity } from "@/services/liquidity";
import { NextLayoutPage } from "@/types/nextjs";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Table } from "@/components/table/index";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import { Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";
import { wallet } from "@/services/wallet";
import { useAccount } from "wagmi";
import { PaginationState } from "@/services/utils";
import { Button } from "@/components/button";

const PoolsPage: NextLayoutPage = observer(() => {
  const { chainId } = useAccount();
  const { data: pairsMap, isLoading } = trpc.pair.getPairs.useQuery(
    {
      chainId: chainId as number,
    },
    {
      enabled: !!chainId,
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

    get columnsMap() {
      return this.columns.reduce((acc, column) => {
        acc[column.key] = column;
        return acc;
      }, {} as Record<string, (typeof this.columns)[number]>);
    },
    get pairsByPage() {
      return liquidity.pairs
        .slice(state.pagination.offset, state.pagination.end)
        .map((pair) => {
          pair.init();
          return pair;
        });
    }
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
              <CardBody>
                <Table
                  rowKey="address"
                  pagination={state.pagination}
                  isLoading={isLoading}
                  columns={[
                    {
                      title: "Pool Name",
                      dataKey: "poolName",
                    },
                    {
                      title: "Liquidity",
                      dataKey: "liquidityDisplay",
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
                      title: "Pool Name",
                      dataKey: "poolName",
                    },
                    {
                      title: "Liquidity",
                      dataKey: "liquidityDisplay",
                    },
                  ]}
                  datasource={liquidity.myPairs}
                ></Table>
              </CardBody>
            </Card>
          </Tab>
          
        </Tabs>
        <div className="flex top-0 absolute right-0 p-[0.25rem]">
           <Input className="369px"></Input>
           <Button className="ml-[20px]">Create</Button>
        </div>
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
