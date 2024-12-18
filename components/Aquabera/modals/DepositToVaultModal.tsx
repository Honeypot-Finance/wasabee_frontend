import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@/components/button";
import { useCallback, useState } from "react";
import { ICHIVaultContract } from "@/services/contract/aquabera/ICHIVault-contract";
import { Token } from "@/services/contract/token";
import { Address, maxInt256 } from "viem";
import TokenCardV3 from "@/components/algebra/swap/TokenCard/TokenCardV3";
import { wallet } from "@/services/wallet";
import { Currency, tryParseAmount } from "@cryptoalgebra/sdk";
import { useBalance } from "wagmi";
import {
  useReadErc20Allowance,
  useReadErc20BalanceOf,
  useReadIchiVaultAllowToken0,
  useReadIchiVaultAllowToken1,
} from "@/wagmi-generated";
import { ContractWrite } from "@/services/utils";
import BigNumber from "bignumber.js";

interface DepositToVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  vault: ICHIVaultContract;
  tokenA: Currency;
  tokenB: Currency;
}

export function DepositToVaultModal({
  isOpen,
  onClose,
  vault,
  tokenA: propTokenA,
  tokenB: propTokenB,
}: DepositToVaultModalProps) {
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [tokenA, setTokenA] = useState<Currency>(propTokenA);
  const [tokenB, setTokenB] = useState<Currency>(propTokenB);
  const tokenABalance = useReadErc20BalanceOf({
    address: tokenA.wrapped.address as `0x${string}`,
    args: [wallet.account as `0x${string}`],
  });
  const tokenBBalance = useReadErc20BalanceOf({
    address: tokenB.wrapped.address as `0x${string}`,
    args: [wallet.account as `0x${string}`],
  });
  const tokenAAllowance = useReadErc20Allowance({
    address: tokenA.wrapped.address as `0x${string}`,
    args: [wallet.account as `0x${string}`, vault.address as `0x${string}`],
  });
  const tokenBAllowance = useReadErc20Allowance({
    address: tokenB.wrapped.address as `0x${string}`,
    args: [wallet.account as `0x${string}`, vault.address as `0x${string}`],
  });

  const isTokenAAllowed = useReadIchiVaultAllowToken0({
    address: vault.address as `0x${string}`,
  });

  const isTokenBAllowed = useReadIchiVaultAllowToken1({
    address: vault.address as `0x${string}`,
  });

  const handleTypeAmountA = useCallback((value: string) => {
    setAmountA(value);
  }, []);

  const handleTypeAmountB = useCallback((value: string) => {
    setAmountB(value);
  }, []);

  const handleMaxA = useCallback(async () => {
    const balance = new BigNumber(tokenABalance.data?.toString() ?? 0)
      .dividedBy(10 ** tokenA.decimals)
      .toFixed(0);
    if (!balance) return;
    setAmountA(balance.toString());
  }, [tokenABalance]);

  const handleMaxB = useCallback(async () => {
    const balance = new BigNumber(tokenBBalance.data?.toString() ?? 0)
      .dividedBy(10 ** tokenB.decimals)
      .toFixed(0);
    if (!balance) return;
    setAmountB(balance.toString());
  }, [tokenBBalance]);

  const handleDeposit = async () => {
    if (!wallet.walletClient?.account?.address) return;

    // Check and handle token approvals
    const parsedAmountA = amountA
      ? new BigNumber(amountA).multipliedBy(10 ** tokenA.decimals).toFixed(0)
      : undefined;
    const parsedAmountB = amountB
      ? new BigNumber(amountB).multipliedBy(10 ** tokenB.decimals).toFixed(0)
      : undefined;

    if (!parsedAmountA && !parsedAmountB) return;

    console.log(
      parsedAmountA,
      parsedAmountB,
      tokenAAllowance.data,
      tokenBAllowance.data
    );

    if (
      parsedAmountA !== undefined &&
      tokenAAllowance.data !== undefined &&
      tokenAAllowance.data < BigInt(parsedAmountA)
    ) {
      const token = Token.getToken({ address: tokenA.wrapped.address });

      await new ContractWrite(token.contract.write.approve, {
        action: "Approve",
      }).call([vault.address as `0x${string}`, BigInt(maxInt256)]);
    }

    if (
      parsedAmountB !== undefined &&
      tokenBAllowance.data !== undefined &&
      tokenBAllowance.data < BigInt(parsedAmountB)
    ) {
      const token = Token.getToken({ address: tokenB.wrapped.address });
      await new ContractWrite(token.contract.write.approve, {
        action: "Approve",
      }).call([vault.address as `0x${string}`, BigInt(maxInt256)]);
    }

    console.log(
      BigInt(parsedAmountA?.toString() || "0"),
      BigInt(parsedAmountB?.toString() || "0"),
      wallet.account
    );
    // Perform deposit
    try {
      await new ContractWrite(vault.contract.write.deposit, {
        action: "Deposit",
        isSuccessEffect: true,
      }).call([
        BigInt(parsedAmountA?.toString() ?? 0),
        BigInt(parsedAmountB?.toString() ?? 0),
        wallet.account as `0x${string}`,
      ]);

      onClose(); // Close modal after successful transaction
    } catch (error) {
      console.error("Deposit failed:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      classNames={{
        base: "bg-yellow-300",
        body: "bg-yellow-300",
        header: "bg-yellow-500",
      }}
    >
      <ModalContent className="">
        <ModalHeader className="">Deposit to Vault</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4 p-4 ">
            {isTokenAAllowed.data && (
              <TokenCardV3
                value={amountA}
                currency={tokenA}
                otherCurrency={tokenB}
                handleValueChange={handleTypeAmountA}
                handleMaxValue={handleMaxA}
                handleTokenSelection={setTokenA}
                showBalance={true}
                label=""
                showMaxButton={true}
              />
            )}
            {isTokenBAllowed.data && (
              <TokenCardV3
                value={amountB}
                currency={tokenB}
                otherCurrency={tokenA}
                handleValueChange={handleTypeAmountB}
                handleMaxValue={handleMaxB}
                handleTokenSelection={setTokenB}
                showBalance={true}
                label=""
                showMaxButton={true}
              />
            )}
            <Button
              className="w-full"
              onClick={handleDeposit}
              disabled={!wallet.account}
            >
              Deposit
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DepositToVaultModal;
