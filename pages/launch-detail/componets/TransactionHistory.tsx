import { useEffect, useState } from "react";
import { fetchPot2PumpTransactions } from "@/lib/algebra/graphql/clients/transactions";
import { truncate } from "@/lib/format";
import { Copy } from "@/components/copy";
import { VscCopy } from "react-icons/vsc";
import { ExternalLink } from "lucide-react";
import dayjs from "dayjs";
import BigNumber from "bignumber.js";
import { MemePairContract } from "@/services/contract/memepair-contract";

interface TransactionHistoryProps {
  pairAddress: string;
  pair: MemePairContract | null;
  refreshTrigger?: number;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  pairAddress,
  pair,
  refreshTrigger,
}) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const pageSize = 10;

  const loadTransactions = async (
    pairAddress: string,
    currentPage: number,
    pageSize: number
  ) => {
    if (!pairAddress) return;
    setLoading(true);
    try {
      const response = await fetchPot2PumpTransactions(
        pairAddress,
        currentPage,
        pageSize
      );
      console.log("response", response);
      setTransactions(response.data);
      setHasNextPage(response.pageInfo.hasNextPage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pairAddress) {
      loadTransactions(pairAddress, page, pageSize);
    }
  }, [pairAddress, page]);

  useEffect(() => {
    if (pairAddress) {
      loadTransactions(pairAddress, 1, pageSize);
    }
  }, [refreshTrigger]);

  const getActionTypeDisplay = (type: string) => {
    switch (type.toUpperCase()) {
      case "DEPOSIT":
        return "Deposit";
      case "REFUND":
        return "Refund";
      case "CLAIM_LP":
        return "Claim LP";
      default:
        return type;
    }
  };

  const getAmountByType = (tx: any) => {
    if (!pair?.raiseToken?.decimals) return "0";

    const decimals = pair.raiseToken.decimals;

    switch (tx.actionType.toUpperCase()) {
      case "DEPOSIT":
        return new BigNumber(tx.depositAmount)
          .div(new BigNumber(10).pow(decimals))
          .toFixed(3);
      case "REFUND":
        return new BigNumber(tx.refundAmount)
          .div(new BigNumber(10).pow(decimals))
          .toFixed(3);
      case "CLAIM_LP":
        return new BigNumber(tx.claimLqAmount)
          .div(new BigNumber(10).pow(decimals))
          .toFixed(3);
      default:
        return "0";
    }
  };

  return (
    <div className="bg-[#202020] rounded-2xl overflow-hidden">
      <div className="p-6">
        <div className="border border-[#5C5C5C] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#323232] text-white">
              <tr>
                <th className="py-4 px-6 text-left text-base font-medium">
                  Action
                </th>
                <th className="py-4 px-6 text-left text-base font-medium">
                  Tx Hash
                </th>
                <th className="py-4 px-6 text-left text-base font-medium">
                  Address
                </th>
                <th className="py-4 px-6 text-right text-base font-medium">
                  Amount
                </th>
                <th className="py-4 px-6 text-right text-base font-medium">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="text-white divide-y divide-[#5C5C5C]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-4 px-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 px-6 text-center">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-[#2a2a2a] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#FFCD4D] rounded"></div>
                        {getActionTypeDisplay(tx.actionType)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-base font-mono">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://bartio.beratrail.io/tx/${tx.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#FFCD4D] flex items-center gap-1"
                        >
                          {truncate(tx.id, 12)}
                          <ExternalLink className="size-3" />
                        </a>
                        <Copy
                          className="p-1 hover:bg-[#3a3a3a] rounded"
                          value={tx.id}
                          content="Copy transaction hash"
                        >
                          <VscCopy className="size-4" />
                        </Copy>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-base font-mono">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://bartio.beratrail.io/address/${tx.account.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#FFCD4D] flex items-center gap-1"
                        >
                          {truncate(tx.account.id, 12)}
                          <ExternalLink className="size-3" />
                        </a>
                        <Copy
                          className="p-1 hover:bg-[#3a3a3a] rounded"
                          value={tx.account.id}
                          content="Copy address"
                        >
                          <VscCopy className="size-4" />
                        </Copy>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-base">
                      {getAmountByType(tx)} {pair?.raiseToken?.symbol}
                    </td>
                    <td className="py-4 px-6 text-right text-base">
                      {dayjs(parseInt(tx.createdAt) * 1000).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-6 py-4 flex justify-end border-t border-[#5C5C5C]">
        <div className="flex items-center gap-6 max-w-[400px]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3a3a3a] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-gray-400">Page</span>
              <span className="px-3 py-1 bg-[#1a1a1a] rounded text-white min-w-[40px] text-center">
                {page}
              </span>
            </div>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNextPage || loading}
              className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3a3a3a] transition-colors"
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-gray-400">
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
