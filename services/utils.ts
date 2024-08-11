import { makeAutoObservable } from "mobx";
import { ToastOptions, toast } from "react-toastify";
import { wallet } from "./wallet";
import TransactionPendingToastify from "@/components/CustomToastify/TransactionPendingToastify/TransactionPendingToastify";
import { localforage } from "@/lib/storage";
import { LRUCache } from "lru-cache";
import { cache } from "../lib/cache";
import { max } from "lodash";
export class ValueState<T> {
  _value!: T;
  constructor(args: Partial<ValueState<T>> = {}) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get value() {
    return this.getValue ? this.getValue(this._value) : this._value;
  }
  set value(value) {
    this._value = value;
  }

  getValue!: (value: T) => T;

  setValue(value: T) {
    this._value = value;
  }
}
export class AsyncState<T, K extends (...args: any) => any = () => {}> {
  loading = false;
  error: Error | null = null;
  value: T | null = null;
  cache?: LRUCache<string, any>;
  private _call: K;
  constructor(
    func: K,
    options?: {
      loading?: boolean;
      cache: LRUCache.Options<string, any, any> | boolean;
    }
  ) {
    this._call = func;
    if (options) {
      const { cache, ...restOptions } = options;
      this.handleCacheConfig(cache);
      Object.assign(this, restOptions);
    }

    makeAutoObservable(this);
  }

  handleCacheConfig(cache: LRUCache.Options<string, any, any> | boolean) {
    const defaultCacheOptions = {
      allowStale: false,
      ttl: 1000 * 5,
      max: 100,
    }
    if (cache) {
      this.cache = new LRUCache({
        ...defaultCacheOptions,
        ...(cache === true ? {} : cache),
      });
    }
  }

  async call(...args: Parameters<K>) {
    const cachedValue = this.cache?.get(JSON.stringify(args));
    if (cachedValue) {
      this.setValue(cachedValue);
      return [this.value, null] as [T, Error | null];
    }
    this.setLoading(true);
    this.value = null;
    try {
      const data = await this._call(...args);
      this.setValue(data);
      this.cache?.set(JSON.stringify(args), data);
    } catch (error) {
      console.error(error);
      this.setError(error as Error);
    }
    this.setLoading(false);
    return [this.value, this.error] as [T, Error | null];
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  setError(error: Error | null) {
    this.error = error;
  }
  setValue(data: T | null) {
    this.value = data;
  }
}

export class ContractWrite<T extends (...args: any) => any> {
  static nonce = 0;
  loading = false;
  error: Error | null = null;
  action?: string = "";
  successMsg: string = "";
  failMsg: string = "";
  silent: boolean = false;
  private _call: (...args: any) => any;
  constructor(func: T, options?: Partial<ContractWrite<T>>) {
    this._call = func;
    if (options) {
      Object.assign(this, options);
    }

    makeAutoObservable(this);
  }

  get successMsgAgg() {
    if (this.successMsg) {
      return this.successMsg;
    }
    return this.action ? `${this.action} successfully` : `Transaction Success`;
  }

  get failMsgAgg() {
    if (this.failMsg) {
      return this.failMsg;
    }
    return this.action ? `${this.action} Failed` : `Transaction Failed`;
  }

  call = async (
    args: Parameters<T>[0] = [],
    options?: Partial<Parameters<T>[1]>
  ) => {
    this.setLoading(true);
    try {
      const hash = await this._call(args, {
        account: wallet.account,
        ...options,
      });
      console.log("hash", hash);
      const pendingPopup = toast(
        TransactionPendingToastify({ hash, action: this.action }),
        {
          autoClose: false,
          isLoading: true,
        } as ToastOptions
      );
      const transaction = await wallet.publicClient.waitForTransactionReceipt({
        confirmations: 2,
        hash,
        timeout: 1000 * 60 * 5,
      });
      console.log("transaction", transaction);
      toast.dismiss(pendingPopup);
      if (!this.silent) {
        switch (transaction.status) {
          case "success":
            toast.success(this.successMsgAgg);
            break;
          case "reverted":
            toast.error(this.failMsgAgg);
            break;
          default:
            throw new Error(`Transaction ${hash} Pending`);
        }
      }
      return transaction;
    } catch (error: any) {
      if (error.message.includes("User rejected the request")) {
        toast.error("User rejected the request");
      } else {
        toast.error(this.failMsg || error.message);
      }

      console.error(error);
      this.setError(error as Error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  };
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  setError(error: Error | null) {
    this.error = error;
  }
}

export class PaginationState {
  page: number = 1;
  limit: number = 10;
  total: number = 0;

  constructor(args: Partial<PaginationState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }

  get end() {
    return this.page * this.limit;
  }

  totalPage = new AsyncState<number, () => Promise<number>>(async () => {
    return Math.ceil(this.total / this.limit);
  });

  setData(args: Partial<PaginationState>) {
    Object.assign(this, args);
  }

  onPageChange = (page: number) => {
    this.page = page;
  };
  onSizeChange = (limit: number) => {
    this.limit = limit;
  };
  setTotal(total: number) {
    this.total = total;
    this.totalPage.call();
  }
}

export class StorageState<T> {
  key: string = "";
  value: T | null = null;
  constructor(args: Partial<StorageState<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  async sync() {
    this.value = (await localforage.getItem(this.key)) as T;
  }

  async setValue(value: T | null) {
    this.value = value;
    await localforage.setItem(this.key, value);
  }
}
