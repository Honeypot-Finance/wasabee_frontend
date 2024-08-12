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
import { OptionsDropdown } from "../OptionsDropdown/OptionsDropdown";
import { IoAdd, IoRemove } from "react-icons/io5";
import { VscArrowSwap } from "react-icons/vsc";
import { useState } from "react";

interface PoolLiquidityCardProps {
  pair: PairContract;
  autoSize?: boolean;
}

export const PoolLiquidityCard = observer(
  ({ pair, autoSize }: PoolLiquidityCardProps) => {
    const [isRemoveLpPopUpOpen, setIsRemoveLpPopUpOpen] = useState(false);
    console.log("isRemoveLpPopUpOpen", isRemoveLpPopUpOpen);
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
          className="flex w-full flex-col lg:flex-row  gap-[0.5rem]"
        >
          <div className="flex flex-1 flex-col lg:flex-row justify-between align-middle items-center gap-[0.5rem]">
            <div className="flex mr-5">
              <div className="flex mr-2 items-center">
                <TokenLogo token={pair.token0} />
                <TokenLogo token={pair.token1} />
              </div>
              <p className="w-[10rem]">
                {pair.token0.symbol} / {pair.token1.symbol}
              </p>
            </div>
            <div className="flex-1">
              <div>
                <span>Your Liquidity: </span>
                {pair.myLiquidityDisplay}
              </div>
              <div>
                <span>Total Liquidity: </span>
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
                    window.location.href = `/pool?inputCurrency=${pair.token0.address}&outputCurrency=${pair.token1.address}`;
                  },
                },
                {
                  icon: <VscArrowSwap />,
                  display: "Swap",
                  onClick: () => {
                    window.location.href = `/swap?inputCurrency=${pair.token0.address}&outputCurrency=${pair.token1.address}`;
                  },
                },
              ]}
            />
          </div>{" "}
        </motion.div>
      </CardContianer>
    );
  }
);

export default PoolLiquidityCard;
