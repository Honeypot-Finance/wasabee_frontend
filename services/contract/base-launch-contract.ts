import { BaseContract } from ".";
import { Token } from "./token";
import BigNumber from "bignumber.js";

export interface BaseLaunchContract extends BaseContract {
  databaseId: number | undefined;
  address: string;
  name: string;
  abi: readonly any[];
  raiseToken: Token | undefined;
  launchedToken: Token | undefined;
  depositedRaisedTokenWithoutDecimals: BigNumber | null;
  depositedLaunchedTokenWithoutDecimals: BigNumber | null;
  endTime: string;
  startTime: string;
  ftoState: number;
  launchedTokenProvider: string;
  projectName: string;
  description: string;
  telegram: string;
  twitter: string;
  website: string;
  isValidated: boolean;
  isInit: boolean;
  provider: string;
  canClaimLP: boolean;
  socials: {
    name: string;
    link: string;
    icon: string;
  }[];
  logoUrl: string;
  bannerUrl: string;
}
