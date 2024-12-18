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
import AnnouncementBar from "./AnnouncementBar";
import Link from "next/link";
import ChatWidget from "../ServiceChat";

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
            <div className="text-center  font-bold text-[30px]">
              Announcement
            </div>
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

  // const allowedPaths = ["/swap"];
  const allowedPaths = [""];
  const currentPath = router.pathname;

  const slogans = [
    <>
      <Link href="/derbydashboard" className="flex items-center ">
        <span> Back your horse in the Berachain Derby 🏇</span>
      </Link>
    </>,
    <>
      <Link href="/launch-token?launchType=meme" className="flex items-center">
        <span className="flex items-center justify-center gap-2">
          Launch a new meme token within 5 seconds 🚀
        </span>
      </Link>
    </>,
  ];

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen overflow-y-auto bg-[url('/images/icons/bg-honey.png')]",
        className
      )}
    >
      <AnnouncementBar slogans={slogans} interval={5000} />
      {/* <GuideModal /> */}
      <ChatWidget />

      <ConfettiComponent />
      <PopOverModal />
      {router.pathname.startsWith("/launch") ||
      router.pathname.startsWith("/pools") ? (
        <LaunchHeader />
      ) : (
        <Header />
      )}
      {currentChain || allowedPaths.includes(currentPath) ? (
        currentChain?.isActive ? (
          <div className="pt-6 sm:pt-12 flex-1 flex">{children}</div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Chain will be support soon</h1>
              <p className="text-lg">Check back later for more information</p>
            </div>
          </div>
        )
      ) : (
        <NotConnetctedDisplay />
      )}
      {/* <Footer></Footer> */}
    </div>
  );
};
