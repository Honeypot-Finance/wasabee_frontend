import { useRouter } from "next/router";
import { useReadContract } from "wagmi";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect, useState } from "react";
import launchpad from "@/services/launchpad";
import { Logo } from "@/components/svg/logo";
import { formatEther, erc20Abi } from "viem";
import { NextLayoutPage } from "@/types/nextjs";
import { TimelineSvg } from "@/components/svg/Timeline";
import { TokenPriceSvg } from "@/components/svg/TokenPrice";
import { TotalRaisedSvg } from "@/components/svg/TotalRaised";
import { AsyncState } from "@/services/utils";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { wallet } from "@/services/wallet";
import { AmountFormat } from "@/components/AmountFormat";
import { LaunchCard } from "@/components/LaunchCard";

const LaunchPage: NextLayoutPage = observer(() => {

  const router = useRouter();
  const { pair: pairAddress } = router.query;
  const state = useLocalObservable(() => ({
    pair: new AsyncState<FtoPairContract, ({pairAddress}: {pairAddress: string}) => Promise<FtoPairContract> >(async ({pairAddress}: {pairAddress: string}) => {
      const pair = new FtoPairContract({ address: pairAddress as string })
      pair.init()
      return pair
    })
  }))
  console.log('pair', state.pair.value?.ftoState)
  useEffect(() => {
    if (!wallet.isInit || !pairAddress) {
      return;
    }
    state.pair.call({
      pairAddress: pairAddress as string
    })
  }, [wallet.isInit, pairAddress]);

  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto flex flex-col  items-center">
       <LaunchCard className=" w-[450px] max-w-full" pair={state.pair.value} action={<></>}></LaunchCard>
    </div>
  );
});

export default LaunchPage;
