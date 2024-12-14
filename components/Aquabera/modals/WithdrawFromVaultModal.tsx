// components/Aquabera/modals/WithdrawFromVaultModal.tsx
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@/components/button";
import { useCallback, useState } from "react";
import { ICHIVaultContract } from "@/services/contract/aquabera/ICHIVault-contract";
import { wallet } from "@/services/wallet";
import { ContractWrite } from "@/services/utils";
import { Slider } from "@nextui-org/slider";

interface WithdrawFromVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  vault: ICHIVaultContract;
  maxShares: bigint;
}

export function WithdrawFromVaultModal({
  isOpen,
  onClose,
  vault,
  maxShares,
}: WithdrawFromVaultModalProps) {
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState(0);

  const handleTypeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setAmount(value);
        // Update percentage based on input amount
        const newPercentage = value
          ? (Number(value) / Number(maxShares)) * 100
          : 0;
        setPercentage(Math.min(newPercentage, 100));
      }
    },
    [maxShares]
  );

  const handleSliderChange = useCallback(
    (value: number) => {
      setPercentage(value);
      const newAmount =
        (BigInt(maxShares) * BigInt(value * 100)) / BigInt(10000);
      setAmount(newAmount.toString());
    },
    [maxShares]
  );

  const handlePercentageClick = useCallback(
    (percent: number) => {
      setPercentage(percent);
      const newAmount =
        (BigInt(maxShares) * BigInt(percent * 100)) / BigInt(10000);
      setAmount(newAmount.toString());
    },
    [maxShares]
  );

  const handleMaxAmount = useCallback(() => {
    setAmount(maxShares.toString());
    setPercentage(100);
  }, [maxShares]);

  const handleWithdraw = async () => {
    if (!wallet.account || !amount) return;

    const withdrawAmount = BigInt(amount);

    if (withdrawAmount > maxShares) {
      console.error("Cannot withdraw more than available shares");
      return;
    }

    try {
      await new ContractWrite(vault.contract.write.withdraw, {
        action: "Withdraw",
        isSuccessEffect: true,
      }).call([withdrawAmount, wallet.account as `0x${string}`]);

      onClose(); // Close modal after successful transaction
    } catch (error) {
      console.error("Withdraw failed:", error);
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
      <ModalContent>
        <ModalHeader>Withdraw from Vault</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4 p-4">
            <div className="bg-[#1A1108] p-4 rounded-xl">
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-400">
                  Amount to Withdraw
                </label>
                <span className="text-sm text-gray-400">
                  Available: {maxShares.toString()}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={amount}
                  onChange={handleTypeAmount}
                  className="w-full bg-[#271A0C] rounded-xl p-2 text-white"
                  placeholder="0.0"
                />
                <Button onClick={handleMaxAmount} size="sm">
                  MAX
                </Button>
              </div>

              {/* Percentage Buttons */}
              <div className="flex justify-between gap-2 mt-4">
                {[25, 50, 75, 100].map((percent) => (
                  <Button
                    key={percent}
                    size="sm"
                    onClick={() => handlePercentageClick(percent)}
                    className={`flex-1 ${
                      percentage === percent ? "bg-yellow-500" : ""
                    }`}
                  >
                    {percent}%
                  </Button>
                ))}
              </div>

              {/* Slider */}
              <div className="mt-4">
                <Slider
                  aria-label="Withdraw percentage"
                  value={percentage}
                  onChange={(value) =>
                    handleSliderChange(Array.isArray(value) ? value[0] : value)
                  }
                  className="w-full"
                  step={1}
                  maxValue={100}
                  minValue={0}
                  marks={[
                    { value: 0, label: "0%" },
                    { value: 50, label: "50%" },
                    { value: 100, label: "100%" },
                  ]}
                  formatOptions={{ style: "percent" }}
                />
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleWithdraw}
              disabled={
                !amount ||
                BigInt(amount || "0") <= BigInt(0) ||
                BigInt(amount) > maxShares
              }
            >
              Withdraw
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WithdrawFromVaultModal;
