import React from "react";
import { useRouter } from "next/router";
import { cn } from "@/lib/tailwindcss";
import { Button } from "@nextui-org/react";
import { Menu } from "@/config/allAppPath";
import Image from "next/image";

interface NavbarProps {
  menuList: Menu[];
}

export const CustomNavbar: React.FC<NavbarProps> = ({ menuList }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredMenu, setHoveredMenu] = React.useState<string | null>(null);

  const findMenuByPath = React.useCallback(
    (path: string) => {
      for (const menu of menuList) {
        if (menu.path instanceof Array) {
          if (menu.path.some((subMenu) => subMenu.path === path)) {
            return menu.title;
          }
        } else if (menu.path === path) {
          return menu.title;
        }
      }
      return menuList[0].title;
    },
    [menuList]
  );

  const [selectedMenu, setSelectedMenu] = React.useState<string>(
    findMenuByPath(router.pathname)
  );

  React.useEffect(() => {
    setSelectedMenu(findMenuByPath(router.pathname));
  }, [router.pathname, findMenuByPath]);

  const currentMenu = menuList.find((m) => m.title === selectedMenu);

  const subMenus =
    currentMenu && currentMenu.path instanceof Array ? currentMenu.path : [];

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/header/hanging-rope.svg"
        alt="hanging rope"
        width={139}
        height={66}
        className="mb-[-20px]"
      />
      <div
        className="bg-[#FFCD4D] rounded-xl pt-1 pb-8 min-w-[200px] h-[140px] flex flex-col bg-[url('/images/card-container/dark/bottom-border.svg')] bg-left-bottom bg-repeat-x"
      >
        <div className="border-t-1 rounded-[30px] border-[#202020] px-3 h-full flex flex-col">
          <div className="relative">
            <Button
              size="sm"
              className="w-full min-h-unit-8 h-8 py-0 bg-transparent hover:bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center w-full justify-center gap-x-1 relative">
                <span className="text-[#202020] font-bold text-left relative before:content-[''] before:absolute before:-left-8 before:top-1/2 before:-translate-y-1/2 before:w-6 before:h-6 before:bg-[url('/images/empty-logo.png')] before:bg-contain before:bg-no-repeat before:bg-center">
                  {selectedMenu}
                </span>
                <svg
                  className={cn(
                    "w-4 h-4 transition-transform text-white absolute right-0",
                    isOpen ? "rotate-180" : ""
                  )}
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </Button>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#202020] rounded-lg py-1 z-50">
                {menuList.map((menu) => (
                  <div
                    key={menu.title}
                    className="relative"
                    onMouseEnter={() => setHoveredMenu(menu.title)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <Button
                      className="w-full justify-start min-h-[32px] h-8 py-0 font-bold bg-transparent hover:bg-[#202020]/50 text-white"
                      onClick={() => {
                        if (menu.path instanceof Array) {
                          router.push(menu.path[0].path);
                        } else {
                          router.push(menu.path);
                        }
                        setSelectedMenu(menu.title);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-center w-full">
                        <div className="w-6 h-6 bg-[#202020] rounded-md" />
                        <span className="ml-2">{menu.title}</span>
                      </div>
                    </Button>

                    {hoveredMenu === menu.title && menu.path instanceof Array && (
                      <>
                        <div className="absolute -right-2 top-0 w-2 h-full" />
                        <div className="absolute left-full top-0 ml-1 bg-[#202020] rounded-lg py-1 min-w-[200px]">
                          {menu.path.map((subMenu) => (
                            <Button
                              key={subMenu.path}
                              size="sm"
                              className="w-full justify-start min-h-[32px] h-8 py-0 font-bold bg-transparent hover:bg-[#202020]/50 text-white"
                              onClick={() => {
                                router.push(subMenu.path);
                                setIsOpen(false);
                              }}
                            >
                              {subMenu.title}
                            </Button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 -mr-2">
            <div className="flex flex-col gap-1.5">
              {subMenus.length === 0 ? (
                <div className="flex items-center justify-center h-full bg-[#202020] rounded-xl">
                  <Image
                    src="/images/header/project-name.svg"
                    alt="empty menu"
                    width={100}
                    height={100}
                    className="opacity-70"
                  />
                </div>
              ) : (
                subMenus.map((subMenu) => (
                  <Button
                    key={subMenu.path}
                    size="sm"
                    className={cn(
                      "w-full justify-start min-h-[32px] h-8 py-0 font-bold",
                      router.pathname === subMenu.path
                        ? "bg-[#202020] text-white"
                        : "bg-transparent text-[#202020] hover:bg-transparent"
                    )}
                    startContent={
                      <div className="w-5 h-5 mr-2 flex items-center justify-center">
                        {subMenu.icon && (
                          <Image
                            src={subMenu.icon.src}
                            alt={subMenu.title}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                        )}
                      </div>
                    }
                    onClick={() => router.push(subMenu.path)}
                  >
                    {subMenu.title}
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
