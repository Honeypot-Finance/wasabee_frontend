import "@/styles/globals.css";
//@ts-ignore
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout";
import { NextLayoutPage } from "@/types/nextjs";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "@/config/wagmi";
import { trpc, trpcQueryClient } from "../lib/trpc"
import { enableStaticRendering } from "mobx-react-lite";
// enableStaticRendering(true)
const queryClient = new QueryClient();


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
              <ComponentLayout>
                <Component {...pageProps} />
              </ComponentLayout>
              <ToastContainer></ToastContainer>
            </NextUIProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </trpc.Provider>
  );
}
