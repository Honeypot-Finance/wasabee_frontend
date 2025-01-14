import PoolsList from "@/components/algebra/pools/PoolsList";
import MyAquaberaVaults from "@/components/Aquabera/VaultLists/MyVaults";
import { HoneyContainer } from "@/components/CardContianer";
import OldPagination from "@/components/Pagination/OldPagination";
import { PoolLiquidityCard } from "@/components/PoolLiquidityCard/PoolLiquidityCard";
import { liquidity } from "@/services/liquidity";
import {
  Card,
  CardBody,
  Button as NextButton,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";

export const MyPools = observer(() => {
  return (
    <Tabs>
      <Tab value="algebra" title="Pool">
        <PoolsList defaultFilter="myPools" showOptions={false} />
      </Tab>
      <Tab value="vault" title="Vault">
        <MyAquaberaVaults />
      </Tab>
    </Tabs>
  );
});

export default MyPools;
