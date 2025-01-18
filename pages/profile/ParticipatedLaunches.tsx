import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Pot2PumpService } from "@/services/launchpad/pot2pump";
import { wallet } from "@/services/wallet";
import { Tab, Tabs } from "@nextui-org/react";
import Pagination from "@/components/Pagination/Pagination";
import { LaunchCardV3 } from "@/components/LaunchCard/v3";
import { MemePairContract } from "@/services/contract/launches/pot2pump/memepair-contract";
import {
  canClaimPot2Pump,
  canRefundPot2Pump,
} from "@/lib/algebra/graphql/clients/pot2pump";

export const ParticipatedLaunches = observer(() => {
  const [myProjects, setMyProjects] = useState<Pot2PumpService>();
  const [canClaimPot2PumpList, setCanClaimPot2PumpList] = useState<
    MemePairContract[]
  >([]);
  const [canRefundPot2PumpList, setCanRefundPot2PumpList] = useState<
    MemePairContract[]
  >([]);

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    const newPumpingProjects = new Pot2PumpService();
    setMyProjects(newPumpingProjects);
    newPumpingProjects.participatedPairs.reloadPage();
    canClaimPot2Pump(wallet.account).then((res) => {
      setCanClaimPot2PumpList(res);
    });
    canRefundPot2Pump(wallet.account).then((res) => {
      setCanRefundPot2PumpList(res);
    });
  }, [wallet.isInit]);

  return (
    <div className="w-full relative custom-dashed-3xl bg-white p-6">
      <div className="text-4xl absolute top-8 left-6">Participated Launch</div>
      <Tabs
        classNames={{
          base: "relative w-full",
          tabList:
            "flex rounded-2xl border border-[#202020] bg-white p-4 shadow-[4px_4px_0px_0px_#202020,-4px_4px_0px_0px_#202020] py-2 px-3.5 mb-6 ml-auto z-10",
          panel: "w-full",
        }}
      >
        <Tab key="participated" title="Participated">
          {myProjects && (
            <Pagination
              paginationState={myProjects.participatedPairs}
              render={(project) => (
                <LaunchCardV3
                  key={project.address}
                  pair={project}
                  action={<></>}
                  theme="dark"
                />
              )}
              classNames={{
                base: "",
                itemsContainer:
                  "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6",
                item: "",
              }}
            />
          )}
        </Tab>
        <Tab key="can-claim" title="Can Claim">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {canClaimPot2PumpList.map((pair) => (
              <LaunchCardV3 key={pair.address} pair={pair} action={<></>} />
            ))}
          </div>
        </Tab>
        <Tab key="can-refund" title="Can Refund">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {canRefundPot2PumpList.map((pair) => (
              <LaunchCardV3 key={pair.address} pair={pair} action={<></>} />
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
});

export default ParticipatedLaunches;
