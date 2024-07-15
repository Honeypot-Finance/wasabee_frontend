import { Token } from "@/services/contract/token";
import TokenLogo from "../TokenLogo/TokenLogo";
import { Copy } from "../copy";
import { observer } from "mobx-react-lite";
import CardContianer from "../CardContianer/CardContianer";
import { PairContract } from "@/services/contract/pair-contract";

interface PoolLiquidityCardProps {
  pair: PairContract;
  autoSize?: boolean;
}

export const PoolLiquidityCard = observer(
  ({ pair, autoSize }: PoolLiquidityCardProps) => {
    return (
      <CardContianer autoSize={autoSize}>
        {" "}
        <div className="flex  align-middle items-center">
          <div className="flex mr-5">
            <div className="flex mr-2 items-center">
              <TokenLogo token={pair.token0} />
              <TokenLogo token={pair.token1} />
            </div>
            <p className="w-[10rem]">
              {pair.token0.symbol} / {pair.token1.symbol}
            </p>
          </div>
          <div>
            <div>
              <span>Your Liquidity: </span>
              {pair.myLiquidityDisplay}
            </div>
            <div>
              <span>Total Liquidity: </span>
              {pair.liquidityDisplay}
            </div>
          </div>
        </div>
      </CardContianer>
    );
  }
);

export default PoolLiquidityCard;
