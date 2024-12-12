import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Token } from "@/services/contract/token";
import TokenCardV3 from "@/components/algebra/swap/TokenCard/TokenCardV3";
import { Currency } from "@cryptoalgebra/sdk";
import { ICHIVaultFactoryContract } from "@/services/contract/aquabera/ICHIVaultFactory-contract";
import { Button } from "@/components/button";
import { wallet } from "@/services/wallet";

export const CreateAquaberaVault = observer(() => {
  const [tokenA, setTokenA] = useState<Currency>();
  const [tokenB, setTokenB] = useState<Currency>();
  const [tokenAValue, setTokenAValue] = useState<string>("");
  const [tokenBValue, setTokenBValue] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await wallet.contracts.vaultFactory.createICHIVault(
        tokenA?.wrapped.address as string, // Assuming tokenA has an address property
        true, // allowTokenA
        tokenB?.wrapped.address as string, // Assuming tokenB has an address property
        true // allowTokenB
      );
      console.log("res", res);
      console.log("Vault created successfully");
    } catch (error) {
      console.error("Error creating vault:", error);
    }
  };

  return (
    <div className="flex flex-col gap-1 p-2 bg-[#271A0C] rounded-3xl border-3 border-solid border-[#F7931A10] hover:border-[#F7931A] transition-all">
      <h2 className="font-semibold text-xl text-left ml-2 mt-2">
        Create Vault
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TokenCardV3
            value={tokenAValue}
            currency={tokenA}
            otherCurrency={tokenB}
            handleTokenSelection={setTokenA}
            handleValueChange={setTokenAValue}
            showMaxButton={true}
            showBalance={true}
          />
        </div>
        <div>
          <TokenCardV3
            value={tokenBValue}
            currency={tokenB}
            otherCurrency={tokenA}
            handleTokenSelection={setTokenB}
            handleValueChange={setTokenBValue}
            showMaxButton={true}
            showBalance={true}
          />
        </div>
        <Button type="submit" className="form-submit-button">
          Create Vault
        </Button>
      </form>
    </div>
  );
});
