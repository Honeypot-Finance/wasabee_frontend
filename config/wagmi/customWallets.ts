/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable */

import { Wallet } from "@rainbow-me/rainbowkit";
import { createConnector } from "wagmi";
import { injected } from "wagmi/connectors";
export interface MyWalletOptions {
  projectId: string;
}


function getExplicitInjectedProvider(flag: string | number) {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined")
    return;
  const providers = window.ethereum.providers;
  return providers
    ? providers.find((provider: { [x: string]: any; }) => provider[flag])
    : window.ethereum[flag]
    ? window.ethereum
    : void 0;
}
function getWindowProviderNamespace(namespace:string) {
  const providerSearch = (provider: Window & typeof globalThis & any, namespace2:string) => {
    const [property, ...path] = namespace2.split(".");
    const _provider = provider[property];
    if (_provider) {
      if (path.length === 0) return _provider;
      return providerSearch(_provider, path.join("."));
    }
  };
  if (typeof window !== "undefined") return providerSearch(window, namespace);
}

function getInjectedProvider({ flag, namespace }: { flag?: any; namespace: string }) {
  var _a;
  if (typeof window === "undefined") return;
  if (namespace) {
    const windowProvider = getWindowProviderNamespace(namespace);
    if (windowProvider) return windowProvider;
  }
  const providers = (_a = window.ethereum) == null ? void 0 : _a.providers;
  if (flag) {
    const provider = getExplicitInjectedProvider(flag);
    if (provider) return provider;
  }
  if (typeof providers !== "undefined" && providers.length > 0)
    return providers[0];
  return window.ethereum;
}
function createInjectedConnector(provider: any) {
  return (walletDetails:any) => {
    const injectedConfig = provider
      ? {
          target: () => ({
            id: walletDetails.rkDetails.id,
            name: walletDetails.rkDetails.name,
            provider,
          }),
        }
      : {};
    return createConnector((config) => ({
      ...injected(injectedConfig)(config),
      ...walletDetails,
    }));
  };
}
function getInjectedConnector({
  flag,
  namespace,
  target,
}: {
  flag?: any;
  namespace: string;
  target?: any;
}) {
  const provider = target ? target : getInjectedProvider({ flag, namespace });
  return createInjectedConnector(provider);
}

export const holdstationWallet = ({ projectId }: MyWalletOptions): Wallet => ({
  id: "holdstation",
  name: "Holdstation",
  iconUrl: "/images/partners/holdstation.png",
  iconBackground: "#0c2f78",
  downloadUrls: {
    android:
      "https://play.google.com/store/apps/details?id=io.holdstation&pli=1",
    ios: "https://apps.apple.com/us/app/holdstation-web3-wallet/id6444925618",
    qrCode:
      "https://holdstation.com/_next/image?url=%2Flogo%2Flogo-scan.png&w=3840&q=75",
  },
  mobile: {
    getUri: void 0,
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: "https://holdstation.com/",
      steps: [
        // {
        //   description:
        //     "We recommend putting My Wallet on your home screen for faster access to your wallet.",
        //   step: "install",
        //   title: "Open the My Wallet app",
        // },
        // {
        //   description:
        //     "After you scan, a connection prompt will appear for you to connect your wallet.",
        //   step: "scan",
        //   title: "Tap the scan button",
        // },
      ],
    },
  },
  //   extension: {
  //     instructions: {
  //       learnMoreUrl: "https://my-wallet/learn-more",
  //       steps: [
  //         {
  //           description:
  //             "We recommend pinning My Wallet to your taskbar for quicker access to your wallet.",
  //           step: "install",
  //           title: "Install the My Wallet extension",
  //         },
  //         {
  //           description:
  //             "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
  //           step: "create",
  //           title: "Create or Import a Wallet",
  //         },
  //         {
  //           description:
  //             "Once you set up your wallet, click below to refresh the browser and load up the extension.",
  //           step: "refresh",
  //           title: "Refresh your browser",
  //         },
  //       ],
  //     },
  //   },
  createConnector: getInjectedConnector({ namespace: "ethereum" }),
});
