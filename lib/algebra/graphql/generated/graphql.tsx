import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: any; output: any };
  BigInt: { input: any; output: any };
  Bytes: { input: any; output: any };
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any };
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any };
};

export type Account = {
  __typename?: "Account";
  accountBalanceUSD: Scalars["BigDecimal"]["output"];
  accountBalanceUSDDay: Scalars["BigDecimal"]["output"];
  accountBalanceUSDMonth: Scalars["BigDecimal"]["output"];
  accountBalanceUSDWeek: Scalars["BigDecimal"]["output"];
  accountBalanceUSDYear: Scalars["BigDecimal"]["output"];
  holder: Array<HoldingToken>;
  holdingPoolCount: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  memeTokenHoldingCount: Scalars["BigInt"]["output"];
  participant: Array<Participant>;
  participateCount: Scalars["BigInt"]["output"];
  platformTxCount: Scalars["BigInt"]["output"];
  pot2PumpLaunchCount: Scalars["BigInt"]["output"];
  swapCount: Scalars["BigInt"]["output"];
  totalEarningPercentageDay: Scalars["BigDecimal"]["output"];
  totalEarningPercentageMonth: Scalars["BigDecimal"]["output"];
  totalEarningPercentageWeek: Scalars["BigDecimal"]["output"];
  totalEarningPercentageYear: Scalars["BigDecimal"]["output"];
  totalEarningUSDDay: Scalars["BigDecimal"]["output"];
  totalEarningUSDMonth: Scalars["BigDecimal"]["output"];
  totalEarningUSDWeek: Scalars["BigDecimal"]["output"];
  totalEarningUSDYear: Scalars["BigDecimal"]["output"];
  totalSpendUSD: Scalars["BigDecimal"]["output"];
  transaction: Array<Transaction>;
  vaultShares?: Maybe<Array<VaultShare>>;
};

export type AccountHolderArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<HoldingToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<HoldingToken_Filter>;
};

export type AccountParticipantArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Participant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Participant_Filter>;
};

export type AccountTransactionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Transaction_Filter>;
};

export type AccountVaultSharesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultShare_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accountBalanceUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDDay?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDDay_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDDay_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDDay_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  accountBalanceUSDDay_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDDay_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDDay_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDDay_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  accountBalanceUSDMonth?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDMonth_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDMonth_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDMonth_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  accountBalanceUSDMonth_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDMonth_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDMonth_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDMonth_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  accountBalanceUSDWeek?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDWeek_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDWeek_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDWeek_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  accountBalanceUSDWeek_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDWeek_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDWeek_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDWeek_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  accountBalanceUSDYear?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDYear_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDYear_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDYear_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  accountBalanceUSDYear_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDYear_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDYear_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSDYear_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  accountBalanceUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  accountBalanceUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  accountBalanceUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  holder_?: InputMaybe<HoldingToken_Filter>;
  holdingPoolCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingPoolCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingPoolCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingPoolCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  holdingPoolCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingPoolCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingPoolCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingPoolCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  memeTokenHoldingCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  memeTokenHoldingCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  memeTokenHoldingCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  memeTokenHoldingCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  memeTokenHoldingCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  memeTokenHoldingCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  memeTokenHoldingCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  memeTokenHoldingCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  participant_?: InputMaybe<Participant_Filter>;
  participateCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  participateCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  participateCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  participateCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  participateCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  participateCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  participateCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  participateCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  platformTxCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  platformTxCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  platformTxCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  platformTxCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  platformTxCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  platformTxCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  platformTxCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  platformTxCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  pot2PumpLaunchCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  pot2PumpLaunchCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  pot2PumpLaunchCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  pot2PumpLaunchCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  pot2PumpLaunchCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  pot2PumpLaunchCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  pot2PumpLaunchCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  pot2PumpLaunchCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  swapCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  swapCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  swapCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  swapCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  swapCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  swapCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  swapCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  swapCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalEarningPercentageDay?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageDay_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageDay_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageDay_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningPercentageDay_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageDay_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageDay_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageDay_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningPercentageMonth?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageMonth_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageMonth_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageMonth_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningPercentageMonth_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageMonth_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageMonth_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageMonth_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningPercentageWeek?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageWeek_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageWeek_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageWeek_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningPercentageWeek_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageWeek_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageWeek_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageWeek_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningPercentageYear?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageYear_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageYear_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageYear_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningPercentageYear_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageYear_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageYear_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningPercentageYear_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningUSDDay?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDDay_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDDay_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDDay_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalEarningUSDDay_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDDay_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDDay_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDDay_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalEarningUSDMonth?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDMonth_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDMonth_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDMonth_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalEarningUSDMonth_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDMonth_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDMonth_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDMonth_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningUSDWeek?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDWeek_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDWeek_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDWeek_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalEarningUSDWeek_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDWeek_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDWeek_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDWeek_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalEarningUSDYear?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDYear_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDYear_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDYear_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalEarningUSDYear_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDYear_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDYear_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalEarningUSDYear_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalSpendUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalSpendUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalSpendUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalSpendUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalSpendUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalSpendUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalSpendUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalSpendUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  transaction_?: InputMaybe<Transaction_Filter>;
  vaultShares_?: InputMaybe<VaultShare_Filter>;
};

export enum Account_OrderBy {
  AccountBalanceUsd = "accountBalanceUSD",
  AccountBalanceUsdDay = "accountBalanceUSDDay",
  AccountBalanceUsdMonth = "accountBalanceUSDMonth",
  AccountBalanceUsdWeek = "accountBalanceUSDWeek",
  AccountBalanceUsdYear = "accountBalanceUSDYear",
  Holder = "holder",
  HoldingPoolCount = "holdingPoolCount",
  Id = "id",
  MemeTokenHoldingCount = "memeTokenHoldingCount",
  Participant = "participant",
  ParticipateCount = "participateCount",
  PlatformTxCount = "platformTxCount",
  Pot2PumpLaunchCount = "pot2PumpLaunchCount",
  SwapCount = "swapCount",
  TotalEarningPercentageDay = "totalEarningPercentageDay",
  TotalEarningPercentageMonth = "totalEarningPercentageMonth",
  TotalEarningPercentageWeek = "totalEarningPercentageWeek",
  TotalEarningPercentageYear = "totalEarningPercentageYear",
  TotalEarningUsdDay = "totalEarningUSDDay",
  TotalEarningUsdMonth = "totalEarningUSDMonth",
  TotalEarningUsdWeek = "totalEarningUSDWeek",
  TotalEarningUsdYear = "totalEarningUSDYear",
  TotalSpendUsd = "totalSpendUSD",
  Transaction = "transaction",
  VaultShares = "vaultShares",
}

export enum Aggregation_Interval {
  Day = "day",
  Hour = "hour",
}

export type AlgebraDayData = {
  __typename?: "AlgebraDayData";
  date: Scalars["Int"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  tvlUSD: Scalars["BigDecimal"]["output"];
  txCount: Scalars["BigInt"]["output"];
  volumeMatic: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
  volumeUSDUntracked: Scalars["BigDecimal"]["output"];
};

export type AlgebraDayData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AlgebraDayData_Filter>>>;
  date?: InputMaybe<Scalars["Int"]["input"]>;
  date_gt?: InputMaybe<Scalars["Int"]["input"]>;
  date_gte?: InputMaybe<Scalars["Int"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  date_lt?: InputMaybe<Scalars["Int"]["input"]>;
  date_lte?: InputMaybe<Scalars["Int"]["input"]>;
  date_not?: InputMaybe<Scalars["Int"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<AlgebraDayData_Filter>>>;
  tvlUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tvlUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  txCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  volumeMatic?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeMatic_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeMatic_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeMatic_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeMatic_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeMatic_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeMatic_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeMatic_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSDUntracked?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSDUntracked_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSDUntracked_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSDUntracked_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSDUntracked_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSDUntracked_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSDUntracked_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSDUntracked_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum AlgebraDayData_OrderBy {
  Date = "date",
  FeesUsd = "feesUSD",
  Id = "id",
  TvlUsd = "tvlUSD",
  TxCount = "txCount",
  VolumeMatic = "volumeMatic",
  VolumeUsd = "volumeUSD",
  VolumeUsdUntracked = "volumeUSDUntracked",
}

export type Block = {
  __typename?: "Block";
  author?: Maybe<Scalars["String"]["output"]>;
  difficulty?: Maybe<Scalars["BigInt"]["output"]>;
  gasLimit?: Maybe<Scalars["BigInt"]["output"]>;
  gasUsed?: Maybe<Scalars["BigInt"]["output"]>;
  id: Scalars["ID"]["output"];
  number: Scalars["BigInt"]["output"];
  parentHash?: Maybe<Scalars["String"]["output"]>;
  receiptsRoot?: Maybe<Scalars["String"]["output"]>;
  size?: Maybe<Scalars["BigInt"]["output"]>;
  stateRoot?: Maybe<Scalars["String"]["output"]>;
  timestamp: Scalars["BigInt"]["output"];
  totalDifficulty?: Maybe<Scalars["BigInt"]["output"]>;
  transactionsRoot?: Maybe<Scalars["String"]["output"]>;
  unclesHash?: Maybe<Scalars["String"]["output"]>;
};

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Block_Filter>>>;
  author?: InputMaybe<Scalars["String"]["input"]>;
  author_contains?: InputMaybe<Scalars["String"]["input"]>;
  author_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  author_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  author_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  author_gt?: InputMaybe<Scalars["String"]["input"]>;
  author_gte?: InputMaybe<Scalars["String"]["input"]>;
  author_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  author_lt?: InputMaybe<Scalars["String"]["input"]>;
  author_lte?: InputMaybe<Scalars["String"]["input"]>;
  author_not?: InputMaybe<Scalars["String"]["input"]>;
  author_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  author_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  author_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  author_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  author_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  author_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  author_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  author_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  author_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  difficulty?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  difficulty_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  difficulty_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasLimit?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasLimit_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasUsed?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasUsed_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasUsed_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  number?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  number_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  number_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Block_Filter>>>;
  parentHash?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_contains?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_gt?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_gte?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  parentHash_lt?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_lte?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_not?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  parentHash_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  parentHash_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_contains?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_gt?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_gte?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  receiptsRoot_lt?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_lte?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_not?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  receiptsRoot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  receiptsRoot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  size?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  size_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  size_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stateRoot?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_contains?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_gt?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_gte?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  stateRoot_lt?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_lte?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_not?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  stateRoot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  stateRoot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalDifficulty?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalDifficulty_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalDifficulty_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transactionsRoot?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_contains?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_gt?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_gte?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transactionsRoot_lt?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_lte?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_not?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  transactionsRoot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transactionsRoot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  transactionsRoot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transactionsRoot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_contains?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_gt?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_gte?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  unclesHash_lt?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_lte?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_not?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  unclesHash_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  unclesHash_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum Block_OrderBy {
  Author = "author",
  Difficulty = "difficulty",
  GasLimit = "gasLimit",
  GasUsed = "gasUsed",
  Id = "id",
  Number = "number",
  ParentHash = "parentHash",
  ReceiptsRoot = "receiptsRoot",
  Size = "size",
  StateRoot = "stateRoot",
  Timestamp = "timestamp",
  TotalDifficulty = "totalDifficulty",
  TransactionsRoot = "transactionsRoot",
  UnclesHash = "unclesHash",
}

export type Bundle = {
  __typename?: "Bundle";
  id: Scalars["ID"]["output"];
  maticPriceUSD: Scalars["BigDecimal"]["output"];
};

export type Bundle_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bundle_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  maticPriceUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  maticPriceUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  maticPriceUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  maticPriceUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  maticPriceUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  maticPriceUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  maticPriceUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  maticPriceUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Bundle_Filter>>>;
};

export enum Bundle_OrderBy {
  Id = "id",
  MaticPriceUsd = "maticPriceUSD",
}

export type Burn = {
  __typename?: "Burn";
  amount: Scalars["BigInt"]["output"];
  amount0: Scalars["BigDecimal"]["output"];
  amount1: Scalars["BigDecimal"]["output"];
  amountUSD?: Maybe<Scalars["BigDecimal"]["output"]>;
  id: Scalars["ID"]["output"];
  logIndex?: Maybe<Scalars["BigInt"]["output"]>;
  origin: Scalars["Bytes"]["output"];
  owner?: Maybe<Scalars["Bytes"]["output"]>;
  pool: Pool;
  tickLower: Scalars["BigInt"]["output"];
  tickUpper: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  token0: Token;
  token1: Token;
  transaction: Transaction;
};

export type Burn_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Burn_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  logIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  logIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Burn_Filter>>>;
  origin?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  origin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickLower?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickLower_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickUpper?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickUpper_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  token0?: InputMaybe<Scalars["String"]["input"]>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_gt?: InputMaybe<Scalars["String"]["input"]>;
  token0_gte?: InputMaybe<Scalars["String"]["input"]>;
  token0_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_lt?: InputMaybe<Scalars["String"]["input"]>;
  token0_lte?: InputMaybe<Scalars["String"]["input"]>;
  token0_not?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1?: InputMaybe<Scalars["String"]["input"]>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_gt?: InputMaybe<Scalars["String"]["input"]>;
  token1_gte?: InputMaybe<Scalars["String"]["input"]>;
  token1_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_lt?: InputMaybe<Scalars["String"]["input"]>;
  token1_lte?: InputMaybe<Scalars["String"]["input"]>;
  token1_not?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Burn_OrderBy {
  Amount = "amount",
  Amount0 = "amount0",
  Amount1 = "amount1",
  AmountUsd = "amountUSD",
  Id = "id",
  LogIndex = "logIndex",
  Origin = "origin",
  Owner = "owner",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  TickLower = "tickLower",
  TickUpper = "tickUpper",
  Timestamp = "timestamp",
  Token0 = "token0",
  Token0Decimals = "token0__decimals",
  Token0DerivedMatic = "token0__derivedMatic",
  Token0DerivedUsd = "token0__derivedUSD",
  Token0FeesUsd = "token0__feesUSD",
  Token0HolderCount = "token0__holderCount",
  Token0Id = "token0__id",
  Token0InitialUsd = "token0__initialUSD",
  Token0MarketCap = "token0__marketCap",
  Token0Name = "token0__name",
  Token0PoolCount = "token0__poolCount",
  Token0Symbol = "token0__symbol",
  Token0TotalSupply = "token0__totalSupply",
  Token0TotalValueLocked = "token0__totalValueLocked",
  Token0TotalValueLockedUsd = "token0__totalValueLockedUSD",
  Token0TotalValueLockedUsdUntracked = "token0__totalValueLockedUSDUntracked",
  Token0TxCount = "token0__txCount",
  Token0UntrackedVolumeUsd = "token0__untrackedVolumeUSD",
  Token0Volume = "token0__volume",
  Token0VolumeUsd = "token0__volumeUSD",
  Token1 = "token1",
  Token1Decimals = "token1__decimals",
  Token1DerivedMatic = "token1__derivedMatic",
  Token1DerivedUsd = "token1__derivedUSD",
  Token1FeesUsd = "token1__feesUSD",
  Token1HolderCount = "token1__holderCount",
  Token1Id = "token1__id",
  Token1InitialUsd = "token1__initialUSD",
  Token1MarketCap = "token1__marketCap",
  Token1Name = "token1__name",
  Token1PoolCount = "token1__poolCount",
  Token1Symbol = "token1__symbol",
  Token1TotalSupply = "token1__totalSupply",
  Token1TotalValueLocked = "token1__totalValueLocked",
  Token1TotalValueLockedUsd = "token1__totalValueLockedUSD",
  Token1TotalValueLockedUsdUntracked = "token1__totalValueLockedUSDUntracked",
  Token1TxCount = "token1__txCount",
  Token1UntrackedVolumeUsd = "token1__untrackedVolumeUSD",
  Token1Volume = "token1__volume",
  Token1VolumeUsd = "token1__volumeUSD",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
}

export type ClaimLp = {
  __typename?: "ClaimLp";
  amount: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  logIndex?: Maybe<Scalars["BigInt"]["output"]>;
  origin: Scalars["Bytes"]["output"];
  poolAddress: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  transaction: Transaction;
};

export type ClaimLp_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<ClaimLp_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  logIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  logIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ClaimLp_Filter>>>;
  origin?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  origin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  poolAddress?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  poolAddress_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum ClaimLp_OrderBy {
  Amount = "amount",
  Id = "id",
  LogIndex = "logIndex",
  Origin = "origin",
  PoolAddress = "poolAddress",
  Timestamp = "timestamp",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
}

export type Collect = {
  __typename?: "Collect";
  amount0: Scalars["BigDecimal"]["output"];
  amount1: Scalars["BigDecimal"]["output"];
  amountUSD?: Maybe<Scalars["BigDecimal"]["output"]>;
  id: Scalars["ID"]["output"];
  logIndex?: Maybe<Scalars["BigInt"]["output"]>;
  owner?: Maybe<Scalars["Bytes"]["output"]>;
  pool: Pool;
  tickLower: Scalars["BigInt"]["output"];
  tickUpper: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  transaction: Transaction;
};

export type Collect_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Collect_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  logIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  logIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Collect_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickLower?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickLower_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickUpper?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickUpper_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Collect_OrderBy {
  Amount0 = "amount0",
  Amount1 = "amount1",
  AmountUsd = "amountUSD",
  Id = "id",
  LogIndex = "logIndex",
  Owner = "owner",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  TickLower = "tickLower",
  TickUpper = "tickUpper",
  Timestamp = "timestamp",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
}

export type DeployIchiVault = {
  __typename?: "DeployICHIVault";
  allowToken0: Scalars["Boolean"]["output"];
  allowToken1: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  owner: Scalars["Bytes"]["output"];
  pool: Pool;
  sender: Scalars["Bytes"]["output"];
  twapPeriod: Scalars["BigInt"]["output"];
  vault: IchiVault;
};

export type DeployIchiVault_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowToken0?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowToken0_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowToken0_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowToken0_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowToken1?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowToken1_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowToken1_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowToken1_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<DeployIchiVault_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<DeployIchiVault_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  twapPeriod?: InputMaybe<Scalars["BigInt"]["input"]>;
  twapPeriod_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  twapPeriod_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  twapPeriod_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  twapPeriod_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  twapPeriod_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  twapPeriod_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  twapPeriod_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum DeployIchiVault_OrderBy {
  AllowToken0 = "allowToken0",
  AllowToken1 = "allowToken1",
  Id = "id",
  Owner = "owner",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  Sender = "sender",
  TwapPeriod = "twapPeriod",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type Deposit = {
  __typename?: "Deposit";
  eternalFarming?: Maybe<Scalars["Bytes"]["output"]>;
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  owner: Scalars["Bytes"]["output"];
  pool: Scalars["Bytes"]["output"];
  rangeLength: Scalars["BigInt"]["output"];
};

export type DepositRaisedToken = {
  __typename?: "DepositRaisedToken";
  amount: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  logIndex?: Maybe<Scalars["BigInt"]["output"]>;
  origin: Scalars["Bytes"]["output"];
  poolAddress?: Maybe<Scalars["Bytes"]["output"]>;
  timestamp: Scalars["BigInt"]["output"];
  transaction: Transaction;
};

export type DepositRaisedToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<DepositRaisedToken_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  logIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  logIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<DepositRaisedToken_Filter>>>;
  origin?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  origin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  poolAddress?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  poolAddress_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum DepositRaisedToken_OrderBy {
  Amount = "amount",
  Id = "id",
  LogIndex = "logIndex",
  Origin = "origin",
  PoolAddress = "poolAddress",
  Timestamp = "timestamp",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
}

export type Deposit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Deposit_Filter>>>;
  eternalFarming?: InputMaybe<Scalars["Bytes"]["input"]>;
  eternalFarming_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  eternalFarming_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  eternalFarming_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  eternalFarming_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  eternalFarming_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  eternalFarming_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  eternalFarming_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  eternalFarming_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  eternalFarming_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Deposit_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  rangeLength?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeLength_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeLength_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeLength_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rangeLength_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeLength_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeLength_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeLength_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Deposit_OrderBy {
  EternalFarming = "eternalFarming",
  Id = "id",
  Liquidity = "liquidity",
  Owner = "owner",
  Pool = "pool",
  RangeLength = "rangeLength",
}

export type EternalFarming = {
  __typename?: "EternalFarming";
  bonusReward: Scalars["BigInt"]["output"];
  bonusRewardRate: Scalars["BigInt"]["output"];
  bonusRewardToken: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  isDeactivated?: Maybe<Scalars["Boolean"]["output"]>;
  minRangeLength: Scalars["BigInt"]["output"];
  nonce: Scalars["BigInt"]["output"];
  pool: Scalars["Bytes"]["output"];
  reward: Scalars["BigInt"]["output"];
  rewardRate: Scalars["BigInt"]["output"];
  rewardToken: Scalars["Bytes"]["output"];
  virtualPool: Scalars["Bytes"]["output"];
};

export type EternalFarming_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EternalFarming_Filter>>>;
  bonusReward?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusRewardRate?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusRewardRate_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusRewardRate_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusRewardRate_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  bonusRewardRate_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusRewardRate_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusRewardRate_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusRewardRate_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  bonusRewardToken?: InputMaybe<Scalars["Bytes"]["input"]>;
  bonusRewardToken_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  bonusRewardToken_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  bonusRewardToken_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  bonusRewardToken_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  bonusRewardToken_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  bonusRewardToken_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  bonusRewardToken_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  bonusRewardToken_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  bonusRewardToken_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  bonusReward_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusReward_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusReward_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  bonusReward_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusReward_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusReward_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  bonusReward_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  isDeactivated?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDeactivated_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isDeactivated_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDeactivated_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  minRangeLength?: InputMaybe<Scalars["BigInt"]["input"]>;
  minRangeLength_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minRangeLength_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minRangeLength_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minRangeLength_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minRangeLength_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minRangeLength_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  minRangeLength_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  nonce?: InputMaybe<Scalars["BigInt"]["input"]>;
  nonce_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  nonce_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  nonce_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  nonce_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  nonce_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  nonce_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  nonce_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EternalFarming_Filter>>>;
  pool?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  reward?: InputMaybe<Scalars["BigInt"]["input"]>;
  rewardRate?: InputMaybe<Scalars["BigInt"]["input"]>;
  rewardRate_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rewardRate_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rewardRate_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rewardRate_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rewardRate_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rewardRate_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rewardRate_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rewardToken?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardToken_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardToken_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardToken_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardToken_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  rewardToken_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardToken_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardToken_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardToken_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardToken_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  reward_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  reward_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  reward_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  reward_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  reward_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  reward_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  reward_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  virtualPool?: InputMaybe<Scalars["Bytes"]["input"]>;
  virtualPool_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  virtualPool_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  virtualPool_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  virtualPool_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  virtualPool_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  virtualPool_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  virtualPool_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  virtualPool_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  virtualPool_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum EternalFarming_OrderBy {
  BonusReward = "bonusReward",
  BonusRewardRate = "bonusRewardRate",
  BonusRewardToken = "bonusRewardToken",
  Id = "id",
  IsDeactivated = "isDeactivated",
  MinRangeLength = "minRangeLength",
  Nonce = "nonce",
  Pool = "pool",
  Reward = "reward",
  RewardRate = "rewardRate",
  RewardToken = "rewardToken",
  VirtualPool = "virtualPool",
}

export type Factory = {
  __typename?: "Factory";
  defaultCommunityFee: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  owner: Scalars["ID"]["output"];
  poolCount: Scalars["BigInt"]["output"];
  totalFeesMatic: Scalars["BigDecimal"]["output"];
  totalFeesUSD: Scalars["BigDecimal"]["output"];
  totalValueLockedMatic: Scalars["BigDecimal"]["output"];
  totalValueLockedMaticUntracked: Scalars["BigDecimal"]["output"];
  totalValueLockedUSD: Scalars["BigDecimal"]["output"];
  totalValueLockedUSDUntracked: Scalars["BigDecimal"]["output"];
  totalVolumeMatic: Scalars["BigDecimal"]["output"];
  totalVolumeUSD: Scalars["BigDecimal"]["output"];
  txCount: Scalars["BigInt"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
};

export type Factory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Factory_Filter>>>;
  defaultCommunityFee?: InputMaybe<Scalars["BigInt"]["input"]>;
  defaultCommunityFee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  defaultCommunityFee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  defaultCommunityFee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  defaultCommunityFee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  defaultCommunityFee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  defaultCommunityFee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  defaultCommunityFee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Factory_Filter>>>;
  owner?: InputMaybe<Scalars["ID"]["input"]>;
  owner_gt?: InputMaybe<Scalars["ID"]["input"]>;
  owner_gte?: InputMaybe<Scalars["ID"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["ID"]["input"]>;
  owner_lte?: InputMaybe<Scalars["ID"]["input"]>;
  owner_not?: InputMaybe<Scalars["ID"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  poolCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  poolCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalFeesMatic?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesMatic_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesMatic_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesMatic_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalFeesMatic_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesMatic_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesMatic_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesMatic_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalFeesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalFeesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalFeesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedMatic?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMaticUntracked?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMaticUntracked_gt?: InputMaybe<
    Scalars["BigDecimal"]["input"]
  >;
  totalValueLockedMaticUntracked_gte?: InputMaybe<
    Scalars["BigDecimal"]["input"]
  >;
  totalValueLockedMaticUntracked_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedMaticUntracked_lt?: InputMaybe<
    Scalars["BigDecimal"]["input"]
  >;
  totalValueLockedMaticUntracked_lte?: InputMaybe<
    Scalars["BigDecimal"]["input"]
  >;
  totalValueLockedMaticUntracked_not?: InputMaybe<
    Scalars["BigDecimal"]["input"]
  >;
  totalValueLockedMaticUntracked_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedMatic_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedMatic_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedUSDUntracked_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalVolumeMatic?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeMatic_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeMatic_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeMatic_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalVolumeMatic_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeMatic_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeMatic_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeMatic_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  txCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum Factory_OrderBy {
  DefaultCommunityFee = "defaultCommunityFee",
  Id = "id",
  Owner = "owner",
  PoolCount = "poolCount",
  TotalFeesMatic = "totalFeesMatic",
  TotalFeesUsd = "totalFeesUSD",
  TotalValueLockedMatic = "totalValueLockedMatic",
  TotalValueLockedMaticUntracked = "totalValueLockedMaticUntracked",
  TotalValueLockedUsd = "totalValueLockedUSD",
  TotalValueLockedUsdUntracked = "totalValueLockedUSDUntracked",
  TotalVolumeMatic = "totalVolumeMatic",
  TotalVolumeUsd = "totalVolumeUSD",
  TxCount = "txCount",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
}

export type FeeHourData = {
  __typename?: "FeeHourData";
  changesCount: Scalars["BigInt"]["output"];
  endFee: Scalars["BigInt"]["output"];
  fee: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  maxFee: Scalars["BigInt"]["output"];
  minFee: Scalars["BigInt"]["output"];
  pool: Scalars["String"]["output"];
  startFee: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
};

export type FeeHourData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeeHourData_Filter>>>;
  changesCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  changesCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  changesCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  changesCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  changesCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  changesCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  changesCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  changesCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  endFee?: InputMaybe<Scalars["BigInt"]["input"]>;
  endFee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  endFee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  endFee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  endFee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  endFee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  endFee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  endFee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fee?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  maxFee?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxFee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxFee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxFee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxFee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxFee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxFee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxFee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minFee?: InputMaybe<Scalars["BigInt"]["input"]>;
  minFee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minFee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minFee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minFee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minFee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minFee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  minFee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<FeeHourData_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  startFee?: InputMaybe<Scalars["BigInt"]["input"]>;
  startFee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  startFee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  startFee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  startFee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  startFee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  startFee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  startFee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum FeeHourData_OrderBy {
  ChangesCount = "changesCount",
  EndFee = "endFee",
  Fee = "fee",
  Id = "id",
  MaxFee = "maxFee",
  MinFee = "minFee",
  Pool = "pool",
  StartFee = "startFee",
  Timestamp = "timestamp",
}

export type Flash = {
  __typename?: "Flash";
  amount0: Scalars["BigDecimal"]["output"];
  amount0Paid: Scalars["BigDecimal"]["output"];
  amount1: Scalars["BigDecimal"]["output"];
  amount1Paid: Scalars["BigDecimal"]["output"];
  amountUSD: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  logIndex?: Maybe<Scalars["BigInt"]["output"]>;
  pool: Pool;
  recipient: Scalars["Bytes"]["output"];
  sender: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  transaction: Transaction;
};

export type Flash_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0Paid?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0Paid_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0Paid_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0Paid_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount0Paid_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0Paid_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0Paid_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0Paid_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1Paid?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1Paid_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1Paid_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1Paid_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1Paid_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1Paid_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1Paid_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1Paid_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Flash_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  logIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  logIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Flash_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  recipient?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  recipient_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Flash_OrderBy {
  Amount0 = "amount0",
  Amount0Paid = "amount0Paid",
  Amount1 = "amount1",
  Amount1Paid = "amount1Paid",
  AmountUsd = "amountUSD",
  Id = "id",
  LogIndex = "logIndex",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  Recipient = "recipient",
  Sender = "sender",
  Timestamp = "timestamp",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
}

export type HoldingToken = {
  __typename?: "HoldingToken";
  account: Account;
  holdingValue: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  token: Token;
};

export type HoldingToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["String"]["input"]>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_gt?: InputMaybe<Scalars["String"]["input"]>;
  account_gte?: InputMaybe<Scalars["String"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_lt?: InputMaybe<Scalars["String"]["input"]>;
  account_lte?: InputMaybe<Scalars["String"]["input"]>;
  account_not?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  and?: InputMaybe<Array<InputMaybe<HoldingToken_Filter>>>;
  holdingValue?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingValue_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingValue_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingValue_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  holdingValue_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingValue_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingValue_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  holdingValue_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<HoldingToken_Filter>>>;
  token?: InputMaybe<Scalars["String"]["input"]>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars["String"]["input"]>;
  token_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_gt?: InputMaybe<Scalars["String"]["input"]>;
  token_gte?: InputMaybe<Scalars["String"]["input"]>;
  token_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token_lt?: InputMaybe<Scalars["String"]["input"]>;
  token_lte?: InputMaybe<Scalars["String"]["input"]>;
  token_not?: InputMaybe<Scalars["String"]["input"]>;
  token_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum HoldingToken_OrderBy {
  Account = "account",
  AccountAccountBalanceUsd = "account__accountBalanceUSD",
  AccountAccountBalanceUsdDay = "account__accountBalanceUSDDay",
  AccountAccountBalanceUsdMonth = "account__accountBalanceUSDMonth",
  AccountAccountBalanceUsdWeek = "account__accountBalanceUSDWeek",
  AccountAccountBalanceUsdYear = "account__accountBalanceUSDYear",
  AccountHoldingPoolCount = "account__holdingPoolCount",
  AccountId = "account__id",
  AccountMemeTokenHoldingCount = "account__memeTokenHoldingCount",
  AccountParticipateCount = "account__participateCount",
  AccountPlatformTxCount = "account__platformTxCount",
  AccountPot2PumpLaunchCount = "account__pot2PumpLaunchCount",
  AccountSwapCount = "account__swapCount",
  AccountTotalEarningPercentageDay = "account__totalEarningPercentageDay",
  AccountTotalEarningPercentageMonth = "account__totalEarningPercentageMonth",
  AccountTotalEarningPercentageWeek = "account__totalEarningPercentageWeek",
  AccountTotalEarningPercentageYear = "account__totalEarningPercentageYear",
  AccountTotalEarningUsdDay = "account__totalEarningUSDDay",
  AccountTotalEarningUsdMonth = "account__totalEarningUSDMonth",
  AccountTotalEarningUsdWeek = "account__totalEarningUSDWeek",
  AccountTotalEarningUsdYear = "account__totalEarningUSDYear",
  AccountTotalSpendUsd = "account__totalSpendUSD",
  HoldingValue = "holdingValue",
  Id = "id",
  Token = "token",
  TokenDecimals = "token__decimals",
  TokenDerivedMatic = "token__derivedMatic",
  TokenDerivedUsd = "token__derivedUSD",
  TokenFeesUsd = "token__feesUSD",
  TokenHolderCount = "token__holderCount",
  TokenId = "token__id",
  TokenInitialUsd = "token__initialUSD",
  TokenMarketCap = "token__marketCap",
  TokenName = "token__name",
  TokenPoolCount = "token__poolCount",
  TokenSymbol = "token__symbol",
  TokenTotalSupply = "token__totalSupply",
  TokenTotalValueLocked = "token__totalValueLocked",
  TokenTotalValueLockedUsd = "token__totalValueLockedUSD",
  TokenTotalValueLockedUsdUntracked = "token__totalValueLockedUSDUntracked",
  TokenTxCount = "token__txCount",
  TokenUntrackedVolumeUsd = "token__untrackedVolumeUSD",
  TokenVolume = "token__volume",
  TokenVolumeUsd = "token__volumeUSD",
}

export type IchiVault = {
  __typename?: "IchiVault";
  allowTokenA: Scalars["Boolean"]["output"];
  allowTokenB: Scalars["Boolean"]["output"];
  count: Scalars["BigInt"]["output"];
  createdAtTimestamp: Scalars["BigInt"]["output"];
  holdersCount: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  maxTotalSupply: Array<MaxTotalSupply>;
  pool: Pool;
  sender: Scalars["Bytes"]["output"];
  tokenA: Scalars["Bytes"]["output"];
  tokenB: Scalars["Bytes"]["output"];
  totalShares: Scalars["BigDecimal"]["output"];
  vaultAffiliates: Array<VaultAffiliate>;
  vaultApprovals: Array<VaultApproval>;
  vaultCollectFees: Array<VaultCollectFee>;
  vaultDeposits: Array<VaultDeposit>;
  vaultHysteresis: Array<VaultHysteresis>;
  vaultOwnershipTransferred: Array<VaultOwnershipTransferred>;
  vaultRebalance: Array<VaultRebalance>;
  vaultSetTwapPeriod: Array<VaultSetTwapPeriod>;
  vaultShares: Array<VaultShare>;
  vaultTransfer: Array<VaultTransfer>;
  vaultWithdraws: Array<VaultWithdraw>;
};

export type IchiVaultMaxTotalSupplyArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MaxTotalSupply_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<MaxTotalSupply_Filter>;
};

export type IchiVaultVaultAffiliatesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultAffiliate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultAffiliate_Filter>;
};

export type IchiVaultVaultApprovalsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultApproval_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultApproval_Filter>;
};

export type IchiVaultVaultCollectFeesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultCollectFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultCollectFee_Filter>;
};

export type IchiVaultVaultDepositsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultDeposit_Filter>;
};

export type IchiVaultVaultHysteresisArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultHysteresis_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultHysteresis_Filter>;
};

export type IchiVaultVaultOwnershipTransferredArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultOwnershipTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultOwnershipTransferred_Filter>;
};

export type IchiVaultVaultRebalanceArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultRebalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultRebalance_Filter>;
};

export type IchiVaultVaultSetTwapPeriodArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultSetTwapPeriod_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultSetTwapPeriod_Filter>;
};

export type IchiVaultVaultSharesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultShare_Filter>;
};

export type IchiVaultVaultTransferArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultTransfer_Filter>;
};

export type IchiVaultVaultWithdrawsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultWithdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<VaultWithdraw_Filter>;
};

export type IchiVault_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowTokenA?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowTokenA_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowTokenA_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowTokenA_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowTokenB?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowTokenB_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowTokenB_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowTokenB_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<IchiVault_Filter>>>;
  count?: InputMaybe<Scalars["BigInt"]["input"]>;
  count_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  count_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  count_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  count_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  count_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  count_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  count_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  holdersCount?: InputMaybe<Scalars["Int"]["input"]>;
  holdersCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  holdersCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  holdersCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  holdersCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  holdersCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  holdersCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  holdersCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  maxTotalSupply_?: InputMaybe<MaxTotalSupply_Filter>;
  or?: InputMaybe<Array<InputMaybe<IchiVault_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  tokenA?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenA_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenA_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenA_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenA_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  tokenA_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenA_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenA_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenA_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenA_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  tokenB?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenB_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenB_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenB_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenB_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  tokenB_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenB_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenB_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenB_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  tokenB_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  totalShares?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalShares_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalShares_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalShares_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalShares_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalShares_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalShares_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalShares_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  vaultAffiliates_?: InputMaybe<VaultAffiliate_Filter>;
  vaultApprovals_?: InputMaybe<VaultApproval_Filter>;
  vaultCollectFees_?: InputMaybe<VaultCollectFee_Filter>;
  vaultDeposits_?: InputMaybe<VaultDeposit_Filter>;
  vaultHysteresis_?: InputMaybe<VaultHysteresis_Filter>;
  vaultOwnershipTransferred_?: InputMaybe<VaultOwnershipTransferred_Filter>;
  vaultRebalance_?: InputMaybe<VaultRebalance_Filter>;
  vaultSetTwapPeriod_?: InputMaybe<VaultSetTwapPeriod_Filter>;
  vaultShares_?: InputMaybe<VaultShare_Filter>;
  vaultTransfer_?: InputMaybe<VaultTransfer_Filter>;
  vaultWithdraws_?: InputMaybe<VaultWithdraw_Filter>;
};

export enum IchiVault_OrderBy {
  AllowTokenA = "allowTokenA",
  AllowTokenB = "allowTokenB",
  Count = "count",
  CreatedAtTimestamp = "createdAtTimestamp",
  HoldersCount = "holdersCount",
  Id = "id",
  MaxTotalSupply = "maxTotalSupply",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  Sender = "sender",
  TokenA = "tokenA",
  TokenB = "tokenB",
  TotalShares = "totalShares",
  VaultAffiliates = "vaultAffiliates",
  VaultApprovals = "vaultApprovals",
  VaultCollectFees = "vaultCollectFees",
  VaultDeposits = "vaultDeposits",
  VaultHysteresis = "vaultHysteresis",
  VaultOwnershipTransferred = "vaultOwnershipTransferred",
  VaultRebalance = "vaultRebalance",
  VaultSetTwapPeriod = "vaultSetTwapPeriod",
  VaultShares = "vaultShares",
  VaultTransfer = "vaultTransfer",
  VaultWithdraws = "vaultWithdraws",
}

export type MaxTotalSupply = {
  __typename?: "MaxTotalSupply";
  id: Scalars["ID"]["output"];
  maxTotalSupply: Scalars["BigInt"]["output"];
  sender: Scalars["Bytes"]["output"];
  vault: IchiVault;
};

export type MaxTotalSupply_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MaxTotalSupply_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  maxTotalSupply?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxTotalSupply_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxTotalSupply_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxTotalSupply_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxTotalSupply_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxTotalSupply_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxTotalSupply_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxTotalSupply_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MaxTotalSupply_Filter>>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum MaxTotalSupply_OrderBy {
  Id = "id",
  MaxTotalSupply = "maxTotalSupply",
  Sender = "sender",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type MemeRacer = {
  __typename?: "MemeRacer";
  currentScore: Scalars["BigDecimal"]["output"];
  hourData: Array<MemeRacerHourData>;
  id: Scalars["ID"]["output"];
  token: Token;
  totalSupply: Scalars["BigInt"]["output"];
};

export type MemeRacerHourDataArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MemeRacerHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<MemeRacerHourData_Filter>;
};

export type MemeRacerHourData = {
  __typename?: "MemeRacerHourData";
  id: Scalars["ID"]["output"];
  racer: MemeRacer;
  score: Scalars["BigDecimal"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  usdAtThisHour: Scalars["BigDecimal"]["output"];
};

export type MemeRacerHourData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MemeRacerHourData_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MemeRacerHourData_Filter>>>;
  racer?: InputMaybe<Scalars["String"]["input"]>;
  racer_?: InputMaybe<MemeRacer_Filter>;
  racer_contains?: InputMaybe<Scalars["String"]["input"]>;
  racer_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  racer_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  racer_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  racer_gt?: InputMaybe<Scalars["String"]["input"]>;
  racer_gte?: InputMaybe<Scalars["String"]["input"]>;
  racer_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  racer_lt?: InputMaybe<Scalars["String"]["input"]>;
  racer_lte?: InputMaybe<Scalars["String"]["input"]>;
  racer_not?: InputMaybe<Scalars["String"]["input"]>;
  racer_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  racer_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  racer_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  racer_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  racer_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  racer_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  racer_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  racer_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  racer_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  score?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  score_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  score_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  score_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  score_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  score_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  score_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  score_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  usdAtThisHour?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdAtThisHour_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdAtThisHour_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdAtThisHour_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  usdAtThisHour_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdAtThisHour_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdAtThisHour_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  usdAtThisHour_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum MemeRacerHourData_OrderBy {
  Id = "id",
  Racer = "racer",
  RacerCurrentScore = "racer__currentScore",
  RacerId = "racer__id",
  RacerTotalSupply = "racer__totalSupply",
  Score = "score",
  Timestamp = "timestamp",
  UsdAtThisHour = "usdAtThisHour",
}

export type MemeRacer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MemeRacer_Filter>>>;
  currentScore?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  currentScore_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  currentScore_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  currentScore_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  currentScore_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  currentScore_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  currentScore_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  currentScore_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  hourData_?: InputMaybe<MemeRacerHourData_Filter>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MemeRacer_Filter>>>;
  token?: InputMaybe<Scalars["String"]["input"]>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars["String"]["input"]>;
  token_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_gt?: InputMaybe<Scalars["String"]["input"]>;
  token_gte?: InputMaybe<Scalars["String"]["input"]>;
  token_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token_lt?: InputMaybe<Scalars["String"]["input"]>;
  token_lte?: InputMaybe<Scalars["String"]["input"]>;
  token_not?: InputMaybe<Scalars["String"]["input"]>;
  token_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  totalSupply?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum MemeRacer_OrderBy {
  CurrentScore = "currentScore",
  HourData = "hourData",
  Id = "id",
  Token = "token",
  TokenDecimals = "token__decimals",
  TokenDerivedMatic = "token__derivedMatic",
  TokenDerivedUsd = "token__derivedUSD",
  TokenFeesUsd = "token__feesUSD",
  TokenHolderCount = "token__holderCount",
  TokenId = "token__id",
  TokenInitialUsd = "token__initialUSD",
  TokenMarketCap = "token__marketCap",
  TokenName = "token__name",
  TokenPoolCount = "token__poolCount",
  TokenSymbol = "token__symbol",
  TokenTotalSupply = "token__totalSupply",
  TokenTotalValueLocked = "token__totalValueLocked",
  TokenTotalValueLockedUsd = "token__totalValueLockedUSD",
  TokenTotalValueLockedUsdUntracked = "token__totalValueLockedUSDUntracked",
  TokenTxCount = "token__txCount",
  TokenUntrackedVolumeUsd = "token__untrackedVolumeUSD",
  TokenVolume = "token__volume",
  TokenVolumeUsd = "token__volumeUSD",
  TotalSupply = "totalSupply",
}

export type Mint = {
  __typename?: "Mint";
  amount: Scalars["BigInt"]["output"];
  amount0: Scalars["BigDecimal"]["output"];
  amount1: Scalars["BigDecimal"]["output"];
  amountUSD?: Maybe<Scalars["BigDecimal"]["output"]>;
  id: Scalars["ID"]["output"];
  logIndex?: Maybe<Scalars["BigInt"]["output"]>;
  origin: Scalars["Bytes"]["output"];
  owner: Scalars["Bytes"]["output"];
  pool: Pool;
  sender?: Maybe<Scalars["Bytes"]["output"]>;
  tickLower: Scalars["BigInt"]["output"];
  tickUpper: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  token0: Token;
  token1: Token;
  transaction: Transaction;
};

export type Mint_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Mint_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  logIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  logIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Mint_Filter>>>;
  origin?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  origin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  tickLower?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickLower_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickLower_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickUpper?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickUpper_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickUpper_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  token0?: InputMaybe<Scalars["String"]["input"]>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_gt?: InputMaybe<Scalars["String"]["input"]>;
  token0_gte?: InputMaybe<Scalars["String"]["input"]>;
  token0_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_lt?: InputMaybe<Scalars["String"]["input"]>;
  token0_lte?: InputMaybe<Scalars["String"]["input"]>;
  token0_not?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1?: InputMaybe<Scalars["String"]["input"]>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_gt?: InputMaybe<Scalars["String"]["input"]>;
  token1_gte?: InputMaybe<Scalars["String"]["input"]>;
  token1_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_lt?: InputMaybe<Scalars["String"]["input"]>;
  token1_lte?: InputMaybe<Scalars["String"]["input"]>;
  token1_not?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Mint_OrderBy {
  Amount = "amount",
  Amount0 = "amount0",
  Amount1 = "amount1",
  AmountUsd = "amountUSD",
  Id = "id",
  LogIndex = "logIndex",
  Origin = "origin",
  Owner = "owner",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  Sender = "sender",
  TickLower = "tickLower",
  TickUpper = "tickUpper",
  Timestamp = "timestamp",
  Token0 = "token0",
  Token0Decimals = "token0__decimals",
  Token0DerivedMatic = "token0__derivedMatic",
  Token0DerivedUsd = "token0__derivedUSD",
  Token0FeesUsd = "token0__feesUSD",
  Token0HolderCount = "token0__holderCount",
  Token0Id = "token0__id",
  Token0InitialUsd = "token0__initialUSD",
  Token0MarketCap = "token0__marketCap",
  Token0Name = "token0__name",
  Token0PoolCount = "token0__poolCount",
  Token0Symbol = "token0__symbol",
  Token0TotalSupply = "token0__totalSupply",
  Token0TotalValueLocked = "token0__totalValueLocked",
  Token0TotalValueLockedUsd = "token0__totalValueLockedUSD",
  Token0TotalValueLockedUsdUntracked = "token0__totalValueLockedUSDUntracked",
  Token0TxCount = "token0__txCount",
  Token0UntrackedVolumeUsd = "token0__untrackedVolumeUSD",
  Token0Volume = "token0__volume",
  Token0VolumeUsd = "token0__volumeUSD",
  Token1 = "token1",
  Token1Decimals = "token1__decimals",
  Token1DerivedMatic = "token1__derivedMatic",
  Token1DerivedUsd = "token1__derivedUSD",
  Token1FeesUsd = "token1__feesUSD",
  Token1HolderCount = "token1__holderCount",
  Token1Id = "token1__id",
  Token1InitialUsd = "token1__initialUSD",
  Token1MarketCap = "token1__marketCap",
  Token1Name = "token1__name",
  Token1PoolCount = "token1__poolCount",
  Token1Symbol = "token1__symbol",
  Token1TotalSupply = "token1__totalSupply",
  Token1TotalValueLocked = "token1__totalValueLocked",
  Token1TotalValueLockedUsd = "token1__totalValueLockedUSD",
  Token1TotalValueLockedUsdUntracked = "token1__totalValueLockedUSDUntracked",
  Token1TxCount = "token1__txCount",
  Token1UntrackedVolumeUsd = "token1__untrackedVolumeUSD",
  Token1Volume = "token1__volume",
  Token1VolumeUsd = "token1__volumeUSD",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Participant = {
  __typename?: "Participant";
  account: Account;
  amount: Scalars["BigInt"]["output"];
  canClaim: Scalars["Boolean"]["output"];
  createdAt: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  participantTransactionHistorys: Array<ParticipantTransactionHistory>;
  pot2Pump: Pot2Pump;
  totalRefundAmount: Scalars["BigInt"]["output"];
  totalclaimLqAmount: Scalars["BigInt"]["output"];
};

export type ParticipantParticipantTransactionHistorysArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ParticipantTransactionHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ParticipantTransactionHistory_Filter>;
};

export type ParticipantTransactionHistory = {
  __typename?: "ParticipantTransactionHistory";
  account: Account;
  actionType: TransactionType;
  claimLqAmount: Scalars["BigInt"]["output"];
  createdAt: Scalars["BigInt"]["output"];
  depositAmount: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  participant: Participant;
  pot2Pump: Pot2Pump;
  refundAmount: Scalars["BigInt"]["output"];
};

export type ParticipantTransactionHistory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["String"]["input"]>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_gt?: InputMaybe<Scalars["String"]["input"]>;
  account_gte?: InputMaybe<Scalars["String"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_lt?: InputMaybe<Scalars["String"]["input"]>;
  account_lte?: InputMaybe<Scalars["String"]["input"]>;
  account_not?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  actionType?: InputMaybe<TransactionType>;
  actionType_in?: InputMaybe<Array<TransactionType>>;
  actionType_not?: InputMaybe<TransactionType>;
  actionType_not_in?: InputMaybe<Array<TransactionType>>;
  and?: InputMaybe<Array<InputMaybe<ParticipantTransactionHistory_Filter>>>;
  claimLqAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  claimLqAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  claimLqAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  claimLqAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  claimLqAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  claimLqAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  claimLqAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  claimLqAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  depositAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  depositAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  depositAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  depositAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  depositAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  depositAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  depositAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  depositAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ParticipantTransactionHistory_Filter>>>;
  participant?: InputMaybe<Scalars["String"]["input"]>;
  participant_?: InputMaybe<Participant_Filter>;
  participant_contains?: InputMaybe<Scalars["String"]["input"]>;
  participant_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  participant_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_gt?: InputMaybe<Scalars["String"]["input"]>;
  participant_gte?: InputMaybe<Scalars["String"]["input"]>;
  participant_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  participant_lt?: InputMaybe<Scalars["String"]["input"]>;
  participant_lte?: InputMaybe<Scalars["String"]["input"]>;
  participant_not?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  participant_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  participant_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  participant_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  participant_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_?: InputMaybe<Pot2Pump_Filter>;
  pot2Pump_contains?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_gt?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_gte?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pot2Pump_lt?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_lte?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pot2Pump_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  refundAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  refundAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  refundAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  refundAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  refundAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  refundAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  refundAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  refundAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum ParticipantTransactionHistory_OrderBy {
  Account = "account",
  AccountAccountBalanceUsd = "account__accountBalanceUSD",
  AccountAccountBalanceUsdDay = "account__accountBalanceUSDDay",
  AccountAccountBalanceUsdMonth = "account__accountBalanceUSDMonth",
  AccountAccountBalanceUsdWeek = "account__accountBalanceUSDWeek",
  AccountAccountBalanceUsdYear = "account__accountBalanceUSDYear",
  AccountHoldingPoolCount = "account__holdingPoolCount",
  AccountId = "account__id",
  AccountMemeTokenHoldingCount = "account__memeTokenHoldingCount",
  AccountParticipateCount = "account__participateCount",
  AccountPlatformTxCount = "account__platformTxCount",
  AccountPot2PumpLaunchCount = "account__pot2PumpLaunchCount",
  AccountSwapCount = "account__swapCount",
  AccountTotalEarningPercentageDay = "account__totalEarningPercentageDay",
  AccountTotalEarningPercentageMonth = "account__totalEarningPercentageMonth",
  AccountTotalEarningPercentageWeek = "account__totalEarningPercentageWeek",
  AccountTotalEarningPercentageYear = "account__totalEarningPercentageYear",
  AccountTotalEarningUsdDay = "account__totalEarningUSDDay",
  AccountTotalEarningUsdMonth = "account__totalEarningUSDMonth",
  AccountTotalEarningUsdWeek = "account__totalEarningUSDWeek",
  AccountTotalEarningUsdYear = "account__totalEarningUSDYear",
  AccountTotalSpendUsd = "account__totalSpendUSD",
  ActionType = "actionType",
  ClaimLqAmount = "claimLqAmount",
  CreatedAt = "createdAt",
  DepositAmount = "depositAmount",
  Id = "id",
  Participant = "participant",
  ParticipantAmount = "participant__amount",
  ParticipantCanClaim = "participant__canClaim",
  ParticipantCreatedAt = "participant__createdAt",
  ParticipantId = "participant__id",
  ParticipantTotalRefundAmount = "participant__totalRefundAmount",
  ParticipantTotalclaimLqAmount = "participant__totalclaimLqAmount",
  Pot2Pump = "pot2Pump",
  Pot2PumpDepositLaunchToken = "pot2Pump__DepositLaunchToken",
  Pot2PumpDepositRaisedToken = "pot2Pump__DepositRaisedToken",
  Pot2PumpLaunchTokenMcapusd = "pot2Pump__LaunchTokenMCAPUSD",
  Pot2PumpLaunchTokenTvlusd = "pot2Pump__LaunchTokenTVLUSD",
  Pot2PumpCreatedAt = "pot2Pump__createdAt",
  Pot2PumpCreator = "pot2Pump__creator",
  Pot2PumpEndTime = "pot2Pump__endTime",
  Pot2PumpId = "pot2Pump__id",
  Pot2PumpLaunchTokenInitialPrice = "pot2Pump__launchTokenInitialPrice",
  Pot2PumpParticipantsCount = "pot2Pump__participantsCount",
  Pot2PumpRaisedTokenMinCap = "pot2Pump__raisedTokenMinCap",
  Pot2PumpRaisedTokenReachingMinCap = "pot2Pump__raisedTokenReachingMinCap",
  Pot2PumpSearchString = "pot2Pump__searchString",
  Pot2PumpState = "pot2Pump__state",
  Pot2PumpTotalClaimLpAmount = "pot2Pump__totalClaimLpAmount",
  Pot2PumpTotalRefundAmount = "pot2Pump__totalRefundAmount",
  RefundAmount = "refundAmount",
}

export type Participant_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["String"]["input"]>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_gt?: InputMaybe<Scalars["String"]["input"]>;
  account_gte?: InputMaybe<Scalars["String"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_lt?: InputMaybe<Scalars["String"]["input"]>;
  account_lte?: InputMaybe<Scalars["String"]["input"]>;
  account_not?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Participant_Filter>>>;
  canClaim?: InputMaybe<Scalars["Boolean"]["input"]>;
  canClaim_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  canClaim_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  canClaim_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  createdAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Participant_Filter>>>;
  participantTransactionHistorys_?: InputMaybe<ParticipantTransactionHistory_Filter>;
  pot2Pump?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_?: InputMaybe<Pot2Pump_Filter>;
  pot2Pump_contains?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_gt?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_gte?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pot2Pump_lt?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_lte?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pot2Pump_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pot2Pump_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  totalRefundAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalRefundAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalclaimLqAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalclaimLqAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalclaimLqAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalclaimLqAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalclaimLqAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalclaimLqAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalclaimLqAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalclaimLqAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Participant_OrderBy {
  Account = "account",
  AccountAccountBalanceUsd = "account__accountBalanceUSD",
  AccountAccountBalanceUsdDay = "account__accountBalanceUSDDay",
  AccountAccountBalanceUsdMonth = "account__accountBalanceUSDMonth",
  AccountAccountBalanceUsdWeek = "account__accountBalanceUSDWeek",
  AccountAccountBalanceUsdYear = "account__accountBalanceUSDYear",
  AccountHoldingPoolCount = "account__holdingPoolCount",
  AccountId = "account__id",
  AccountMemeTokenHoldingCount = "account__memeTokenHoldingCount",
  AccountParticipateCount = "account__participateCount",
  AccountPlatformTxCount = "account__platformTxCount",
  AccountPot2PumpLaunchCount = "account__pot2PumpLaunchCount",
  AccountSwapCount = "account__swapCount",
  AccountTotalEarningPercentageDay = "account__totalEarningPercentageDay",
  AccountTotalEarningPercentageMonth = "account__totalEarningPercentageMonth",
  AccountTotalEarningPercentageWeek = "account__totalEarningPercentageWeek",
  AccountTotalEarningPercentageYear = "account__totalEarningPercentageYear",
  AccountTotalEarningUsdDay = "account__totalEarningUSDDay",
  AccountTotalEarningUsdMonth = "account__totalEarningUSDMonth",
  AccountTotalEarningUsdWeek = "account__totalEarningUSDWeek",
  AccountTotalEarningUsdYear = "account__totalEarningUSDYear",
  AccountTotalSpendUsd = "account__totalSpendUSD",
  Amount = "amount",
  CanClaim = "canClaim",
  CreatedAt = "createdAt",
  Id = "id",
  ParticipantTransactionHistorys = "participantTransactionHistorys",
  Pot2Pump = "pot2Pump",
  Pot2PumpDepositLaunchToken = "pot2Pump__DepositLaunchToken",
  Pot2PumpDepositRaisedToken = "pot2Pump__DepositRaisedToken",
  Pot2PumpLaunchTokenMcapusd = "pot2Pump__LaunchTokenMCAPUSD",
  Pot2PumpLaunchTokenTvlusd = "pot2Pump__LaunchTokenTVLUSD",
  Pot2PumpCreatedAt = "pot2Pump__createdAt",
  Pot2PumpCreator = "pot2Pump__creator",
  Pot2PumpEndTime = "pot2Pump__endTime",
  Pot2PumpId = "pot2Pump__id",
  Pot2PumpLaunchTokenInitialPrice = "pot2Pump__launchTokenInitialPrice",
  Pot2PumpParticipantsCount = "pot2Pump__participantsCount",
  Pot2PumpRaisedTokenMinCap = "pot2Pump__raisedTokenMinCap",
  Pot2PumpRaisedTokenReachingMinCap = "pot2Pump__raisedTokenReachingMinCap",
  Pot2PumpSearchString = "pot2Pump__searchString",
  Pot2PumpState = "pot2Pump__state",
  Pot2PumpTotalClaimLpAmount = "pot2Pump__totalClaimLpAmount",
  Pot2PumpTotalRefundAmount = "pot2Pump__totalRefundAmount",
  TotalRefundAmount = "totalRefundAmount",
  TotalclaimLqAmount = "totalclaimLqAmount",
}

export type Plugin = {
  __typename?: "Plugin";
  collectedFeesToken0: Scalars["BigDecimal"]["output"];
  collectedFeesToken1: Scalars["BigDecimal"]["output"];
  collectedFeesUSD: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  pool: Pool;
};

export type Plugin_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Plugin_Filter>>>;
  collectedFeesToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collectedFeesToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collectedFeesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Plugin_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Plugin_OrderBy {
  CollectedFeesToken0 = "collectedFeesToken0",
  CollectedFeesToken1 = "collectedFeesToken1",
  CollectedFeesUsd = "collectedFeesUSD",
  Id = "id",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
}

export type Pool = {
  __typename?: "Pool";
  aprDayData: Array<PoolDayData>;
  aprMonthData: Array<PoolMonthData>;
  aprPercentage: Scalars["BigDecimal"]["output"];
  aprWeekData: Array<PoolWeekData>;
  burns: Array<Burn>;
  collectedFeesToken0: Scalars["BigDecimal"]["output"];
  collectedFeesToken1: Scalars["BigDecimal"]["output"];
  collectedFeesUSD: Scalars["BigDecimal"]["output"];
  collects: Array<Collect>;
  communityFee: Scalars["BigInt"]["output"];
  createdAtBlockNumber: Scalars["BigInt"]["output"];
  createdAtTimestamp: Scalars["BigInt"]["output"];
  deployer: Scalars["Bytes"]["output"];
  fee: Scalars["BigInt"]["output"];
  feeGrowthGlobal0X128: Scalars["BigInt"]["output"];
  feeGrowthGlobal1X128: Scalars["BigInt"]["output"];
  feesToken0: Scalars["BigDecimal"]["output"];
  feesToken1: Scalars["BigDecimal"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  liquidityProviderCount: Scalars["BigInt"]["output"];
  mints: Array<Mint>;
  observationIndex: Scalars["BigInt"]["output"];
  plugin: Scalars["Bytes"]["output"];
  pluginConfig: Scalars["Int"]["output"];
  poolDayData: Array<PoolDayData>;
  poolHourData: Array<PoolHourData>;
  poolMonthData: Array<PoolMonthData>;
  poolWeekData: Array<PoolWeekData>;
  searchString: Scalars["String"]["output"];
  sqrtPrice: Scalars["BigInt"]["output"];
  swaps: Array<Swap>;
  tick: Scalars["BigInt"]["output"];
  tickSpacing: Scalars["BigInt"]["output"];
  ticks: Array<Tick>;
  token0: Token;
  token0Price: Scalars["BigDecimal"]["output"];
  token1: Token;
  token1Price: Scalars["BigDecimal"]["output"];
  totalValueLockedMatic: Scalars["BigDecimal"]["output"];
  totalValueLockedToken0: Scalars["BigDecimal"]["output"];
  totalValueLockedToken1: Scalars["BigDecimal"]["output"];
  totalValueLockedUSD: Scalars["BigDecimal"]["output"];
  totalValueLockedUSDUntracked: Scalars["BigDecimal"]["output"];
  txCount: Scalars["BigInt"]["output"];
  untrackedFeesUSD: Scalars["BigDecimal"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
  vaults?: Maybe<IchiVault>;
  volumeToken0: Scalars["BigDecimal"]["output"];
  volumeToken1: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
};

export type PoolAprDayDataArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<PoolDayData_Filter>;
};

export type PoolAprMonthDataArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolMonthData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<PoolMonthData_Filter>;
};

export type PoolAprWeekDataArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolWeekData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<PoolWeekData_Filter>;
};

export type PoolBurnsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Burn_Filter>;
};

export type PoolCollectsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Collect_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Collect_Filter>;
};

