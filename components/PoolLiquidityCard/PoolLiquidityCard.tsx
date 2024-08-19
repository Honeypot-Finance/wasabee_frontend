import { Token } from "@/services/contract/token";
import TokenLogo from "../TokenLogo/TokenLogo";
import { Copy } from "../copy";
import { observer } from "mobx-react-lite";
import CardContianer from "../CardContianer/CardContianer";
import { PairContract } from "@/services/contract/pair-contract";
import PopUp from "../PopUp/PopUp";
import { Button } from "../button";
import { liquidity } from "@/services/liquidity";
import { RemoveLiquidity } from "../LPCard";
import { motion } from "framer-motion";
import Link from "next/link";
import ShareSocialMedialPopUp from "../ShareSocialMedialPopUp/ShareSocialMedialPopUp";
import {
  OptionsDropdown,
  optionsPresets,
} from "../OptionsDropdown/OptionsDropdown";
import { IoAdd, IoRemove } from "react-icons/io5";
import { VscArrowSwap } from "react-icons/vsc";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

interface PoolLiquidityCardProps {
  pair: PairContract;
  autoSize?: boolean;
  showMyLiquidity?: boolean;
}

export const PoolLiquidityCard = observer(
  ({ pair, autoSize, showMyLiquidity }: PoolLiquidityCardProps) => {
    const router = useRouter();
    const [isRemoveLpPopUpOpen, setIsRemoveLpPopUpOpen] = useState(false);

    return (
      <CardContianer autoSize={autoSize}>
        <PopUp
          open={isRemoveLpPopUpOpen}
          info="normal"
          onClose={() => setIsRemoveLpPopUpOpen(false)}
          trigger={<></>}
          contents={<RemoveLiquidity noCancelButton></RemoveLiquidity>}
        />{" "}
        <motion.div
          initial={{
            x: -100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          className="flex w-full flex-col md:flex-row gap-[0.5rem]"
        >
          <div className="flex flex-1 flex-col md:flex-row justify-between align-middle items-center gap-[0.5rem]">
            <div className="flex mr-5">
              <div className="flex mr-2 items-center">
                <TokenLogo token={pair.token0} />
                <TokenLogo token={pair.token1} />
              </div>
              <span className="w-[10rem]">
                <Link
                  href={`https://bartio.beratrail.io/address/${pair.address}`}
                  target="_blank"
                  className=" cursor-pointer hover:underline"
                >
                  {pair.token0.symbol} / {pair.token1.symbol}
                </Link>
              </span>
            </div>
            <div className="flex-1">
              {showMyLiquidity && (
                <div>
                  <span>Your Liquidity: </span>
                  {pair.myLiquidityDisplay}
                </div>
              )}
              <div>
                {showMyLiquidity && <span>Total Liquidity: </span>}
                {pair.liquidityDisplay}
              </div>
            </div>
          </div>{" "}
          <div className="flex lg:justify-end ">
            <OptionsDropdown
              options={[
                {
                  icon: <IoRemove />,
                  display: "Remove LP",
                  onClick: () => {
                    liquidity.setCurrentRemovePair(pair);
                    setIsRemoveLpPopUpOpen(true);
                  },
                },
                {
                  icon: <IoAdd />,
                  display: "Add LP",
                  onClick: () => {
                    router.push(
                      `/pool?inputCurrency=${pair.token0.address}&outputCurrency=${pair.token1.address}`
                    );
                  },
                },
                {
                  icon: <VscArrowSwap />,
                  display: "Swap",
                  onClick: () => {
                    router.push(
                      `/swap?inputCurrency=${pair.token0.address}&outputCurrency=${pair.token1.address}`
                    );
                  },
                },
                optionsPresets.viewOnExplorer({
                  address: pair.address,
                }),
              ]}
            />
          </div>{" "}
        </motion.div>
      </CardContianer>
    );
  }
);

export default PoolLiquidityCard;
