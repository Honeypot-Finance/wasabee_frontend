import { ToastAction } from "@/components/algebra/ui/toast";
import { WrappedToastify } from "@/lib/wrappedToastify";
import {
  TransactionInfo,
  usePendingTransactionsStore,
} from "@/services/algebra/state/pendingTransactionsStore";
import { Address } from "cluster";
import { Link, ExternalLinkIcon } from "lucide-react";
import { wrap } from "module";
import { useEffect } from "react";
import { useToast } from "react-toastify";
import { useAccount, useTransaction } from "wagmi";

export const ViewTxOnExplorer = ({ hash }: { hash: Address | undefined }) =>
  hash ? (
    <ToastAction altText="View on explorer" asChild>
      <Link
        to={`https://holesky.etherscan.io/tx/${hash}`}
        target={"_blank"}
        className="border-none gap-2 hover:bg-transparent hover:text-blue-400"
      >
        View on explorer
        <ExternalLinkIcon size={16} />
      </Link>
    </ToastAction>
  ) : (
    <></>
  );

export function useTransactionAwait(
  hash: Address | undefined,
  transactionInfo: TransactionInfo,
  redirectPath?: string
) {
  const { address: account } = useAccount();

  const {
    actions: { addPendingTransaction, updatePendingTransaction },
  } = usePendingTransactionsStore();

  const { data, isError, isLoading, isSuccess } = useTransaction(hash);

  useEffect(() => {
    if (isLoading && hash && account) {
      WrappedToastify.info({
        title: transactionInfo.title,
        message: transactionInfo.description || "Transaction was sent",
      });
      addPendingTransaction(account, hash);
      updatePendingTransaction(account, hash, {
        data: transactionInfo,
        loading: true,
        success: null,
        error: null,
      });
    }
  }, [isLoading, hash, account]);

  useEffect(() => {
    if (isError && hash) {
      WrappedToastify.info({
        title: transactionInfo.title,
        message: (
          <div>
            {transactionInfo.description || "Transaction failed"}
            <ViewTxOnExplorer hash={hash} />
          </div>
        ),
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && hash) {
      WrappedToastify.info({
        title: transactionInfo.title,
        message: (
          <div>
            {transactionInfo.description || "Transaction confirmed"}
            <ViewTxOnExplorer hash={hash} />
          </div>
        ),
      });
    }
  }, [isSuccess]);

  return {
    data,
    isError,
    isLoading,
    isSuccess,
  };
}
