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
import MyAquaberaVaults from "@/components/Aquabera/VaultLists/MyVaults";
import AquaberaList from "@/components/Aquabera/VaultLists/VaultLists";

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

  return (
    <div className="w-full mx-auto">
      <Tabs
        classNames={{
          base: "w-full",
          panel: "w-full",
        }}
      >
        <Tab key="algebra" title="Pool V3" className="w-full">
          <PoolsList />
        </Tab>
        <Tab key="aquabera" title="POGE Vault" className="w-full">
          <AquaberaList />
        </Tab>
      </Tabs>
    </div>
  );
});

export default PoolsPage;
