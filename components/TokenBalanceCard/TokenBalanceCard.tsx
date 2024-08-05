import { Token } from "@/services/contract/token";
import TokenLogo from "../TokenLogo/TokenLogo";
import { Copy } from "../copy";
import { observer } from "mobx-react-lite";
import CardContianer from "../CardContianer/CardContianer";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { WatchAsset } from "../atoms/WatchAsset/WatchAsset";
interface TokenBalanceCardProps {
  token: Token;
  autoSize?: boolean;
}

export const TokenBalanceCard = observer(
  ({ token, autoSize }: TokenBalanceCardProps) => {
    useEffect(() => {
      token.isInit || token.init();
    }, []);
    return (
      <CardContianer autoSize={autoSize}>
        <TokenLogo token={token}></TokenLogo>
        <div className="flex-1 flex items-center">
          {token.displayName}
          <WatchAsset className="ml-[8px]" token={token}></WatchAsset>
          <Copy className="ml-[8px]" value={token.address}></Copy>
        </div>
        <div className="">{token.balanceFormatted}</div>
      </CardContianer>
    );
  }
);

export default TokenBalanceCard;
