export interface ZapService<P extends ZapServiceProvider> {
  provider: P;
}

export interface ZapServiceProvider {
  getSupportedTokens(): Promise<SupportedZapTokens>;
}

export type SupportedZapTokens = SupportedZapToken[];

export interface SupportedZapToken {
  name: string;
  symbol: string;
  decimals: number;
  tokenURI?: string;
  address: string;
}
