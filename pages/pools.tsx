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
import { cn } from "@/lib/utils";
import CardContainer from "@/components/CardContianer/v3";

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
    <div className="max-w-[1200px] mx-auto px-4 xl:px-0 font-gliker">
      <Tabs
        classNames={{
          base: "relative w-full",
          tabList:
            "flex rounded-2xl border border-[#202020] bg-white p-4 shadow-[4px_4px_0px_0px_#202020,-4px_4px_0px_0px_#202020] py-2 px-3.5 mb-6 absolute left-1/2 -translate-x-1/2 z-10 z-10",
          cursor:
            "bg-[#FFCD4D] border border-black shadow-[2px_2px_0px_0px_#000000] text-sm",
          panel: cn(
            "flex flex-col h-full w-full gap-y-4 justify-center items-center bg-[#FFCD4D] rounded-2xl text-[#202020]",
            "px-8 pt-[70px] pb-[70px]",
            "bg-[url('/images/card-container/honey/honey-border.png'),url('/images/card-container/dark/bottom-border.svg')]",
            "bg-[position:-65px_top,_-85px_bottom]",
            "bg-[size:auto_65px,_auto_65px]",
            "bg-repeat-x",
            "!mt-0"
          ),
          tabContent: "!text-[#202020]",
        }}
      >
        <Tab key="algebra" title="Concentrated Liquidity">
          <PoolsList />
        </Tab>
        <Tab key="aquabera" title="POGE Vault">
          <AquaberaList />
        </Tab>
      </Tabs>
    </div>
  );
});

export default PoolsPage;
