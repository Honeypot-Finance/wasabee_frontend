import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@/components/button";
import { useCallback, useState } from "react";
import { ICHIVaultContract } from "@/services/contract/aquabera/ICHIVault-contract";
import { Token } from "@/services/contract/token";
import { Address } from "viem";
import TokenCardV3 from "@/components/algebra/swap/TokenCard/TokenCardV3";
import { wallet } from "@/services/wallet";
import { Currency, tryParseAmount } from "@cryptoalgebra/sdk";
import { useBalance } from "wagmi";
import {
  useReadErc20Allowance,
  useReadErc20BalanceOf,
} from "@/wagmi-generated";
import { ContractWrite } from "@/services/utils";

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

  const handleTypeAmountA = useCallback((value: string) => {
    setAmountA(value);
  }, []);

  const handleTypeAmountB = useCallback((value: string) => {
    setAmountB(value);
  }, []);

  const handleMaxA = useCallback(async () => {
    setAmountA(tokenABalance.data?.toString() || "0");
  }, [tokenABalance]);

  const handleMaxB = useCallback(async () => {
    setAmountB(tokenBBalance.data?.toString() || "0");
  }, [tokenBBalance]);

  const handleDeposit = async () => {
    if (!wallet.walletClient?.account?.address) return;

    // Check and handle token approvals
    const parsedAmountA = Number(amountA) * 10 ** tokenA.decimals;
    const parsedAmountB = Number(amountB) * 10 ** tokenB.decimals;

    if (!parsedAmountA && !parsedAmountB) return;

    if (
      parsedAmountA !== undefined &&
      tokenAAllowance.data !== undefined &&
      BigInt(tokenAAllowance.data) < BigInt(parsedAmountA.toString())
    ) {
      const token = Token.getToken({ address: tokenA.wrapped.address });

      await new ContractWrite(token.contract.write.approve, {
        action: "Approve",
      }).call([
        vault.address as `0x${string}`,
        BigInt(parsedAmountA.toString()),
      ]);
    }

    if (
      parsedAmountB !== undefined &&
      tokenBAllowance.data !== undefined &&
      BigInt(tokenBAllowance.data) < BigInt(parsedAmountB.toString())
    ) {
      const token = Token.getToken({ address: tokenB.wrapped.address });
      await new ContractWrite(token.contract.write.approve, {
        action: "Approve",
      }).call([
        vault.address as `0x${string}`,
        BigInt(parsedAmountB.toString()),
      ]);
    }

    console.log(
      BigInt(parsedAmountA?.toString() || "0"),
      BigInt(parsedAmountB?.toString() || "0"),
      wallet.account
    );
    // Perform deposit
    await new ContractWrite(vault.contract.write.deposit, {
      action: "Deposit",
      isSuccessEffect: true,
    }).call([
      BigInt(parsedAmountA?.toString() || "0"),
      BigInt(parsedAmountB?.toString() || "0"),
      wallet.account as `0x${string}`,
    ]);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Deposit to Vault</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4 p-4">
            <TokenCardV3
              value={amountA}
              currency={tokenA}
              otherCurrency={tokenB}
              handleValueChange={handleTypeAmountA}
              handleMaxValue={handleMaxA}
              handleTokenSelection={setTokenA}
              showBalance={true}
              label="Token A Amount"
              showMaxButton={true}
            />

            <TokenCardV3
              value={amountB}
              currency={tokenB}
              otherCurrency={tokenA}
              handleValueChange={handleTypeAmountB}
              handleMaxValue={handleMaxB}
              handleTokenSelection={setTokenB}
              showBalance={true}
              label="Token B Amount"
              showMaxButton={true}
            />

            <Button
              className="w-full"
              onClick={handleDeposit}
              disabled={!amountA || !amountB || !wallet.account}
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
