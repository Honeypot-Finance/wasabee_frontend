import Link from "next/link";
import { wallet } from "@/services/wallet";
import { ViewSvg } from "@/components/svg/View";

export default function TransactionPendingToastify({hash, action}: {hash: string, action?: string}) {
  return (
    <div>
      <div>{action || 'Transaction'} Pending</div>
      <div className="m-2 text-right text-gray-800">
        <Link
          className="flex justify-end text-right items-center gap-2"
          href={
            wallet?.currentChain?.chain?.blockExplorers?.default.url +
            "tx/" +
            hash
          }
          target="_blank"
        >
          View Txn
          <ViewSvg />
        </Link>
      </div>
    </div>
  );
}
