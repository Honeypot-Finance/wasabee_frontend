import { ZapServiceProvider } from "../zapServiceTypes";
import { doSwap } from "@/lib/oogaboogaZap";

export class OogaBoogaZapProvider implements ZapServiceProvider {
  async getSupportedTokens() {
    return [
      {
        name: "OogaBooga",
        symbol: "OOGA",
        decimals: 18,
        address: "0xOOGA",
      },
    ];
  }

  async test() {
    doSwap();
  }
}
