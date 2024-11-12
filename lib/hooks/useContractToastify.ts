import { useEffect, useState } from "react";
import { WrappedToastify } from "../wrappedToastify";
import { toast, ToastOptions } from "react-toastify";

interface useToastifyArgs {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  options?: ToastOptions;
}
export const useToastify = (transactionState: useToastifyArgs) => {
  const { isLoading, isSuccess, isError } = transactionState;
  const [pendingToast, setPendingToast] = useState<React.ReactText | null>(
    null
  );

  const closePendingToast = () => {
    if (pendingToast) {
      toast.dismiss(pendingToast);
      setPendingToast(null);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const pendingT = WrappedToastify.pending({
        message: transactionState.message,
        title: transactionState.title,
        icon: transactionState.icon,
        options: { autoClose: false, ...transactionState.options },
      });

      setPendingToast(pendingT);
    }
    if (isSuccess) {
      WrappedToastify.success({
        message: transactionState.message,
        title: transactionState.title,
        icon: transactionState.icon,
        options: transactionState.options,
      });

      closePendingToast();
    }
    if (isError) {
      WrappedToastify.error({
        message: transactionState.message,
        title: transactionState.title,
        icon: transactionState.icon,
        options: transactionState.options,
      });

      closePendingToast();
    }
  }, [isLoading, isSuccess, isError]);
};
