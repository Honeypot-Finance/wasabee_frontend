import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Image from "next/image";

const DOMAIN_MAP = {
  MAIN: "https://app.honeypotfinance.xyz",
  POT2PUMP: "https://pot2pump.honeypotfinance.xyz",
  DREAMPAD: "https://dreampad.honeypotfinance.xyz",
  WASABEE: "https://wasabee.honeypotfinance.xyz",
} as const;

export type PathChatConfig = {
  autoPopUpQuestion: ReactNode;
  pageTrendingQuestions: ReactNode[];
};

export type Menu = {
  path:
    | string
    | {
        path: string;
        title: string;
        routePath: string;
        icon?: StaticImageData;
        footer?: ReactNode;
        chatConfig?: PathChatConfig;
      }[];
  title: string;
  routePath?: string;
  icon?: StaticImageData;
  chatConfig?: PathChatConfig;
};

export type flatMenu = {
  path: string;
  title: string;
  icon?: StaticImageData;
  chatConfig?: PathChatConfig;
};

export const footerData: Record<string, ReactNode> = {
  pot2pump: (
    <div className="flex justify-center items-center">
      <Image
        src="/images/pumping/toast-bear.png"
        width={1000}
        height={0}
        alt="toast bear"
        className="w-full"
      />
    </div>
  ),
};

export const appPathsList: Menu[] = [
  // {
  //   path: "/navigation",
  //   title: "Navigation",
  // },
  {
    path: [
      {
        path: `${process.env.NODE_ENV === "development" ? "" : DOMAIN_MAP.POT2PUMP}/overview`,
        title: "Overview",
        routePath: "/overview"
      },
      {
        path: `${process.env.NODE_ENV === "development" ? "" : DOMAIN_MAP.POT2PUMP}/potting`,
        title: "Potting",
        routePath: "/potting"
      },
      {
        path: `${process.env.NODE_ENV === "development" ? "" : DOMAIN_MAP.POT2PUMP}/pumping`,
        title: "Pumping",
        routePath: "/pumping"
      },
      // {
      //   path: "/derbydashboard",
      //   title: "Derby Dashboard 🐎",
      // },
      // {
      //   path: "/memewar",
      //   title: "Meme War ⚔️",
      // },
    ],
    title: "Pot2pump",
    routePath: "/pot2pump"
  },
  {
    title: "DEX",
    routePath: "/dex",
    path: [
      {
        path: `${process.env.NODE_ENV === "development" ? "" : DOMAIN_MAP.MAIN}/swap`,
        title: "Swap",
        routePath: "/swap"
      },
      // {
      //   path: "/pool",
      //   title: "Add Liquidity",
      // },
      {
        path: `${process.env.NODE_ENV === "development" ? "" : DOMAIN_MAP.MAIN}/pools`,
        title: "LP Pool List",
        routePath: "/pools"
      },
    ],
  },
  {
    path: `${process.env.NODE_ENV === "development" ? "" : DOMAIN_MAP.MAIN}/leaderboard`,
    title: "Leaderboard",
    routePath: "/leaderboard"
  },
  {
    title: "Faucet",
    path: `${process.env.NODE_ENV === "development" ? "" : DOMAIN_MAP.MAIN}/faucet`,
    routePath: "/faucet"
  },
  // {
  //   title: "DreamPad",
  //   path: [
  //     {
  //       path: "/dreampad/launchpad-projects",
  //       title: "Projects",
  //     },
  //   ],
  // },
  // {
  //   path: "/profile",
  //   title: "Profile",
  // },
];

const getFlatPaths = (paths: Menu[]): flatMenu[] => {
  let flatPaths: flatMenu[] = [];

  paths.forEach((path) => {
    if (typeof path.path === "string") {
      flatPaths.push({
        path: path.path,
        title: path.title,
      });
    }
    if (Array.isArray(path.path)) {
      flatPaths = [...flatPaths, ...getFlatPaths(path.path)];
    }
  });

  return flatPaths;
};

export const flatAppPath = getFlatPaths(appPathsList);
