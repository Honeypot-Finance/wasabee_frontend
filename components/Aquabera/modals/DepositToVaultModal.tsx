import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@/components/button/button-next";
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
    try {
      await new ContractWrite(vault.contract.write.deposit, {
        action: "Deposit",
        isSuccessEffect: true,
      }).call([
        BigInt(parsedAmountA?.toString() || "0"),
        BigInt(parsedAmountB?.toString() || "0"),
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
        base: "bg-transparent",
        wrapper: "bg-transparent",
        closeButton: "absolute right-4 top-6 z-50 text-white w-8 h-8 flex items-center justify-center rounded-full",
      }}
    >
      <ModalContent className="bg-[#FFCD4D] relative overflow-hidden">
        {(onClose) => (
          <>
            <div className="bg-[url('/images/pumping/outline-border.png')] h-[50px] absolute top-0 left-0 w-full bg-contain bg-[left_-90px_top] bg-repeat-x"></div>

            <ModalHeader className="pt-14 bg-[#FFCD4D]">
              <h3 className="text-xl font-bold text-black">Deposit to Vault</h3>
            </ModalHeader>

            <ModalBody className="px-6 bg-[#FFCD4D]">
              <div className="w-full rounded-[32px] bg-white space-y-4 px-4 py-6 custom-dashed mb-6">
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
                  className="w-full bg-[#FFCD4D] hover:bg-[#ffd666] text-black font-medium rounded-[16px] py-[18px] shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)]"
                  onClick={handleDeposit}
                  disabled={!amountA || !amountB || !wallet.account}
                >
                  Deposit
                </Button>
              </div>
            </ModalBody>

            <div className="bg-[url('/images/pool-detail/bottom-border.svg')] bg-left-top h-6 absolute -bottom-1 left-0 w-full bg-contain"></div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DepositToVaultModal;
