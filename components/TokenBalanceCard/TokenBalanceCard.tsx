import { Token } from "@/services/contract/token";
import TokenLogo from "../TokenLogo/TokenLogo";
import { observer } from "mobx-react-lite";
import {
  OptionsDropdown,
  optionsPresets,
} from "../OptionsDropdown/OptionsDropdown";
import { motion } from "framer-motion";
import { itemSlideVariants } from "@/lib/animation";
import { useEffect } from "react";

interface TokenBalanceCardProps {
  token: Token;
  autoSize?: boolean;
}

export const TokenBalanceCard = observer(({ token }: TokenBalanceCardProps) => {
  useEffect(() => {
    token.init();
  }, []);

  return (
    <tr className="hover:bg-[#2D2D2D]/50 transition-colors">
      {/* Asset Column */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <TokenLogo token={token} />
          <div className="flex flex-col">
            <p className="text-[#FAFAFC] font-medium">{token.displayName}</p>
            <p className="text-[#FAFAFC]/60 text-sm">{token.name}</p>
          </div>
        </div>
      </td>

      {/* Price Column */}
      <td className="py-4 px-6 text-right">
        <div className="flex flex-col">
          <span className="text-[#FAFAFC]">$3,890.43</span>
          <span className="text-[#FF5555] text-xs">-0.26%</span>
        </div>
      </td>

      {/* Balance Column */}
      <td className="py-4 px-6 text-right">
        <div className="flex flex-col">
          <span className="text-[#FAFAFC]">{token.balanceFormatted}</span>
          <span className="text-xs text-[#FAFAFC]/60">
            ${token.derivedUSD ? Number(token.derivedUSD).toFixed(2) : "38.9"}
          </span>
        </div>
      </td>

      {/* Proportion Column */}
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="w-[200px] h-1 bg-[#2D2D2D] rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300 bg-[#4ADE80]"
              style={{ width: "100%" }}
            />
          </div>
          <span className="text-[#FAFAFC]">100.00%</span>
        </div>
      </td>

      {/* Action Column */}
      <td className="py-4 px-6 text-center">
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
      </td>
    </tr>
  );
});

export default TokenBalanceCard;
