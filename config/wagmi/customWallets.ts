import { Wallet, getWalletConnectConnector } from "@rainbow-me/rainbowkit";
export interface MyWalletOptions {
  projectId: string;
}
export const holdstationWallet = ({ projectId }: MyWalletOptions): Wallet => ({
  id: "holdstation-wallet",
  name: "Holdstation Wallet",
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
    getUri: (uri: string) => uri,
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
  createConnector: getWalletConnectConnector({ projectId }),
});
