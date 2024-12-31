import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Pot2PumpService } from "@/services/launchpad/pot2pump";
import { wallet } from "@/services/wallet";
import {
  Card,
  CardBody,
  Button as NextButton,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Pagination from "@/components/Pagination/Pagination";
import { LaunchCardV3 } from "@/components/LaunchCard/v3";
import launchpad from "@/services/launchpad";
import {
  canClaimPot2Pump,
  canRefundPot2Pump,
} from "@/lib/algebra/graphql/clients/pot2pump";
import { MemePairContract } from "@/services/contract/memepair-contract";

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
    const canClaim = canClaimPot2Pump(wallet.account).then((res) => {
      setCanClaimPot2PumpList(res);
    });
    const canRefund = canRefundPot2Pump(wallet.account).then((res) => {
      setCanRefundPot2PumpList(res);
    });
  }, [wallet.isInit]);

  return (
    <Card className="next-card">
      <CardBody>
        {/* <div className="flex">
          <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "meme"}
            className={
              launchpad.currentLaunchpadType.value === "meme"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.currentLaunchpadType.setValue("meme");
              launchpad.participatedPairs.reloadPage();
            }}
          >
            MEME
          </NextButton>
        </div>{" "} */}
        <Tabs>
          <Tab key="participated" title="Participated">
            {myProjects && (
              <Pagination
                paginationState={myProjects.participatedPairs}
                render={(project) => (
                  <LaunchCardV3
                    key={project.address}
                    pair={project}
                    action={<></>}
                  />
                )}
                classNames={{
                  base: "",
                  itemsContainer:
                    "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6",
                  item: "",
                }}
              />
            )}
          </Tab>
          <Tab key="can-claim" title="Can Claim">
            <div>
              {canClaimPot2PumpList.map((pair) => (
                <LaunchCardV3 key={pair.address} pair={pair} action={<></>} />
              ))}
            </div>
          </Tab>
          <Tab key="can-refund" title="Can Refund">
            <div>
              {canRefundPot2PumpList.map((pair) => (
                <LaunchCardV3 key={pair.address} pair={pair} action={<></>} />
              ))}
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
});

export default ParticipatedLaunches;
