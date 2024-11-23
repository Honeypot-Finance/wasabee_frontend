import { visualEffects } from "@/services/visualeffects";
import { wallet } from "@/services/wallet";

export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <button
        onClick={() => {
          wallet.contracts.memeFactory.contract.write.addRaisedToken(["0xfc5e3743e9fac8bb60408797607352e24db7d65e",BigInt(Math.pow(
            10,
            18+6
          ))],{
            account:wallet.account as `0x${string}`,
            chain:wallet.currentChain.chain
          })
        }}
      >
        Start Confetti
      </button>
    </div>
  );
}
