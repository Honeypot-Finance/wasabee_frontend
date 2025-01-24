import { wallet } from "@/services/wallet";
import { Button } from "@nextui-org/react";
import BigNumber from "bignumber.js";
import { Address } from "viem";

export default function TestPage() {
  const tHpotAddress = "0xfc5e3743e9fac8bb60408797607352e24db7d65e";
  const pHpotAddress = "0xb6a43168ffb37e03e48a723fcb3895ae7d596078";
  const wberaAddress = "0x7507c1dc16935B82698e4C63f2746A2fCf994dF8";
  const HoneyAddress = "0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03";

  const removeMemeFactoryRaisedToken = async () => {
    const contract =
      wallet.contracts.memeFactory.contract.write.removeRaisedToken(
        [HoneyAddress],
        {
          account: wallet.account as Address,
          chain: wallet.currentChain.chain,
        }
      );
  };

  const addMemeFactoryRaisedToken = async () => {
    const contract = wallet.contracts.memeFactory.contract.write.addRaisedToken(
      [
        HoneyAddress,
        BigInt("30000000000000000000"), // 30 * 10 ** 18
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
