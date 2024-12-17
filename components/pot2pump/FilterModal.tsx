import { Button as NextButton } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Pot2PumpPumpingService  } from "@/services/launchpad/pot2pump/pumping";
import { Pot2PumpPumpingService as Pot2PumpService } from "@/services/launchpad/pot2pump/pot2Pump";
import { Button } from "@/components/button/button-next";
import { FaSlidersH } from "react-icons/fa";

export interface FilterState {
  tvl: {
    min: string;
    max: string;
  };
  participants: {
    min: string;
    max: string;
  };
  search: string;
}

interface FilterProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  pumpingProjects?: Pot2PumpPumpingService | Pot2PumpService;
}

export const Filter = observer(
  ({ filters, setFilters, pumpingProjects }: FilterProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleInputChange = (
      category: "tvl" | "participants",
      type: "min" | "max",
      value: string
    ) => {
      setFilters({
        ...filters,
        [category]: {
          ...filters[category],
          [type]: value,
        },
      });
    };

    return (
      <>
        <Button className="!px-4" onClick={onOpen}>
          <FaSlidersH className="!text-black size-4" />
          {/* FIXME: display text */}
          {/* <span className="!text-black">Filters</span> */}
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            base: "bg-transparent",
            wrapper: "bg-transparent",
            closeButton:
              "absolute right-4 top-6 z-50 text-white w-8 h-8 flex items-center justify-center",
          }}
        >
          <ModalContent className="bg-[#FFCD4D] relative overflow-hidden">
            {(onClose) => (
              <>
                <div className="bg-[url('/images/pumping/outline-border.png')] h-[50px] absolute top-0 left-0 w-full bg-contain bg-[left_-90px_top] bg-repeat-x"></div>

                <ModalHeader className="pt-14 bg-[#FFCD4D]">
                  <h3 className="text-xl font-bold text-black">
                    Customize Filters
                  </h3>
                </ModalHeader>

                <ModalBody className="px-6 bg-[#FFCD4D]">
                  <div className="w-full rounded-[32px] bg-white space-y-4 px-4 py-6 custom-dashed">
                    <div className="flex flex-col gap-2">
                      <label className="text-black text-base font-medium">
                        TVL (USD)
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            placeholder="Min"
                            value={filters.tvl.min}
                            onChange={(e) =>
                              handleInputChange("tvl", "min", e.target.value)
                            }
                            className="w-full bg-white rounded-[16px] px-4 py-[18px] text-black outline-none border border-black shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] placeholder:text-black/50 text-base font-medium"
                          />
                        </div>
                        <div className="relative flex-1">
                          <input
                            type="number"
                            placeholder="Max"
                            value={filters.tvl.max}
                            onChange={(e) =>
                              handleInputChange("tvl", "max", e.target.value)
                            }
                            className="w-full bg-white rounded-[16px] px-4 py-[18px] text-black outline-none border border-black shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] placeholder:text-black/50 text-base font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-black text-base font-medium">
                        Participants Count
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            placeholder="Min"
                            value={filters.participants.min}
                            onChange={(e) =>
                              handleInputChange(
                                "participants",
                                "min",
                                e.target.value
                              )
                            }
                            className="w-full bg-white rounded-[16px] px-4 py-[18px] text-black outline-none border border-black shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] placeholder:text-black/50 text-base font-medium"
                          />
                        </div>
                        <div className="relative flex-1">
                          <input
                            type="number"
                            placeholder="Max"
                            value={filters.participants.max}
                            onChange={(e) =>
                              handleInputChange(
                                "participants",
                                "max",
                                e.target.value
                              )
                            }
                            className="w-full bg-white rounded-[16px] px-4 py-[18px] text-black outline-none border border-black shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] placeholder:text-black/50 text-base font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter className="pb-10 bg-[#FFCD4D]">
                  <Button
                    className="w-full"
                    onPress={() => {
                      if (pumpingProjects) {
                        pumpingProjects.projectsPage.updateFilter({
                          tvlRange: {
                            min: filters.tvl.min
                              ? Number(filters.tvl.min)
                              : undefined,
                            max: filters.tvl.max
                              ? Number(filters.tvl.max)
                              : undefined,
                          },
                          participantsRange: {
                            min: filters.participants.min
                              ? Number(filters.participants.min)
                              : undefined,
                            max: filters.participants.max
                              ? Number(filters.participants.max)
                              : undefined,
                          },
                        });
                      }
                      onClose();
                    }}
                  >
                    Apply
                  </Button>
                </ModalFooter>

                <div className="bg-[url('/images/pool-detail/bottom-border.svg')] bg-left-top h-6 absolute -bottom-1 left-0 w-full bg-contain"></div>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
);
