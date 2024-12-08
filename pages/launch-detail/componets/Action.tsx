import { observer, useLocalObservable } from "mobx-react-lite";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { Button } from "@/components/button/button-next";
import { Input } from "@/components/input";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { useAccount } from "wagmi";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { SwapCard } from "@/components/SwapCard/MemeSwap";

const SuccessAction = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      // <div className="flex gap-[16px] justify-center items-center flex-col lg:flex-row">
      //   {wallet.account != pair.provider && (
      //     <Button
      //       className="w-full"
      //       isLoading={pair.claimLP.loading}
      //       onClick={() => {
      //         pair.claimLP.call();
      //       }}
      //       isDisabled={!pair.canClaimLP}
      //     >
      //       {pair.canClaimLP ? "Claim LP" : "Claim LP (Not available)"}
      //     </Button>
      //   )}

      //   <Link
      //     href={`/swap?inputCurrency=${pair.launchedToken?.address}&outputCurrency=${pair.raiseToken?.address}`}
      //     className="text-black font-bold w-full"
      //   >
      //     <Button className="w-full">
      //       <p>BUY Token</p>
      //       <p>
      //         <Copy
      //           onClick={(e) => {
      //             e.preventDefault();
      //           }}
      //           className=" absolute ml-[8px] top-[50%] translate-y-[-50%]"
      //           value={`${window.location.origin}/swap?inputCurrency=${pair.raiseToken?.address}&outputCurrency=${pair.launchedToken?.address}`}
      //         ></Copy>
      //       </p>
      //     </Button>{" "}
      //   </Link>
      // </div>
      <>
        <SwapCard
          noBoarder
          inputAddress={pair.raiseToken?.address ?? ""}
          outputAddress={pair.launchedToken?.address}
        />

        {pair instanceof MemePairContract && pair.canClaimLP && (
          <Button
            className="w-full"
            isLoading={pair.claimLP.loading}
            onClick={() => {
              pair.claimLP.call();
            }}
            isDisabled={!pair.canClaimLP}
          >
            Claim LP
          </Button>
        )}
        {pair instanceof MemePairContract && pair.canClaimTokens && (
          <Button
            className="w-full"
            onClick={() => {
              pair.claimVaultTokens();
            }}
            isLoading={pair.claimLP.loading}
            // isDisabled={!pair.canClaimLP}
          >
            Claim Tokens
          </Button>
        )}
      </>
    );
  }
);
const FailAction = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    return (
      <div className="flex flex-col gap-[16px]">
        {pair instanceof FtoPairContract && pair.isProvider && (
          <Button
            className="w-full"
            isLoading={pair.withdraw.loading}
            onClick={() => {
              pair.withdraw.call();
            }}
          >
            Provider Withdraw
          </Button>
        )}
        {pair instanceof MemePairContract && pair.canRefund && (
          <Button
            className="w-full"
            onClick={() => {
              pair.refund.call();
            }}
            isLoading={pair.refund.loading}
            style={{
              backgroundColor: "green",
            }}
          >
            Refund LP
          </Button>
        )}
      </div>
    );
  }
);

const ProcessingAction = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    const acc = useAccount();
    const state = useLocalObservable(() => ({
      depositAmount: "0",
      setDepositAmount(val: string) {
        this.depositAmount = val;
      },
    }));
    return (
      pair.raiseToken && (
        <div className="flex flex-col gap-[16px]">
          <Input
            className="bg-[#2F200B] rounded-[10px]"
            value={state.depositAmount}
            placeholder="Deposit amount"
            min={0}
            type="number"
            isClearable={false}
            max={pair.raiseToken.balance.toFixed()}
            onChange={(e) => {
              state.setDepositAmount(e.target.value);
            }}
            onBlur={() => {
              state.setDepositAmount(Number(state.depositAmount).toString());
            }}
            defaultValue="0"
            endContent={
              <div className="flex items-center">
                <span className="mr-2">{pair.raiseToken.displayName}</span>
                <TokenLogo token={pair.raiseToken} />
              </div>
            }
          ></Input>
          <div className="flex items-center gap-[8px]">
            <div>Balance: {pair.raiseToken.balance.toFormat(5)}</div>
            {pair.raiseToken?.balance.gte(10) && (
              <div
                onClick={() => {
                  state.setDepositAmount("10");
                }}
                className="cursor-pointer text-white text-base font-bold leading-3 tracking-[0.16px] underline"
              >
                10 {pair.raiseToken?.displayName}
              </div>
            )}
            {pair.raiseToken?.balance.gte(100) && (
              <div
                onClick={() => {
                  state.setDepositAmount("100");
                }}
                className="cursor-pointer text-white text-base font-bold leading-3 tracking-[0.16px] underline"
              >
                100 {pair.raiseToken?.displayName}
              </div>
            )}
            {pair.raiseToken?.balance.gte(1000) && (
              <div
                onClick={() => {
                  state.setDepositAmount("1000");
                }}
                className="cursor-pointer text-white text-base font-bold leading-3 tracking-[0.16px] underline"
              >
                1000 {pair.raiseToken?.displayName}
              </div>
            )}
            <div
              onClick={() => {
                state.setDepositAmount(
                  pair.raiseToken?.balance.toFixed() ?? "0"
                );
                pair.raiseToken?.getBalance();
              }}
              className="  cursor-pointer text-white text-base font-bold leading-3 tracking-[0.16px] underline"
            >
              Max
            </div>
          </div>
          <Button
            className="w-full"
            isDisabled={!Number(state.depositAmount)}
            isLoading={pair.deposit.loading}
            onClick={async () => {
              await pair.deposit.call({
                amount: state.depositAmount,
              });
              state.setDepositAmount("");
            }}
          >
            Deposit
          </Button>
        </div>
      )
    );
  }
);

const Action = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    switch (pair.ftoState) {
      case 0:
        return <SuccessAction pair={pair}></SuccessAction>;
      case 1:
        return <FailAction pair={pair}></FailAction>;
      case 2:
        // return <PauseAction pair={pair}></PauseAction>;
        return <></>;
      case 3:
        if (pair.isCompleted) {
          return <></>;
        }
        return <ProcessingAction pair={pair}></ProcessingAction>;
    }
  }
);

export default Action;
