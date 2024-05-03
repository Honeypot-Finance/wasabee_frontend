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
      <div className="py-8">
        <Header />
      </div>
      {router.pathname === "/launch" ? (
        <div className="flex justify-between px-6 xl:max-w-[1200px] mx-auto">
          <h1 className="w-[624px text-5xl font-bold w-[624px]">
            <span>The first & fairest protocol on </span>
            <span className="text-[#F7931A]">Berachain</span>
          </h1>
          <BearSvg />
        </div>
      ) : null}
    </div>
  );
};

export default LaunchHeader;