export type PoolMintsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Mint_Filter>;
};

export type PoolPoolDayDataArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<PoolDayData_Filter>;
};

export type PoolPoolHourDataArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<PoolHourData_Filter>;
};

export type PoolPoolMonthDataArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolMonthData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<PoolMonthData_Filter>;
};

export type PoolPoolWeekDataArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolWeekData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<PoolWeekData_Filter>;
};

export type PoolSwapsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Swap_Filter>;
};

export type PoolTicksArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Tick_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Tick_Filter>;
};

export type PoolDayData = {
  __typename?: "PoolDayData";
  aprPercentage: Scalars["BigDecimal"]["output"];
  close: Scalars["BigDecimal"]["output"];
  dailyFeeUSD: Scalars["BigDecimal"]["output"];
  date: Scalars["Int"]["output"];
  feeGrowthGlobal0X128: Scalars["BigInt"]["output"];
  feeGrowthGlobal1X128: Scalars["BigInt"]["output"];
  feesToken0: Scalars["BigDecimal"]["output"];
  feesToken1: Scalars["BigDecimal"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  high: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  low: Scalars["BigDecimal"]["output"];
  open: Scalars["BigDecimal"]["output"];
  pool: Pool;
  sqrtPrice: Scalars["BigInt"]["output"];
  tick?: Maybe<Scalars["BigInt"]["output"]>;
  token0Price: Scalars["BigDecimal"]["output"];
  token1Price: Scalars["BigDecimal"]["output"];
  tvlUSD: Scalars["BigDecimal"]["output"];
  txCount: Scalars["BigInt"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
  volumeToken0: Scalars["BigDecimal"]["output"];
  volumeToken1: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
};

export type PoolDayData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolDayData_Filter>>>;
  aprPercentage?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  aprPercentage_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  close?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  close_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  dailyFeeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  dailyFeeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  dailyFeeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  dailyFeeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  dailyFeeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  dailyFeeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  dailyFeeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  dailyFeeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  date?: InputMaybe<Scalars["Int"]["input"]>;
  date_gt?: InputMaybe<Scalars["Int"]["input"]>;
  date_gte?: InputMaybe<Scalars["Int"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  date_lt?: InputMaybe<Scalars["Int"]["input"]>;
  date_lte?: InputMaybe<Scalars["Int"]["input"]>;
  date_not?: InputMaybe<Scalars["Int"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  feeGrowthGlobal0X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal0X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feesToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  low?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  low_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PoolDayData_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  token0Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token0Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tvlUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tvlUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  txCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum PoolDayData_OrderBy {
  AprPercentage = "aprPercentage",
  Close = "close",
  DailyFeeUsd = "dailyFeeUSD",
  Date = "date",
  FeeGrowthGlobal0X128 = "feeGrowthGlobal0X128",
  FeeGrowthGlobal1X128 = "feeGrowthGlobal1X128",
  FeesToken0 = "feesToken0",
  FeesToken1 = "feesToken1",
  FeesUsd = "feesUSD",
  High = "high",
  Id = "id",
  Liquidity = "liquidity",
  Low = "low",
  Open = "open",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  SqrtPrice = "sqrtPrice",
  Tick = "tick",
  Token0Price = "token0Price",
  Token1Price = "token1Price",
  TvlUsd = "tvlUSD",
  TxCount = "txCount",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
  VolumeToken0 = "volumeToken0",
  VolumeToken1 = "volumeToken1",
  VolumeUsd = "volumeUSD",
}

export type PoolFeeData = {
  __typename?: "PoolFeeData";
  fee: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  pool?: Maybe<Scalars["String"]["output"]>;
  timestamp: Scalars["BigInt"]["output"];
};

export type PoolFeeData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolFeeData_Filter>>>;
  fee?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PoolFeeData_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum PoolFeeData_OrderBy {
  Fee = "fee",
  Id = "id",
  Pool = "pool",
  Timestamp = "timestamp",
}

export type PoolHourData = {
  __typename?: "PoolHourData";
  close: Scalars["BigDecimal"]["output"];
  feeGrowthGlobal0X128: Scalars["BigInt"]["output"];
  feeGrowthGlobal1X128: Scalars["BigInt"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  high: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  low: Scalars["BigDecimal"]["output"];
  open: Scalars["BigDecimal"]["output"];
  periodStartUnix: Scalars["Int"]["output"];
  pool: Pool;
  sqrtPrice: Scalars["BigInt"]["output"];
  tick?: Maybe<Scalars["BigInt"]["output"]>;
  token0Price: Scalars["BigDecimal"]["output"];
  token1Price: Scalars["BigDecimal"]["output"];
  tvlUSD: Scalars["BigDecimal"]["output"];
  txCount: Scalars["BigInt"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
  volumeToken0: Scalars["BigDecimal"]["output"];
  volumeToken1: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
};

export type PoolHourData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolHourData_Filter>>>;
  close?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  close_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feeGrowthGlobal0X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal0X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  low?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  low_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PoolHourData_Filter>>>;
  periodStartUnix?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_gt?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_gte?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  periodStartUnix_lt?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_lte?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_not?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  token0Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token0Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tvlUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tvlUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  txCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum PoolHourData_OrderBy {
  Close = "close",
  FeeGrowthGlobal0X128 = "feeGrowthGlobal0X128",
  FeeGrowthGlobal1X128 = "feeGrowthGlobal1X128",
  FeesUsd = "feesUSD",
  High = "high",
  Id = "id",
  Liquidity = "liquidity",
  Low = "low",
  Open = "open",
  PeriodStartUnix = "periodStartUnix",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  SqrtPrice = "sqrtPrice",
  Tick = "tick",
  Token0Price = "token0Price",
  Token1Price = "token1Price",
  TvlUsd = "tvlUSD",
  TxCount = "txCount",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
  VolumeToken0 = "volumeToken0",
  VolumeToken1 = "volumeToken1",
  VolumeUsd = "volumeUSD",
}

export type PoolMonthData = {
  __typename?: "PoolMonthData";
  aprPercentage: Scalars["BigDecimal"]["output"];
  close: Scalars["BigDecimal"]["output"];
  feeGrowthGlobal0X128: Scalars["BigInt"]["output"];
  feeGrowthGlobal1X128: Scalars["BigInt"]["output"];
  feesToken0: Scalars["BigDecimal"]["output"];
  feesToken1: Scalars["BigDecimal"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  high: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  low: Scalars["BigDecimal"]["output"];
  month: Scalars["Int"]["output"];
  monthlyFeeUSD: Scalars["BigDecimal"]["output"];
  open: Scalars["BigDecimal"]["output"];
  pool: Pool;
  sqrtPrice: Scalars["BigInt"]["output"];
  tick?: Maybe<Scalars["BigInt"]["output"]>;
  token0Price: Scalars["BigDecimal"]["output"];
  token1Price: Scalars["BigDecimal"]["output"];
  tvlUSD: Scalars["BigDecimal"]["output"];
  txCount: Scalars["BigInt"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
  volumeToken0: Scalars["BigDecimal"]["output"];
  volumeToken1: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
};

export type PoolMonthData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolMonthData_Filter>>>;
  aprPercentage?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  aprPercentage_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  close?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  close_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feeGrowthGlobal0X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal0X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feesToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  low?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  low_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  month?: InputMaybe<Scalars["Int"]["input"]>;
  month_gt?: InputMaybe<Scalars["Int"]["input"]>;
  month_gte?: InputMaybe<Scalars["Int"]["input"]>;
  month_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  month_lt?: InputMaybe<Scalars["Int"]["input"]>;
  month_lte?: InputMaybe<Scalars["Int"]["input"]>;
  month_not?: InputMaybe<Scalars["Int"]["input"]>;
  month_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  monthlyFeeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  monthlyFeeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  monthlyFeeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  monthlyFeeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  monthlyFeeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  monthlyFeeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  monthlyFeeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  monthlyFeeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PoolMonthData_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  token0Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token0Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tvlUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tvlUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  txCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum PoolMonthData_OrderBy {
  AprPercentage = "aprPercentage",
  Close = "close",
  FeeGrowthGlobal0X128 = "feeGrowthGlobal0X128",
  FeeGrowthGlobal1X128 = "feeGrowthGlobal1X128",
  FeesToken0 = "feesToken0",
  FeesToken1 = "feesToken1",
  FeesUsd = "feesUSD",
  High = "high",
  Id = "id",
  Liquidity = "liquidity",
  Low = "low",
  Month = "month",
  MonthlyFeeUsd = "monthlyFeeUSD",
  Open = "open",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  SqrtPrice = "sqrtPrice",
  Tick = "tick",
  Token0Price = "token0Price",
  Token1Price = "token1Price",
  TvlUsd = "tvlUSD",
  TxCount = "txCount",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
  VolumeToken0 = "volumeToken0",
  VolumeToken1 = "volumeToken1",
  VolumeUsd = "volumeUSD",
}

export type PoolPosition = {
  __typename?: "PoolPosition";
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  lowerTick: Tick;
  owner: Scalars["Bytes"]["output"];
  pool: Pool;
  upperTick: Tick;
};

export type PoolPosition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolPosition_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lowerTick?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_?: InputMaybe<Tick_Filter>;
  lowerTick_contains?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_gt?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_gte?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lowerTick_lt?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_lte?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_not?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lowerTick_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  lowerTick_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<PoolPosition_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  upperTick?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_?: InputMaybe<Tick_Filter>;
  upperTick_contains?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_gt?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_gte?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  upperTick_lt?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_lte?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_not?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  upperTick_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  upperTick_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum PoolPosition_OrderBy {
  Id = "id",
  Liquidity = "liquidity",
  LowerTick = "lowerTick",
  LowerTickCollectedFeesToken0 = "lowerTick__collectedFeesToken0",
  LowerTickCollectedFeesToken1 = "lowerTick__collectedFeesToken1",
  LowerTickCollectedFeesUsd = "lowerTick__collectedFeesUSD",
  LowerTickCreatedAtBlockNumber = "lowerTick__createdAtBlockNumber",
  LowerTickCreatedAtTimestamp = "lowerTick__createdAtTimestamp",
  LowerTickFeeGrowthOutside0X128 = "lowerTick__feeGrowthOutside0X128",
  LowerTickFeeGrowthOutside1X128 = "lowerTick__feeGrowthOutside1X128",
  LowerTickFeesUsd = "lowerTick__feesUSD",
  LowerTickId = "lowerTick__id",
  LowerTickLiquidityGross = "lowerTick__liquidityGross",
  LowerTickLiquidityNet = "lowerTick__liquidityNet",
  LowerTickLiquidityProviderCount = "lowerTick__liquidityProviderCount",
  LowerTickPoolAddress = "lowerTick__poolAddress",
  LowerTickPrice0 = "lowerTick__price0",
  LowerTickPrice1 = "lowerTick__price1",
  LowerTickTickIdx = "lowerTick__tickIdx",
  LowerTickUntrackedVolumeUsd = "lowerTick__untrackedVolumeUSD",
  LowerTickVolumeToken0 = "lowerTick__volumeToken0",
  LowerTickVolumeToken1 = "lowerTick__volumeToken1",
  LowerTickVolumeUsd = "lowerTick__volumeUSD",
  Owner = "owner",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  UpperTick = "upperTick",
  UpperTickCollectedFeesToken0 = "upperTick__collectedFeesToken0",
  UpperTickCollectedFeesToken1 = "upperTick__collectedFeesToken1",
  UpperTickCollectedFeesUsd = "upperTick__collectedFeesUSD",
  UpperTickCreatedAtBlockNumber = "upperTick__createdAtBlockNumber",
  UpperTickCreatedAtTimestamp = "upperTick__createdAtTimestamp",
  UpperTickFeeGrowthOutside0X128 = "upperTick__feeGrowthOutside0X128",
  UpperTickFeeGrowthOutside1X128 = "upperTick__feeGrowthOutside1X128",
  UpperTickFeesUsd = "upperTick__feesUSD",
  UpperTickId = "upperTick__id",
  UpperTickLiquidityGross = "upperTick__liquidityGross",
  UpperTickLiquidityNet = "upperTick__liquidityNet",
  UpperTickLiquidityProviderCount = "upperTick__liquidityProviderCount",
  UpperTickPoolAddress = "upperTick__poolAddress",
  UpperTickPrice0 = "upperTick__price0",
  UpperTickPrice1 = "upperTick__price1",
  UpperTickTickIdx = "upperTick__tickIdx",
  UpperTickUntrackedVolumeUsd = "upperTick__untrackedVolumeUSD",
  UpperTickVolumeToken0 = "upperTick__volumeToken0",
  UpperTickVolumeToken1 = "upperTick__volumeToken1",
  UpperTickVolumeUsd = "upperTick__volumeUSD",
}

export type PoolWeekData = {
  __typename?: "PoolWeekData";
  aprPercentage: Scalars["BigDecimal"]["output"];
  close: Scalars["BigDecimal"]["output"];
  feeGrowthGlobal0X128: Scalars["BigInt"]["output"];
  feeGrowthGlobal1X128: Scalars["BigInt"]["output"];
  feesToken0: Scalars["BigDecimal"]["output"];
  feesToken1: Scalars["BigDecimal"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  high: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  low: Scalars["BigDecimal"]["output"];
  open: Scalars["BigDecimal"]["output"];
  pool: Pool;
  sqrtPrice: Scalars["BigInt"]["output"];
  tick?: Maybe<Scalars["BigInt"]["output"]>;
  token0Price: Scalars["BigDecimal"]["output"];
  token1Price: Scalars["BigDecimal"]["output"];
  tvlUSD: Scalars["BigDecimal"]["output"];
  txCount: Scalars["BigInt"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
  volumeToken0: Scalars["BigDecimal"]["output"];
  volumeToken1: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
  week: Scalars["Int"]["output"];
  weeklyFeeUSD: Scalars["BigDecimal"]["output"];
};

export type PoolWeekData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolWeekData_Filter>>>;
  aprPercentage?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  aprPercentage_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  close?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  close_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feeGrowthGlobal0X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal0X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feesToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  low?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  low_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PoolWeekData_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  token0Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token0Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tvlUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tvlUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  txCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  week?: InputMaybe<Scalars["Int"]["input"]>;
  week_gt?: InputMaybe<Scalars["Int"]["input"]>;
  week_gte?: InputMaybe<Scalars["Int"]["input"]>;
  week_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  week_lt?: InputMaybe<Scalars["Int"]["input"]>;
  week_lte?: InputMaybe<Scalars["Int"]["input"]>;
  week_not?: InputMaybe<Scalars["Int"]["input"]>;
  week_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  weeklyFeeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  weeklyFeeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  weeklyFeeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  weeklyFeeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  weeklyFeeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  weeklyFeeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  weeklyFeeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  weeklyFeeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum PoolWeekData_OrderBy {
  AprPercentage = "aprPercentage",
  Close = "close",
  FeeGrowthGlobal0X128 = "feeGrowthGlobal0X128",
  FeeGrowthGlobal1X128 = "feeGrowthGlobal1X128",
  FeesToken0 = "feesToken0",
  FeesToken1 = "feesToken1",
  FeesUsd = "feesUSD",
  High = "high",
  Id = "id",
  Liquidity = "liquidity",
  Low = "low",
  Open = "open",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  SqrtPrice = "sqrtPrice",
  Tick = "tick",
  Token0Price = "token0Price",
  Token1Price = "token1Price",
  TvlUsd = "tvlUSD",
  TxCount = "txCount",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
  VolumeToken0 = "volumeToken0",
  VolumeToken1 = "volumeToken1",
  VolumeUsd = "volumeUSD",
  Week = "week",
  WeeklyFeeUsd = "weeklyFeeUSD",
}

export type Pool_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  aprDayData_?: InputMaybe<PoolDayData_Filter>;
  aprMonthData_?: InputMaybe<PoolMonthData_Filter>;
  aprPercentage?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  aprPercentage_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  aprPercentage_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  aprWeekData_?: InputMaybe<PoolWeekData_Filter>;
  burns_?: InputMaybe<Burn_Filter>;
  collectedFeesToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collectedFeesToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collectedFeesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collects_?: InputMaybe<Collect_Filter>;
  communityFee?: InputMaybe<Scalars["BigInt"]["input"]>;
  communityFee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  communityFee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  communityFee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  communityFee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  communityFee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  communityFee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  communityFee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtBlockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtBlockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  deployer?: InputMaybe<Scalars["Bytes"]["input"]>;
  deployer_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  deployer_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  deployer_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  deployer_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  deployer_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  deployer_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  deployer_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  deployer_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  deployer_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  fee?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal0X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal0X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthGlobal1X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthGlobal1X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  fee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  fee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feesToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityProviderCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  mints_?: InputMaybe<Mint_Filter>;
  observationIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  observationIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  observationIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  observationIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  observationIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  observationIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  observationIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  observationIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  plugin?: InputMaybe<Scalars["Bytes"]["input"]>;
  pluginConfig?: InputMaybe<Scalars["Int"]["input"]>;
  pluginConfig_gt?: InputMaybe<Scalars["Int"]["input"]>;
  pluginConfig_gte?: InputMaybe<Scalars["Int"]["input"]>;
  pluginConfig_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  pluginConfig_lt?: InputMaybe<Scalars["Int"]["input"]>;
  pluginConfig_lte?: InputMaybe<Scalars["Int"]["input"]>;
  pluginConfig_not?: InputMaybe<Scalars["Int"]["input"]>;
  pluginConfig_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  plugin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  plugin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  plugin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  plugin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  plugin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  plugin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  plugin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  plugin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  plugin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  poolDayData_?: InputMaybe<PoolDayData_Filter>;
  poolHourData_?: InputMaybe<PoolHourData_Filter>;
  poolMonthData_?: InputMaybe<PoolMonthData_Filter>;
  poolWeekData_?: InputMaybe<PoolWeekData_Filter>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  searchString_contains?: InputMaybe<Scalars["String"]["input"]>;
  searchString_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  searchString_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_gt?: InputMaybe<Scalars["String"]["input"]>;
  searchString_gte?: InputMaybe<Scalars["String"]["input"]>;
  searchString_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  searchString_lt?: InputMaybe<Scalars["String"]["input"]>;
  searchString_lte?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  searchString_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  searchString_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  swaps_?: InputMaybe<Swap_Filter>;
  tick?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickSpacing?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickSpacing_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickSpacing_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickSpacing_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickSpacing_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickSpacing_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickSpacing_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickSpacing_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ticks_?: InputMaybe<Tick_Filter>;
  token0?: InputMaybe<Scalars["String"]["input"]>;
  token0Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token0Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_gt?: InputMaybe<Scalars["String"]["input"]>;
  token0_gte?: InputMaybe<Scalars["String"]["input"]>;
  token0_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_lt?: InputMaybe<Scalars["String"]["input"]>;
  token0_lte?: InputMaybe<Scalars["String"]["input"]>;
  token0_not?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1?: InputMaybe<Scalars["String"]["input"]>;
  token1Price?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Price_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_gt?: InputMaybe<Scalars["String"]["input"]>;
  token1_gte?: InputMaybe<Scalars["String"]["input"]>;
  token1_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_lt?: InputMaybe<Scalars["String"]["input"]>;
  token1_lte?: InputMaybe<Scalars["String"]["input"]>;
  token1_not?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  totalValueLockedMatic?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedMatic_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedMatic_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken0_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedToken1_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedUSDUntracked_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  txCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  untrackedFeesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedFeesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedFeesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedFeesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedFeesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedFeesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedFeesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedFeesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  vaults_?: InputMaybe<IchiVault_Filter>;
  volumeToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum Pool_OrderBy {
  AprDayData = "aprDayData",
  AprMonthData = "aprMonthData",
  AprPercentage = "aprPercentage",
  AprWeekData = "aprWeekData",
  Burns = "burns",
  CollectedFeesToken0 = "collectedFeesToken0",
  CollectedFeesToken1 = "collectedFeesToken1",
  CollectedFeesUsd = "collectedFeesUSD",
  Collects = "collects",
  CommunityFee = "communityFee",
  CreatedAtBlockNumber = "createdAtBlockNumber",
  CreatedAtTimestamp = "createdAtTimestamp",
  Deployer = "deployer",
  Fee = "fee",
  FeeGrowthGlobal0X128 = "feeGrowthGlobal0X128",
  FeeGrowthGlobal1X128 = "feeGrowthGlobal1X128",
  FeesToken0 = "feesToken0",
  FeesToken1 = "feesToken1",
  FeesUsd = "feesUSD",
  Id = "id",
  Liquidity = "liquidity",
  LiquidityProviderCount = "liquidityProviderCount",
  Mints = "mints",
  ObservationIndex = "observationIndex",
  Plugin = "plugin",
  PluginConfig = "pluginConfig",
  PoolDayData = "poolDayData",
  PoolHourData = "poolHourData",
  PoolMonthData = "poolMonthData",
  PoolWeekData = "poolWeekData",
  SearchString = "searchString",
  SqrtPrice = "sqrtPrice",
  Swaps = "swaps",
  Tick = "tick",
  TickSpacing = "tickSpacing",
  Ticks = "ticks",
  Token0 = "token0",
  Token0Price = "token0Price",
  Token0Decimals = "token0__decimals",
  Token0DerivedMatic = "token0__derivedMatic",
  Token0DerivedUsd = "token0__derivedUSD",
  Token0FeesUsd = "token0__feesUSD",
  Token0HolderCount = "token0__holderCount",
  Token0Id = "token0__id",
  Token0InitialUsd = "token0__initialUSD",
  Token0MarketCap = "token0__marketCap",
  Token0Name = "token0__name",
  Token0PoolCount = "token0__poolCount",
  Token0Symbol = "token0__symbol",
  Token0TotalSupply = "token0__totalSupply",
  Token0TotalValueLocked = "token0__totalValueLocked",
  Token0TotalValueLockedUsd = "token0__totalValueLockedUSD",
  Token0TotalValueLockedUsdUntracked = "token0__totalValueLockedUSDUntracked",
  Token0TxCount = "token0__txCount",
  Token0UntrackedVolumeUsd = "token0__untrackedVolumeUSD",
  Token0Volume = "token0__volume",
  Token0VolumeUsd = "token0__volumeUSD",
  Token1 = "token1",
  Token1Price = "token1Price",
  Token1Decimals = "token1__decimals",
  Token1DerivedMatic = "token1__derivedMatic",
  Token1DerivedUsd = "token1__derivedUSD",
  Token1FeesUsd = "token1__feesUSD",
  Token1HolderCount = "token1__holderCount",
  Token1Id = "token1__id",
  Token1InitialUsd = "token1__initialUSD",
  Token1MarketCap = "token1__marketCap",
  Token1Name = "token1__name",
  Token1PoolCount = "token1__poolCount",
  Token1Symbol = "token1__symbol",
  Token1TotalSupply = "token1__totalSupply",
  Token1TotalValueLocked = "token1__totalValueLocked",
  Token1TotalValueLockedUsd = "token1__totalValueLockedUSD",
  Token1TotalValueLockedUsdUntracked = "token1__totalValueLockedUSDUntracked",
  Token1TxCount = "token1__txCount",
  Token1UntrackedVolumeUsd = "token1__untrackedVolumeUSD",
  Token1Volume = "token1__volume",
  Token1VolumeUsd = "token1__volumeUSD",
  TotalValueLockedMatic = "totalValueLockedMatic",
  TotalValueLockedToken0 = "totalValueLockedToken0",
  TotalValueLockedToken1 = "totalValueLockedToken1",
  TotalValueLockedUsd = "totalValueLockedUSD",
  TotalValueLockedUsdUntracked = "totalValueLockedUSDUntracked",
  TxCount = "txCount",
  UntrackedFeesUsd = "untrackedFeesUSD",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
  Vaults = "vaults",
  VaultsAllowTokenA = "vaults__allowTokenA",
  VaultsAllowTokenB = "vaults__allowTokenB",
  VaultsCount = "vaults__count",
  VaultsCreatedAtTimestamp = "vaults__createdAtTimestamp",
  VaultsHoldersCount = "vaults__holdersCount",
  VaultsId = "vaults__id",
  VaultsSender = "vaults__sender",
  VaultsTokenA = "vaults__tokenA",
  VaultsTokenB = "vaults__tokenB",
  VaultsTotalShares = "vaults__totalShares",
  VolumeToken0 = "volumeToken0",
  VolumeToken1 = "volumeToken1",
  VolumeUsd = "volumeUSD",
}

export type Position = {
  __typename?: "Position";
  collectedFeesToken0: Scalars["BigDecimal"]["output"];
  collectedFeesToken1: Scalars["BigDecimal"]["output"];
  collectedToken0: Scalars["BigDecimal"]["output"];
  collectedToken1: Scalars["BigDecimal"]["output"];
  depositedToken0: Scalars["BigDecimal"]["output"];
  depositedToken1: Scalars["BigDecimal"]["output"];
  feeGrowthInside0LastX128: Scalars["BigInt"]["output"];
  feeGrowthInside1LastX128: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  owner: Scalars["Bytes"]["output"];
  pool: Pool;
  tickLower: Tick;
  tickUpper: Tick;
  token0: Token;
  token0Tvl?: Maybe<Scalars["BigDecimal"]["output"]>;
  token1: Token;
  token1Tvl?: Maybe<Scalars["BigDecimal"]["output"]>;
  transaction: Transaction;
  withdrawnToken0: Scalars["BigDecimal"]["output"];
  withdrawnToken1: Scalars["BigDecimal"]["output"];
};

export type PositionSnapshot = {
  __typename?: "PositionSnapshot";
  blockNumber: Scalars["BigInt"]["output"];
  collectedFeesToken0: Scalars["BigDecimal"]["output"];
  collectedFeesToken1: Scalars["BigDecimal"]["output"];
  depositedToken0: Scalars["BigDecimal"]["output"];
  depositedToken1: Scalars["BigDecimal"]["output"];
  feeGrowthInside0LastX128: Scalars["BigInt"]["output"];
  feeGrowthInside1LastX128: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  owner: Scalars["Bytes"]["output"];
  pool: Pool;
  position: Position;
  timestamp: Scalars["BigInt"]["output"];
  transaction: Transaction;
  withdrawnToken0: Scalars["BigDecimal"]["output"];
  withdrawnToken1: Scalars["BigDecimal"]["output"];
};

export type PositionSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PositionSnapshot_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  collectedFeesToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collectedFeesToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  depositedToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  depositedToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  depositedToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  depositedToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feeGrowthInside0LastX128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthInside0LastX128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  feeGrowthInside1LastX128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthInside1LastX128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PositionSnapshot_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position?: InputMaybe<Scalars["String"]["input"]>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  position_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_gt?: InputMaybe<Scalars["String"]["input"]>;
  position_gte?: InputMaybe<Scalars["String"]["input"]>;
  position_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  position_lt?: InputMaybe<Scalars["String"]["input"]>;
  position_lte?: InputMaybe<Scalars["String"]["input"]>;
  position_not?: InputMaybe<Scalars["String"]["input"]>;
  position_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  position_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  position_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  position_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  position_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  position_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  withdrawnToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  withdrawnToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  withdrawnToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  withdrawnToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum PositionSnapshot_OrderBy {
  BlockNumber = "blockNumber",
  CollectedFeesToken0 = "collectedFeesToken0",
  CollectedFeesToken1 = "collectedFeesToken1",
  DepositedToken0 = "depositedToken0",
  DepositedToken1 = "depositedToken1",
  FeeGrowthInside0LastX128 = "feeGrowthInside0LastX128",
  FeeGrowthInside1LastX128 = "feeGrowthInside1LastX128",
  Id = "id",
  Liquidity = "liquidity",
  Owner = "owner",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  Position = "position",
  PositionCollectedFeesToken0 = "position__collectedFeesToken0",
  PositionCollectedFeesToken1 = "position__collectedFeesToken1",
  PositionCollectedToken0 = "position__collectedToken0",
  PositionCollectedToken1 = "position__collectedToken1",
  PositionDepositedToken0 = "position__depositedToken0",
  PositionDepositedToken1 = "position__depositedToken1",
  PositionFeeGrowthInside0LastX128 = "position__feeGrowthInside0LastX128",
  PositionFeeGrowthInside1LastX128 = "position__feeGrowthInside1LastX128",
  PositionId = "position__id",
  PositionLiquidity = "position__liquidity",
  PositionOwner = "position__owner",
  PositionToken0Tvl = "position__token0Tvl",
  PositionToken1Tvl = "position__token1Tvl",
  PositionWithdrawnToken0 = "position__withdrawnToken0",
  PositionWithdrawnToken1 = "position__withdrawnToken1",
  Timestamp = "timestamp",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
  WithdrawnToken0 = "withdrawnToken0",
  WithdrawnToken1 = "withdrawnToken1",
}

export type Position_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Position_Filter>>>;
  collectedFeesToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collectedFeesToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collectedToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  depositedToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  depositedToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  depositedToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  depositedToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  depositedToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feeGrowthInside0LastX128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthInside0LastX128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside0LastX128_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  feeGrowthInside1LastX128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthInside1LastX128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthInside1LastX128_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Position_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickLower?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_?: InputMaybe<Tick_Filter>;
  tickLower_contains?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_gt?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_gte?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tickLower_lt?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_lte?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_not?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tickLower_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tickLower_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_?: InputMaybe<Tick_Filter>;
  tickUpper_contains?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_gt?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_gte?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tickUpper_lt?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_lte?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_not?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tickUpper_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tickUpper_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0?: InputMaybe<Scalars["String"]["input"]>;
  token0Tvl?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Tvl_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Tvl_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Tvl_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token0Tvl_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Tvl_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Tvl_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token0Tvl_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_gt?: InputMaybe<Scalars["String"]["input"]>;
  token0_gte?: InputMaybe<Scalars["String"]["input"]>;
  token0_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_lt?: InputMaybe<Scalars["String"]["input"]>;
  token0_lte?: InputMaybe<Scalars["String"]["input"]>;
  token0_not?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1?: InputMaybe<Scalars["String"]["input"]>;
  token1Tvl?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Tvl_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Tvl_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Tvl_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1Tvl_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Tvl_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Tvl_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  token1Tvl_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_gt?: InputMaybe<Scalars["String"]["input"]>;
  token1_gte?: InputMaybe<Scalars["String"]["input"]>;
  token1_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_lt?: InputMaybe<Scalars["String"]["input"]>;
  token1_lte?: InputMaybe<Scalars["String"]["input"]>;
  token1_not?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  withdrawnToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  withdrawnToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  withdrawnToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  withdrawnToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  withdrawnToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum Position_OrderBy {
  CollectedFeesToken0 = "collectedFeesToken0",
  CollectedFeesToken1 = "collectedFeesToken1",
  CollectedToken0 = "collectedToken0",
  CollectedToken1 = "collectedToken1",
  DepositedToken0 = "depositedToken0",
  DepositedToken1 = "depositedToken1",
  FeeGrowthInside0LastX128 = "feeGrowthInside0LastX128",
  FeeGrowthInside1LastX128 = "feeGrowthInside1LastX128",
  Id = "id",
  Liquidity = "liquidity",
  Owner = "owner",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  TickLower = "tickLower",
  TickLowerCollectedFeesToken0 = "tickLower__collectedFeesToken0",
  TickLowerCollectedFeesToken1 = "tickLower__collectedFeesToken1",
  TickLowerCollectedFeesUsd = "tickLower__collectedFeesUSD",
  TickLowerCreatedAtBlockNumber = "tickLower__createdAtBlockNumber",
  TickLowerCreatedAtTimestamp = "tickLower__createdAtTimestamp",
  TickLowerFeeGrowthOutside0X128 = "tickLower__feeGrowthOutside0X128",
  TickLowerFeeGrowthOutside1X128 = "tickLower__feeGrowthOutside1X128",
  TickLowerFeesUsd = "tickLower__feesUSD",
  TickLowerId = "tickLower__id",
  TickLowerLiquidityGross = "tickLower__liquidityGross",
  TickLowerLiquidityNet = "tickLower__liquidityNet",
  TickLowerLiquidityProviderCount = "tickLower__liquidityProviderCount",
  TickLowerPoolAddress = "tickLower__poolAddress",
  TickLowerPrice0 = "tickLower__price0",
  TickLowerPrice1 = "tickLower__price1",
  TickLowerTickIdx = "tickLower__tickIdx",
  TickLowerUntrackedVolumeUsd = "tickLower__untrackedVolumeUSD",
  TickLowerVolumeToken0 = "tickLower__volumeToken0",
  TickLowerVolumeToken1 = "tickLower__volumeToken1",
  TickLowerVolumeUsd = "tickLower__volumeUSD",
  TickUpper = "tickUpper",
  TickUpperCollectedFeesToken0 = "tickUpper__collectedFeesToken0",
  TickUpperCollectedFeesToken1 = "tickUpper__collectedFeesToken1",
  TickUpperCollectedFeesUsd = "tickUpper__collectedFeesUSD",
  TickUpperCreatedAtBlockNumber = "tickUpper__createdAtBlockNumber",
  TickUpperCreatedAtTimestamp = "tickUpper__createdAtTimestamp",
  TickUpperFeeGrowthOutside0X128 = "tickUpper__feeGrowthOutside0X128",
  TickUpperFeeGrowthOutside1X128 = "tickUpper__feeGrowthOutside1X128",
  TickUpperFeesUsd = "tickUpper__feesUSD",
  TickUpperId = "tickUpper__id",
  TickUpperLiquidityGross = "tickUpper__liquidityGross",
  TickUpperLiquidityNet = "tickUpper__liquidityNet",
  TickUpperLiquidityProviderCount = "tickUpper__liquidityProviderCount",
  TickUpperPoolAddress = "tickUpper__poolAddress",
  TickUpperPrice0 = "tickUpper__price0",
  TickUpperPrice1 = "tickUpper__price1",
  TickUpperTickIdx = "tickUpper__tickIdx",
  TickUpperUntrackedVolumeUsd = "tickUpper__untrackedVolumeUSD",
  TickUpperVolumeToken0 = "tickUpper__volumeToken0",
  TickUpperVolumeToken1 = "tickUpper__volumeToken1",
  TickUpperVolumeUsd = "tickUpper__volumeUSD",
  Token0 = "token0",
  Token0Tvl = "token0Tvl",
  Token0Decimals = "token0__decimals",
  Token0DerivedMatic = "token0__derivedMatic",
  Token0DerivedUsd = "token0__derivedUSD",
  Token0FeesUsd = "token0__feesUSD",
  Token0HolderCount = "token0__holderCount",
  Token0Id = "token0__id",
  Token0InitialUsd = "token0__initialUSD",
  Token0MarketCap = "token0__marketCap",
  Token0Name = "token0__name",
  Token0PoolCount = "token0__poolCount",
  Token0Symbol = "token0__symbol",
  Token0TotalSupply = "token0__totalSupply",
  Token0TotalValueLocked = "token0__totalValueLocked",
  Token0TotalValueLockedUsd = "token0__totalValueLockedUSD",
  Token0TotalValueLockedUsdUntracked = "token0__totalValueLockedUSDUntracked",
  Token0TxCount = "token0__txCount",
  Token0UntrackedVolumeUsd = "token0__untrackedVolumeUSD",
  Token0Volume = "token0__volume",
  Token0VolumeUsd = "token0__volumeUSD",
  Token1 = "token1",
  Token1Tvl = "token1Tvl",
  Token1Decimals = "token1__decimals",
  Token1DerivedMatic = "token1__derivedMatic",
  Token1DerivedUsd = "token1__derivedUSD",
  Token1FeesUsd = "token1__feesUSD",
  Token1HolderCount = "token1__holderCount",
  Token1Id = "token1__id",
  Token1InitialUsd = "token1__initialUSD",
  Token1MarketCap = "token1__marketCap",
  Token1Name = "token1__name",
  Token1PoolCount = "token1__poolCount",
  Token1Symbol = "token1__symbol",
  Token1TotalSupply = "token1__totalSupply",
  Token1TotalValueLocked = "token1__totalValueLocked",
  Token1TotalValueLockedUsd = "token1__totalValueLockedUSD",
  Token1TotalValueLockedUsdUntracked = "token1__totalValueLockedUSDUntracked",
  Token1TxCount = "token1__txCount",
  Token1UntrackedVolumeUsd = "token1__untrackedVolumeUSD",
  Token1Volume = "token1__volume",
  Token1VolumeUsd = "token1__volumeUSD",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
  WithdrawnToken0 = "withdrawnToken0",
  WithdrawnToken1 = "withdrawnToken1",
}

export type Pot2Pump = {
  __typename?: "Pot2Pump";
  DepositLaunchToken: Scalars["BigInt"]["output"];
  DepositRaisedToken: Scalars["BigInt"]["output"];
  LaunchTokenMCAPUSD: Scalars["BigDecimal"]["output"];
  LaunchTokenTVLUSD: Scalars["BigDecimal"]["output"];
  createdAt: Scalars["BigInt"]["output"];
  creator: Scalars["String"]["output"];
  endTime: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  launchToken: Token;
  launchTokenInitialPrice: Scalars["BigDecimal"]["output"];
  participantTransactionHistorys: Array<ParticipantTransactionHistory>;
  participants: Array<Participant>;
  participantsCount: Scalars["BigInt"]["output"];
  raisedToken: Token;
  raisedTokenMinCap: Scalars["BigInt"]["output"];
  raisedTokenReachingMinCap: Scalars["Boolean"]["output"];
  searchString: Scalars["String"]["output"];
  state: Scalars["BigInt"]["output"];
  totalClaimLpAmount: Scalars["BigInt"]["output"];
  totalRefundAmount: Scalars["BigInt"]["output"];
};

export type Pot2PumpParticipantTransactionHistorysArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ParticipantTransactionHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ParticipantTransactionHistory_Filter>;
};

export type Pot2PumpParticipantsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Participant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Participant_Filter>;
};

export type Pot2Pump_Filter = {
  DepositLaunchToken?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositLaunchToken_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositLaunchToken_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositLaunchToken_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  DepositLaunchToken_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositLaunchToken_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositLaunchToken_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositLaunchToken_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  DepositRaisedToken?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositRaisedToken_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositRaisedToken_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositRaisedToken_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  DepositRaisedToken_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositRaisedToken_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositRaisedToken_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  DepositRaisedToken_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  LaunchTokenMCAPUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenMCAPUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenMCAPUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenMCAPUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  LaunchTokenMCAPUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenMCAPUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenMCAPUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenMCAPUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  LaunchTokenTVLUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenTVLUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenTVLUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenTVLUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  LaunchTokenTVLUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenTVLUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenTVLUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  LaunchTokenTVLUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pot2Pump_Filter>>>;
  createdAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  creator?: InputMaybe<Scalars["String"]["input"]>;
  creator_contains?: InputMaybe<Scalars["String"]["input"]>;
  creator_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  creator_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_gt?: InputMaybe<Scalars["String"]["input"]>;
  creator_gte?: InputMaybe<Scalars["String"]["input"]>;
  creator_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  creator_lt?: InputMaybe<Scalars["String"]["input"]>;
  creator_lte?: InputMaybe<Scalars["String"]["input"]>;
  creator_not?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  creator_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  creator_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  creator_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  endTime?: InputMaybe<Scalars["BigInt"]["input"]>;
  endTime_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  endTime_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  endTime_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  endTime_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  endTime_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  endTime_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  endTime_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  launchToken?: InputMaybe<Scalars["String"]["input"]>;
  launchTokenInitialPrice?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  launchTokenInitialPrice_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  launchTokenInitialPrice_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  launchTokenInitialPrice_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  launchTokenInitialPrice_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  launchTokenInitialPrice_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  launchTokenInitialPrice_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  launchTokenInitialPrice_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  launchToken_?: InputMaybe<Token_Filter>;
  launchToken_contains?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_gt?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_gte?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  launchToken_lt?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_lte?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_not?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  launchToken_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  launchToken_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Pot2Pump_Filter>>>;
  participantTransactionHistorys_?: InputMaybe<ParticipantTransactionHistory_Filter>;
  participantsCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  participantsCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  participantsCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  participantsCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  participantsCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  participantsCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  participantsCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  participantsCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  participants_?: InputMaybe<Participant_Filter>;
  raisedToken?: InputMaybe<Scalars["String"]["input"]>;
  raisedTokenMinCap?: InputMaybe<Scalars["BigInt"]["input"]>;
  raisedTokenMinCap_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  raisedTokenMinCap_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  raisedTokenMinCap_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  raisedTokenMinCap_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  raisedTokenMinCap_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  raisedTokenMinCap_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  raisedTokenMinCap_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  raisedTokenReachingMinCap?: InputMaybe<Scalars["Boolean"]["input"]>;
  raisedTokenReachingMinCap_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  raisedTokenReachingMinCap_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  raisedTokenReachingMinCap_not_in?: InputMaybe<
    Array<Scalars["Boolean"]["input"]>
  >;
  raisedToken_?: InputMaybe<Token_Filter>;
  raisedToken_contains?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_gt?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_gte?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  raisedToken_lt?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_lte?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_not?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  raisedToken_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  raisedToken_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  searchString_contains?: InputMaybe<Scalars["String"]["input"]>;
  searchString_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  searchString_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_gt?: InputMaybe<Scalars["String"]["input"]>;
  searchString_gte?: InputMaybe<Scalars["String"]["input"]>;
  searchString_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  searchString_lt?: InputMaybe<Scalars["String"]["input"]>;
  searchString_lte?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  searchString_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  searchString_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  searchString_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  searchString_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  state?: InputMaybe<Scalars["BigInt"]["input"]>;
  state_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  state_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  state_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  state_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  state_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  state_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  state_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalClaimLpAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalClaimLpAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalClaimLpAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalClaimLpAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalClaimLpAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalClaimLpAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalClaimLpAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalClaimLpAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalRefundAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalRefundAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalRefundAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Pot2Pump_OrderBy {
  DepositLaunchToken = "DepositLaunchToken",
  DepositRaisedToken = "DepositRaisedToken",
  LaunchTokenMcapusd = "LaunchTokenMCAPUSD",
  LaunchTokenTvlusd = "LaunchTokenTVLUSD",
  CreatedAt = "createdAt",
  Creator = "creator",
  EndTime = "endTime",
  Id = "id",
  LaunchToken = "launchToken",
  LaunchTokenInitialPrice = "launchTokenInitialPrice",
  LaunchTokenDecimals = "launchToken__decimals",
  LaunchTokenDerivedMatic = "launchToken__derivedMatic",
  LaunchTokenDerivedUsd = "launchToken__derivedUSD",
  LaunchTokenFeesUsd = "launchToken__feesUSD",
  LaunchTokenHolderCount = "launchToken__holderCount",
  LaunchTokenId = "launchToken__id",
  LaunchTokenInitialUsd = "launchToken__initialUSD",
  LaunchTokenMarketCap = "launchToken__marketCap",
  LaunchTokenName = "launchToken__name",
  LaunchTokenPoolCount = "launchToken__poolCount",
  LaunchTokenSymbol = "launchToken__symbol",
  LaunchTokenTotalSupply = "launchToken__totalSupply",
  LaunchTokenTotalValueLocked = "launchToken__totalValueLocked",
  LaunchTokenTotalValueLockedUsd = "launchToken__totalValueLockedUSD",
  LaunchTokenTotalValueLockedUsdUntracked = "launchToken__totalValueLockedUSDUntracked",
  LaunchTokenTxCount = "launchToken__txCount",
  LaunchTokenUntrackedVolumeUsd = "launchToken__untrackedVolumeUSD",
  LaunchTokenVolume = "launchToken__volume",
  LaunchTokenVolumeUsd = "launchToken__volumeUSD",
  ParticipantTransactionHistorys = "participantTransactionHistorys",
  Participants = "participants",
  ParticipantsCount = "participantsCount",
  RaisedToken = "raisedToken",
  RaisedTokenMinCap = "raisedTokenMinCap",
  RaisedTokenReachingMinCap = "raisedTokenReachingMinCap",
  RaisedTokenDecimals = "raisedToken__decimals",
  RaisedTokenDerivedMatic = "raisedToken__derivedMatic",
  RaisedTokenDerivedUsd = "raisedToken__derivedUSD",
  RaisedTokenFeesUsd = "raisedToken__feesUSD",
  RaisedTokenHolderCount = "raisedToken__holderCount",
  RaisedTokenId = "raisedToken__id",
  RaisedTokenInitialUsd = "raisedToken__initialUSD",
  RaisedTokenMarketCap = "raisedToken__marketCap",
  RaisedTokenName = "raisedToken__name",
  RaisedTokenPoolCount = "raisedToken__poolCount",
  RaisedTokenSymbol = "raisedToken__symbol",
  RaisedTokenTotalSupply = "raisedToken__totalSupply",
  RaisedTokenTotalValueLocked = "raisedToken__totalValueLocked",
  RaisedTokenTotalValueLockedUsd = "raisedToken__totalValueLockedUSD",
  RaisedTokenTotalValueLockedUsdUntracked = "raisedToken__totalValueLockedUSDUntracked",
  RaisedTokenTxCount = "raisedToken__txCount",
  RaisedTokenUntrackedVolumeUsd = "raisedToken__untrackedVolumeUSD",
  RaisedTokenVolume = "raisedToken__volume",
  RaisedTokenVolumeUsd = "raisedToken__volumeUSD",
  SearchString = "searchString",
  State = "state",
  TotalClaimLpAmount = "totalClaimLpAmount",
  TotalRefundAmount = "totalRefundAmount",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  algebraDayData?: Maybe<AlgebraDayData>;
  algebraDayDatas: Array<AlgebraDayData>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  claimLp?: Maybe<ClaimLp>;
  claimLps: Array<ClaimLp>;
  collect?: Maybe<Collect>;
  collects: Array<Collect>;
  deployICHIVault?: Maybe<DeployIchiVault>;
  deployICHIVaults: Array<DeployIchiVault>;
  deposit?: Maybe<Deposit>;
  depositRaisedToken?: Maybe<DepositRaisedToken>;
  depositRaisedTokens: Array<DepositRaisedToken>;
  deposits: Array<Deposit>;
  eternalFarming?: Maybe<EternalFarming>;
  eternalFarmings: Array<EternalFarming>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  feeHourData?: Maybe<FeeHourData>;
  feeHourDatas: Array<FeeHourData>;
  flash?: Maybe<Flash>;
  flashes: Array<Flash>;
  holdingToken?: Maybe<HoldingToken>;
  holdingTokens: Array<HoldingToken>;
  ichiVault?: Maybe<IchiVault>;
  ichiVaults: Array<IchiVault>;
  maxTotalSupplies: Array<MaxTotalSupply>;
  maxTotalSupply?: Maybe<MaxTotalSupply>;
  memeRacer?: Maybe<MemeRacer>;
  memeRacerHourData?: Maybe<MemeRacerHourData>;
  memeRacerHourDatas: Array<MemeRacerHourData>;
  memeRacers: Array<MemeRacer>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  participant?: Maybe<Participant>;
  participantTransactionHistories: Array<ParticipantTransactionHistory>;
  participantTransactionHistory?: Maybe<ParticipantTransactionHistory>;
  participants: Array<Participant>;
  plugin?: Maybe<Plugin>;
  plugins: Array<Plugin>;
  pool?: Maybe<Pool>;
  poolDayData?: Maybe<PoolDayData>;
  poolDayDatas: Array<PoolDayData>;
  poolFeeData?: Maybe<PoolFeeData>;
  poolFeeDatas: Array<PoolFeeData>;
  poolHourData?: Maybe<PoolHourData>;
  poolHourDatas: Array<PoolHourData>;
  poolMonthData?: Maybe<PoolMonthData>;
  poolMonthDatas: Array<PoolMonthData>;
  poolPosition?: Maybe<PoolPosition>;
  poolPositions: Array<PoolPosition>;
  poolWeekData?: Maybe<PoolWeekData>;
  poolWeekDatas: Array<PoolWeekData>;
  pools: Array<Pool>;
  position?: Maybe<Position>;
  positionSnapshot?: Maybe<PositionSnapshot>;
  positionSnapshots: Array<PositionSnapshot>;
  positions: Array<Position>;
  pot2Pump?: Maybe<Pot2Pump>;
  pot2Pumps: Array<Pot2Pump>;
  refund?: Maybe<Refund>;
  refunds: Array<Refund>;
  reward?: Maybe<Reward>;
  rewards: Array<Reward>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  tick?: Maybe<Tick>;
  tickDayData?: Maybe<TickDayData>;
  tickDayDatas: Array<TickDayData>;
  tickHourData?: Maybe<TickHourData>;
  tickHourDatas: Array<TickHourData>;
  ticks: Array<Tick>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokenHourData?: Maybe<TokenHourData>;
  tokenHourDatas: Array<TokenHourData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  vaultAffiliate?: Maybe<VaultAffiliate>;
  vaultAffiliates: Array<VaultAffiliate>;
  vaultApproval?: Maybe<VaultApproval>;
  vaultApprovals: Array<VaultApproval>;
  vaultCollectFee?: Maybe<VaultCollectFee>;
  vaultCollectFees: Array<VaultCollectFee>;
  vaultDeposit?: Maybe<VaultDeposit>;
  vaultDepositMax?: Maybe<VaultDepositMax>;
  vaultDepositMaxes: Array<VaultDepositMax>;
  vaultDeposits: Array<VaultDeposit>;
  vaultHystereses: Array<VaultHysteresis>;
  vaultHysteresis?: Maybe<VaultHysteresis>;
  vaultOwnershipTransferred?: Maybe<VaultOwnershipTransferred>;
  vaultOwnershipTransferreds: Array<VaultOwnershipTransferred>;
  vaultRebalance?: Maybe<VaultRebalance>;
  vaultRebalances: Array<VaultRebalance>;
  vaultSetTwapPeriod?: Maybe<VaultSetTwapPeriod>;
  vaultSetTwapPeriods: Array<VaultSetTwapPeriod>;
  vaultShare?: Maybe<VaultShare>;
  vaultShares: Array<VaultShare>;
  vaultTransfer?: Maybe<VaultTransfer>;
  vaultTransfers: Array<VaultTransfer>;
  vaultWithdraw?: Maybe<VaultWithdraw>;
  vaultWithdraws: Array<VaultWithdraw>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};

export type QueryAlgebraDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAlgebraDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AlgebraDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AlgebraDayData_Filter>;
};

export type QueryBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
};

export type QueryBundleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBundlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bundle_Filter>;
};

export type QueryBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burn_Filter>;
};

export type QueryClaimLpArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryClaimLpsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClaimLp_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClaimLp_Filter>;
};

export type QueryCollectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCollectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Collect_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collect_Filter>;
};

export type QueryDeployIchiVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDeployIchiVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DeployIchiVault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DeployIchiVault_Filter>;
};

export type QueryDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDepositRaisedTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDepositRaisedTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DepositRaisedToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DepositRaisedToken_Filter>;
};

export type QueryDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Deposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Deposit_Filter>;
};

