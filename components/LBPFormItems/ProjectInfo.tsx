/* eslint-disable @next/next/no-img-element */
import {
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  Selection,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import SelectField from "./Components/SelectField";
import clsx from "clsx";
import InputField from "./Components/InputField";
import { Button } from "../button";
import { PROJECT_CATEGORY_TYPE } from "@/types/launch-project";
import { Controller, useFormContext } from "react-hook-form";
import SearchIcon from "../svg/SearchIcon";
import COUNTRY_LIST from "./data.json";

const PROJECT_CATEGORY_OPTIONS = [
  { key: "gaming", value: PROJECT_CATEGORY_TYPE.GAMING, label: "Gaming" },
  { key: "crypto", value: PROJECT_CATEGORY_TYPE.CRYPTO, label: "Crypto" },
  { key: "finance", value: PROJECT_CATEGORY_TYPE.FINANCE, label: "Finance" },
];

type GeoBlockedCountriesModalProps = {};

const GeoBlockedCountriesModal = (props: GeoBlockedCountriesModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchValue, setSearchValue] = React.useState("");

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const filteredList = COUNTRY_LIST.filter((token) =>
    token.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (value: Selection) => {
    const countryList = Array.from(value).map((item) => item.toString());
    setValue("blockedCountry", countryList);
  };

  return (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer bg-[#865215] w-fit px-3 py-1 rounded-md"
        onClick={onOpen}
      >
        Add
      </div>
      <Modal
        classNames={{
          base: "bg-[#35230E] border-[#F7931A4D] border",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          <ModalBody className="py-5 px-2.5">
            <h3 className="text-base font-medium text-center">
              Select a Country
            </h3>
            <p className="mt-4 text-xs text-white/55 text-center">
              Selected countries will be blocked from access your Sale.
            </p>
            <InputField
              placeholder="Search"
              className="w-full mt-4 rounded-md"
              startContent={<SearchIcon />}
              classNames={{
                input: "pl-6 pt-0.5 font-medium ",
              }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="overflow-y-auto h-48">
              <Controller
                name="blockedCountry"
                control={control}
                render={({ field }) => (
                  <Listbox
                    aria-label="Select a Country"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="multiple"
                    selectedKeys={new Set([...field.value])}
                    onSelectionChange={handleSelect}
                    className="bg-[#37250E] p-2 rounded-md"
                  >
                    {filteredList.map((token) => (
                      <ListboxItem
                        key={token.code}
                        className="hover:bg-primary/10"
                        classNames={{
                          base: "data-[selected=true]:bg-primary/10",
                          selectedIcon: "text-emerald-400 font-semibold",
                        }}
                        textValue={token.name}
                      >
                        <div className="flex items-center gap-3">
                          <img src={token.image} alt={token.name} width={32} />
                          <span className="pt-1">{token.name}</span>
                        </div>
                      </ListboxItem>
                    ))}
                  </Listbox>
                )}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const ProjectInfo = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const selectedCountry = watch("blockedCountry");
  console.log("😻 ~ ProjectInfo ~ selectedCountry:", selectedCountry);

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleTabChange = (tab: "edit" | "preview") => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="font-medium">
        <div className="text-xl leading-[26px]">Project Infomation</div>
        <div className="text-xs leading-4 text-white/50">
          Please Fill out Sale details.
        </div>
      </div>
      <div className="flex flex-col gap-9 mt-9">
        <div>
          <div className="text-base leading-5 font-medium">Category</div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectField
                items={PROJECT_CATEGORY_OPTIONS}
                className="w-44"
                selectedKeys={[field.value]}
                onChange={(e) => field.onChange(e.target.value)}
                isInvalid={!!errors.priceType}
                errorMessage={errors.priceType?.message?.toString()}
              >
                {PROJECT_CATEGORY_OPTIONS.map((price) => (
                  <SelectItem key={price.key} value={price.value}>
                    {price.label}
                  </SelectItem>
                ))}
              </SelectField>
            )}
          />
        </div>
        <div>
          <div className="text-base leading-5 font-medium">LBP Description</div>
          <div className="text-[12px] leading-4 font-medium text-white/50 mt-[6px]">
            Markdown support.
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex bg-[#3E2A0FC4] w-fit rounded-xl">
              <div
                onClick={() => handleTabChange("edit")}
                className={clsx(
                  "py-[10px] px-[25px] cursor-pointer rounded-s-xl text-base leading-5",
                  {
                    "bg-[#865215]": activeTab == "edit",
                    "outline outline-1 -outline-offset-1 outline-[#865215]":
                      activeTab == "preview",
                  }
                )}
              >
                Edit
              </div>
              <div
                onClick={() => handleTabChange("preview")}
                className={clsx(
                  "py-[10px] px-[25px] cursor-pointer  rounded-e-xl  text-base leading-5",
                  {
                    "bg-[#865215] ": activeTab == "preview",
                    "outline -outline-offset-1 outline-1 outline-[#865215]":
                      activeTab == "edit",
                  }
                )}
              >
                Preview
              </div>
            </div>
            {activeTab === "edit" && (
              <Controller
                name="lbpDescription"
                control={control}
                render={({ field }) => (
                  <Textarea
                    classNames={{
                      inputWrapper:
                        "bg-[#3E2A0FC4] data-[hover=true]:bg-[#3E2A0FC4] group-data-[focus=true]:bg-[#3E2A0FC4] border border-[#F7931AA8]",
                    }}
                    minRows={5}
                    description={field.value.length + "/1000"}
                    placeholder="Enter Description"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  />
                )}
              />
            )}
          </div>
        </div>
        <div>
          <div className="text-base leading-5 font-medium">Links</div>
          <div className="text-xs leading-4 font-medium text-white/50 mt-1.5 mb-2">
            Main Link*
          </div>
          <Controller
            name="projectLink"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                placeholder="Paste URL here"
                isInvalid={!!errors?.projectLink}
                errorMessage={errors?.projectLink?.message?.toString()}
                className="max-w-[400px]"
              />
            )}
          />
        </div>
        <div>
          <div className="flex items-center gap-[18px]">
            <div className="text-base leading-5 font-medium">
              Geo-blocked Countries
            </div>
            <GeoBlockedCountriesModal />
          </div>
          <div className="py-[10px] px-[14px] border border-[#F7931AA8] rounded-xl bg-[#3E2A0FC4] flex flex-wrap gap-2 mt-2">
            {COUNTRY_LIST.map((country) => (
              <div
                key={country.code}
                className="flex items-center gap-2 bg-[#865215] px-3.5 py-2.5 rounded-full"
              >
                {country.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-[18px]">
            <div className="text-base leading-5 font-medium">
              Previous Investment Round Details
            </div>
            <Button
              styleMode="plain"
              className="outline-0 border-0 rounded-full h-[40px]"
            >
              <span className="text-lg leading-5 font-extrabold">
                + Add Round
              </span>
            </Button>
          </div>
          <div className="mt-3">
            <div className="flex flex-col gap-2">
              <div className="text-base leading-5 font-medium">Round 1</div>
              <div className="flex gap-10">
                <InputField label="Raised Amount" placeholder="0" />
                <InputField label="Valuation Of Round" placeholder="0" />
              </div>
              <div className="flex gap-10">
                <InputField label="Raised Amount" placeholder="0" />
                <InputField label="Valuation Of Round" placeholder="0" />
              </div>
              <div className="flex gap-10">
                <div className="flex-1">
                  <InputField label="Raised Amount" placeholder="0" />
                </div>
                <div className="flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-9 mt-[50px]">
        <Button className="outline-0 border-0 ">Back</Button>
        <Button className="outline-0 border-0 ">
          Continue to Socials & Community
        </Button>
      </div>
    </div>
  );
};

export default ProjectInfo;
