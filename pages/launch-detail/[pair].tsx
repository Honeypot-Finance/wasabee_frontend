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
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import BigNumber from "bignumber.js";

const SuccessAction = observer(({ pair }: { pair: FtoPairContract }) => {
  return (
    <div className="px-[8px] flex flex-col gap-[16px]">
      <Button
        className="w-full"
        isLoading={pair.claimLP.loading}
        onClick={() => {
          pair.claimLP.call();
        }}
      >
        Claim LP
      </Button>
    </div>
  );
});
const FailAction = observer(({ pair }: { pair: FtoPairContract }) => {
  return pair.isProvider ? (
    <div className="px-[8px] flex flex-col gap-[16px]">
      <Button
        className="w-full"
        isLoading={pair.withdraw.loading}
        onClick={() => {
          pair.withdraw.call();
        }}
      >
        Provider Withdraw
      </Button>
    </div>
  ) : (
    <></>
  );
});

const PauseAction = observer(({ pair }: { pair: FtoPairContract }) => {
  return pair.isProvider ? (
    <div className="px-[8px] flex flex-col gap-[16px]">
      <Button
        className="w-full"
        isLoading={pair.resume.loading}
        onClick={() => {
          pair.resume.call();
        }}
      >
        Resume
      </Button>
    </div>
  ) : (
    <></>
  );
});

const ProcessingAction = observer(({ pair }: { pair: FtoPairContract }) => {
  const state = useLocalObservable(() => ({
    depositAmount: "0",
    setDepositAmount(val: string) {
      this.depositAmount = val;
    },
  }));
  return pair.isProvider ? (
    <div className="px-[8px] flex flex-col gap-[16px]">
      <Button
        className="w-full"
        isLoading={pair.pause.loading}
        onClick={() => {
          pair.pause.call();
        }}
      >
        Pause
      </Button>
    </div>
  ) : (
    <div className="px-[8px] flex flex-col gap-[16px]">
      <Input
        className="bg-[#2F200B] rounded-[10px]"
        value={state.depositAmount}
        placeholder="Deposit amount"
        min={0}
        type="number"
        max={pair.raiseToken.balance.toFixed()}
        onChange={(e) => {
          state.setDepositAmount(e.target.value);
        }}
        defaultValue="0"
        endContent={pair.raiseToken.displayName}
      ></Input>
      <div className="flex items-center gap-[8px]">
        <div>Balance: {pair.raiseToken.balance.toFormat()}</div>
        <div
          onClick={() => {
            state.setDepositAmount(pair.raiseToken.balance.toFixed());
          }}
          className="  cursor-pointer text-[color:var(--Button-Gradient,#F7931A)] text-base ml-[8px] font-bold leading-3 tracking-[0.16px] underline"
        >
          Max
        </div>
      </div>
      <Button
        className="w-full"
        isLoading={pair.deposit.loading}
        onClick={() => {
          pair.deposit.call({
            amount: state.depositAmount,
          });
        }}
      >
        Deposit
      </Button>
    </div>
  );
});

const Action = observer(({ pair }: { pair: FtoPairContract }) => {
  switch (pair.ftoState) {
    case 0:
      return <SuccessAction pair={pair}></SuccessAction>;
    case 1:
      return <FailAction pair={pair}></FailAction>;
    case 2:
      return <PauseAction pair={pair}></PauseAction>;
    case 3:
      if (pair.isCompleted) {
        return <></>;
      }
      return <ProcessingAction pair={pair}></ProcessingAction>;
  }
});

const LaunchPage: NextLayoutPage = observer(() => {
  const router = useRouter();
  const { pair: pairAddress } = router.query;
  const state = useLocalObservable(() => ({
    pair: new AsyncState<
      FtoPairContract,
      ({ pairAddress }: { pairAddress: string }) => Promise<FtoPairContract>
    >(async ({ pairAddress }: { pairAddress: string }) => {
      const pair = new FtoPairContract({ address: pairAddress as string });
      pair.init();
      return pair;
    }),
  }));
  useEffect(() => {
    if (!wallet.isInit || !pairAddress) {
      return;
    }
    state.pair.call({
      pairAddress: pairAddress as string,
    });
  }, [wallet.isInit, pairAddress]);

  return (
    <div className="px-6 xl:max-w-[1200px] mx-auto flex flex-col  items-center pt-[24px]">
      <LaunchCard
        type="detail"
        className=" w-[450px] max-w-full p-[24px]"
        pair={state.pair.value}
        action={state.pair.value && <Action pair={state.pair.value}></Action>}
      ></LaunchCard>
    </div>
  );
});

export default LaunchPage;
