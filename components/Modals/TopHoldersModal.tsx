import { Dialog } from "@headlessui/react";

const formatNumber = (number: number) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

interface TopHoldersModalProps {
  isOpen: boolean;
  onClose: () => void;
  holders: Array<{ id: string; holdingValue: string }>;
  symbol: string;
}

export default function TopHoldersModal({
  isOpen,
  onClose,
  holders,
  symbol,
}: TopHoldersModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-slate-800 rounded-lg p-6 max-w-sm w-full">
          <Dialog.Title className="text-xl font-bold mb-4">
            Top {symbol} Holders
          </Dialog.Title>

          <div className="space-y-2">
            {holders.map((holder, index) => (
              <div
                key={holder.id}
                className="flex justify-between items-center"
              >
                <span>
                  #{index + 1} {holder.id.slice(0, 6)}...{holder.id.slice(-4)}
                </span>
                <span>
                  {formatNumber(parseFloat(holder.holdingValue))} {symbol}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
