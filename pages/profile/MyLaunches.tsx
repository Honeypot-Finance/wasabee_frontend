import { LaunchCardV3 } from "@/components/LaunchCard/v3";
import launchpad from "@/services/launchpad";
import { Pot2PumpService } from "@/services/launchpad/pot2pump";
import { wallet } from "@/services/wallet";
import { Card, CardBody, Button as NextButton } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination/Pagination";

export const MyLaunches = observer(() => {
  const [myProjects, setMyProjects] = useState<Pot2PumpService>();

  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }
    const newPumpingProjects = new Pot2PumpService();
    setMyProjects(newPumpingProjects);
    newPumpingProjects.myLaunches.reloadPage();
  }, [wallet.isInit]);

  return (
    <Card className="next-card">
      <CardBody>
        <div className="flex">
          {/* <NextButton
              isDisabled={launchpad.currentLaunchpadType.value === "fto"}
              className={
                launchpad.currentLaunchpadType.value === "fto"
                  ? "opacity-100"
                  : "opacity-50"
              }
              onClick={() => {
                launchpad.setCurrentLaunchpadType("fto");
                launchpad.myLaunches.reloadPage();
              }}
            >
              FTO
            </NextButton> */}
          <NextButton
            isDisabled={launchpad.currentLaunchpadType.value === "meme"}
            className={
              launchpad.currentLaunchpadType.value === "meme"
                ? "opacity-100"
                : "opacity-50"
            }
            onClick={() => {
              launchpad.setCurrentLaunchpadType("meme");
              launchpad.myLaunches.reloadPage();
            }}
          >
            MEME
          </NextButton>
        </div>
        {myProjects && (
          <Pagination
            paginationState={myProjects.myLaunches}
            render={(project) => (
              <LaunchCardV3
                key={project.address}
                pair={project}
                action={<></>}
              />
            )}
            classNames={{
              base: "",
              itemsContainer: "grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6",
              item: "",
            }}
          />
        )}
      </CardBody>
    </Card>
  );
});

export default MyLaunches;
