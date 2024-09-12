import { Token } from "@/services/contract/token";
import TokenLogo from "../TokenLogo/TokenLogo";
import { observer } from "mobx-react-lite";
import CardContianer from "../CardContianer/CardContianer";
import { useEffect } from "react";
import {
  OptionsDropdown,
  optionsPresets,
} from "../OptionsDropdown/OptionsDropdown";
import { motion } from "framer-motion";
import { itemSlideVariants } from "@/lib/animation";

interface TokenBalanceCardProps {
  token: Token;
  autoSize?: boolean;
}

export const TokenBalanceCard = observer(
  ({ token, autoSize }: TokenBalanceCardProps) => {
    useEffect(() => {
      token.init();
    }, []);
    return (
      <motion.div
        variants={itemSlideVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <CardContianer autoSize={autoSize}>
          <TokenLogo token={token}></TokenLogo>
          <div className="flex-1 flex items-center">
            {token.name} ({token.symbol})
          </div>
          <div className="">{token.balanceFormatted}</div>
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
              optionsPresets.viewOnExplorer({
                address: token?.address ?? "",
              }),
            ]}
          />
        </CardContianer>
      </motion.div>
    );
  }
);

export default TokenBalanceCard;
