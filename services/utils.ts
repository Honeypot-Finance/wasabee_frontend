import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { wallet } from "./wallet";

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
  private _call: K;
  constructor(
    func: K,
    options?: {
      loading?: boolean;
    }
  ) {
    this._call = func;
    if (options) {
      Object.assign(this, options);
    }

    makeAutoObservable(this);
  }
  async call(...args: Parameters<K>) {
    this.setLoading(true);
    this.value = null
    try {
      const data = await this._call(...args);
      this.setValue(data);
    } catch (error) {
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
  static nonce = 0
  loading = false;
  error: Error | null = null;
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

  call = async (args?: Parameters<T>[0]) => {
    const count = await wallet.publicClient.getTransactionCount({
      address: wallet.account as `0x${string}` ,
    })
    if (ContractWrite.nonce < count) {
      ContractWrite.nonce = count
    } else {
      ContractWrite.nonce += 1
    }

    console.log('nonce', ContractWrite.nonce)
    this.setLoading(true);
    try {
      const hash = await this._call(args, {
         account: wallet.account,
      });
      console.log('hash', hash)
      const transaction =
        await wallet.publicClient.waitForTransactionReceipt({
          hash,
          timeout: 1000 * 60 * 5,
        })
      console.log('transaction', transaction)
      if (!this.silent) {
        switch (transaction.status) {
          case "success":
            toast.success(this.successMsg || `Transaction ${hash} Success`);
            break;
          case "reverted":
            toast.error(this.failMsg || `Transaction ${hash} failed`);
            break;
          default:
            throw new Error(`Transaction ${hash} Pending`);
        }
      }
      return transaction
    } catch (error: any) {
      if (error.message.includes("User rejected the request")) {
        toast.error("User rejected the request");
      } else {
        toast.error(this.failMsg || error.message);
      }
      
      console.error(error);
      this.setError(error as Error);
      throw error;
    }finally{
      this.setLoading(false);
    }
   
  }
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

  get totalPage() {
    return Math.ceil(this.total / this.limit);
  }
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
  }
}
