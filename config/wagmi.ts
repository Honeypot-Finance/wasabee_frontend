import { networks } from "@/services/chain";
import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";

import {
  rainbowWallet,
  bitgetWallet,
  okxWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

//for users without bitget wallet
let customWallets = [
  rainbowWallet,
  walletConnectWallet,
  bitgetWallet,
  okxWallet,
];
// if(!window.bitkeep){
//   customWallets.unshift(bitgetWallet);
// }
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: customWallets,
    },
  ],
  {
    appName: "Honypot Finance",
    projectId: "1d1c8b5204bfbd57502685fc0934a57d",
  }
);

export const config = getDefaultConfig({
  connectors,
  appName: "Honypot Finance",
  projectId: "1d1c8b5204bfbd57502685fc0934a57d",
  // @ts-ignore
  chains: networks.map((network) => network.chain),
  ssr: true, // If your dApp uses server side rendering (SSR)
});
