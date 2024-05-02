import { useEffect } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { useAccount, useConnectorClient } from "wagmi";
import { wallet } from "@/services/wallet";
import { config } from "@/config/wagmi";
import { networksMap } from "@/services/chain";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { chainId} = useAccount();
  const currentChain = chainId ? networksMap[chainId] : null
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
