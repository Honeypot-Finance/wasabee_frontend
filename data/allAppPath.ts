import { StaticImageData } from "next/image";

export type Menu = {
  path:
    | string
    | {
        path: string;
        title: string;
        icon?: StaticImageData;
      }[];
  title: string;
  icon?: StaticImageData;
};

export type flatMenu = {
  path: string;
  title: string;
  icon?: StaticImageData;
};

export const appPathsList: Menu[] = [
  // {
  //   path: "/navigation",
  //   title: "Navigation",
  // },
  {
    title: "Dex",
    path: [
      {
        path: "/swap",
        title: "Swap",
      },
      {
        path: "/pool",
        title: "Add Liquidity",
      },
      {
        path: "/pools",
        title: "LP Pool List",
      },
    ],
  },
  {
    path: "/faucet",
    title: "Faucet",
  },
  {
    path: [
      {
        path: "/pot2pump/potting",
        title: "Potting",
      },
      {
        path: "/pot2pump/pumping",
        title: "Pumping",
      },
      {
        path: "/launch-token?launchType=meme",
        title: "Launch Meme",
      },
      {
        path: "/memewar",
        title: "Meme War ⚔️",
      },
    ],
    title: "Pot2pump",
  },
  {
    path: "/profile",
    title: "Profile",
  },
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
