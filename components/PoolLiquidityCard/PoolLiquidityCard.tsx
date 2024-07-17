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

interface PoolLiquidityCardProps {
  pair: PairContract;
  autoSize?: boolean;
}

export const PoolLiquidityCard = observer(
  ({ pair, autoSize }: PoolLiquidityCardProps) => {
    return (
      <CardContianer autoSize={autoSize}>
        {" "}
        <div className="flex justify-between align-middle items-center">
          <div className="flex mr-5">
            <div className="flex mr-2 items-center">
              <TokenLogo token={pair.token0} />
              <TokenLogo token={pair.token1} />
            </div>
            <p className="w-[10rem]">
              {pair.token0.symbol} / {pair.token1.symbol}
            </p>
          </div>
          <div className="flex-1 pr-5">
            <div>
              <span>Your Liquidity: </span>
              {pair.myLiquidityDisplay}
            </div>
            <div>
              <span>Total Liquidity: </span>
              {pair.liquidityDisplay}
            </div>
          </div>
          <div>
            <PopUp
              info="normal"
              trigger={
                <Button
                  onPress={(e) => {
                    liquidity.setCurrentRemovePair(pair);
                  }}
                >
                  Remove LP
                </Button>
              }
              contents={<RemoveLiquidity></RemoveLiquidity>}
            />
          </div>
        </div>
      </CardContianer>
    );
  }
);

export default PoolLiquidityCard;
