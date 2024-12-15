import OldPagination from "@/components/Pagination/OldPagination";
import { PoolLiquidityCard } from "@/components/PoolLiquidityCard/PoolLiquidityCard";
import { liquidity } from "@/services/liquidity";
import { Card, CardBody, Button as NextButton } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";

export const MyPools = observer(() => {
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
        <OldPagination
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

export default MyPools;
