import { useEffect } from "react";
import { Header } from "./header";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { networksMap } from "@/services/chain";
import LaunchHeader from "./LaunchHeader";
import { cn } from "@/lib/tailwindcss";
import NotConnetctedDisplay from "../NotConnetctedDisplay/NotConnetctedDisplay";
import ConfettiComponent from "../atoms/Confetti/Confetti";
import PopOverModal from "../PopOverModal/PopOverModal";
import { trpcClient } from "@/lib/trpc";
import { popmodal } from "@/services/popmodal";
import { metadata } from "@/config/metadata";

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

  useEffect(() => {
    trpcClient.metadata.getServerMetadata.query().then((res) => {
      if (
        res.latest_version === metadata.version ||
        process.env.NODE_ENV === "development"
      )
        return;
      popmodal.openModal({
        content: (
          <div className="min-h-[300px] line-[24px]">
            <p className="text-center  font-bold text-[30px]">Announcement</p>
            <h1 className="mt-[24px]">
              This version is outdated, please check our newest link:&nbsp;{" "}
              <a
                className="hover:text-orange-500 transition-all underline"
                href={res.latest_site}
              >
                {res.latest_site}.
              </a>
            </h1>
            <p>
              Pls have fun with brand new features with pot2pump meme launch. we
              will not update and maintain this version anymore so feel free to
              migrate your assets to our new version
            </p>
          </div>
        ),
      });
    });
  }, []);

  const allowedPaths = ["/swap"];
  const currentPath = router.pathname;

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen overflow-auto bg-[url('/images/icons/bg-honey.png')]",
        className
      )}
    >
      {/* 
        <div className="w-full bg-[#F7931A]/40">
          <div className="mx-auto flex items-center justify-center gap-x-1">
            <span className="text-[#F7931A]">PHISHING WARNING: </span>
            <span>Please follow our X</span>
            <a href="https://x.com/honeypotfinance" className="underline">
              https://x.com/honeypotfinance
            </a>
          </div>
        </div> 
      */}
      <ConfettiComponent />
      <PopOverModal />
      {router.pathname.startsWith("/launch") ||
      router.pathname.startsWith("/pools") ? (
        <LaunchHeader />
      ) : (
        <Header />
      )}
      {currentChain || allowedPaths.includes(currentPath) ? (
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
