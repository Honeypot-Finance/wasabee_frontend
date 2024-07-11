import { ZapService, ZapServiceProvider } from "./zapServiceTypes";

export class Zap<P extends ZapServiceProvider> implements ZapService<P> {
  provider: P;

  constructor(provider: P) {
    this.provider = provider;
  }

  async getSupportedTokens(): Promise<any> {
    return this.provider.getSupportedTokens();
  }
}