export type QueryEternalFarmingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEternalFarmingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EternalFarming_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EternalFarming_Filter>;
};

export type QueryFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
};

export type QueryFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFeeHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFeeHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FeeHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeHourData_Filter>;
};

export type QueryFlashArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFlashesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Flash_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Flash_Filter>;
};

export type QueryHoldingTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryHoldingTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<HoldingToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HoldingToken_Filter>;
};

export type QueryIchiVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryIchiVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<IchiVault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<IchiVault_Filter>;
};

export type QueryMaxTotalSuppliesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MaxTotalSupply_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MaxTotalSupply_Filter>;
};

export type QueryMaxTotalSupplyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMemeRacerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMemeRacerHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMemeRacerHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MemeRacerHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MemeRacerHourData_Filter>;
};

export type QueryMemeRacersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MemeRacer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MemeRacer_Filter>;
};

export type QueryMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
};

export type QueryParticipantArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryParticipantTransactionHistoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ParticipantTransactionHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ParticipantTransactionHistory_Filter>;
};

export type QueryParticipantTransactionHistoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryParticipantsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Participant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Participant_Filter>;
};

export type QueryPluginArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPluginsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Plugin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Plugin_Filter>;
};

export type QueryPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolDayData_Filter>;
};

export type QueryPoolFeeDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolFeeDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolFeeData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolFeeData_Filter>;
};

export type QueryPoolHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolHourData_Filter>;
};

export type QueryPoolMonthDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolMonthDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolMonthData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolMonthData_Filter>;
};

export type QueryPoolPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolPosition_Filter>;
};

export type QueryPoolWeekDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolWeekDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolWeekData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolWeekData_Filter>;
};

export type QueryPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};

export type QueryPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPositionSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPositionSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionSnapshot_Filter>;
};

export type QueryPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Position_Filter>;
};

export type QueryPot2PumpArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPot2PumpsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Pot2Pump_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pot2Pump_Filter>;
};

export type QueryRefundArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRefundsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Refund_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Refund_Filter>;
};

export type QueryRewardArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRewardsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Reward_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Reward_Filter>;
};

export type QuerySwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};

export type QueryTickArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTickDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTickDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TickDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TickDayData_Filter>;
};

export type QueryTickHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTickHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TickHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TickHourData_Filter>;
};

export type QueryTicksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Tick_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tick_Filter>;
};

export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTokenDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTokenDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TokenDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenDayData_Filter>;
};

export type QueryTokenHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTokenHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TokenHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenHourData_Filter>;
};

export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};

export type QueryVaultAffiliateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultAffiliatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultAffiliate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultAffiliate_Filter>;
};

export type QueryVaultApprovalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultApprovalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultApproval_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultApproval_Filter>;
};

export type QueryVaultCollectFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultCollectFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultCollectFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultCollectFee_Filter>;
};

export type QueryVaultDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultDepositMaxArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultDepositMaxesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultDepositMax_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultDepositMax_Filter>;
};

export type QueryVaultDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultDeposit_Filter>;
};

export type QueryVaultHysteresesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultHysteresis_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultHysteresis_Filter>;
};

export type QueryVaultHysteresisArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultOwnershipTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultOwnershipTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultOwnershipTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultOwnershipTransferred_Filter>;
};

export type QueryVaultRebalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultRebalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultRebalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultRebalance_Filter>;
};

export type QueryVaultSetTwapPeriodArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultSetTwapPeriodsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultSetTwapPeriod_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultSetTwapPeriod_Filter>;
};

