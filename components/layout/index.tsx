import { useEffect } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { useRouter } from "next/router";
import { useAccount, useConnectorClient } from "wagmi";
import { wallet } from "@/services/wallet";
import { config } from "@/config/wagmi";
import { networksMap } from "@/services/chain";
import LaunchHeader from "./LaunchHeader";
import { cn } from "@/lib/tailwindcss";
import NotConnetctedDisplay from "../NotConnetctedDisplay/NotConnetctedDisplay";
import MemeWarBanner from "../MemeWarBanner/MemeWarBanner";

export const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  const { chainId } = useAccount();
  const currentChain = chainId ? networksMap[chainId] : null;
  return (
    <div className={cn("flex flex-col min-h-screen overflow-auto", className)}>
      {router.pathname.startsWith("/launch") ||
      router.pathname.startsWith("/pools") ? (
        <LaunchHeader />
      ) : (
        <Header />
      )}
      {currentChain ? (
        <div className=" px-[12px] sm:pt-[72px] pt-[24px] flex-1">
          {children}
        </div>
      ) : (
        <NotConnetctedDisplay />
      )}
      {/* <Footer></Footer> */}
    </div>
  );
};
