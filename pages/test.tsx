import { wallet } from "@/services/wallet";
import { Button } from "@nextui-org/react";
import BigNumber from "bignumber.js";
import { Address } from "viem";

export default function TestPage() {
  const removeMemeFactoryRaisedToken = async () => {
    const contract =
      wallet.contracts.memeFactory.contract.write.removeRaisedToken(
        ["0xfc5e3743e9fac8bb60408797607352e24db7d65e"],
        {
          account: wallet.account as Address,
          chain: wallet.currentChain.chain,
        }
      );
  };

  const addMemeFactoryRaisedToken = async () => {
    const contract = wallet.contracts.memeFactory.contract.write.addRaisedToken(
      [
        "0xfc5e3743e9fac8bb60408797607352e24db7d65e",
        BigInt("200000000000000000000000"), // 200000 * 10 ** 18
      ],
      {
        account: wallet.account as Address,
        chain: wallet.currentChain.chain,
      }
    );
  };

  return (
    <div>
      <Button onClick={removeMemeFactoryRaisedToken}>
        removeMemeFactoryRaisedToken
      </Button>
      <Button onClick={addMemeFactoryRaisedToken}>
        addMemeFactoryRaisedToken
      </Button>
    </div>
  );
}
