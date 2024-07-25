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
        <div className="flex justify-between items-center sm:mt-8 px-6 xl:max-w-[1200px] mx-auto h-28 md:h-auto">
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold w-[624px] text-pretty">
            <span>The first & fairest protocol on </span>
            <span className="text-[#F7931A]">Berachain</span>
          </h1>
          <div>
            <BearSvg />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LaunchHeader;