export type QueryVaultShareArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultSharesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultShare_Filter>;
};

export type QueryVaultTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultTransfer_Filter>;
};

export type QueryVaultWithdrawArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVaultWithdrawsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultWithdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultWithdraw_Filter>;
};

export type Refund = {
  __typename?: "Refund";
  amount: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  logIndex?: Maybe<Scalars["BigInt"]["output"]>;
  origin: Scalars["Bytes"]["output"];
  poolAddress: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  transaction: Transaction;
};

export type Refund_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Refund_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  logIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  logIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Refund_Filter>>>;
  origin?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  origin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  poolAddress?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  poolAddress_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  poolAddress_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Refund_OrderBy {
  Amount = "amount",
  Id = "id",
  LogIndex = "logIndex",
  Origin = "origin",
  PoolAddress = "poolAddress",
  Timestamp = "timestamp",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
}

export type Reward = {
  __typename?: "Reward";
  amount: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  owner: Scalars["Bytes"]["output"];
  rewardAddress: Scalars["Bytes"]["output"];
};

export type Reward_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Reward_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Reward_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  rewardAddress?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardAddress_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardAddress_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardAddress_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardAddress_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  rewardAddress_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardAddress_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardAddress_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardAddress_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  rewardAddress_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum Reward_OrderBy {
  Amount = "amount",
  Id = "id",
  Owner = "owner",
  RewardAddress = "rewardAddress",
}

export type Subscription = {
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  algebraDayData?: Maybe<AlgebraDayData>;
  algebraDayDatas: Array<AlgebraDayData>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  claimLp?: Maybe<ClaimLp>;
  claimLps: Array<ClaimLp>;
  collect?: Maybe<Collect>;
  collects: Array<Collect>;
  deployICHIVault?: Maybe<DeployIchiVault>;
  deployICHIVaults: Array<DeployIchiVault>;
  deposit?: Maybe<Deposit>;
  depositRaisedToken?: Maybe<DepositRaisedToken>;
  depositRaisedTokens: Array<DepositRaisedToken>;
  deposits: Array<Deposit>;
  eternalFarming?: Maybe<EternalFarming>;
  eternalFarmings: Array<EternalFarming>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  feeHourData?: Maybe<FeeHourData>;
  feeHourDatas: Array<FeeHourData>;
  flash?: Maybe<Flash>;
  flashes: Array<Flash>;
  holdingToken?: Maybe<HoldingToken>;
  holdingTokens: Array<HoldingToken>;
  ichiVault?: Maybe<IchiVault>;
  ichiVaults: Array<IchiVault>;
  maxTotalSupplies: Array<MaxTotalSupply>;
  maxTotalSupply?: Maybe<MaxTotalSupply>;
  memeRacer?: Maybe<MemeRacer>;
  memeRacerHourData?: Maybe<MemeRacerHourData>;
  memeRacerHourDatas: Array<MemeRacerHourData>;
  memeRacers: Array<MemeRacer>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  participant?: Maybe<Participant>;
  participantTransactionHistories: Array<ParticipantTransactionHistory>;
  participantTransactionHistory?: Maybe<ParticipantTransactionHistory>;
  participants: Array<Participant>;
  plugin?: Maybe<Plugin>;
  plugins: Array<Plugin>;
  pool?: Maybe<Pool>;
  poolDayData?: Maybe<PoolDayData>;
  poolDayDatas: Array<PoolDayData>;
  poolFeeData?: Maybe<PoolFeeData>;
  poolFeeDatas: Array<PoolFeeData>;
  poolHourData?: Maybe<PoolHourData>;
  poolHourDatas: Array<PoolHourData>;
  poolMonthData?: Maybe<PoolMonthData>;
  poolMonthDatas: Array<PoolMonthData>;
  poolPosition?: Maybe<PoolPosition>;
  poolPositions: Array<PoolPosition>;
  poolWeekData?: Maybe<PoolWeekData>;
  poolWeekDatas: Array<PoolWeekData>;
  pools: Array<Pool>;
  position?: Maybe<Position>;
  positionSnapshot?: Maybe<PositionSnapshot>;
  positionSnapshots: Array<PositionSnapshot>;
  positions: Array<Position>;
  pot2Pump?: Maybe<Pot2Pump>;
  pot2Pumps: Array<Pot2Pump>;
  refund?: Maybe<Refund>;
  refunds: Array<Refund>;
  reward?: Maybe<Reward>;
  rewards: Array<Reward>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  tick?: Maybe<Tick>;
  tickDayData?: Maybe<TickDayData>;
  tickDayDatas: Array<TickDayData>;
  tickHourData?: Maybe<TickHourData>;
  tickHourDatas: Array<TickHourData>;
  ticks: Array<Tick>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokenHourData?: Maybe<TokenHourData>;
  tokenHourDatas: Array<TokenHourData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  vaultAffiliate?: Maybe<VaultAffiliate>;
  vaultAffiliates: Array<VaultAffiliate>;
  vaultApproval?: Maybe<VaultApproval>;
  vaultApprovals: Array<VaultApproval>;
  vaultCollectFee?: Maybe<VaultCollectFee>;
  vaultCollectFees: Array<VaultCollectFee>;
  vaultDeposit?: Maybe<VaultDeposit>;
  vaultDepositMax?: Maybe<VaultDepositMax>;
  vaultDepositMaxes: Array<VaultDepositMax>;
  vaultDeposits: Array<VaultDeposit>;
  vaultHystereses: Array<VaultHysteresis>;
  vaultHysteresis?: Maybe<VaultHysteresis>;
  vaultOwnershipTransferred?: Maybe<VaultOwnershipTransferred>;
  vaultOwnershipTransferreds: Array<VaultOwnershipTransferred>;
  vaultRebalance?: Maybe<VaultRebalance>;
  vaultRebalances: Array<VaultRebalance>;
  vaultSetTwapPeriod?: Maybe<VaultSetTwapPeriod>;
  vaultSetTwapPeriods: Array<VaultSetTwapPeriod>;
  vaultShare?: Maybe<VaultShare>;
  vaultShares: Array<VaultShare>;
  vaultTransfer?: Maybe<VaultTransfer>;
  vaultTransfers: Array<VaultTransfer>;
  vaultWithdraw?: Maybe<VaultWithdraw>;
  vaultWithdraws: Array<VaultWithdraw>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};

export type SubscriptionAlgebraDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAlgebraDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AlgebraDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AlgebraDayData_Filter>;
};

export type SubscriptionBlockArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBlocksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
};

export type SubscriptionBundleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBundlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bundle_Filter>;
};

export type SubscriptionBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burn_Filter>;
};

export type SubscriptionClaimLpArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionClaimLpsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClaimLp_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClaimLp_Filter>;
};

export type SubscriptionCollectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCollectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Collect_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collect_Filter>;
};

export type SubscriptionDeployIchiVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDeployIchiVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DeployIchiVault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DeployIchiVault_Filter>;
};

export type SubscriptionDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDepositRaisedTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDepositRaisedTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DepositRaisedToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DepositRaisedToken_Filter>;
};

export type SubscriptionDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Deposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Deposit_Filter>;
};

export type SubscriptionEternalFarmingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionEternalFarmingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EternalFarming_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EternalFarming_Filter>;
};

export type SubscriptionFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
};

export type SubscriptionFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFeeHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFeeHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<FeeHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeHourData_Filter>;
};

export type SubscriptionFlashArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFlashesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Flash_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Flash_Filter>;
};

export type SubscriptionHoldingTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionHoldingTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<HoldingToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HoldingToken_Filter>;
};

export type SubscriptionIchiVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionIchiVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<IchiVault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<IchiVault_Filter>;
};

export type SubscriptionMaxTotalSuppliesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MaxTotalSupply_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MaxTotalSupply_Filter>;
};

export type SubscriptionMaxTotalSupplyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMemeRacerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMemeRacerHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMemeRacerHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MemeRacerHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MemeRacerHourData_Filter>;
};

export type SubscriptionMemeRacersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MemeRacer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MemeRacer_Filter>;
};

export type SubscriptionMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
};

export type SubscriptionParticipantArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionParticipantTransactionHistoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ParticipantTransactionHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ParticipantTransactionHistory_Filter>;
};

export type SubscriptionParticipantTransactionHistoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionParticipantsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Participant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Participant_Filter>;
};

export type SubscriptionPluginArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPluginsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Plugin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Plugin_Filter>;
};

export type SubscriptionPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolDayData_Filter>;
};

export type SubscriptionPoolFeeDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolFeeDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolFeeData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolFeeData_Filter>;
};

export type SubscriptionPoolHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolHourData_Filter>;
};

export type SubscriptionPoolMonthDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolMonthDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolMonthData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolMonthData_Filter>;
};

export type SubscriptionPoolPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolPosition_Filter>;
};

export type SubscriptionPoolWeekDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolWeekDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PoolWeekData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolWeekData_Filter>;
};

export type SubscriptionPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};

export type SubscriptionPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPositionSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPositionSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionSnapshot_Filter>;
};

export type SubscriptionPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Position_Filter>;
};

export type SubscriptionPot2PumpArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPot2PumpsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Pot2Pump_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pot2Pump_Filter>;
};

export type SubscriptionRefundArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRefundsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Refund_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Refund_Filter>;
};

export type SubscriptionRewardArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRewardsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Reward_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Reward_Filter>;
};

export type SubscriptionSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};

export type SubscriptionTickArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTickDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTickDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TickDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TickDayData_Filter>;
};

export type SubscriptionTickHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTickHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TickHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TickHourData_Filter>;
};

export type SubscriptionTicksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Tick_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tick_Filter>;
};

export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTokenDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTokenDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TokenDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenDayData_Filter>;
};

export type SubscriptionTokenHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTokenHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TokenHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenHourData_Filter>;
};

export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};

export type SubscriptionVaultAffiliateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultAffiliatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultAffiliate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultAffiliate_Filter>;
};

export type SubscriptionVaultApprovalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultApprovalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultApproval_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultApproval_Filter>;
};

export type SubscriptionVaultCollectFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultCollectFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultCollectFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultCollectFee_Filter>;
};

export type SubscriptionVaultDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultDepositMaxArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultDepositMaxesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultDepositMax_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultDepositMax_Filter>;
};

export type SubscriptionVaultDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultDeposit_Filter>;
};

export type SubscriptionVaultHysteresesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultHysteresis_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultHysteresis_Filter>;
};

export type SubscriptionVaultHysteresisArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultOwnershipTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultOwnershipTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultOwnershipTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultOwnershipTransferred_Filter>;
};

export type SubscriptionVaultRebalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultRebalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultRebalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultRebalance_Filter>;
};

export type SubscriptionVaultSetTwapPeriodArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultSetTwapPeriodsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultSetTwapPeriod_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultSetTwapPeriod_Filter>;
};

export type SubscriptionVaultShareArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultSharesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultShare_Filter>;
};

export type SubscriptionVaultTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultTransfer_Filter>;
};

export type SubscriptionVaultWithdrawArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVaultWithdrawsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<VaultWithdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultWithdraw_Filter>;
};

export type Swap = {
  __typename?: "Swap";
  amount0: Scalars["BigDecimal"]["output"];
  amount1: Scalars["BigDecimal"]["output"];
  amountUSD: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  liquidity: Scalars["BigInt"]["output"];
  logIndex?: Maybe<Scalars["BigInt"]["output"]>;
  origin: Scalars["Bytes"]["output"];
  pool: Pool;
  price: Scalars["BigInt"]["output"];
  recipient: Scalars["Bytes"]["output"];
  sender: Scalars["Bytes"]["output"];
  tick: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  token0: Token;
  token1: Token;
  transaction: Transaction;
};

export type Swap_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amount1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amount1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  amountUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  amountUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Swap_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidity?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  logIndex?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  logIndex_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  logIndex_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Swap_Filter>>>;
  origin?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  origin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  origin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  price_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  recipient?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  recipient_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  recipient_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  tick?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  token0?: InputMaybe<Scalars["String"]["input"]>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_gt?: InputMaybe<Scalars["String"]["input"]>;
  token0_gte?: InputMaybe<Scalars["String"]["input"]>;
  token0_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_lt?: InputMaybe<Scalars["String"]["input"]>;
  token0_lte?: InputMaybe<Scalars["String"]["input"]>;
  token0_not?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token0_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token0_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1?: InputMaybe<Scalars["String"]["input"]>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_gt?: InputMaybe<Scalars["String"]["input"]>;
  token1_gte?: InputMaybe<Scalars["String"]["input"]>;
  token1_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_lt?: InputMaybe<Scalars["String"]["input"]>;
  token1_lte?: InputMaybe<Scalars["String"]["input"]>;
  token1_not?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token1_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token1_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction?: InputMaybe<Scalars["String"]["input"]>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  transaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  transaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  transaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Swap_OrderBy {
  Amount0 = "amount0",
  Amount1 = "amount1",
  AmountUsd = "amountUSD",
  Id = "id",
  Liquidity = "liquidity",
  LogIndex = "logIndex",
  Origin = "origin",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  Price = "price",
  Recipient = "recipient",
  Sender = "sender",
  Tick = "tick",
  Timestamp = "timestamp",
  Token0 = "token0",
  Token0Decimals = "token0__decimals",
  Token0DerivedMatic = "token0__derivedMatic",
  Token0DerivedUsd = "token0__derivedUSD",
  Token0FeesUsd = "token0__feesUSD",
  Token0HolderCount = "token0__holderCount",
  Token0Id = "token0__id",
  Token0InitialUsd = "token0__initialUSD",
  Token0MarketCap = "token0__marketCap",
  Token0Name = "token0__name",
  Token0PoolCount = "token0__poolCount",
  Token0Symbol = "token0__symbol",
  Token0TotalSupply = "token0__totalSupply",
  Token0TotalValueLocked = "token0__totalValueLocked",
  Token0TotalValueLockedUsd = "token0__totalValueLockedUSD",
  Token0TotalValueLockedUsdUntracked = "token0__totalValueLockedUSDUntracked",
  Token0TxCount = "token0__txCount",
  Token0UntrackedVolumeUsd = "token0__untrackedVolumeUSD",
  Token0Volume = "token0__volume",
  Token0VolumeUsd = "token0__volumeUSD",
  Token1 = "token1",
  Token1Decimals = "token1__decimals",
  Token1DerivedMatic = "token1__derivedMatic",
  Token1DerivedUsd = "token1__derivedUSD",
  Token1FeesUsd = "token1__feesUSD",
  Token1HolderCount = "token1__holderCount",
  Token1Id = "token1__id",
  Token1InitialUsd = "token1__initialUSD",
  Token1MarketCap = "token1__marketCap",
  Token1Name = "token1__name",
  Token1PoolCount = "token1__poolCount",
  Token1Symbol = "token1__symbol",
  Token1TotalSupply = "token1__totalSupply",
  Token1TotalValueLocked = "token1__totalValueLocked",
  Token1TotalValueLockedUsd = "token1__totalValueLockedUSD",
  Token1TotalValueLockedUsdUntracked = "token1__totalValueLockedUSDUntracked",
  Token1TxCount = "token1__txCount",
  Token1UntrackedVolumeUsd = "token1__untrackedVolumeUSD",
  Token1Volume = "token1__volume",
  Token1VolumeUsd = "token1__volumeUSD",
  Transaction = "transaction",
  TransactionBlockNumber = "transaction__blockNumber",
  TransactionGasLimit = "transaction__gasLimit",
  TransactionGasPrice = "transaction__gasPrice",
  TransactionId = "transaction__id",
  TransactionTimestamp = "transaction__timestamp",
  TransactionType = "transaction__type",
}

export type Tick = {
  __typename?: "Tick";
  collectedFeesToken0: Scalars["BigDecimal"]["output"];
  collectedFeesToken1: Scalars["BigDecimal"]["output"];
  collectedFeesUSD: Scalars["BigDecimal"]["output"];
  createdAtBlockNumber: Scalars["BigInt"]["output"];
  createdAtTimestamp: Scalars["BigInt"]["output"];
  feeGrowthOutside0X128: Scalars["BigInt"]["output"];
  feeGrowthOutside1X128: Scalars["BigInt"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  liquidityGross: Scalars["BigInt"]["output"];
  liquidityNet: Scalars["BigInt"]["output"];
  liquidityProviderCount: Scalars["BigInt"]["output"];
  pool: Pool;
  poolAddress?: Maybe<Scalars["String"]["output"]>;
  price0: Scalars["BigDecimal"]["output"];
  price1: Scalars["BigDecimal"]["output"];
  tickIdx: Scalars["BigInt"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
  volumeToken0: Scalars["BigDecimal"]["output"];
  volumeToken1: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
};

export type TickDayData = {
  __typename?: "TickDayData";
  date: Scalars["Int"]["output"];
  feeGrowthOutside0X128: Scalars["BigInt"]["output"];
  feeGrowthOutside1X128: Scalars["BigInt"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  liquidityGross: Scalars["BigInt"]["output"];
  liquidityNet: Scalars["BigInt"]["output"];
  pool: Pool;
  tick: Tick;
  volumeToken0: Scalars["BigDecimal"]["output"];
  volumeToken1: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
};

export type TickDayData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TickDayData_Filter>>>;
  date?: InputMaybe<Scalars["Int"]["input"]>;
  date_gt?: InputMaybe<Scalars["Int"]["input"]>;
  date_gte?: InputMaybe<Scalars["Int"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  date_lt?: InputMaybe<Scalars["Int"]["input"]>;
  date_lte?: InputMaybe<Scalars["Int"]["input"]>;
  date_not?: InputMaybe<Scalars["Int"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  feeGrowthOutside0X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthOutside0X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthOutside1X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthOutside1X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidityGross?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityGross_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityNet?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityNet_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<TickDayData_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick?: InputMaybe<Scalars["String"]["input"]>;
  tick_?: InputMaybe<Tick_Filter>;
  tick_contains?: InputMaybe<Scalars["String"]["input"]>;
  tick_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tick_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_gt?: InputMaybe<Scalars["String"]["input"]>;
  tick_gte?: InputMaybe<Scalars["String"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["String"]["input"]>;
  tick_lte?: InputMaybe<Scalars["String"]["input"]>;
  tick_not?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tick_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tick_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  volumeToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum TickDayData_OrderBy {
  Date = "date",
  FeeGrowthOutside0X128 = "feeGrowthOutside0X128",
  FeeGrowthOutside1X128 = "feeGrowthOutside1X128",
  FeesUsd = "feesUSD",
  Id = "id",
  LiquidityGross = "liquidityGross",
  LiquidityNet = "liquidityNet",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  Tick = "tick",
  TickCollectedFeesToken0 = "tick__collectedFeesToken0",
  TickCollectedFeesToken1 = "tick__collectedFeesToken1",
  TickCollectedFeesUsd = "tick__collectedFeesUSD",
  TickCreatedAtBlockNumber = "tick__createdAtBlockNumber",
  TickCreatedAtTimestamp = "tick__createdAtTimestamp",
  TickFeeGrowthOutside0X128 = "tick__feeGrowthOutside0X128",
  TickFeeGrowthOutside1X128 = "tick__feeGrowthOutside1X128",
  TickFeesUsd = "tick__feesUSD",
  TickId = "tick__id",
  TickLiquidityGross = "tick__liquidityGross",
  TickLiquidityNet = "tick__liquidityNet",
  TickLiquidityProviderCount = "tick__liquidityProviderCount",
  TickPoolAddress = "tick__poolAddress",
  TickPrice0 = "tick__price0",
  TickPrice1 = "tick__price1",
  TickTickIdx = "tick__tickIdx",
  TickUntrackedVolumeUsd = "tick__untrackedVolumeUSD",
  TickVolumeToken0 = "tick__volumeToken0",
  TickVolumeToken1 = "tick__volumeToken1",
  TickVolumeUsd = "tick__volumeUSD",
  VolumeToken0 = "volumeToken0",
  VolumeToken1 = "volumeToken1",
  VolumeUsd = "volumeUSD",
}

export type TickHourData = {
  __typename?: "TickHourData";
  feesUSD: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  liquidityGross: Scalars["BigInt"]["output"];
  liquidityNet: Scalars["BigInt"]["output"];
  periodStartUnix: Scalars["Int"]["output"];
  pool: Pool;
  tick: Tick;
  volumeToken0: Scalars["BigDecimal"]["output"];
  volumeToken1: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
};

export type TickHourData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TickHourData_Filter>>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidityGross?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityGross_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityNet?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityNet_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<TickHourData_Filter>>>;
  periodStartUnix?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_gt?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_gte?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  periodStartUnix_lt?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_lte?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_not?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick?: InputMaybe<Scalars["String"]["input"]>;
  tick_?: InputMaybe<Tick_Filter>;
  tick_contains?: InputMaybe<Scalars["String"]["input"]>;
  tick_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tick_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_gt?: InputMaybe<Scalars["String"]["input"]>;
  tick_gte?: InputMaybe<Scalars["String"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["String"]["input"]>;
  tick_lte?: InputMaybe<Scalars["String"]["input"]>;
  tick_not?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tick_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tick_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tick_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  tick_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  volumeToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum TickHourData_OrderBy {
  FeesUsd = "feesUSD",
  Id = "id",
  LiquidityGross = "liquidityGross",
  LiquidityNet = "liquidityNet",
  PeriodStartUnix = "periodStartUnix",
  Pool = "pool",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  Tick = "tick",
  TickCollectedFeesToken0 = "tick__collectedFeesToken0",
  TickCollectedFeesToken1 = "tick__collectedFeesToken1",
  TickCollectedFeesUsd = "tick__collectedFeesUSD",
  TickCreatedAtBlockNumber = "tick__createdAtBlockNumber",
  TickCreatedAtTimestamp = "tick__createdAtTimestamp",
  TickFeeGrowthOutside0X128 = "tick__feeGrowthOutside0X128",
  TickFeeGrowthOutside1X128 = "tick__feeGrowthOutside1X128",
  TickFeesUsd = "tick__feesUSD",
  TickId = "tick__id",
  TickLiquidityGross = "tick__liquidityGross",
  TickLiquidityNet = "tick__liquidityNet",
  TickLiquidityProviderCount = "tick__liquidityProviderCount",
  TickPoolAddress = "tick__poolAddress",
  TickPrice0 = "tick__price0",
  TickPrice1 = "tick__price1",
  TickTickIdx = "tick__tickIdx",
  TickUntrackedVolumeUsd = "tick__untrackedVolumeUSD",
  TickVolumeToken0 = "tick__volumeToken0",
  TickVolumeToken1 = "tick__volumeToken1",
  TickVolumeUsd = "tick__volumeUSD",
  VolumeToken0 = "volumeToken0",
  VolumeToken1 = "volumeToken1",
  VolumeUsd = "volumeUSD",
}

export type Tick_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Tick_Filter>>>;
  collectedFeesToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken0_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collectedFeesToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesToken1_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  collectedFeesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  collectedFeesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  collectedFeesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  createdAtBlockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtBlockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthOutside0X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthOutside0X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside0X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthOutside1X128?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeGrowthOutside1X128_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeGrowthOutside1X128_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  liquidityGross?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityGross_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityGross_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityNet?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityNet_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityNet_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityProviderCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  liquidityProviderCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  liquidityProviderCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Tick_Filter>>>;
  pool?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_contains?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_gt?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_gte?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  poolAddress_lt?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_lte?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_not?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  poolAddress_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  poolAddress_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_gt?: InputMaybe<Scalars["String"]["input"]>;
  pool_gte?: InputMaybe<Scalars["String"]["input"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_lt?: InputMaybe<Scalars["String"]["input"]>;
  pool_lte?: InputMaybe<Scalars["String"]["input"]>;
  pool_not?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  price0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  price0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  price1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  price1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  price1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  tickIdx?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickIdx_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickIdx_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickIdx_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tickIdx_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickIdx_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickIdx_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tickIdx_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken0_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeToken1_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum Tick_OrderBy {
  CollectedFeesToken0 = "collectedFeesToken0",
  CollectedFeesToken1 = "collectedFeesToken1",
  CollectedFeesUsd = "collectedFeesUSD",
  CreatedAtBlockNumber = "createdAtBlockNumber",
  CreatedAtTimestamp = "createdAtTimestamp",
  FeeGrowthOutside0X128 = "feeGrowthOutside0X128",
  FeeGrowthOutside1X128 = "feeGrowthOutside1X128",
  FeesUsd = "feesUSD",
  Id = "id",
  LiquidityGross = "liquidityGross",
  LiquidityNet = "liquidityNet",
  LiquidityProviderCount = "liquidityProviderCount",
  Pool = "pool",
  PoolAddress = "poolAddress",
  PoolAprPercentage = "pool__aprPercentage",
  PoolCollectedFeesToken0 = "pool__collectedFeesToken0",
  PoolCollectedFeesToken1 = "pool__collectedFeesToken1",
  PoolCollectedFeesUsd = "pool__collectedFeesUSD",
  PoolCommunityFee = "pool__communityFee",
  PoolCreatedAtBlockNumber = "pool__createdAtBlockNumber",
  PoolCreatedAtTimestamp = "pool__createdAtTimestamp",
  PoolDeployer = "pool__deployer",
  PoolFee = "pool__fee",
  PoolFeeGrowthGlobal0X128 = "pool__feeGrowthGlobal0X128",
  PoolFeeGrowthGlobal1X128 = "pool__feeGrowthGlobal1X128",
  PoolFeesToken0 = "pool__feesToken0",
  PoolFeesToken1 = "pool__feesToken1",
  PoolFeesUsd = "pool__feesUSD",
  PoolId = "pool__id",
  PoolLiquidity = "pool__liquidity",
  PoolLiquidityProviderCount = "pool__liquidityProviderCount",
  PoolObservationIndex = "pool__observationIndex",
  PoolPlugin = "pool__plugin",
  PoolPluginConfig = "pool__pluginConfig",
  PoolSearchString = "pool__searchString",
  PoolSqrtPrice = "pool__sqrtPrice",
  PoolTick = "pool__tick",
  PoolTickSpacing = "pool__tickSpacing",
  PoolToken0Price = "pool__token0Price",
  PoolToken1Price = "pool__token1Price",
  PoolTotalValueLockedMatic = "pool__totalValueLockedMatic",
  PoolTotalValueLockedToken0 = "pool__totalValueLockedToken0",
  PoolTotalValueLockedToken1 = "pool__totalValueLockedToken1",
  PoolTotalValueLockedUsd = "pool__totalValueLockedUSD",
  PoolTotalValueLockedUsdUntracked = "pool__totalValueLockedUSDUntracked",
  PoolTxCount = "pool__txCount",
  PoolUntrackedFeesUsd = "pool__untrackedFeesUSD",
  PoolUntrackedVolumeUsd = "pool__untrackedVolumeUSD",
  PoolVolumeToken0 = "pool__volumeToken0",
  PoolVolumeToken1 = "pool__volumeToken1",
  PoolVolumeUsd = "pool__volumeUSD",
  Price0 = "price0",
  Price1 = "price1",
  TickIdx = "tickIdx",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
  VolumeToken0 = "volumeToken0",
  VolumeToken1 = "volumeToken1",
  VolumeUsd = "volumeUSD",
}

export type Token = {
  __typename?: "Token";
  decimals: Scalars["BigInt"]["output"];
  derivedMatic: Scalars["BigDecimal"]["output"];
  derivedUSD: Scalars["BigDecimal"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  holderCount: Scalars["BigInt"]["output"];
  holders: Array<HoldingToken>;
  id: Scalars["ID"]["output"];
  initialUSD: Scalars["BigDecimal"]["output"];
  marketCap: Scalars["BigDecimal"]["output"];
  name: Scalars["String"]["output"];
  poolCount: Scalars["BigInt"]["output"];
  pot2Pump?: Maybe<Pot2Pump>;
  symbol: Scalars["String"]["output"];
  tokenDayData: Array<TokenDayData>;
  totalSupply: Scalars["BigInt"]["output"];
  totalValueLocked: Scalars["BigDecimal"]["output"];
  totalValueLockedUSD: Scalars["BigDecimal"]["output"];
  totalValueLockedUSDUntracked: Scalars["BigDecimal"]["output"];
  txCount: Scalars["BigInt"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
  volume: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
  whitelistPools: Array<Pool>;
};

export type TokenHoldersArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<HoldingToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<HoldingToken_Filter>;
};

export type TokenTokenDayDataArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TokenDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TokenDayData_Filter>;
};

export type TokenWhitelistPoolsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Pool_Filter>;
};

export type TokenDayData = {
  __typename?: "TokenDayData";
  close: Scalars["BigDecimal"]["output"];
  date: Scalars["Int"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  high: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  low: Scalars["BigDecimal"]["output"];
  open: Scalars["BigDecimal"]["output"];
  priceUSD: Scalars["BigDecimal"]["output"];
  token: Token;
  totalValueLocked: Scalars["BigDecimal"]["output"];
  totalValueLockedUSD: Scalars["BigDecimal"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
  volume: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
};

export type TokenDayData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenDayData_Filter>>>;
  close?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  close_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  date?: InputMaybe<Scalars["Int"]["input"]>;
  date_gt?: InputMaybe<Scalars["Int"]["input"]>;
  date_gte?: InputMaybe<Scalars["Int"]["input"]>;
  date_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  date_lt?: InputMaybe<Scalars["Int"]["input"]>;
  date_lte?: InputMaybe<Scalars["Int"]["input"]>;
  date_not?: InputMaybe<Scalars["Int"]["input"]>;
  date_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  low?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  low_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<TokenDayData_Filter>>>;
  priceUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  priceUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token?: InputMaybe<Scalars["String"]["input"]>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars["String"]["input"]>;
  token_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_gt?: InputMaybe<Scalars["String"]["input"]>;
  token_gte?: InputMaybe<Scalars["String"]["input"]>;
  token_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token_lt?: InputMaybe<Scalars["String"]["input"]>;
  token_lte?: InputMaybe<Scalars["String"]["input"]>;
  token_not?: InputMaybe<Scalars["String"]["input"]>;
  token_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  totalValueLocked?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLocked_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLocked_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum TokenDayData_OrderBy {
  Close = "close",
  Date = "date",
  FeesUsd = "feesUSD",
  High = "high",
  Id = "id",
  Low = "low",
  Open = "open",
  PriceUsd = "priceUSD",
  Token = "token",
  TokenDecimals = "token__decimals",
  TokenDerivedMatic = "token__derivedMatic",
  TokenDerivedUsd = "token__derivedUSD",
  TokenFeesUsd = "token__feesUSD",
  TokenHolderCount = "token__holderCount",
  TokenId = "token__id",
  TokenInitialUsd = "token__initialUSD",
  TokenMarketCap = "token__marketCap",
  TokenName = "token__name",
  TokenPoolCount = "token__poolCount",
  TokenSymbol = "token__symbol",
  TokenTotalSupply = "token__totalSupply",
  TokenTotalValueLocked = "token__totalValueLocked",
  TokenTotalValueLockedUsd = "token__totalValueLockedUSD",
  TokenTotalValueLockedUsdUntracked = "token__totalValueLockedUSDUntracked",
  TokenTxCount = "token__txCount",
  TokenUntrackedVolumeUsd = "token__untrackedVolumeUSD",
  TokenVolume = "token__volume",
  TokenVolumeUsd = "token__volumeUSD",
  TotalValueLocked = "totalValueLocked",
  TotalValueLockedUsd = "totalValueLockedUSD",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
  Volume = "volume",
  VolumeUsd = "volumeUSD",
}

export type TokenHourData = {
  __typename?: "TokenHourData";
  close: Scalars["BigDecimal"]["output"];
  feesUSD: Scalars["BigDecimal"]["output"];
  high: Scalars["BigDecimal"]["output"];
  id: Scalars["ID"]["output"];
  low: Scalars["BigDecimal"]["output"];
  open: Scalars["BigDecimal"]["output"];
  periodStartUnix: Scalars["Int"]["output"];
  priceUSD: Scalars["BigDecimal"]["output"];
  token: Token;
  totalValueLocked: Scalars["BigDecimal"]["output"];
  totalValueLockedUSD: Scalars["BigDecimal"]["output"];
  untrackedVolumeUSD: Scalars["BigDecimal"]["output"];
  volume: Scalars["BigDecimal"]["output"];
  volumeUSD: Scalars["BigDecimal"]["output"];
};

export type TokenHourData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenHourData_Filter>>>;
  close?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  close_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  close_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  high_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  high_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  low?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  low_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  low_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  open_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  open_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<TokenHourData_Filter>>>;
  periodStartUnix?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_gt?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_gte?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  periodStartUnix_lt?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_lte?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_not?: InputMaybe<Scalars["Int"]["input"]>;
  periodStartUnix_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  priceUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  priceUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  priceUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  token?: InputMaybe<Scalars["String"]["input"]>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars["String"]["input"]>;
  token_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_gt?: InputMaybe<Scalars["String"]["input"]>;
  token_gte?: InputMaybe<Scalars["String"]["input"]>;
  token_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token_lt?: InputMaybe<Scalars["String"]["input"]>;
  token_lte?: InputMaybe<Scalars["String"]["input"]>;
  token_not?: InputMaybe<Scalars["String"]["input"]>;
  token_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  token_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  token_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  token_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  token_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  token_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  totalValueLocked?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLocked_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLocked_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
};

export enum TokenHourData_OrderBy {
  Close = "close",
  FeesUsd = "feesUSD",
  High = "high",
  Id = "id",
  Low = "low",
  Open = "open",
  PeriodStartUnix = "periodStartUnix",
  PriceUsd = "priceUSD",
  Token = "token",
  TokenDecimals = "token__decimals",
  TokenDerivedMatic = "token__derivedMatic",
  TokenDerivedUsd = "token__derivedUSD",
  TokenFeesUsd = "token__feesUSD",
  TokenHolderCount = "token__holderCount",
  TokenId = "token__id",
  TokenInitialUsd = "token__initialUSD",
  TokenMarketCap = "token__marketCap",
  TokenName = "token__name",
  TokenPoolCount = "token__poolCount",
  TokenSymbol = "token__symbol",
  TokenTotalSupply = "token__totalSupply",
  TokenTotalValueLocked = "token__totalValueLocked",
  TokenTotalValueLockedUsd = "token__totalValueLockedUSD",
  TokenTotalValueLockedUsdUntracked = "token__totalValueLockedUSDUntracked",
  TokenTxCount = "token__txCount",
  TokenUntrackedVolumeUsd = "token__untrackedVolumeUSD",
  TokenVolume = "token__volume",
  TokenVolumeUsd = "token__volumeUSD",
  TotalValueLocked = "totalValueLocked",
  TotalValueLockedUsd = "totalValueLockedUSD",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
  Volume = "volume",
  VolumeUsd = "volumeUSD",
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  decimals?: InputMaybe<Scalars["BigInt"]["input"]>;
  decimals_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  decimals_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  decimals_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  decimals_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  decimals_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  decimals_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  decimals_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  derivedMatic?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedMatic_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedMatic_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedMatic_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  derivedMatic_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedMatic_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedMatic_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedMatic_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  derivedUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  derivedUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  derivedUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  feesUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  feesUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  holderCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  holderCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  holderCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  holderCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  holderCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  holderCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  holderCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  holderCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  holders_?: InputMaybe<HoldingToken_Filter>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  initialUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  initialUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  initialUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  initialUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  initialUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  initialUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  initialUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  initialUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  marketCap?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  marketCap_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  marketCap_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  marketCap_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  marketCap_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  marketCap_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  marketCap_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  marketCap_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  poolCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  poolCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  poolCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  pot2Pump_?: InputMaybe<Pot2Pump_Filter>;
  symbol?: InputMaybe<Scalars["String"]["input"]>;
  symbol_contains?: InputMaybe<Scalars["String"]["input"]>;
  symbol_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_gt?: InputMaybe<Scalars["String"]["input"]>;
  symbol_gte?: InputMaybe<Scalars["String"]["input"]>;
  symbol_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  symbol_lt?: InputMaybe<Scalars["String"]["input"]>;
  symbol_lte?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  symbol_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  symbol_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  symbol_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  tokenDayData_?: InputMaybe<TokenDayData_Filter>;
  totalSupply?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalValueLocked?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedUSDUntracked_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSDUntracked_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLockedUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLockedUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLockedUSD_not_in?: InputMaybe<
    Array<Scalars["BigDecimal"]["input"]>
  >;
  totalValueLocked_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  totalValueLocked_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  totalValueLocked_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  txCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  txCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  untrackedVolumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  volume_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  volume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  whitelistPools?: InputMaybe<Array<Scalars["String"]["input"]>>;
  whitelistPools_?: InputMaybe<Pool_Filter>;
  whitelistPools_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  whitelistPools_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  whitelistPools_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  whitelistPools_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  whitelistPools_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
};

export enum Token_OrderBy {
  Decimals = "decimals",
  DerivedMatic = "derivedMatic",
  DerivedUsd = "derivedUSD",
  FeesUsd = "feesUSD",
  HolderCount = "holderCount",
  Holders = "holders",
  Id = "id",
  InitialUsd = "initialUSD",
  MarketCap = "marketCap",
  Name = "name",
  PoolCount = "poolCount",
  Pot2Pump = "pot2Pump",
  Pot2PumpDepositLaunchToken = "pot2Pump__DepositLaunchToken",
  Pot2PumpDepositRaisedToken = "pot2Pump__DepositRaisedToken",
  Pot2PumpLaunchTokenMcapusd = "pot2Pump__LaunchTokenMCAPUSD",
  Pot2PumpLaunchTokenTvlusd = "pot2Pump__LaunchTokenTVLUSD",
  Pot2PumpCreatedAt = "pot2Pump__createdAt",
  Pot2PumpCreator = "pot2Pump__creator",
  Pot2PumpEndTime = "pot2Pump__endTime",
  Pot2PumpId = "pot2Pump__id",
  Pot2PumpLaunchTokenInitialPrice = "pot2Pump__launchTokenInitialPrice",
  Pot2PumpParticipantsCount = "pot2Pump__participantsCount",
  Pot2PumpRaisedTokenMinCap = "pot2Pump__raisedTokenMinCap",
  Pot2PumpRaisedTokenReachingMinCap = "pot2Pump__raisedTokenReachingMinCap",
  Pot2PumpSearchString = "pot2Pump__searchString",
  Pot2PumpState = "pot2Pump__state",
  Pot2PumpTotalClaimLpAmount = "pot2Pump__totalClaimLpAmount",
  Pot2PumpTotalRefundAmount = "pot2Pump__totalRefundAmount",
  Symbol = "symbol",
  TokenDayData = "tokenDayData",
  TotalSupply = "totalSupply",
  TotalValueLocked = "totalValueLocked",
  TotalValueLockedUsd = "totalValueLockedUSD",
  TotalValueLockedUsdUntracked = "totalValueLockedUSDUntracked",
  TxCount = "txCount",
  UntrackedVolumeUsd = "untrackedVolumeUSD",
  Volume = "volume",
  VolumeUsd = "volumeUSD",
  WhitelistPools = "whitelistPools",
}

export type Transaction = {
  __typename?: "Transaction";
  account: Account;
  blockNumber: Scalars["BigInt"]["output"];
  burns: Array<Burn>;
  claimLps: Array<ClaimLp>;
  collects: Array<Collect>;
  depositRaisedTokens: Array<DepositRaisedToken>;
  flashed: Array<Flash>;
  gasLimit: Scalars["BigInt"]["output"];
  gasPrice: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  mints: Array<Mint>;
  refunds: Array<Refund>;
  swaps: Array<Swap>;
  timestamp: Scalars["BigInt"]["output"];
  type: TransactionType;
};

export type TransactionBurnsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Burn_Filter>;
};

export type TransactionClaimLpsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ClaimLp_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ClaimLp_Filter>;
};

export type TransactionCollectsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Collect_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Collect_Filter>;
};

export type TransactionDepositRaisedTokensArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DepositRaisedToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DepositRaisedToken_Filter>;
};

export type TransactionFlashedArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Flash_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Flash_Filter>;
};

export type TransactionMintsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Mint_Filter>;
};

export type TransactionRefundsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Refund_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Refund_Filter>;
};

export type TransactionSwapsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Swap_Filter>;
};

