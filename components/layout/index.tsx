import { useEffect } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { useAccount, useConnectorClient } from "wagmi";
import { wallet } from "@/services/wallet";
import { config } from "@/config/wagmi";
import { networksMap } from "@/services/chain";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { address, chainId} = useAccount();
  const { data: walletClient } = useConnectorClient({
    config
  }) 
  const currentChain = chainId ? networksMap[chainId] : null
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
      wallet.setWalletClient(walletClient as any)
    }
  }, [walletClient])
  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      <Header></Header>
      {currentChain ? <div className=" px-[12px] sm:pt-[72px] pt-[24px] flex-1">{children}</div> : <div className="flex px-[12px] sm:pt-[72px] pt-[24px] flex-1 justify-center">
          Wrong Network
        </div>}
      {/* <Footer></Footer> */}
    </div>
  );
};
