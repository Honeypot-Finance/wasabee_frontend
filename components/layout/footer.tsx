import Link from "next/link";
import Image from "next/image";
import { footerData } from "@/data/allAppPath";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const Footer = () => {
  return (
    <footer className="w-full min-h-[50px]">
      <CurrentPageFooter />
    </footer>
  );
};

export const CurrentPageFooter = () => {
  const paths = usePathname().split("/");
  const footer: ReactNode = footerData[paths[1] as keyof typeof footerData];

  return footer ?? <></>;
};
