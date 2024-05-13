import React from "react";
import { Header } from "./header";
import { BearSvg } from "../svg/Bear";
import { useRouter } from "next/router";

const LaunchHeader: React.FC = () => {
  const router = useRouter();
  return (
    <div
      className={`${router.pathname === "/launch" ? " bg-[#433418]" : null}`}
    >
      <Header />
      {router.pathname === "/launch" ? (
        <div className="flex justify-between items-center mt-8 px-6 xl:max-w-[1200px] mx-auto h-28 md:h-auto">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold w-[624px]">
            <span>The first & fairest protocol on </span>
            <span className="text-[#F7931A]">Berachain</span>
          </h1>
          <div className="scale-50 sm:scale-[0.6] md:scale-100">
            <BearSvg />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LaunchHeader;
