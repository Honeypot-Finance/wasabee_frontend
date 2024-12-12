import { liquidity } from "@/services/liquidity";
import { NextLayoutPage } from "@/types/nextjs";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { Button } from "@/components/button";
import { Input } from "../components/input/index";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";
import { wallet } from "@/services/wallet";
import { motion } from "framer-motion";
import PoolLiquidityCard from "@/components/PoolLiquidityCard/PoolLiquidityCard";
import { defaultContainerVariants } from "@/lib/animation";
import Image from "next/image";
import Pagination from "@/components/Pagination/Pagination";
import PoolsList from "@/components/algebra/pools/PoolsList";

const PoolsPage: NextLayoutPage = observer(() => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<"all" | "my">("all");

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    liquidity.initPool();
  }, [wallet.isInit]);

  useEffect(() => {
    if (wallet.isInit && liquidity.isInit) {
      setLoading(false);
      liquidity.pairPage.reloadPage();
      liquidity.myPairPage.reloadPage();
    }
  }, [wallet.isInit, liquidity.isInit]);

  const searchStringChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (currentTab === "all") {
        liquidity.pairPage.updateFilter({
          searchString: e.target.value,
        });
      } else {
        liquidity.myPairPage.updateFilter({
          searchString: e.target.value,
        });
      }
    },
    [currentTab]
  );

  const clearSearchString = useCallback(() => {
    if (currentTab === "all") {
      liquidity.pairPage.updateFilter({
        searchString: "",
      });
    } else {
      liquidity.myPairPage.updateFilter({
        searchString: "",
      });
    }
  }, [currentTab]);

  const tabChangeHandler = (key: string) => {
    if (key === "all") {
      setCurrentTab("all");
      clearSearchString();
    } else {
      setCurrentTab("my");
      clearSearchString();
    }
  };

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
    <div className="max-w-screen-xl mx-auto">
      <PoolsList />
    </div>
  );
});

export default PoolsPage;
