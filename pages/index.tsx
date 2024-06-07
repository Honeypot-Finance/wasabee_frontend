import { NextLayoutPage } from "@/types/nextjs";
import Image from "next/image";
import { Darker_Grotesque, Poppins } from "next/font/google";
import { cn } from "@/lib/tailwindcss";
import Link from "next/link";

// If loading a variable font, you don't need to specify the font weight
const darkGroteque = Darker_Grotesque({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const Home: NextLayoutPage = () => {
  const links: {
    text: string;
    href: string;
    icon?: React.ReactNode;
    target?: string;
  }[] = [

    {
      text: "HenloDex",
      href: "/swap",
    },
    {
      text: "HoneyGenesis",
      href: "https://mint.honeypotfinance.xyz",
      target: "_blank",
    },
    {
      text: "Twitter",
      href: "https://twitter.com/honeypotfinance",
      target: "_blank",
      icon: (
        <Image
          width={16}
          height={16}
          src="/images/twitter.png"
          alt="twitter"
        ></Image>
      ),
    },
    {
      text: "Discord",
      href: "https://discord.com/invite/pkh7shAPWB",
      target: "_blank",
      icon: (
        <Image
          width={16}
          height={16}
          src="/images/discord.png"
          alt="discord"
        ></Image>
      ),
    },
    {
      text: "Prototype",
      href: "https://yexlabs.xyz",
      target: "_blank",
    },
  ];
  return (
    <div className=" relative  min-h-screen">
      <Image
        className=" absolute left-0 top-0"
        src="/images/homepage.png"
        fill
        alt=""
      ></Image>
      <div className="relative  z-1 w-full h-full flex flex-col justify-center items-center ">
        <Image
          className="mt-[80px] sm:mt-[150px]"
          width={85}
          height={85}
          src="/images/honey.png"
          alt=""
        ></Image>
        <div className="w-full px-[24px] sm:px-[160px]">
          <div className="relative sm:h-[277px] h-[100px] w-full">
            <Image
              objectFit="contain"
              className="absolute"
              src="/images/banner.png"
              fill
              alt=""
            ></Image>
          </div>
        </div>
        <div
          className={cn(
            "max-w-full flex w-[676px] flex-col justify-center shrink-0 text-white text-center text-[36px] sm:text-[65.509px] font-bold leading-[100%]",
            darkGroteque.className
          )}
        >
          An innovative DeFi Hub on Bearachain
        </div>
        <div className="sm:flex max-w-full mt-[41px] gap-[16px] grid grid-cols-2">
          {links.map((link) => (
            <Link
              className={cn(
                "text-[#FFCD4D] text-[14.705px] font-bold leading-[119%] capitalize flex w-[135px] h-[51px] justify-center items-center gap-[6.127px] [background:rgba(255,205,77,0.10)] backdrop-blur-[122.54356384277344px] rounded-[122.544px] border-[1.225px] border-solid border-[rgba(255,205,77,0.50)]",
                poppins.className
              )}
              target={link.target || '_self'}
              key={link.text}
              href={link.href}
            >
              {link.icon}
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
const Layout = ({ children }: { children: any }) => children;
Layout.displayName = "Layout";

Home.Layout = Layout;
export default Home;
