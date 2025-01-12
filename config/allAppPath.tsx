import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Image from "next/image";

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
        icon?: StaticImageData;
        footer?: ReactNode;
        chatConfig?: PathChatConfig;
      }[];
  title: string;
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
        path: "/pot2pump/overview",
        title: "Overview",
      },
      {
        path: "/pot2pump/potting",
        title: "Potting",
      },
      {
        path: "/pot2pump/pumping",
        title: "Pumping",
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
  },
  {
    title: "DEX",
    path: [
      {
        path: "/swap",
        title: "Swap",
      },
      // {
      //   path: "/pool",
      //   title: "Add Liquidity",
      // },
      {
        path: "/pools",
        title: "LP Pool List",
      },
    ],
  },
  {
    path: "/leaderboard",
    title: "Leaderboard",
  },
  {
    title: "Faucet",
    path: "/faucet",
  },
  {
    title: "DreamPad",
    path: [
      {
        path: "/dreampad/launchpad-projects",
        title: "Projects",
      },
    ],
  },
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