export enum TransactionType {
  Burn = "BURN",
  ClaimLp = "CLAIM_LP",
  Collect = "COLLECT",
  DecreaseLiquidity = "DECREASE_LIQUIDITY",
  Deposit = "DEPOSIT",
  IncreaseLiquidity = "INCREASE_LIQUIDITY",
  Mint = "MINT",
  Refund = "REFUND",
  Swap = "SWAP",
}

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["String"]["input"]>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_gt?: InputMaybe<Scalars["String"]["input"]>;
  account_gte?: InputMaybe<Scalars["String"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_lt?: InputMaybe<Scalars["String"]["input"]>;
  account_lte?: InputMaybe<Scalars["String"]["input"]>;
  account_not?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  and?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  burns_?: InputMaybe<Burn_Filter>;
  claimLps_?: InputMaybe<ClaimLp_Filter>;
  collects_?: InputMaybe<Collect_Filter>;
  depositRaisedTokens_?: InputMaybe<DepositRaisedToken_Filter>;
  flashed_?: InputMaybe<Flash_Filter>;
  gasLimit?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasLimit_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasLimit_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  gasPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  gasPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  mints_?: InputMaybe<Mint_Filter>;
  or?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  refunds_?: InputMaybe<Refund_Filter>;
  swaps_?: InputMaybe<Swap_Filter>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  type?: InputMaybe<TransactionType>;
  type_in?: InputMaybe<Array<TransactionType>>;
  type_not?: InputMaybe<TransactionType>;
  type_not_in?: InputMaybe<Array<TransactionType>>;
};

export enum Transaction_OrderBy {
  Account = "account",
  AccountAccountBalanceUsd = "account__accountBalanceUSD",
  AccountAccountBalanceUsdDay = "account__accountBalanceUSDDay",
  AccountAccountBalanceUsdMonth = "account__accountBalanceUSDMonth",
  AccountAccountBalanceUsdWeek = "account__accountBalanceUSDWeek",
  AccountAccountBalanceUsdYear = "account__accountBalanceUSDYear",
  AccountHoldingPoolCount = "account__holdingPoolCount",
  AccountId = "account__id",
  AccountMemeTokenHoldingCount = "account__memeTokenHoldingCount",
  AccountParticipateCount = "account__participateCount",
  AccountPlatformTxCount = "account__platformTxCount",
  AccountPot2PumpLaunchCount = "account__pot2PumpLaunchCount",
  AccountSwapCount = "account__swapCount",
  AccountTotalEarningPercentageDay = "account__totalEarningPercentageDay",
  AccountTotalEarningPercentageMonth = "account__totalEarningPercentageMonth",
  AccountTotalEarningPercentageWeek = "account__totalEarningPercentageWeek",
  AccountTotalEarningPercentageYear = "account__totalEarningPercentageYear",
  AccountTotalEarningUsdDay = "account__totalEarningUSDDay",
  AccountTotalEarningUsdMonth = "account__totalEarningUSDMonth",
  AccountTotalEarningUsdWeek = "account__totalEarningUSDWeek",
  AccountTotalEarningUsdYear = "account__totalEarningUSDYear",
  AccountTotalSpendUsd = "account__totalSpendUSD",
  BlockNumber = "blockNumber",
  Burns = "burns",
  ClaimLps = "claimLps",
  Collects = "collects",
  DepositRaisedTokens = "depositRaisedTokens",
  Flashed = "flashed",
  GasLimit = "gasLimit",
  GasPrice = "gasPrice",
  Id = "id",
  Mints = "mints",
  Refunds = "refunds",
  Swaps = "swaps",
  Timestamp = "timestamp",
  Type = "type",
}

export type VaultAffiliate = {
  __typename?: "VaultAffiliate";
  affiliate: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  sender: Scalars["Bytes"]["output"];
  vault: IchiVault;
};

