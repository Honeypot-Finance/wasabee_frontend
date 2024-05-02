import "@/styles/globals.css";
//@ts-ignore
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout";
import { NextLayoutPage } from "@/types/nextjs";
import { WagmiProvider, useAccount, useConnectorClient } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "@/config/wagmi";
import { trpc, trpcQueryClient } from "../lib/trpc";
import { enableStaticRendering } from "mobx-react-lite";
import { networksMap } from "@/services/chain";
import { useEffect } from "react";
import { wallet } from "@/services/wallet";
// enableStaticRendering(true)
const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { address, chainId } = useAccount();
  const { data: walletClient } = useConnectorClient({
    config,
  });
  const currentChain = chainId ? networksMap[chainId] : null;
  useEffect(() => {
    if (address && chainId && currentChain) {
      wallet.initWallet({
        chainId,
        account: address,
      });
    }
  }, [address, chainId]);
  useEffect(() => {
    if (walletClient) {
      wallet.setWalletClient(walletClient as any);
    }
  }, [walletClient]);
  return children;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextLayoutPage;
}) {
  const ComponentLayout = Component.Layout || Layout;
  return (
    <trpc.Provider client={trpcQueryClient} queryClient={queryClient}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <NextUIProvider>
              <Provider>
                <ComponentLayout>
                  <Component {...pageProps} />
                </ComponentLayout>
              </Provider>
              <ToastContainer></ToastContainer>
            </NextUIProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </trpc.Provider>
  );
}
