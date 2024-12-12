import { Tab, Tabs } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import MyAquaberaVaults from "./MyVaults";
import AllAquaberaVaults from "./AllVaults";

export function AquaberaList() {
  return (
    <div className="w-full">
      <Tabs
        classNames={{
          base: "w-full",
        }}
      >
        <Tab key={"all"} title="Vaults" className="w-full">
          <div className="flex flex-col xl:flex-row gap-4 w-full py-4">
            <AllAquaberaVaults />
          </div>
        </Tab>
        <Tab key={"my"} title="My Vaults" className="w-full">
          <div className="flex flex-col xl:flex-row gap-4 w-full py-4">
            <MyAquaberaVaults />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default AquaberaList;
