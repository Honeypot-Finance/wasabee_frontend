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
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className="bg-[#FFCD4D] rounded-xl pt-1 min-w-[200px] min-h-[100px] flex flex-col bg-[url('/images/card-container/dark/bottom-border.svg')] bg-left-bottom bg-repeat-x">
        <div className="border-t-1 rounded-[30px] border-[#202020] px-3 h-full flex flex-col">
          <div className="relative" ref={dropdownRef}>
            <div className=" top-full left-0 right-0 mt-1  rounded-lg py-1 z-50 flex gap-2">
              {menuList.map((menu) => (
                <div
                  key={menu.title}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(menu.title)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Button
                    className={cn(
                      "w-full justify-start min-h-[32px] h-8 py-0 font-bold bg-transparent text-black hover:bg-[#202020]/50 hover:text-white",
                      router.pathname ===
                        (menu.path instanceof Array
                          ? menu.path[0].path
                          : menu.path)
                        ? "bg-[#202020] text-white"
                        : ""
                    )}
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
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1  pr-2 -mr-2">
            <div className="flex gap-1.5">
              {subMenus.length !== 0 &&
                subMenus.map((subMenu) => (
                  <Button
                    key={subMenu.path}
                    size="sm"
                    className={cn(
                      "w-full justify-start  py-0 font-bold hover:bg-[#202020]  hover:text-white",
                      router.pathname === subMenu.path
                        ? "bg-[#202020] text-white"
                        : "bg-transparent text-[#202020] "
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
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