export type VaultAffiliate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  affiliate?: InputMaybe<Scalars["Bytes"]["input"]>;
  affiliate_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  affiliate_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  affiliate_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  affiliate_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  affiliate_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  affiliate_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  affiliate_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  affiliate_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  affiliate_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<VaultAffiliate_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultAffiliate_Filter>>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultAffiliate_OrderBy {
  Affiliate = "affiliate",
  Id = "id",
  Sender = "sender",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultApproval = {
  __typename?: "VaultApproval";
  id: Scalars["ID"]["output"];
  owner: Scalars["Bytes"]["output"];
  spender: Scalars["Bytes"]["output"];
  value: Scalars["BigInt"]["output"];
  vault: IchiVault;
};

export type VaultApproval_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultApproval_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultApproval_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  spender?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  spender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  spender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultApproval_OrderBy {
  Id = "id",
  Owner = "owner",
  Spender = "spender",
  Value = "value",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultCollectFee = {
  __typename?: "VaultCollectFee";
  createdAtTimestamp: Scalars["BigInt"]["output"];
  feeAmount0: Scalars["BigInt"]["output"];
  feeAmount1: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  sender: Scalars["Bytes"]["output"];
  sqrtPrice: Scalars["BigInt"]["output"];
  tick: Scalars["Int"]["output"];
  totalAmount0: Scalars["BigInt"]["output"];
  totalAmount1: Scalars["BigInt"]["output"];
  totalSupply: Scalars["BigInt"]["output"];
  vault: IchiVault;
};

export type VaultCollectFee_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultCollectFee_Filter>>>;
  createdAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeAmount0?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeAmount0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeAmount1?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeAmount1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultCollectFee_Filter>>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_lte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  totalAmount0?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultCollectFee_OrderBy {
  CreatedAtTimestamp = "createdAtTimestamp",
  FeeAmount0 = "feeAmount0",
  FeeAmount1 = "feeAmount1",
  Id = "id",
  Sender = "sender",
  SqrtPrice = "sqrtPrice",
  Tick = "tick",
  TotalAmount0 = "totalAmount0",
  TotalAmount1 = "totalAmount1",
  TotalSupply = "totalSupply",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultDeposit = {
  __typename?: "VaultDeposit";
  amount0: Scalars["BigInt"]["output"];
  amount1: Scalars["BigInt"]["output"];
  createdAtTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  sender: Scalars["Bytes"]["output"];
  shares: Scalars["BigInt"]["output"];
  sqrtPrice: Scalars["BigInt"]["output"];
  tick: Scalars["Int"]["output"];
  to: Scalars["Bytes"]["output"];
  totalAmount0: Scalars["BigInt"]["output"];
  totalAmount0BeforeEvent: Scalars["BigInt"]["output"];
  totalAmount1: Scalars["BigInt"]["output"];
  totalAmount1BeforeEvent: Scalars["BigInt"]["output"];
  totalSupply: Scalars["BigInt"]["output"];
  vault: IchiVault;
};

export type VaultDepositMax = {
  __typename?: "VaultDepositMax";
  deposit0Max: Scalars["BigInt"]["output"];
  deposit1Max: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  sender: Scalars["Bytes"]["output"];
  vault: IchiVault;
};

export type VaultDepositMax_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultDepositMax_Filter>>>;
  deposit0Max?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit0Max_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit0Max_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit0Max_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  deposit0Max_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit0Max_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit0Max_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit0Max_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  deposit1Max?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit1Max_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit1Max_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit1Max_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  deposit1Max_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit1Max_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit1Max_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  deposit1Max_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultDepositMax_Filter>>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultDepositMax_OrderBy {
  Deposit0Max = "deposit0Max",
  Deposit1Max = "deposit1Max",
  Id = "id",
  Sender = "sender",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultDeposit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount1?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<VaultDeposit_Filter>>>;
  createdAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultDeposit_Filter>>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  shares?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  shares_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_lte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  totalAmount0?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount0BeforeEvent_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  totalAmount0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1BeforeEvent_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  totalAmount1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultDeposit_OrderBy {
  Amount0 = "amount0",
  Amount1 = "amount1",
  CreatedAtTimestamp = "createdAtTimestamp",
  Id = "id",
  Sender = "sender",
  Shares = "shares",
  SqrtPrice = "sqrtPrice",
  Tick = "tick",
  To = "to",
  TotalAmount0 = "totalAmount0",
  TotalAmount0BeforeEvent = "totalAmount0BeforeEvent",
  TotalAmount1 = "totalAmount1",
  TotalAmount1BeforeEvent = "totalAmount1BeforeEvent",
  TotalSupply = "totalSupply",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultHysteresis = {
  __typename?: "VaultHysteresis";
  hysteresis: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  sender: Scalars["Bytes"]["output"];
  vault: IchiVault;
};

export type VaultHysteresis_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultHysteresis_Filter>>>;
  hysteresis?: InputMaybe<Scalars["BigInt"]["input"]>;
  hysteresis_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  hysteresis_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  hysteresis_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  hysteresis_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  hysteresis_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  hysteresis_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  hysteresis_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultHysteresis_Filter>>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultHysteresis_OrderBy {
  Hysteresis = "hysteresis",
  Id = "id",
  Sender = "sender",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultOwnershipTransferred = {
  __typename?: "VaultOwnershipTransferred";
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  vault: IchiVault;
};

export type VaultOwnershipTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultOwnershipTransferred_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultOwnershipTransferred_Filter>>>;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultOwnershipTransferred_OrderBy {
  Id = "id",
  NewOwner = "newOwner",
  PreviousOwner = "previousOwner",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultRebalance = {
  __typename?: "VaultRebalance";
  createdAtTimestamp: Scalars["BigInt"]["output"];
  feeAmount0: Scalars["BigInt"]["output"];
  feeAmount1: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  sqrtPrice: Scalars["BigInt"]["output"];
  tick: Scalars["Int"]["output"];
  totalAmount0: Scalars["BigInt"]["output"];
  totalAmount1: Scalars["BigInt"]["output"];
  totalSupply: Scalars["BigInt"]["output"];
  vault: IchiVault;
};

export type VaultRebalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultRebalance_Filter>>>;
  createdAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeAmount0?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeAmount0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeAmount1?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  feeAmount1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  feeAmount1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultRebalance_Filter>>>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_lte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  totalAmount0?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultRebalance_OrderBy {
  CreatedAtTimestamp = "createdAtTimestamp",
  FeeAmount0 = "feeAmount0",
  FeeAmount1 = "feeAmount1",
  Id = "id",
  SqrtPrice = "sqrtPrice",
  Tick = "tick",
  TotalAmount0 = "totalAmount0",
  TotalAmount1 = "totalAmount1",
  TotalSupply = "totalSupply",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultSetTwapPeriod = {
  __typename?: "VaultSetTwapPeriod";
  id: Scalars["ID"]["output"];
  newTwapPeriod: Scalars["BigInt"]["output"];
  sender: Scalars["Bytes"]["output"];
  vault: IchiVault;
};

export type VaultSetTwapPeriod_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultSetTwapPeriod_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newTwapPeriod?: InputMaybe<Scalars["BigInt"]["input"]>;
  newTwapPeriod_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newTwapPeriod_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newTwapPeriod_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  newTwapPeriod_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newTwapPeriod_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newTwapPeriod_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  newTwapPeriod_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultSetTwapPeriod_Filter>>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultSetTwapPeriod_OrderBy {
  Id = "id",
  NewTwapPeriod = "newTwapPeriod",
  Sender = "sender",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultShare = {
  __typename?: "VaultShare";
  id: Scalars["ID"]["output"];
  user: Account;
  vault: IchiVault;
  vaultShareBalance: Scalars["BigDecimal"]["output"];
};

export type VaultShare_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultShare_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultShare_Filter>>>;
  user?: InputMaybe<Scalars["String"]["input"]>;
  user_?: InputMaybe<Account_Filter>;
  user_contains?: InputMaybe<Scalars["String"]["input"]>;
  user_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  user_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_gt?: InputMaybe<Scalars["String"]["input"]>;
  user_gte?: InputMaybe<Scalars["String"]["input"]>;
  user_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  user_lt?: InputMaybe<Scalars["String"]["input"]>;
  user_lte?: InputMaybe<Scalars["String"]["input"]>;
  user_not?: InputMaybe<Scalars["String"]["input"]>;
  user_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  user_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  user_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  user_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  user_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  user_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  user_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vaultShareBalance?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  vaultShareBalance_gt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  vaultShareBalance_gte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  vaultShareBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  vaultShareBalance_lt?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  vaultShareBalance_lte?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  vaultShareBalance_not?: InputMaybe<Scalars["BigDecimal"]["input"]>;
  vaultShareBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]["input"]>>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultShare_OrderBy {
  Id = "id",
  User = "user",
  UserAccountBalanceUsd = "user__accountBalanceUSD",
  UserAccountBalanceUsdDay = "user__accountBalanceUSDDay",
  UserAccountBalanceUsdMonth = "user__accountBalanceUSDMonth",
  UserAccountBalanceUsdWeek = "user__accountBalanceUSDWeek",
  UserAccountBalanceUsdYear = "user__accountBalanceUSDYear",
  UserHoldingPoolCount = "user__holdingPoolCount",
  UserId = "user__id",
  UserMemeTokenHoldingCount = "user__memeTokenHoldingCount",
  UserParticipateCount = "user__participateCount",
  UserPlatformTxCount = "user__platformTxCount",
  UserPot2PumpLaunchCount = "user__pot2PumpLaunchCount",
  UserSwapCount = "user__swapCount",
  UserTotalEarningPercentageDay = "user__totalEarningPercentageDay",
  UserTotalEarningPercentageMonth = "user__totalEarningPercentageMonth",
  UserTotalEarningPercentageWeek = "user__totalEarningPercentageWeek",
  UserTotalEarningPercentageYear = "user__totalEarningPercentageYear",
  UserTotalEarningUsdDay = "user__totalEarningUSDDay",
  UserTotalEarningUsdMonth = "user__totalEarningUSDMonth",
  UserTotalEarningUsdWeek = "user__totalEarningUSDWeek",
  UserTotalEarningUsdYear = "user__totalEarningUSDYear",
  UserTotalSpendUsd = "user__totalSpendUSD",
  Vault = "vault",
  VaultShareBalance = "vaultShareBalance",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultTransfer = {
  __typename?: "VaultTransfer";
  createdAtTimestamp: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  sqrtPrice: Scalars["BigInt"]["output"];
  tick: Scalars["Int"]["output"];
  to: Scalars["Bytes"]["output"];
  totalAmount0: Scalars["BigInt"]["output"];
  totalAmount1: Scalars["BigInt"]["output"];
  totalSupply: Scalars["BigInt"]["output"];
  value: Scalars["BigInt"]["output"];
  vault: IchiVault;
};

export type VaultTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultTransfer_Filter>>>;
  createdAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultTransfer_Filter>>>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_lte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  totalAmount0?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultTransfer_OrderBy {
  CreatedAtTimestamp = "createdAtTimestamp",
  From = "from",
  Id = "id",
  SqrtPrice = "sqrtPrice",
  Tick = "tick",
  To = "to",
  TotalAmount0 = "totalAmount0",
  TotalAmount1 = "totalAmount1",
  TotalSupply = "totalSupply",
  Value = "value",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type VaultWithdraw = {
  __typename?: "VaultWithdraw";
  amount0: Scalars["BigInt"]["output"];
  amount1: Scalars["BigInt"]["output"];
  createdAtTimestamp: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  sender: Scalars["Bytes"]["output"];
  shares: Scalars["BigInt"]["output"];
  sqrtPrice: Scalars["BigInt"]["output"];
  tick: Scalars["Int"]["output"];
  to: Scalars["Bytes"]["output"];
  totalAmount0: Scalars["BigInt"]["output"];
  totalAmount0BeforeEvent: Scalars["BigInt"]["output"];
  totalAmount1: Scalars["BigInt"]["output"];
  totalAmount1BeforeEvent: Scalars["BigInt"]["output"];
  totalSupply: Scalars["BigInt"]["output"];
  vault: IchiVault;
};

export type VaultWithdraw_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount0?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount1?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<VaultWithdraw_Filter>>>;
  createdAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<VaultWithdraw_Filter>>>;
  sender?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  sender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  shares?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  shares_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  shares_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  sqrtPrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  sqrtPrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tick?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_gte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  tick_lt?: InputMaybe<Scalars["Int"]["input"]>;
  tick_lte?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not?: InputMaybe<Scalars["Int"]["input"]>;
  tick_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  totalAmount0?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount0BeforeEvent_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0BeforeEvent_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  totalAmount0_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount0_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount0_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1BeforeEvent_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1BeforeEvent_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  totalAmount1_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAmount1_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAmount1_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalSupply_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalSupply_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vault?: InputMaybe<Scalars["String"]["input"]>;
  vault_?: InputMaybe<IchiVault_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_gt?: InputMaybe<Scalars["String"]["input"]>;
  vault_gte?: InputMaybe<Scalars["String"]["input"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_lt?: InputMaybe<Scalars["String"]["input"]>;
  vault_lte?: InputMaybe<Scalars["String"]["input"]>;
  vault_not?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VaultWithdraw_OrderBy {
  Amount0 = "amount0",
  Amount1 = "amount1",
  CreatedAtTimestamp = "createdAtTimestamp",
  Id = "id",
  Sender = "sender",
  Shares = "shares",
  SqrtPrice = "sqrtPrice",
  Tick = "tick",
  To = "to",
  TotalAmount0 = "totalAmount0",
  TotalAmount0BeforeEvent = "totalAmount0BeforeEvent",
  TotalAmount1 = "totalAmount1",
  TotalAmount1BeforeEvent = "totalAmount1BeforeEvent",
  TotalSupply = "totalSupply",
  Vault = "vault",
  VaultAllowTokenA = "vault__allowTokenA",
  VaultAllowTokenB = "vault__allowTokenB",
  VaultCount = "vault__count",
  VaultCreatedAtTimestamp = "vault__createdAtTimestamp",
  VaultHoldersCount = "vault__holdersCount",
  VaultId = "vault__id",
  VaultSender = "vault__sender",
  VaultTokenA = "vault__tokenA",
  VaultTokenB = "vault__tokenB",
  VaultTotalShares = "vault__totalShares",
}

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]["output"]>;
  /** The block number */
  number: Scalars["Int"]["output"];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars["Bytes"]["output"]>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]["output"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"]["output"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]["output"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type AllAccountsQueryVariables = Exact<{
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;

export type AllAccountsQuery = {
  __typename?: "Query";
  accounts: Array<{
    __typename?: "Account";
    id: string;
    swapCount: any;
    memeTokenHoldingCount: any;
    pot2PumpLaunchCount: any;
    participateCount: any;
    platformTxCount: any;
    holdingPoolCount: any;
    totalSpendUSD: any;
    vaultShares?: Array<{
      __typename?: "VaultShare";
      id: string;
      vaultShareBalance: any;
      vault: { __typename?: "IchiVault"; id: string };
    }> | null;
    transaction: Array<{
      __typename?: "Transaction";
      id: string;
      timestamp: any;
    }>;
    holder: Array<{
      __typename?: "HoldingToken";
      id: string;
      holdingValue: any;
      token: {
        __typename?: "Token";
        id: string;
        symbol: string;
        derivedUSD: any;
      };
    }>;
    participant: Array<{
      __typename?: "Participant";
      id: string;
      pot2Pump: { __typename?: "Pot2Pump"; id: string };
    }>;
  }>;
};

export type SingleAccountDetailsQueryVariables = Exact<{
  accountId: Scalars["ID"]["input"];
}>;

export type SingleAccountDetailsQuery = {
  __typename?: "Query";
  account?: {
    __typename?: "Account";
    id: string;
    swapCount: any;
    memeTokenHoldingCount: any;
    pot2PumpLaunchCount: any;
    participateCount: any;
    platformTxCount: any;
    holdingPoolCount: any;
    totalSpendUSD: any;
    vaultShares?: Array<{
      __typename?: "VaultShare";
      id: string;
      vaultShareBalance: any;
      vault: { __typename?: "IchiVault"; id: string };
    }> | null;
    transaction: Array<{
      __typename?: "Transaction";
      id: string;
      timestamp: any;
    }>;
    holder: Array<{
      __typename?: "HoldingToken";
      id: string;
      holdingValue: any;
      token: {
        __typename?: "Token";
        id: string;
        symbol: string;
        derivedUSD: any;
      };
    }>;
    participant: Array<{
      __typename?: "Participant";
      id: string;
      pot2Pump: { __typename?: "Pot2Pump"; id: string };
    }>;
  } | null;
};

export type AccountFieldFragment = {
  __typename?: "Account";
  id: string;
  swapCount: any;
  memeTokenHoldingCount: any;
  pot2PumpLaunchCount: any;
  participateCount: any;
  platformTxCount: any;
  holdingPoolCount: any;
  totalSpendUSD: any;
  vaultShares?: Array<{
    __typename?: "VaultShare";
    id: string;
    vaultShareBalance: any;
    vault: { __typename?: "IchiVault"; id: string };
  }> | null;
  transaction: Array<{
    __typename?: "Transaction";
    id: string;
    timestamp: any;
  }>;
  holder: Array<{
    __typename?: "HoldingToken";
    id: string;
    holdingValue: any;
    token: {
      __typename?: "Token";
      id: string;
      symbol: string;
      derivedUSD: any;
    };
  }>;
  participant: Array<{
    __typename?: "Participant";
    id: string;
    pot2Pump: { __typename?: "Pot2Pump"; id: string };
  }>;
};

export type HoldingTokenFieldFragment = {
  __typename?: "HoldingToken";
  id: string;
  holdingValue: any;
  token: { __typename?: "Token"; id: string; symbol: string; derivedUSD: any };
};

export type ParticipantFieldFragment = {
  __typename?: "Participant";
  id: string;
  pot2Pump: { __typename?: "Pot2Pump"; id: string };
};

export type Pot2PumpFieldFragment = { __typename?: "Pot2Pump"; id: string };

export type VaultShareFieldFragment = {
  __typename?: "VaultShare";
  id: string;
  vaultShareBalance: any;
  vault: { __typename?: "IchiVault"; id: string };
};

export type AlgebraVaultFieldFragment = {
  __typename?: "IchiVault";
  id: string;
};

export type TransactionFieldFragment = {
  __typename?: "Transaction";
  id: string;
  timestamp: any;
};

export type TokenFieldFragment = {
  __typename?: "Token";
  id: string;
  symbol: string;
  derivedUSD: any;
};

export type EternalFarmingsQueryVariables = Exact<{
  pool?: InputMaybe<Scalars["Bytes"]["input"]>;
}>;

export type EternalFarmingsQuery = {
  __typename?: "Query";
  eternalFarmings: Array<{
    __typename?: "EternalFarming";
    id: string;
    reward: any;
    bonusReward: any;
    rewardRate: any;
    bonusRewardRate: any;
    rewardToken: any;
    bonusRewardToken: any;
    isDeactivated?: boolean | null;
    nonce: any;
    minRangeLength: any;
    virtualPool: any;
    pool: any;
  }>;
};

export type DepositsQueryVariables = Exact<{
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  pool?: InputMaybe<Scalars["Bytes"]["input"]>;
}>;

export type DepositsQuery = {
  __typename?: "Query";
  deposits: Array<{
    __typename?: "Deposit";
    eternalFarming?: any | null;
    id: string;
    liquidity: any;
    owner: any;
    pool: any;
    rangeLength: any;
  }>;
};

export type ActiveFarmingsQueryVariables = Exact<{ [key: string]: never }>;

export type ActiveFarmingsQuery = {
  __typename?: "Query";
  eternalFarmings: Array<{
    __typename?: "EternalFarming";
    pool: any;
    id: string;
  }>;
};

export type BundleFieldsFragment = {
  __typename?: "Bundle";
  id: string;
  maticPriceUSD: any;
};

export type NativePriceQueryVariables = Exact<{ [key: string]: never }>;

export type NativePriceQuery = {
  __typename?: "Query";
  bundles: Array<{ __typename?: "Bundle"; id: string; maticPriceUSD: any }>;
};

export type AllRacersQueryVariables = Exact<{ [key: string]: never }>;

export type AllRacersQuery = {
  __typename?: "Query";
  memeRacers: Array<{
    __typename?: "MemeRacer";
    id: string;
    currentScore: any;
    token: {
      __typename?: "Token";
      symbol: string;
      initialUSD: any;
      derivedUSD: any;
      totalSupply: any;
    };
    hourData: Array<{
      __typename?: "MemeRacerHourData";
      timestamp: any;
      score: any;
      usdAtThisHour: any;
    }>;
  }>;
};

export type PoolFieldsFragment = {
  __typename?: "Pool";
  id: string;
  fee: any;
  sqrtPrice: any;
  liquidity: any;
  tick: any;
  tickSpacing: any;
  totalValueLockedUSD: any;
  volumeUSD: any;
  feesUSD: any;
  untrackedFeesUSD: any;
  token0Price: any;
  token1Price: any;
  token0: {
    __typename?: "Token";
    id: string;
    symbol: string;
    name: string;
    decimals: any;
    derivedMatic: any;
    derivedUSD: any;
    initialUSD: any;
    txCount: any;
    holderCount: any;
    pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
  };
  token1: {
    __typename?: "Token";
    id: string;
    symbol: string;
    name: string;
    decimals: any;
    derivedMatic: any;
    derivedUSD: any;
    initialUSD: any;
    txCount: any;
    holderCount: any;
    pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
  };
};

export type TickFieldsFragment = {
  __typename?: "Tick";
  tickIdx: any;
  liquidityNet: any;
  liquidityGross: any;
  price0: any;
  price1: any;
};

export type PoolFeeDataFieldsFragment = {
  __typename?: "PoolDayData";
  feesUSD: any;
};

export type PoolDayDataFieldsFragment = {
  __typename?: "PoolDayData";
  feesUSD: any;
  tvlUSD: any;
  volumeUSD: any;
  id: string;
  date: number;
};

export type PoolsListQueryVariables = Exact<{ [key: string]: never }>;

export type PoolsListQuery = {
  __typename?: "Query";
  pools: Array<{
    __typename?: "Pool";
    id: string;
    fee: any;
    sqrtPrice: any;
    liquidity: any;
    tick: any;
    tickSpacing: any;
    totalValueLockedUSD: any;
    volumeUSD: any;
    feesUSD: any;
    untrackedFeesUSD: any;
    token0Price: any;
    token1Price: any;
    poolDayData: Array<{
      __typename?: "PoolDayData";
      feesUSD: any;
      tvlUSD: any;
      volumeUSD: any;
      id: string;
      date: number;
    }>;
    token0: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
      derivedMatic: any;
      derivedUSD: any;
      initialUSD: any;
      txCount: any;
      holderCount: any;
      pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
    };
    token1: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
      derivedMatic: any;
      derivedUSD: any;
      initialUSD: any;
      txCount: any;
      holderCount: any;
      pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
    };
  }>;
};

export type AllTicksQueryVariables = Exact<{
  poolAddress: Scalars["String"]["input"];
  skip: Scalars["Int"]["input"];
}>;

export type AllTicksQuery = {
  __typename?: "Query";
  ticks: Array<{
    __typename?: "Tick";
    tickIdx: any;
    liquidityNet: any;
    liquidityGross: any;
    price0: any;
    price1: any;
  }>;
};

export type SinglePoolQueryVariables = Exact<{
  poolId: Scalars["ID"]["input"];
}>;

export type SinglePoolQuery = {
  __typename?: "Query";
  pool?: {
    __typename?: "Pool";
    id: string;
    fee: any;
    sqrtPrice: any;
    liquidity: any;
    tick: any;
    tickSpacing: any;
    totalValueLockedUSD: any;
    volumeUSD: any;
    feesUSD: any;
    untrackedFeesUSD: any;
    token0Price: any;
    token1Price: any;
    token0: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
      derivedMatic: any;
      derivedUSD: any;
      initialUSD: any;
      txCount: any;
      holderCount: any;
      pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
    };
    token1: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
      derivedMatic: any;
      derivedUSD: any;
      initialUSD: any;
      txCount: any;
      holderCount: any;
      pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
    };
  } | null;
};

export type MultiplePoolsQueryVariables = Exact<{
  poolIds?: InputMaybe<Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"]>;
}>;

export type MultiplePoolsQuery = {
  __typename?: "Query";
  pools: Array<{
    __typename?: "Pool";
    id: string;
    fee: any;
    sqrtPrice: any;
    liquidity: any;
    tick: any;
    tickSpacing: any;
    totalValueLockedUSD: any;
    volumeUSD: any;
    feesUSD: any;
    untrackedFeesUSD: any;
    token0Price: any;
    token1Price: any;
    token0: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
      derivedMatic: any;
      derivedUSD: any;
      initialUSD: any;
      txCount: any;
      holderCount: any;
      pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
    };
    token1: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
      derivedMatic: any;
      derivedUSD: any;
      initialUSD: any;
      txCount: any;
      holderCount: any;
      pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
    };
  }>;
};

export type PoolFeeDataQueryVariables = Exact<{
  poolId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type PoolFeeDataQuery = {
  __typename?: "Query";
  poolDayDatas: Array<{ __typename?: "PoolDayData"; feesUSD: any }>;
};

export type PoolsByTokenPairQueryVariables = Exact<{
  token0: Scalars["ID"]["input"];
  token1: Scalars["ID"]["input"];
}>;

export type PoolsByTokenPairQuery = {
  __typename?: "Query";
  pools: Array<{
    __typename?: "Pool";
    id: string;
    fee: any;
    sqrtPrice: any;
    liquidity: any;
    tick: any;
    tickSpacing: any;
    totalValueLockedUSD: any;
    volumeUSD: any;
    feesUSD: any;
    untrackedFeesUSD: any;
    token0Price: any;
    token1Price: any;
    token0: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
      derivedMatic: any;
      derivedUSD: any;
      initialUSD: any;
      txCount: any;
      holderCount: any;
      pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
    };
    token1: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
      derivedMatic: any;
      derivedUSD: any;
      initialUSD: any;
      txCount: any;
      holderCount: any;
      pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
    };
  }>;
};

export type TokenFieldsFragment = {
  __typename?: "Token";
  id: string;
  symbol: string;
  name: string;
  decimals: string;
  derivedMatic: any;
  derivedUSD: any;
  initialUSD: any;
  txCount: any;
  holderCount: any;
  pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
};

export type MultipleTokensQueryVariables = Exact<{
  tokenIds: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type MultipleTokensQuery = {
  __typename?: "Query";
  tokens: Array<{
    __typename?: "Token";
    id: string;
    symbol: string;
    name: string;
    decimals: any;
    derivedMatic: any;
    derivedUSD: any;
    initialUSD: any;
    txCount: any;
    holderCount: any;
    pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
  }>;
};

export type SingleTokenQueryVariables = Exact<{
  tokenId: Scalars["ID"]["input"];
}>;

export type SingleTokenQuery = {
  __typename?: "Query";
  token?: {
    __typename?: "Token";
    id: string;
    symbol: string;
    name: string;
    decimals: string;
    derivedMatic: any;
    derivedUSD: any;
    initialUSD: any;
    txCount: any;
    holderCount: any;
    pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
  } | null;
};

export type TokenTop10HoldersQueryVariables = Exact<{
  tokenId: Scalars["ID"]["input"];
}>;

export type TokenTop10HoldersQuery = {
  __typename?: "Query";
  token?: {
    __typename?: "Token";
    id: string;
    symbol: string;
    holders: Array<{
      __typename?: "HoldingToken";
      id: string;
      holdingValue: any;
      account: { __typename?: "Account"; id: string };
    }>;
  } | null;
};

export type AllTokensQueryVariables = Exact<{ [key: string]: never }>;

export type AllTokensQuery = {
  __typename?: "Query";
  tokens: Array<{
    __typename?: "Token";
    id: string;
    symbol: string;
    name: string;
    decimals: any;
    derivedMatic: any;
    derivedUSD: any;
    initialUSD: any;
    txCount: any;
    holderCount: any;
    pot2Pump?: { __typename?: "Pot2Pump"; id: string } | null;
  }>;
};

export type VaultsSortedByHoldersQueryVariables = Exact<{
  [key: string]: never;
}>;

export type VaultsSortedByHoldersQuery = {
  __typename?: "Query";
  ichiVaults: Array<{
    __typename?: "IchiVault";
    id: string;
    sender: any;
    tokenA: any;
    allowTokenA: boolean;
    tokenB: any;
    allowTokenB: boolean;
    count: any;
    createdAtTimestamp: any;
    holdersCount: number;
    pool: {
      __typename?: "Pool";
      totalValueLockedUSD: any;
      token0: {
        __typename?: "Token";
        id: string;
        symbol: string;
        name: string;
        decimals: any;
      };
      token1: {
        __typename?: "Token";
        id: string;
        symbol: string;
        name: string;
        decimals: any;
      };
      poolDayData: Array<{
        __typename?: "PoolDayData";
        date: number;
        volumeUSD: any;
        feesUSD: any;
        tvlUSD: any;
      }>;
    };
  }>;
};

export type AccountVaultSharesQueryVariables = Exact<{
  AccountId: Scalars["ID"]["input"];
}>;

export type AccountVaultSharesQuery = {
  __typename?: "Query";
  vaultShares: Array<{
    __typename?: "VaultShare";
    id: string;
    vaultShareBalance: any;
    user: { __typename?: "Account"; id: string };
    vault: {
      __typename?: "IchiVault";
      id: string;
      sender: any;
      tokenA: any;
      allowTokenA: boolean;
      tokenB: any;
      allowTokenB: boolean;
      count: any;
      createdAtTimestamp: any;
      holdersCount: number;
      pool: {
        __typename?: "Pool";
        totalValueLockedUSD: any;
        token0: {
          __typename?: "Token";
          id: string;
          symbol: string;
          name: string;
          decimals: any;
        };
        token1: {
          __typename?: "Token";
          id: string;
          symbol: string;
          name: string;
          decimals: any;
        };
        poolDayData: Array<{
          __typename?: "PoolDayData";
          date: number;
          volumeUSD: any;
          feesUSD: any;
          tvlUSD: any;
        }>;
      };
    };
  }>;
};

export type VaultUserFieldFragment = { __typename?: "Account"; id: string };

export type VaultSharesFieldFragment = {
  __typename?: "VaultShare";
  id: string;
  vaultShareBalance: any;
  user: { __typename?: "Account"; id: string };
  vault: {
    __typename?: "IchiVault";
    id: string;
    sender: any;
    tokenA: any;
    allowTokenA: boolean;
    tokenB: any;
    allowTokenB: boolean;
    count: any;
    createdAtTimestamp: any;
    holdersCount: number;
    pool: {
      __typename?: "Pool";
      totalValueLockedUSD: any;
      token0: {
        __typename?: "Token";
        id: string;
        symbol: string;
        name: string;
        decimals: any;
      };
      token1: {
        __typename?: "Token";
        id: string;
        symbol: string;
        name: string;
        decimals: any;
      };
      poolDayData: Array<{
        __typename?: "PoolDayData";
        date: number;
        volumeUSD: any;
        feesUSD: any;
        tvlUSD: any;
      }>;
    };
  };
};

export type VaultFieldFragment = {
  __typename?: "IchiVault";
  id: string;
  sender: any;
  tokenA: any;
  allowTokenA: boolean;
  tokenB: any;
  allowTokenB: boolean;
  count: any;
  createdAtTimestamp: any;
  holdersCount: number;
  pool: {
    __typename?: "Pool";
    totalValueLockedUSD: any;
    token0: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
    };
    token1: {
      __typename?: "Token";
      id: string;
      symbol: string;
      name: string;
      decimals: any;
    };
    poolDayData: Array<{
      __typename?: "PoolDayData";
      date: number;
      volumeUSD: any;
      feesUSD: any;
      tvlUSD: any;
    }>;
  };
};

export type PoolFieldFragment = {
  __typename?: "Pool";
  totalValueLockedUSD: any;
  token0: {
    __typename?: "Token";
    id: string;
    symbol: string;
    name: string;
    decimals: any;
  };
  token1: {
    __typename?: "Token";
    id: string;
    symbol: string;
    name: string;
    decimals: any;
  };
  poolDayData: Array<{
    __typename?: "PoolDayData";
    date: number;
    volumeUSD: any;
    feesUSD: any;
    tvlUSD: any;
  }>;
};

export type SingleVaultDetailsQueryVariables = Exact<{
  vaultId: Scalars["ID"]["input"];
}>;

export type SingleVaultDetailsQuery = {
  __typename?: "Query";
  ichiVault?: {
    __typename?: "IchiVault";
    totalShares: any;
    id: string;
    sender: any;
    tokenA: any;
    allowTokenA: boolean;
    tokenB: any;
    allowTokenB: boolean;
    count: any;
    createdAtTimestamp: any;
    holdersCount: number;
    vaultShares: Array<{
      __typename?: "VaultShare";
      id: string;
      vaultShareBalance: any;
      user: { __typename?: "Account"; id: string };
    }>;
    vaultDeposits: Array<{
      __typename?: "VaultDeposit";
      id: string;
      createdAtTimestamp: any;
      amount0: any;
      amount1: any;
      shares: any;
      to: any;
    }>;
    vaultWithdraws: Array<{
      __typename?: "VaultWithdraw";
      id: string;
      createdAtTimestamp: any;
      amount0: any;
      amount1: any;
      shares: any;
      to: any;
    }>;
    vaultCollectFees: Array<{
      __typename?: "VaultCollectFee";
      id: string;
      createdAtTimestamp: any;
      feeAmount0: any;
      feeAmount1: any;
      sender: any;
    }>;
    pool: {
      __typename?: "Pool";
      totalValueLockedUSD: any;
      token0: {
        __typename?: "Token";
        id: string;
        symbol: string;
        name: string;
        decimals: any;
      };
      token1: {
        __typename?: "Token";
        id: string;
        symbol: string;
        name: string;
        decimals: any;
      };
      poolDayData: Array<{
        __typename?: "PoolDayData";
        date: number;
        volumeUSD: any;
        feesUSD: any;
        tvlUSD: any;
      }>;
    };
  } | null;
};

export const AlgebraVaultFieldFragmentDoc = gql`
  fragment AlgebraVaultField on IchiVault {
    id
  }
`;
export const VaultShareFieldFragmentDoc = gql`
  fragment VaultShareField on VaultShare {
    id
    vaultShareBalance
    vault {
      ...AlgebraVaultField
    }
  }
  ${AlgebraVaultFieldFragmentDoc}
`;
export const TransactionFieldFragmentDoc = gql`
  fragment TransactionField on Transaction {
    id
    timestamp
  }
`;
export const TokenFieldFragmentDoc = gql`
  fragment TokenField on Token {
    id
    symbol
    derivedUSD
  }
`;
export const HoldingTokenFieldFragmentDoc = gql`
  fragment HoldingTokenField on HoldingToken {
    id
    holdingValue
    token {
      ...TokenField
    }
  }
  ${TokenFieldFragmentDoc}
`;
export const Pot2PumpFieldFragmentDoc = gql`
  fragment Pot2PumpField on Pot2Pump {
    id
  }
`;
export const ParticipantFieldFragmentDoc = gql`
  fragment ParticipantField on Participant {
    id
    pot2Pump {
      ...Pot2PumpField
    }
  }
  ${Pot2PumpFieldFragmentDoc}
`;
export const AccountFieldFragmentDoc = gql`
  fragment AccountField on Account {
    id
    swapCount
    memeTokenHoldingCount
    pot2PumpLaunchCount
    participateCount
    platformTxCount
    holdingPoolCount
    totalSpendUSD
    vaultShares {
      ...VaultShareField
    }
    transaction(orderBy: timestamp, orderDirection: desc, first: 100) {
      ...TransactionField
    }
    holder {
      ...HoldingTokenField
    }
    participant {
      ...ParticipantField
    }
  }
  ${VaultShareFieldFragmentDoc}
  ${TransactionFieldFragmentDoc}
  ${HoldingTokenFieldFragmentDoc}
  ${ParticipantFieldFragmentDoc}
`;
export const BundleFieldsFragmentDoc = gql`
  fragment BundleFields on Bundle {
    id
    maticPriceUSD
  }
`;
export const TokenFieldsFragmentDoc = gql`
  fragment TokenFields on Token {
    id
    symbol
    name
    decimals
    derivedMatic
    derivedUSD
    initialUSD
    txCount
    holderCount
    pot2Pump {
      id
    }
  }
`;
export const PoolFieldsFragmentDoc = gql`
  fragment PoolFields on Pool {
    id
    fee
    token0 {
      ...TokenFields
    }
    token1 {
      ...TokenFields
    }
    sqrtPrice
    liquidity
    tick
    tickSpacing
    totalValueLockedUSD
    volumeUSD
    feesUSD
    untrackedFeesUSD
    token0Price
    token1Price
  }
  ${TokenFieldsFragmentDoc}
`;
export const TickFieldsFragmentDoc = gql`
  fragment TickFields on Tick {
    tickIdx
    liquidityNet
    liquidityGross
    price0
    price1
  }
`;
export const PoolFeeDataFieldsFragmentDoc = gql`
  fragment PoolFeeDataFields on PoolDayData {
    feesUSD
  }
`;
export const PoolDayDataFieldsFragmentDoc = gql`
  fragment PoolDayDataFields on PoolDayData {
    feesUSD
    tvlUSD
    volumeUSD
    id
    date
  }
`;
export const VaultUserFieldFragmentDoc = gql`
  fragment VaultUserField on Account {
    id
  }
`;
export const PoolFieldFragmentDoc = gql`
  fragment PoolField on Pool {
    totalValueLockedUSD
    token0 {
      id
      symbol
      name
      decimals
    }
    token1 {
      id
      symbol
      name
      decimals
    }
    poolDayData(first: 30, orderBy: date, orderDirection: desc) {
      date
      volumeUSD
      feesUSD
      tvlUSD
    }
  }
`;
export const VaultFieldFragmentDoc = gql`
  fragment VaultField on IchiVault {
    id
    sender
    tokenA
    allowTokenA
    tokenB
    allowTokenB
    count
    createdAtTimestamp
    holdersCount
    pool {
      ...PoolField
    }
  }
  ${PoolFieldFragmentDoc}
`;
export const VaultSharesFieldFragmentDoc = gql`
  fragment VaultSharesField on VaultShare {
    id
    user {
      ...VaultUserField
    }
    vault {
      ...VaultField
    }
    vaultShareBalance
  }
  ${VaultUserFieldFragmentDoc}
  ${VaultFieldFragmentDoc}
`;
export const AllAccountsDocument = gql`
  query AllAccounts(
    $orderBy: Account_orderBy
    $orderDirection: OrderDirection
  ) {
    accounts(first: 100, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...AccountField
    }
  }
  ${AccountFieldFragmentDoc}
`;

/**
 * __useAllAccountsQuery__
 *
 * To run a query within a React component, call `useAllAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAccountsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *   },
 * });
 */
export function useAllAccountsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AllAccountsQuery,
    AllAccountsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllAccountsQuery, AllAccountsQueryVariables>(
    AllAccountsDocument,
    options
  );
}
export function useAllAccountsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllAccountsQuery,
    AllAccountsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllAccountsQuery, AllAccountsQueryVariables>(
    AllAccountsDocument,
    options
  );
}
export function useAllAccountsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AllAccountsQuery,
        AllAccountsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AllAccountsQuery, AllAccountsQueryVariables>(
    AllAccountsDocument,
    options
  );
}
export type AllAccountsQueryHookResult = ReturnType<typeof useAllAccountsQuery>;
export type AllAccountsLazyQueryHookResult = ReturnType<
  typeof useAllAccountsLazyQuery
>;
export type AllAccountsSuspenseQueryHookResult = ReturnType<
  typeof useAllAccountsSuspenseQuery
>;
export type AllAccountsQueryResult = Apollo.QueryResult<
  AllAccountsQuery,
  AllAccountsQueryVariables
>;
export const SingleAccountDetailsDocument = gql`
  query SingleAccountDetails($accountId: ID!) {
    account(id: $accountId) {
      ...AccountField
    }
  }
  ${AccountFieldFragmentDoc}
`;

/**
 * __useSingleAccountDetailsQuery__
 *
 * To run a query within a React component, call `useSingleAccountDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleAccountDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleAccountDetailsQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useSingleAccountDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SingleAccountDetailsQuery,
    SingleAccountDetailsQueryVariables
  > &
    (
      | { variables: SingleAccountDetailsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SingleAccountDetailsQuery,
    SingleAccountDetailsQueryVariables
  >(SingleAccountDetailsDocument, options);
}
export function useSingleAccountDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SingleAccountDetailsQuery,
    SingleAccountDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SingleAccountDetailsQuery,
    SingleAccountDetailsQueryVariables
  >(SingleAccountDetailsDocument, options);
}
export function useSingleAccountDetailsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SingleAccountDetailsQuery,
        SingleAccountDetailsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SingleAccountDetailsQuery,
    SingleAccountDetailsQueryVariables
  >(SingleAccountDetailsDocument, options);
}
export type SingleAccountDetailsQueryHookResult = ReturnType<
  typeof useSingleAccountDetailsQuery
>;
export type SingleAccountDetailsLazyQueryHookResult = ReturnType<
  typeof useSingleAccountDetailsLazyQuery
>;
export type SingleAccountDetailsSuspenseQueryHookResult = ReturnType<
  typeof useSingleAccountDetailsSuspenseQuery
>;
export type SingleAccountDetailsQueryResult = Apollo.QueryResult<
  SingleAccountDetailsQuery,
  SingleAccountDetailsQueryVariables
>;
export const EternalFarmingsDocument = gql`
  query EternalFarmings($pool: Bytes) {
    eternalFarmings(where: { pool: $pool }) {
      id
      reward
      bonusReward
      rewardRate
      bonusRewardRate
      rewardToken
      bonusRewardToken
      isDeactivated
      nonce
      minRangeLength
      virtualPool
      pool
    }
  }
`;

/**
 * __useEternalFarmingsQuery__
 *
 * To run a query within a React component, call `useEternalFarmingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEternalFarmingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEternalFarmingsQuery({
 *   variables: {
 *      pool: // value for 'pool'
 *   },
 * });
 */
export function useEternalFarmingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    EternalFarmingsQuery,
    EternalFarmingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EternalFarmingsQuery, EternalFarmingsQueryVariables>(
    EternalFarmingsDocument,
    options
  );
}
export function useEternalFarmingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EternalFarmingsQuery,
    EternalFarmingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    EternalFarmingsQuery,
    EternalFarmingsQueryVariables
  >(EternalFarmingsDocument, options);
}
export function useEternalFarmingsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        EternalFarmingsQuery,
        EternalFarmingsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    EternalFarmingsQuery,
    EternalFarmingsQueryVariables
  >(EternalFarmingsDocument, options);
}
export type EternalFarmingsQueryHookResult = ReturnType<
  typeof useEternalFarmingsQuery
