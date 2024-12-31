import { observer, useLocalObservable } from "mobx-react-lite";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { Button } from "@/components/button/button-next";
import { Input } from "@/components/input";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { useAccount } from "wagmi";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { LaunchDetailSwapCard } from "@/components/SwapCard/MemeSwap";
import {
  ItemSelect,
  SelectItem,
  SelectState,
} from "@/components/ItemSelect/v3";

const SuccessAction = observer(
  ({
    pair,
    refreshTxsCallback,
  }: {
    pair: FtoPairContract | MemePairContract;
    refreshTxsCallback?: () => void;
  }) => {
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
        <LaunchDetailSwapCard
          noBoarder
          inputAddress={pair.raiseToken?.address ?? ""}
          outputAddress={pair.launchedToken?.address}
          memePairContract={pair as MemePairContract}
          onSwapSuccess={refreshTxsCallback}
        />
      </>
    );
  }
);
const FailAction = observer(
  ({
    pair,
    refreshTxsCallback,
  }: {
    pair: FtoPairContract | MemePairContract;
    refreshTxsCallback?: () => void;
  }) => {
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
  ({
    pair,
    refreshTxsCallback: onSuccess,
  }: {
    pair: FtoPairContract | MemePairContract;
    refreshTxsCallback?: () => void;
  }) => {
    const state = useLocalObservable(() => ({
      depositAmount: "",
      setDepositAmount(val: string) {
        this.depositAmount = val;
      },
    }));

    const selectState = useLocalObservable(
      () =>
        new SelectState({
          onSelectChange: (value) => {
            if (value === "max") {
              state.setDepositAmount(pair.raiseToken?.balance.toFixed() ?? "0");
              pair.raiseToken?.getBalance();
            } else {
              state.setDepositAmount(value.toString());
            }
          },
        })
    );

    return (
      pair.raiseToken && (
        <div className="flex flex-col w-full z-[100] items-center gap-2 bg-[#FFCD4D] rounded-2xl px-4 py-3 relative pt-4 md:pt-12 pb-[90px] text-black">
          <div className="bg-[url('/images/pumping/outline-border.png')] bg-left-top bg-contain bg-repeat-x h-4 md:h-12 absolute top-0 left-0 w-full rounded-t-2xl"></div>
          <div className="flex flex-col gap-[16px] w-full">
            <div className="bg-white custom-dashed px-[18px] py-6 w-full rounded-[16px]">
              <div className="text-black flex items-center justify-between mb-4">
                <div></div>
                <div className="flex items-center gap-x-2">
                  <div>
                    <span>Balance: </span>
                    <span>{pair.raiseToken.balance.toFormat(5)}</span>
                  </div>
                  <button
                    className="cursor-pointer text-[#63b4ff]"
                    onClick={() => {
                      state.setDepositAmount(
                        pair.raiseToken?.balance.toFixed() ?? "0"
                      );
                      pair.raiseToken?.getBalance();
                    }}
                  >
                    Max
                  </button>
                </div>
              </div>

              <div className="w-full rounded-2xl border bg-card-dark shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] flex items-center justify-between px-4 py-2.5 gap-x-2">
                <div className="flex items-center">
                  <TokenLogo token={pair.raiseToken} />
                  <span className="ml-2">{pair.raiseToken.displayName}</span>
                </div>
                <Input
                  className="flex-1 text-right !bg-transparent [&_*]:!bg-transparent data-[invalid=true]:!bg-transparent"
                  classNames={{
                    inputWrapper:
                      "!bg-transparent border-none shadow-none !transition-none data-[invalid=true]:!bg-transparent group-data-[invalid=true]:!bg-transparent",
                    input:
                      "!bg-transparent !text-[#202020] text-right text-xl !pr-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none data-[invalid=true]:!bg-transparent",
                  }}
                  value={state.depositAmount}
                  placeholder="0.0"
                  min={0}
                  type="number"
                  isClearable={false}
                  max={pair.raiseToken.balance.toFixed()}
                  onChange={(e) => {
                    state.setDepositAmount(e.target.value);
                  }}
                  onBlur={() => {
                    state.setDepositAmount(
                      Number(state.depositAmount).toString()
                    );
                  }}
                />
              </div>

              <ItemSelect
                selectState={selectState}
                className="grid grid-cols-[repeat(4,auto)] gap-4 w-full mt-4 justify-content-end"
              >
                {pair.raiseToken?.balance.gte(10) && (
                  <SelectItem value="10">
                    10 {pair.raiseToken?.symbol}
                  </SelectItem>
                )}
                {pair.raiseToken?.balance.gte(100) && (
                  <SelectItem value="100">
                    100 {pair.raiseToken?.symbol}
                  </SelectItem>
                )}
                {pair.raiseToken?.balance.gte(1000) && (
                  <SelectItem value="1000">
                    1000 {pair.raiseToken?.symbol}
                  </SelectItem>
                )}
                <SelectItem value="max">Max</SelectItem>
              </ItemSelect>
            </div>

            <Button
              className="w-full"
              isDisabled={!Number(state.depositAmount)}
              isLoading={pair.deposit.loading}
              onPress={async () => {
                try {
                  await pair.deposit.call({
                    amount: state.depositAmount,
                  });
                  state.setDepositAmount("");
                  onSuccess?.();
                  pair.raiseToken?.getBalance();
                } catch (error) {
                  console.error("Deposit failed:", error);
                }
              }}
            >
              Deposit
            </Button>
          </div>
          <div className="bg-[url('/images/swap/bottom-border.svg')] bg-[size:100%_150%] bg-no-repeat bg-left-bottom h-[50px] absolute bottom-0 left-0 w-full"></div>
        </div>
      )
    );
  }
);

const Action = observer(
  ({
    pair,
    refreshTxsCallback,
  }: {
    pair: FtoPairContract | MemePairContract;
    refreshTxsCallback?: () => void;
  }) => {
    switch (pair.state) {
      case 0:
        return (
          <SuccessAction
            pair={pair}
            refreshTxsCallback={refreshTxsCallback}
          ></SuccessAction>
        );
      case 1:
        return (
          <FailAction
            pair={pair}
            refreshTxsCallback={refreshTxsCallback}
          ></FailAction>
        );
      case 2:
        return <></>;
      case 3:
        if (pair.isCompleted) {
          return <></>;
        }
        return (
          <ProcessingAction
            pair={pair}
            refreshTxsCallback={refreshTxsCallback}
          ></ProcessingAction>
        );
    }
  }
);

export default Action;
