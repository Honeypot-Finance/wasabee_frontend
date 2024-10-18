import { Layout } from "@/components/layout";
import { LPCard } from "@/components/LPCard";
import { Swap } from "@/components/swap";
import { Tab, Tabs } from "@nextui-org/react";

const Pool = () => {
  return (
    <div>
      <Tabs className="relative w-full flex justify-center content-center items-center">
        <Tab title="v3">
          <div className="relative w-full flex justify-center content-center items-center">
            <LPCard></LPCard>
          </div>
        </Tab>
        <Tab title="v2">
          <div className="relative w-full flex justify-center content-center items-center">
            <LPCard></LPCard>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Pool;
