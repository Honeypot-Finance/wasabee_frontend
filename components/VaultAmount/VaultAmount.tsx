import { Input } from "@/components/input";
import { InputProps } from "@nextui-org/react";
import { Token } from "@/services/contract/token";
import { TokenSelector } from "@/components/TokenSelector/v3";
import { cn } from "@/lib/tailwindcss";
import TokenLogo from "../TokenLogo/TokenLogo";
import { vault } from "@/services/vault";
import { ICHIVaultContract } from "@/services/contract/aquabera/ICHIVault-contract";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

type VaultAmountProps = {
  vaultContract: ICHIVaultContract;
};

export const VaultAmount = observer(({ vaultContract }: VaultAmountProps) => {
  useEffect(() => {
    vault.setVaultContract(vaultContract);
  }, [vaultContract]);

  return (
    <div className="flex-1 w-full flex flex-col gap-y-3">
      {/* Token A Section - Only shown if allowed */}
      {vault.displayTokenA && (
        <>
          <div className="text-black flex items-center justify-between">
            <span>Token A</span>
            <div className="flex items-center gap-x-2">
              <div>Balance: {vault.tokenA?.balanceFormatted}</div>
              <div
                className="cursor-pointer underline"
                onClick={() => {
                  vault.setAmountA(vault.tokenA?.balance.toFixed() ?? "0");
                }}
              >
                Max
              </div>
            </div>
          </div>
          <div className="w-full rounded-2xl border border-black shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] flex items-center justify-between px-4 py-2.5 gap-x-2">
            {vault.tokenA && <TokenLogo token={vault.tokenA} />}
            <Input
              type="number"
              placeholder="0.00"
              isClearable
              value={vault.amountA}
              onChange={(e) => vault.setAmountA(e.target.value)}
              onClear={() => vault.setAmountA("0")}
              isInvalid={
                vault.tokenA &&
                Number(vault.amountA) > vault.tokenA.balance.toNumber()
              }
              classNames={{
                base: cn(
                  "text-right",
                  "!bg-transparent",
                  "[&_*]:!bg-transparent",
                  "data-[invalid=true]:!bg-transparent"
                ),
                inputWrapper: cn(
                  "!bg-transparent",
                  "border-none",
                  "shadow-none",
                  "!transition-none",
                  "data-[invalid=true]:!bg-transparent",
                  "group-data-[invalid=true]:!bg-transparent"
                ),
                input: cn(
                  "!bg-transparent",
                  "!text-[#202020]",
                  "text-right",
                  "text-xl",
                  "!pr-0",
                  "[appearance:textfield]",
                  "[&::-webkit-outer-spin-button]:appearance-none",
                  "[&::-webkit-inner-spin-button]:appearance-none",
                  "data-[invalid=true]:!bg-transparent"
                ),
                clearButton: cn(
                  "opacity-70",
                  "hover:opacity-100",
                  "!text-black",
                  "!p-0"
                ),
              }}
            />
          </div>
        </>
      )}

      {/* Token B Section - Only shown if allowed */}
      {vault.displayTokenB && (
        <>
          <div className="text-black flex items-center justify-between">
            <span>Token B</span>
            <div className="flex items-center gap-x-2">
              <div>Balance: {vault.tokenB?.balanceFormatted}</div>
              <div
                className="cursor-pointer underline"
                onClick={() => {
                  vault.setAmountB(vault.tokenB?.balance.toFixed() ?? "0");
                }}
              >
                Max
              </div>
            </div>
          </div>
          <div className="w-full rounded-2xl border border-black shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] flex items-center justify-between px-4 py-2.5 gap-x-2">
            {vault.tokenB && <TokenLogo token={vault.tokenB} />}
            <Input
              type="number"
              placeholder="0.00"
              isClearable
              value={vault.amountB}
              onChange={(e) => vault.setAmountB(e.target.value)}
              onClear={() => vault.setAmountB("0")}
              isInvalid={
                vault.tokenB &&
                Number(vault.amountB) > vault.tokenB.balance.toNumber()
              }
              classNames={{
                base: cn(
                  "text-right",
                  "!bg-transparent",
                  "[&_*]:!bg-transparent",
                  "data-[invalid=true]:!bg-transparent"
                ),
                inputWrapper: cn(
                  "!bg-transparent",
                  "border-none",
                  "shadow-none",
                  "!transition-none",
                  "data-[invalid=true]:!bg-transparent",
                  "group-data-[invalid=true]:!bg-transparent"
                ),
                input: cn(
                  "!bg-transparent",
                  "!text-[#202020]",
                  "text-right",
                  "text-xl",
                  "!pr-0",
                  "[appearance:textfield]",
                  "[&::-webkit-outer-spin-button]:appearance-none",
                  "[&::-webkit-inner-spin-button]:appearance-none",
                  "data-[invalid=true]:!bg-transparent"
                ),
                clearButton: cn(
                  "opacity-70",
                  "hover:opacity-100",
                  "!text-black",
                  "!p-0"
                ),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
});
