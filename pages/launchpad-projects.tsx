import Link from "next/link";
import { Observer, observer } from "mobx-react-lite";
import { wallet } from "@/services/wallet";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import launchpad, { defaultPairFilters } from "@/services/launchpad";
import { NextLayoutPage } from "@/types/nextjs";
import { LaunchCard } from "@/components/LaunchCard";
import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
  useDisclosure,
  Button as NextButton,
} from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";
import { SpinnerContainer } from "@/components/Spinner";
import { DropdownSvg } from "@/components/svg/dropdown";
import { motion } from "framer-motion";
import { defaultContainerVariants, itemPopUpVariants } from "@/lib/animation";
import { FaCrown, FaExternalLinkAlt } from "react-icons/fa";
import { MemePairContract } from "@/services/contract/memepair-contract";
import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import { WarppedNextInputSearchBar } from "@/components/wrappedNextUI/SearchBar/WrappedInputSearchBar";
import LaunchPadProjectCard from "@/components/LaunchPadProjectCard";

const MemeLaunchPage: NextLayoutPage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mostSuccessProjects, setMostSuccessProjects] = useState<
    MemePairContract[] | null
  >(null);
  const [selectedTab, setSelectedTab] = useState<'all' | 'my'>('all')

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    launchpad.setCurrentLaunchpadType("meme");
    launchpad.showNotValidatedPairs = true;
    launchpad.myLaunches.reloadPage();

    // launchpad.projectsPage.reloadPage();
    // launchpad.participatedPairs.reloadPage();

    //loading most success projects
    launchpad.trendingMEMEs().then((data) => {
      setMostSuccessProjects(data);
    });
  }, [wallet.isInit]);

  console.log("launchpad.projectsPage", launchpad.projectsPage)

  return (
    <div className="px-7 xl:max-w-[1280px] mx-auto flex flex-col sm:gap-y-5">
     
      {mostSuccessProjects && mostSuccessProjects.length > 0 && (
        <>
          <h2 className="w-full text-center text-[1.75rem] leading-4 font-bold text-neutral-100 ">
            Trending Projects
          </h2>
          <motion.div
            variants={defaultContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col lg:flex-row gap-4 flex-grow-[1] mt-8"
          >
            <LaunchPadProjectCard status="comming" coverImg={""} />
            <LaunchPadProjectCard status="live" coverImg={""} />
            <LaunchPadProjectCard status="live" coverImg={""} />
            <LaunchPadProjectCard status="live" coverImg={""} />
          </motion.div>
        </>
      )}

      <div className="flex justify-between">
        <Tabs
          aria-label="Options"
          variant="light"
          radius="sm"
          size="lg"
          classNames={{
            tab: "font-bold text-base leading-4 data-[selected=true]:bg-[#E18A2066] data-[selected=true]:backdrop-blur-[200] data-[selected=true]:border-1 data-[selected=true]:border-[#E18A2066s]",
            tabContent: "group-data-[selected=true]:text-[#ffffff]",
            cursor: "group-data-[selected=true]:bg-[#E18A2066]"
          }}
          defaultSelectedKey={selectedTab}
          selectedKey={selectedTab}
          onSelectionChange={(key) => {
            launchpad.setCurrentLaunchpadType("meme");
            if (key === "all") {
              setSelectedTab(key)
              launchpad.projectsPage.setIsInit(false);
              launchpad.pairFilterStatus = defaultPairFilters.all.status;
            } else if (key === "my") {
              setSelectedTab(key)
              launchpad.myLaunches.setIsInit(false);
              launchpad.pairFilterStatus = defaultPairFilters.myPairs.status;
            } else if (key === "participated-launch") {
              launchpad.participatedPairs.setIsInit(false);
              launchpad.pairFilterStatus =
                defaultPairFilters.participatedPairs.status;
            }
          }}
        >
          
            <Tab key="all" title="All Projects" />
            <Tab key="my" title="My Projects" />
        </Tabs>

        <div className="flex gap-5">
        <WarppedNextInputSearchBar
        className="max-w-[305px] w-[305px] h-[46px] flex"
            onChange={(e) => {
              launchpad.pairFilterSearch = e.target.value;
            }}
          />
         
        <Button className="px-[38px] py-[12.5px] rounded-full outline-1 !bg-[#FFCD4D] border-2 border-[#E18A2066]">
          <Link
            href="/launch-token?launchType=meme"
            className="text-black font-bold text-sm leading-4"
          >
            Launch Token
          </Link>
        </Button>
        </div>
      </div>

      <div>
            {selectedTab === 'all' ? 
            <Pagination
            paginationState={launchpad.projectsPage}
            render={(pair) => <LaunchPadProjectCard status={"live"} coverImg={''} isShowCoverImage={true} />}
            classNames={{
              itemsContainer:
                "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-x-4 xl:gap-y-5 xl:grid-cols-4",
            }}
          />:
          <Pagination
            paginationState={launchpad.myLaunches}
            render={(pair) => <LaunchPadProjectCard status={"live"} coverImg={''} isShowCoverImage={true}  />}
            classNames={{
              itemsContainer:
              "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-x-4 xl:gap-y-5 xl:grid-cols-4",
            }}
          /> }
          </div>
    
   
    </div>
  );
});

export default MemeLaunchPage;