>;
export type EternalFarmingsLazyQueryHookResult = ReturnType<
  typeof useEternalFarmingsLazyQuery
>;
export type EternalFarmingsSuspenseQueryHookResult = ReturnType<
  typeof useEternalFarmingsSuspenseQuery
>;
export type EternalFarmingsQueryResult = Apollo.QueryResult<
  EternalFarmingsQuery,
  EternalFarmingsQueryVariables
>;
export const DepositsDocument = gql`
  query Deposits($owner: Bytes, $pool: Bytes) {
    deposits(where: { owner: $owner, pool: $pool }) {
      eternalFarming
      id
      liquidity
      owner
      pool
      rangeLength
    }
  }
`;

/**
 * __useDepositsQuery__
 *
 * To run a query within a React component, call `useDepositsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepositsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepositsQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      pool: // value for 'pool'
 *   },
 * });
 */
export function useDepositsQuery(
  baseOptions?: Apollo.QueryHookOptions<DepositsQuery, DepositsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DepositsQuery, DepositsQueryVariables>(
    DepositsDocument,
    options
  );
}
export function useDepositsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DepositsQuery,
    DepositsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DepositsQuery, DepositsQueryVariables>(
    DepositsDocument,
    options
  );
}
export function useDepositsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<DepositsQuery, DepositsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<DepositsQuery, DepositsQueryVariables>(
    DepositsDocument,
    options
  );
}
export type DepositsQueryHookResult = ReturnType<typeof useDepositsQuery>;
export type DepositsLazyQueryHookResult = ReturnType<
  typeof useDepositsLazyQuery
>;
export type DepositsSuspenseQueryHookResult = ReturnType<
  typeof useDepositsSuspenseQuery
>;
export type DepositsQueryResult = Apollo.QueryResult<
  DepositsQuery,
  DepositsQueryVariables
>;
export const ActiveFarmingsDocument = gql`
  query ActiveFarmings {
    eternalFarmings(where: { isDeactivated: false }) {
      pool
      id
    }
  }
`;

/**
 * __useActiveFarmingsQuery__
 *
 * To run a query within a React component, call `useActiveFarmingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveFarmingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveFarmingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveFarmingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ActiveFarmingsQuery,
    ActiveFarmingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ActiveFarmingsQuery, ActiveFarmingsQueryVariables>(
    ActiveFarmingsDocument,
    options
  );
}
export function useActiveFarmingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ActiveFarmingsQuery,
    ActiveFarmingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ActiveFarmingsQuery, ActiveFarmingsQueryVariables>(
    ActiveFarmingsDocument,
    options
  );
}
export function useActiveFarmingsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ActiveFarmingsQuery,
        ActiveFarmingsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ActiveFarmingsQuery,
    ActiveFarmingsQueryVariables
  >(ActiveFarmingsDocument, options);
}
export type ActiveFarmingsQueryHookResult = ReturnType<
  typeof useActiveFarmingsQuery
>;
export type ActiveFarmingsLazyQueryHookResult = ReturnType<
  typeof useActiveFarmingsLazyQuery
>;
export type ActiveFarmingsSuspenseQueryHookResult = ReturnType<
  typeof useActiveFarmingsSuspenseQuery
>;
export type ActiveFarmingsQueryResult = Apollo.QueryResult<
  ActiveFarmingsQuery,
  ActiveFarmingsQueryVariables
>;
export const NativePriceDocument = gql`
  query NativePrice {
    bundles {
      ...BundleFields
    }
  }
  ${BundleFieldsFragmentDoc}
`;

/**
 * __useNativePriceQuery__
 *
 * To run a query within a React component, call `useNativePriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useNativePriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNativePriceQuery({
 *   variables: {
 *   },
 * });
 */
export function useNativePriceQuery(
  baseOptions?: Apollo.QueryHookOptions<
    NativePriceQuery,
    NativePriceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NativePriceQuery, NativePriceQueryVariables>(
    NativePriceDocument,
    options
  );
}
export function useNativePriceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NativePriceQuery,
    NativePriceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NativePriceQuery, NativePriceQueryVariables>(
    NativePriceDocument,
    options
  );
}
export function useNativePriceSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        NativePriceQuery,
        NativePriceQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<NativePriceQuery, NativePriceQueryVariables>(
    NativePriceDocument,
    options
  );
}
export type NativePriceQueryHookResult = ReturnType<typeof useNativePriceQuery>;
export type NativePriceLazyQueryHookResult = ReturnType<
  typeof useNativePriceLazyQuery
>;
export type NativePriceSuspenseQueryHookResult = ReturnType<
  typeof useNativePriceSuspenseQuery
>;
export type NativePriceQueryResult = Apollo.QueryResult<
  NativePriceQuery,
  NativePriceQueryVariables
>;
export const AllRacersDocument = gql`
  query AllRacers {
    memeRacers {
      id
      currentScore
      token {
        symbol
        initialUSD
        derivedUSD
        totalSupply
      }
      hourData(orderBy: timestamp, orderDirection: asc) {
        timestamp
        score
        usdAtThisHour
      }
    }
  }
`;

/**
 * __useAllRacersQuery__
 *
 * To run a query within a React component, call `useAllRacersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllRacersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllRacersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllRacersQuery(
  baseOptions?: Apollo.QueryHookOptions<AllRacersQuery, AllRacersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllRacersQuery, AllRacersQueryVariables>(
    AllRacersDocument,
    options
  );
}
export function useAllRacersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllRacersQuery,
    AllRacersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllRacersQuery, AllRacersQueryVariables>(
    AllRacersDocument,
    options
  );
}
export function useAllRacersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<AllRacersQuery, AllRacersQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AllRacersQuery, AllRacersQueryVariables>(
    AllRacersDocument,
    options
  );
}
export type AllRacersQueryHookResult = ReturnType<typeof useAllRacersQuery>;
export type AllRacersLazyQueryHookResult = ReturnType<
  typeof useAllRacersLazyQuery
>;
export type AllRacersSuspenseQueryHookResult = ReturnType<
  typeof useAllRacersSuspenseQuery
>;
export type AllRacersQueryResult = Apollo.QueryResult<
  AllRacersQuery,
  AllRacersQueryVariables
>;
export const PoolsListDocument = gql`
  query PoolsList {
    pools {
      ...PoolFields
      poolDayData(first: 1, orderBy: date, orderDirection: desc) {
        ...PoolDayDataFields
      }
    }
  }
  ${PoolFieldsFragmentDoc}
  ${PoolDayDataFieldsFragmentDoc}
`;

/**
 * __usePoolsListQuery__
 *
 * To run a query within a React component, call `usePoolsListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoolsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoolsListQuery({
 *   variables: {
 *   },
 * });
 */
export function usePoolsListQuery(
  baseOptions?: Apollo.QueryHookOptions<PoolsListQuery, PoolsListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PoolsListQuery, PoolsListQueryVariables>(
    PoolsListDocument,
    options
  );
}
export function usePoolsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PoolsListQuery,
    PoolsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PoolsListQuery, PoolsListQueryVariables>(
    PoolsListDocument,
    options
  );
}
export function usePoolsListSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<PoolsListQuery, PoolsListQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PoolsListQuery, PoolsListQueryVariables>(
    PoolsListDocument,
    options
  );
}
export type PoolsListQueryHookResult = ReturnType<typeof usePoolsListQuery>;
export type PoolsListLazyQueryHookResult = ReturnType<
  typeof usePoolsListLazyQuery
>;
export type PoolsListSuspenseQueryHookResult = ReturnType<
  typeof usePoolsListSuspenseQuery
>;
export type PoolsListQueryResult = Apollo.QueryResult<
  PoolsListQuery,
  PoolsListQueryVariables
>;
export const AllTicksDocument = gql`
  query allTicks($poolAddress: String!, $skip: Int!) {
    ticks(
      first: 1000
      skip: $skip
      where: { poolAddress: $poolAddress }
      orderBy: tickIdx
    ) {
      ...TickFields
    }
  }
  ${TickFieldsFragmentDoc}
`;

/**
 * __useAllTicksQuery__
 *
 * To run a query within a React component, call `useAllTicksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTicksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTicksQuery({
 *   variables: {
 *      poolAddress: // value for 'poolAddress'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useAllTicksQuery(
  baseOptions: Apollo.QueryHookOptions<AllTicksQuery, AllTicksQueryVariables> &
    ({ variables: AllTicksQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllTicksQuery, AllTicksQueryVariables>(
    AllTicksDocument,
    options
  );
}
export function useAllTicksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllTicksQuery,
    AllTicksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllTicksQuery, AllTicksQueryVariables>(
    AllTicksDocument,
    options
  );
}
export function useAllTicksSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<AllTicksQuery, AllTicksQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AllTicksQuery, AllTicksQueryVariables>(
    AllTicksDocument,
    options
  );
}
export type AllTicksQueryHookResult = ReturnType<typeof useAllTicksQuery>;
export type AllTicksLazyQueryHookResult = ReturnType<
  typeof useAllTicksLazyQuery
>;
export type AllTicksSuspenseQueryHookResult = ReturnType<
  typeof useAllTicksSuspenseQuery
>;
export type AllTicksQueryResult = Apollo.QueryResult<
  AllTicksQuery,
  AllTicksQueryVariables
>;
export const SinglePoolDocument = gql`
  query SinglePool($poolId: ID!) {
    pool(id: $poolId) {
      ...PoolFields
    }
  }
  ${PoolFieldsFragmentDoc}
`;

/**
 * __useSinglePoolQuery__
 *
 * To run a query within a React component, call `useSinglePoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useSinglePoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSinglePoolQuery({
 *   variables: {
 *      poolId: // value for 'poolId'
 *   },
 * });
 */
export function useSinglePoolQuery(
  baseOptions: Apollo.QueryHookOptions<
    SinglePoolQuery,
    SinglePoolQueryVariables
  > &
    (
      | { variables: SinglePoolQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SinglePoolQuery, SinglePoolQueryVariables>(
    SinglePoolDocument,
    options
  );
}
export function useSinglePoolLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SinglePoolQuery,
    SinglePoolQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SinglePoolQuery, SinglePoolQueryVariables>(
    SinglePoolDocument,
    options
  );
}
export function useSinglePoolSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<SinglePoolQuery, SinglePoolQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SinglePoolQuery, SinglePoolQueryVariables>(
    SinglePoolDocument,
    options
  );
}
export type SinglePoolQueryHookResult = ReturnType<typeof useSinglePoolQuery>;
export type SinglePoolLazyQueryHookResult = ReturnType<
  typeof useSinglePoolLazyQuery
>;
export type SinglePoolSuspenseQueryHookResult = ReturnType<
  typeof useSinglePoolSuspenseQuery
>;
export type SinglePoolQueryResult = Apollo.QueryResult<
  SinglePoolQuery,
  SinglePoolQueryVariables
>;
export const MultiplePoolsDocument = gql`
  query MultiplePools($poolIds: [ID!]) {
    pools(where: { id_in: $poolIds }) {
      ...PoolFields
    }
  }
  ${PoolFieldsFragmentDoc}
`;

/**
 * __useMultiplePoolsQuery__
 *
 * To run a query within a React component, call `useMultiplePoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMultiplePoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMultiplePoolsQuery({
 *   variables: {
 *      poolIds: // value for 'poolIds'
 *   },
 * });
 */
export function useMultiplePoolsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MultiplePoolsQuery,
    MultiplePoolsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MultiplePoolsQuery, MultiplePoolsQueryVariables>(
    MultiplePoolsDocument,
    options
  );
}
export function useMultiplePoolsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MultiplePoolsQuery,
    MultiplePoolsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MultiplePoolsQuery, MultiplePoolsQueryVariables>(
    MultiplePoolsDocument,
    options
  );
}
export function useMultiplePoolsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        MultiplePoolsQuery,
        MultiplePoolsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    MultiplePoolsQuery,
    MultiplePoolsQueryVariables
  >(MultiplePoolsDocument, options);
}
export type MultiplePoolsQueryHookResult = ReturnType<
  typeof useMultiplePoolsQuery
>;
export type MultiplePoolsLazyQueryHookResult = ReturnType<
  typeof useMultiplePoolsLazyQuery
>;
export type MultiplePoolsSuspenseQueryHookResult = ReturnType<
  typeof useMultiplePoolsSuspenseQuery
>;
export type MultiplePoolsQueryResult = Apollo.QueryResult<
  MultiplePoolsQuery,
  MultiplePoolsQueryVariables
>;
export const PoolFeeDataDocument = gql`
  query PoolFeeData($poolId: String) {
    poolDayDatas(
      where: { pool: $poolId }
      orderBy: date
      orderDirection: desc
    ) {
      ...PoolFeeDataFields
    }
  }
  ${PoolFeeDataFieldsFragmentDoc}
`;

/**
 * __usePoolFeeDataQuery__
 *
 * To run a query within a React component, call `usePoolFeeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoolFeeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoolFeeDataQuery({
 *   variables: {
 *      poolId: // value for 'poolId'
 *   },
 * });
 */
export function usePoolFeeDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PoolFeeDataQuery,
    PoolFeeDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PoolFeeDataQuery, PoolFeeDataQueryVariables>(
    PoolFeeDataDocument,
    options
  );
}
export function usePoolFeeDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PoolFeeDataQuery,
    PoolFeeDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PoolFeeDataQuery, PoolFeeDataQueryVariables>(
    PoolFeeDataDocument,
    options
  );
}
export function usePoolFeeDataSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        PoolFeeDataQuery,
        PoolFeeDataQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PoolFeeDataQuery, PoolFeeDataQueryVariables>(
    PoolFeeDataDocument,
    options
  );
}
export type PoolFeeDataQueryHookResult = ReturnType<typeof usePoolFeeDataQuery>;
export type PoolFeeDataLazyQueryHookResult = ReturnType<
  typeof usePoolFeeDataLazyQuery
>;
export type PoolFeeDataSuspenseQueryHookResult = ReturnType<
  typeof usePoolFeeDataSuspenseQuery
>;
export type PoolFeeDataQueryResult = Apollo.QueryResult<
  PoolFeeDataQuery,
  PoolFeeDataQueryVariables
>;
export const PoolsByTokenPairDocument = gql`
  query PoolsByTokenPair($token0: ID!, $token1: ID!) {
    pools(where: { token0_: { id: $token0 }, token1_: { id: $token1 } }) {
      ...PoolFields
    }
  }
  ${PoolFieldsFragmentDoc}
`;

/**
 * __usePoolsByTokenPairQuery__
 *
 * To run a query within a React component, call `usePoolsByTokenPairQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoolsByTokenPairQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoolsByTokenPairQuery({
 *   variables: {
 *      token0: // value for 'token0'
 *      token1: // value for 'token1'
 *   },
 * });
 */
export function usePoolsByTokenPairQuery(
  baseOptions: Apollo.QueryHookOptions<
    PoolsByTokenPairQuery,
    PoolsByTokenPairQueryVariables
  > &
    (
      | { variables: PoolsByTokenPairQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PoolsByTokenPairQuery, PoolsByTokenPairQueryVariables>(
    PoolsByTokenPairDocument,
    options
  );
}
export function usePoolsByTokenPairLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PoolsByTokenPairQuery,
    PoolsByTokenPairQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PoolsByTokenPairQuery,
    PoolsByTokenPairQueryVariables
  >(PoolsByTokenPairDocument, options);
}
export function usePoolsByTokenPairSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        PoolsByTokenPairQuery,
        PoolsByTokenPairQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    PoolsByTokenPairQuery,
    PoolsByTokenPairQueryVariables
  >(PoolsByTokenPairDocument, options);
}
export type PoolsByTokenPairQueryHookResult = ReturnType<
  typeof usePoolsByTokenPairQuery
>;
export type PoolsByTokenPairLazyQueryHookResult = ReturnType<
  typeof usePoolsByTokenPairLazyQuery
>;
export type PoolsByTokenPairSuspenseQueryHookResult = ReturnType<
  typeof usePoolsByTokenPairSuspenseQuery
>;
export type PoolsByTokenPairQueryResult = Apollo.QueryResult<
  PoolsByTokenPairQuery,
  PoolsByTokenPairQueryVariables
>;
export const MultipleTokensDocument = gql`
  query MultipleTokens($tokenIds: [ID!]!) {
    tokens(where: { id_in: $tokenIds }) {
      ...TokenFields
    }
  }
  ${TokenFieldsFragmentDoc}
`;

/**
 * __useMultipleTokensQuery__
 *
 * To run a query within a React component, call `useMultipleTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useMultipleTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMultipleTokensQuery({
 *   variables: {
 *      tokenIds: // value for 'tokenIds'
 *   },
 * });
 */
export function useMultipleTokensQuery(
  baseOptions: Apollo.QueryHookOptions<
    MultipleTokensQuery,
    MultipleTokensQueryVariables
  > &
    (
      | { variables: MultipleTokensQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MultipleTokensQuery, MultipleTokensQueryVariables>(
    MultipleTokensDocument,
    options
  );
}
export function useMultipleTokensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MultipleTokensQuery,
    MultipleTokensQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MultipleTokensQuery, MultipleTokensQueryVariables>(
    MultipleTokensDocument,
    options
  );
}
export function useMultipleTokensSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        MultipleTokensQuery,
        MultipleTokensQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    MultipleTokensQuery,
    MultipleTokensQueryVariables
  >(MultipleTokensDocument, options);
}
export type MultipleTokensQueryHookResult = ReturnType<
  typeof useMultipleTokensQuery
>;
export type MultipleTokensLazyQueryHookResult = ReturnType<
  typeof useMultipleTokensLazyQuery
>;
export type MultipleTokensSuspenseQueryHookResult = ReturnType<
  typeof useMultipleTokensSuspenseQuery
>;
export type MultipleTokensQueryResult = Apollo.QueryResult<
  MultipleTokensQuery,
  MultipleTokensQueryVariables
>;
export const SingleTokenDocument = gql`
  query SingleToken($tokenId: ID!) {
    token(id: $tokenId) {
      ...TokenFields
    }
  }
  ${TokenFieldsFragmentDoc}
`;

/**
 * __useSingleTokenQuery__
 *
 * To run a query within a React component, call `useSingleTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleTokenQuery({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useSingleTokenQuery(
  baseOptions: Apollo.QueryHookOptions<
    SingleTokenQuery,
    SingleTokenQueryVariables
  > &
    (
      | { variables: SingleTokenQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SingleTokenQuery, SingleTokenQueryVariables>(
    SingleTokenDocument,
    options
  );
}
export function useSingleTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SingleTokenQuery,
    SingleTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SingleTokenQuery, SingleTokenQueryVariables>(
    SingleTokenDocument,
    options
  );
}
export function useSingleTokenSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SingleTokenQuery,
        SingleTokenQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SingleTokenQuery, SingleTokenQueryVariables>(
    SingleTokenDocument,
    options
  );
}
export type SingleTokenQueryHookResult = ReturnType<typeof useSingleTokenQuery>;
export type SingleTokenLazyQueryHookResult = ReturnType<
  typeof useSingleTokenLazyQuery
>;
export type SingleTokenSuspenseQueryHookResult = ReturnType<
  typeof useSingleTokenSuspenseQuery
>;
export type SingleTokenQueryResult = Apollo.QueryResult<
  SingleTokenQuery,
  SingleTokenQueryVariables
>;
export const TokenTop10HoldersDocument = gql`
  query TokenTop10Holders($tokenId: ID!) {
    token(id: $tokenId) {
      id
      symbol
      holders(first: 10, orderBy: holdingValue, orderDirection: desc) {
        id
        holdingValue
        account {
          id
        }
      }
    }
  }
`;

/**
 * __useTokenTop10HoldersQuery__
 *
 * To run a query within a React component, call `useTokenTop10HoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTokenTop10HoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTokenTop10HoldersQuery({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useTokenTop10HoldersQuery(
  baseOptions: Apollo.QueryHookOptions<
    TokenTop10HoldersQuery,
    TokenTop10HoldersQueryVariables
  > &
    (
      | { variables: TokenTop10HoldersQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    TokenTop10HoldersQuery,
    TokenTop10HoldersQueryVariables
  >(TokenTop10HoldersDocument, options);
}
export function useTokenTop10HoldersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TokenTop10HoldersQuery,
    TokenTop10HoldersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TokenTop10HoldersQuery,
    TokenTop10HoldersQueryVariables
  >(TokenTop10HoldersDocument, options);
}
export function useTokenTop10HoldersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TokenTop10HoldersQuery,
        TokenTop10HoldersQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    TokenTop10HoldersQuery,
    TokenTop10HoldersQueryVariables
  >(TokenTop10HoldersDocument, options);
}
export type TokenTop10HoldersQueryHookResult = ReturnType<
  typeof useTokenTop10HoldersQuery
>;
export type TokenTop10HoldersLazyQueryHookResult = ReturnType<
  typeof useTokenTop10HoldersLazyQuery
>;
export type TokenTop10HoldersSuspenseQueryHookResult = ReturnType<
  typeof useTokenTop10HoldersSuspenseQuery
>;
export type TokenTop10HoldersQueryResult = Apollo.QueryResult<
  TokenTop10HoldersQuery,
  TokenTop10HoldersQueryVariables
>;
export const AllTokensDocument = gql`
  query AllTokens {
    tokens {
      ...TokenFields
    }
  }
  ${TokenFieldsFragmentDoc}
`;

/**
 * __useAllTokensQuery__
 *
 * To run a query within a React component, call `useAllTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTokensQuery(
  baseOptions?: Apollo.QueryHookOptions<AllTokensQuery, AllTokensQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllTokensQuery, AllTokensQueryVariables>(
    AllTokensDocument,
    options
  );
}
export function useAllTokensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllTokensQuery,
    AllTokensQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllTokensQuery, AllTokensQueryVariables>(
    AllTokensDocument,
    options
  );
}
export function useAllTokensSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<AllTokensQuery, AllTokensQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AllTokensQuery, AllTokensQueryVariables>(
    AllTokensDocument,
    options
  );
}
export type AllTokensQueryHookResult = ReturnType<typeof useAllTokensQuery>;
export type AllTokensLazyQueryHookResult = ReturnType<
  typeof useAllTokensLazyQuery
>;
export type AllTokensSuspenseQueryHookResult = ReturnType<
  typeof useAllTokensSuspenseQuery
>;
export type AllTokensQueryResult = Apollo.QueryResult<
  AllTokensQuery,
  AllTokensQueryVariables
>;
export const VaultsSortedByHoldersDocument = gql`
  query VaultsSortedByHolders {
    ichiVaults(first: 100, orderBy: holdersCount, orderDirection: desc) {
      ...VaultField
    }
  }
  ${VaultFieldFragmentDoc}
`;

/**
 * __useVaultsSortedByHoldersQuery__
 *
 * To run a query within a React component, call `useVaultsSortedByHoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useVaultsSortedByHoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVaultsSortedByHoldersQuery({
 *   variables: {
 *   },
 * });
 */
export function useVaultsSortedByHoldersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    VaultsSortedByHoldersQuery,
    VaultsSortedByHoldersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    VaultsSortedByHoldersQuery,
    VaultsSortedByHoldersQueryVariables
  >(VaultsSortedByHoldersDocument, options);
}
export function useVaultsSortedByHoldersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VaultsSortedByHoldersQuery,
    VaultsSortedByHoldersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    VaultsSortedByHoldersQuery,
    VaultsSortedByHoldersQueryVariables
  >(VaultsSortedByHoldersDocument, options);
}
export function useVaultsSortedByHoldersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        VaultsSortedByHoldersQuery,
        VaultsSortedByHoldersQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    VaultsSortedByHoldersQuery,
    VaultsSortedByHoldersQueryVariables
  >(VaultsSortedByHoldersDocument, options);
}
export type VaultsSortedByHoldersQueryHookResult = ReturnType<
  typeof useVaultsSortedByHoldersQuery
>;
export type VaultsSortedByHoldersLazyQueryHookResult = ReturnType<
  typeof useVaultsSortedByHoldersLazyQuery
>;
export type VaultsSortedByHoldersSuspenseQueryHookResult = ReturnType<
  typeof useVaultsSortedByHoldersSuspenseQuery
>;
export type VaultsSortedByHoldersQueryResult = Apollo.QueryResult<
  VaultsSortedByHoldersQuery,
  VaultsSortedByHoldersQueryVariables
>;
export const AccountVaultSharesDocument = gql`
  query AccountVaultShares($AccountId: ID!) {
    vaultShares(where: { user_: { id: $AccountId }, vaultShareBalance_gt: 0 }) {
      ...VaultSharesField
      id
    }
  }
  ${VaultSharesFieldFragmentDoc}
`;

/**
 * __useAccountVaultSharesQuery__
 *
 * To run a query within a React component, call `useAccountVaultSharesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountVaultSharesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountVaultSharesQuery({
 *   variables: {
 *      AccountId: // value for 'AccountId'
 *   },
 * });
 */
export function useAccountVaultSharesQuery(
  baseOptions: Apollo.QueryHookOptions<
    AccountVaultSharesQuery,
    AccountVaultSharesQueryVariables
  > &
    (
      | { variables: AccountVaultSharesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AccountVaultSharesQuery,
    AccountVaultSharesQueryVariables
  >(AccountVaultSharesDocument, options);
}
export function useAccountVaultSharesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AccountVaultSharesQuery,
    AccountVaultSharesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AccountVaultSharesQuery,
    AccountVaultSharesQueryVariables
  >(AccountVaultSharesDocument, options);
}
export function useAccountVaultSharesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AccountVaultSharesQuery,
        AccountVaultSharesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    AccountVaultSharesQuery,
    AccountVaultSharesQueryVariables
  >(AccountVaultSharesDocument, options);
}
export type AccountVaultSharesQueryHookResult = ReturnType<
  typeof useAccountVaultSharesQuery
>;
export type AccountVaultSharesLazyQueryHookResult = ReturnType<
  typeof useAccountVaultSharesLazyQuery
>;
export type AccountVaultSharesSuspenseQueryHookResult = ReturnType<
  typeof useAccountVaultSharesSuspenseQuery
>;
export type AccountVaultSharesQueryResult = Apollo.QueryResult<
  AccountVaultSharesQuery,
  AccountVaultSharesQueryVariables
>;
export const SingleVaultDetailsDocument = gql`
  query SingleVaultDetails($vaultId: ID!) {
    ichiVault(id: $vaultId) {
      ...VaultField
      totalShares
      vaultShares {
        id
        vaultShareBalance
      }
      vaultDeposits(
        orderBy: createdAtTimestamp
        orderDirection: desc
        first: 100
      ) {
        id
        createdAtTimestamp
        amount0
        amount1
        shares
        to
      }
      vaultWithdraws(
        orderBy: createdAtTimestamp
        orderDirection: desc
        first: 100
      ) {
        id
        createdAtTimestamp
        amount0
        amount1
        shares
        to
      }
      vaultCollectFees(
        orderBy: createdAtTimestamp
        orderDirection: desc
        first: 100
      ) {
        id
        createdAtTimestamp
        feeAmount0
        feeAmount1
        sender
      }
      pool {
        ...PoolField
      }
    }
  }
  ${VaultFieldFragmentDoc}
  ${PoolFieldFragmentDoc}
`;

/**
 * __useSingleVaultDetailsQuery__
 *
 * To run a query within a React component, call `useSingleVaultDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleVaultDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleVaultDetailsQuery({
 *   variables: {
 *      vaultId: // value for 'vaultId'
 *   },
 * });
 */
export function useSingleVaultDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SingleVaultDetailsQuery,
    SingleVaultDetailsQueryVariables
  > &
    (
      | { variables: SingleVaultDetailsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SingleVaultDetailsQuery,
    SingleVaultDetailsQueryVariables
  >(SingleVaultDetailsDocument, options);
}
export function useSingleVaultDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SingleVaultDetailsQuery,
    SingleVaultDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SingleVaultDetailsQuery,
    SingleVaultDetailsQueryVariables
  >(SingleVaultDetailsDocument, options);
}
export function useSingleVaultDetailsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SingleVaultDetailsQuery,
        SingleVaultDetailsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SingleVaultDetailsQuery,
    SingleVaultDetailsQueryVariables
  >(SingleVaultDetailsDocument, options);
}
export type SingleVaultDetailsQueryHookResult = ReturnType<
  typeof useSingleVaultDetailsQuery
>;
export type SingleVaultDetailsLazyQueryHookResult = ReturnType<
  typeof useSingleVaultDetailsLazyQuery
>;
export type SingleVaultDetailsSuspenseQueryHookResult = ReturnType<
  typeof useSingleVaultDetailsSuspenseQuery
>;
export type SingleVaultDetailsQueryResult = Apollo.QueryResult<
  SingleVaultDetailsQuery,
  SingleVaultDetailsQueryVariables
>;
