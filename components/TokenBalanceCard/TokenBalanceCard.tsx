import { Token } from "@/services/contract/token";
import TokenLogo from "../TokenLogo/TokenLogo";
import { Copy } from "../copy";
import { observer } from "mobx-react-lite";
import CardContianer from "../CardContianer/CardContianer";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { WatchAsset } from "../atoms/WatchAsset/WatchAsset";
import { BiWallet } from "react-icons/bi";
import { SlShare } from "react-icons/sl";
import { VscCopy } from "react-icons/vsc";
import { toast } from "react-toastify";
import { OptionsDropdown } from "../OptionsDropdown/OptionsDropdown";
import { shareMediaToast } from "../ShareSocialMedialPopUp/ShareSocialMedialPopUp";
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
          {token.name} ({token.symbol})
          <OptionsDropdown
            className="min-h-0 h-[unset]"
            options={[
              {
                icon: <VscCopy />,
                display: "Copy token Address",
                onClick: () => {
                  navigator.clipboard.writeText(token.address ?? "");
                  toast.success("Token Address copied to clipboard");
                },
              },
              {
                icon: <BiWallet />,
                display: "Import token to wallet",
                onClick: () => {
                  token.watch();
                },
              },
            ]}
          />
        </div>
        <div className="">{token.balanceFormatted}</div>
      </CardContianer>
    );
  }
);

export default TokenBalanceCard;
