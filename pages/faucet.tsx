import { Button } from "@/components/button";
import { Copy } from "@/components/copy";
import { NoData } from "@/components/table";
import { wallet } from "@/services/wallet";
import { NextLayoutPage } from "@/types/nextjs";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect } from "react";
import { amountFormatted } from '../lib/format';

const FaucetPage: NextLayoutPage = observer(() => {
  useEffect(() =>{
    wallet.currentChain?.faucetTokens?.forEach((token) => {
      token.init()
    })
  }, [wallet.currentChain?.faucetTokens])
  return (
    <div className="flex flex-col  items-center ">
      <div className="flex items-center relative w-[578px] h-[138px]">
      <Image src="/images/faucet_bg.png" alt="faucet" fill></Image>
      <div className="relative z-1 ml-[25px]">
        <div className="text-[color:var(--Neutral-100,#FAFAFC) text-2xl font-bold leading-7 tracking-[-0.24px]">Faucet</div>
        <div className="w-[309px] text-[rgba(255,255,255,0.50)] mt-[8px] text-base font-bold leading-6">Claim test tokens to try out the Berachain testnet.</div>
      </div>
      </div>
      <div className="w-[578px] max-w-[100%] mt-[30px] flex flex-col gap-[24px]">
        {wallet.currentChain?.faucetTokens?.length ? wallet.currentChain?.faucetTokens.map((token) => (
          <div key={token.address} className="flex  items-center">
            <div className="flex-1 flex w-[439px] items-center gap-[100px] border [background:var(--card-color,#271A0C)] pl-3 pr-4 py-3 rounded-2xl border-solid border-[rgba(255,255,255,0.10)]">
              <div className="flex-1 flex items-center">{token.displayName}<Copy className="ml-[8px]" value={token.address}></Copy></div>
              <div className="flex-1">{token.balanceFormatted}</div>
            </div>
            <Button isLoading={token.faucet.loading} className="ml-[13px]" onClick={async () => {
              await token.faucet.call()
              await token.getBalance()
            }}>Claim Tokens</Button>
          </div>
        )) : <NoData></NoData>}
      </div>
    </div>
  );
});

export default FaucetPage;
