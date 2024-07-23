import { Button } from "@/components/button";
import { Copy } from "@/components/copy";
import { NoData } from "@/components/table";
import { wallet } from "@/services/wallet";
import { NextLayoutPage } from "@/types/nextjs";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect } from "react";
import { amountFormatted } from "../lib/format";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import TokenBalanceCard from "@/components/TokenBalanceCard/TokenBalanceCard";

const FaucetPage: NextLayoutPage = observer(() => {
  useEffect(() => {
    wallet.currentChain?.faucetTokens?.forEach((token) => {
      token.init({ loadClaimed: true });
    });
  }, [wallet.currentChain?.faucetTokens]);
  return (
    <div className="flex flex-col  items-center ">
      <div className="flex items-center relative w-full sm:w-[578px] h-[138px] overflow-hidden">
        <Image src="/images/faucet_bg_v2.png" alt="faucet" fill></Image>
        <Image
          src="/images/bera/honeybera.svg"
          alt=""
          fill
          className="scale-90 translate-x-[25%]"
        ></Image>
        <div className="relative z-1 ml-[25px]">
          <div className="text-[black] text-2xl font-bold leading-7 tracking-[-0.24px]">
            Faucet
          </div>
          <div className="w-[309px] text-[black] mt-[8px] text-pretty text-sm sm:text-base font-bold leading-6 opacity-[0.5]">
            Claim test tokens to try out the Berachain testnet.
          </div>
        </div>
      </div>
      <div className="w-[578px] max-w-[100%] mt-[30px] flex flex-col gap-[24px]">
        {wallet.currentChain?.faucetTokens?.length ? (
          wallet.currentChain?.faucetTokens.map((token) => (
            <div key={token.address} className="flex  items-center">
              <TokenBalanceCard token={token}></TokenBalanceCard>
              <Button
                isDisabled={token.claimed}
                isLoading={token.faucet.loading}
                className="ml-[13px]"
                onClick={async () => {
                  token.claimed = true;
                  await token.faucet.call();
                  await token.getBalance();
                  await token.getClaimed();
                }}
              >
                {token.claimed ? "Tokens Claimed" : "Claim Tokens"}
              </Button>
            </div>
          ))
        ) : (
          <NoData></NoData>
        )}
      </div>
    </div>
  );
});

export default FaucetPage;
