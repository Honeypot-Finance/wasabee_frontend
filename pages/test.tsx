import { wallet } from "@/services/wallet";
import { Button } from "@nextui-org/react";
import BigNumber from "bignumber.js";
import { Address } from "viem";

export default function TestPage() {
  const tHpotAddress = "0xfc5e3743e9fac8bb60408797607352e24db7d65e";
  const pHpotAddress = "0xb6a43168ffb37e03e48a723fcb3895ae7d596078";
  const wberaAddress = "0x7507c1dc16935B82698e4C63f2746A2fCf994dF8";

  const removeMemeFactoryRaisedToken = async () => {
    const contract =
      wallet.contracts.memeFactory.contract.write.removeRaisedToken(
        [tHpotAddress],
        {
          account: wallet.account as Address,
          chain: wallet.currentChain.chain,
        }
      );
  };

  const addMemeFactoryRaisedToken = async () => {
    const contract = wallet.contracts.memeFactory.contract.write.addRaisedToken(
      [
        tHpotAddress,
        BigInt("2000000000000000000000000"), // 2,000,000 * 10 ** 18
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
