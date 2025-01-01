import Link from "next/link";
import Image from "next/image";
import { footerData } from "@/config/allAppPath";
import { ReactNode } from "react";
import { useRouter } from "next/router";

export const Footer = () => {
  return (
    <footer className="w-full min-h-[50px]">
      <CurrentPageFooter />
    </footer>
  );
};

export const CurrentPageFooter = () => {
  const paths = useRouter().pathname.split("/");
  const footer: ReactNode = footerData[paths[1]];

  return footer ?? <></>;
};
