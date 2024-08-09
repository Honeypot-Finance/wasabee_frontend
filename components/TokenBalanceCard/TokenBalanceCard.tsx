import { Token } from "@/services/contract/token";
import TokenLogo from "../TokenLogo/TokenLogo";
import { Copy } from "../copy";
import { observer } from "mobx-react-lite";
import CardContianer from "../CardContianer/CardContianer";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { WatchAsset } from "../atoms/WatchAsset/WatchAsset";
import { BiWallet } from "react-icons/bi";
import {
  OptionsDropdown,
  optionsPresets,
} from "../OptionsDropdown/OptionsDropdown";
import { shareMediaToast } from "../ShareSocialMedialPopUp/ShareSocialMedialPopUp";
import { motion } from "framer-motion";
import { itemSlideVariants } from "@/lib/animation";

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
      <motion.div
        variants={itemSlideVariants}
        initial="hidden"
        animate="visible"
      >
        <CardContianer autoSize={autoSize}>
          <TokenLogo token={token}></TokenLogo>
          <div className="flex-1 flex items-center">
            {token.name} ({token.symbol})
            <OptionsDropdown
              className="min-h-0 h-[unset]"
              options={[
                optionsPresets.copy({
                  copyText: token?.address ?? "",
                  displayText: "Copy Token address",
                  copysSuccessText: "Token address copied",
                }),
                optionsPresets.importTokenToWallet({
                  token: token,
                }),
              ]}
            />
          </div>
          <div className="">{token.balanceFormatted}</div>
        </CardContianer>
      </motion.div>
    );
  }
);

export default TokenBalanceCard;
