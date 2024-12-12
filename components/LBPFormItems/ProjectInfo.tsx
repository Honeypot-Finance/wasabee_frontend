/* eslint-disable @next/next/no-img-element */
import {
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import SelectField from "./Components/SelectField";
import clsx from "clsx";
import InputField from "./Components/InputField";
import { PROJECT_CATEGORY_TYPE } from "@/types/launch-project";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import SearchIcon from "../svg/SearchIcon";
import COUNTRY_LIST from "./data.json";
import CloseIcon from "../svg/CloseIcon";
import { NumberField } from "./Components";
import Markdown from "markdown-to-jsx";
import classes from "./github-markdown.module.css";

const PROJECT_CATEGORY_OPTIONS = [
  { key: "gaming", value: PROJECT_CATEGORY_TYPE.GAMING, label: "Gaming" },
  { key: "crypto", value: PROJECT_CATEGORY_TYPE.CRYPTO, label: "Crypto" },
  { key: "finance", value: PROJECT_CATEGORY_TYPE.FINANCE, label: "Finance" },
];

type GeoBlockedCountriesModalProps = {};

const GeoBlockedCountriesModal = (props: GeoBlockedCountriesModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const selectedCountry = watch("blockedCountry");
  const [selectedCountries, setSelectedCountries] = useState(
    new Set<string>([...selectedCountry])
  );

  const [searchValue, setSearchValue] = React.useState("");

  const filteredList = COUNTRY_LIST.filter((token) =>
    token.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleClose = () => {
    setValue("blockedCountry", Array.from(selectedCountries));
  };
  return (
    <>
      <button
        type="button"
        className="text-lg leading-6 uppercase font-extrabold text-white bg-[#865215] rounded-full py-2 px-4"
        onClick={onOpen}
      >
        + Add
      </button>
      <Modal
        classNames={{
          base: "bg-[#35230E] border-[#F7931A4D] border",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleClose}
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
                    selectedKeys={selectedCountries}
                    onSelectionChange={(keys) =>
                      setSelectedCountries(keys as Set<string>)
                    }
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
                          <img
                            src={token.image}
                            alt={token.name}
                            width={18}
                            height={18}
                          />
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
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext();
  console.log("😻 ~ ProjectInfo ~ errors:", errors);

  const {
    fields: investmentRoundFields,
    append: investmentRoundAppend,
    remove: investmentRoundRemove,
  } = useFieldArray({
    control,
    name: `investmentRound`,
  });

  const handleTabChange = (tab: "edit" | "preview") => {
    setActiveTab(tab);
  };

  const handleRemoveCountry = (countryCode: string) => {
    setValue(
      "blockedCountry",
      getValues("blockedCountry").filter((item: string) => item !== countryCode)
    );
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
        {/* <div>
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
        </div> */}
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
                    description={field.value?.length + "/1000"}
                    placeholder="Enter Description"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    isInvalid={!!errors?.lbpDescription}
                    errorMessage={errors?.lbpDescription?.message?.toString()}
                  />
                )}
              />
            )}

            {activeTab === "preview" && (
              <div className="py-[10px] px-[14px] border border-[#F7931AA8] rounded-xl bg-[#3E2A0FC4]">
                <div className={classes.markdownBody}>
                  <Markdown>{getValues("lbpDescription")}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="text-base leading-5 font-medium">Links</div>
          <div>
            <div className="text-xs leading-4 font-medium text-white/50 mt-1.5 mb-2">
              X Link
            </div>
            <Controller
              name="xlink"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder="Paste URL here"
                  isInvalid={!!errors?.X}
                  errorMessage={errors?.X?.message?.toString()}
                  className="max-w-[400px]"
                />
              )}
            />
          </div>
          <div>
            <div className="text-xs leading-4 font-medium text-white/50 mt-1.5 mb-2">
              Website Link
            </div>
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder="Paste URL here"
                  isInvalid={!!errors?.website}
                  errorMessage={errors?.website?.message?.toString()}
                  className="max-w-[400px]"
                />
              )}
            />
          </div>{" "}
          <div>
            <div className="text-xs leading-4 font-medium text-white/50 mt-1.5 mb-2">
              Telegram Link
            </div>
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder="Paste URL here"
                  isInvalid={!!errors?.telegram}
                  errorMessage={errors?.telegram?.message?.toString()}
                  className="max-w-[400px]"
                />
              )}
            />
          </div>
        </div>
        {/* <div>
          <div className="flex items-center gap-[18px]">
            <div className="text-base leading-5 font-medium">
              Geo-blocked Countries
            </div>
            <GeoBlockedCountriesModal />
          </div>
          <div className="py-[10px] px-[14px] border border-[#F7931AA8] rounded-xl bg-[#3E2A0FC4]  mt-2">
            <div className="max-h-40 overflow-auto flex flex-wrap gap-2">
              {COUNTRY_LIST.filter((item) =>
                getValues("blockedCountry").includes(item.code)
              ).map((country) => (
                <div
                  key={country.code}
                  className="flex items-center gap-2 bg-[#865215] px-3.5 py-2.5 rounded-full"
                >
                  <span>{country.name}</span>
                  <button onClick={() => handleRemoveCountry(country.code)}>
                    <CloseIcon className="size-4 bg-white/20 rounded-full p-0.5 hover:opacity-60 " />
                  </button>
                </div>
              ))}
              {getValues("blockedCountry").length === 0 && (
                <div className="text-white/50">No country selected</div>
              )}
            </div>
          </div>
        </div> */}
        {/* <div>
          <div className="flex items-center gap-[18px]">
            <div className="text-base leading-5 font-medium">
              Previous Investment Round Details
            </div>
            <button
              type="button"
              className="text-lg leading-6 font-extrabold text-white bg-[#865215] rounded-full py-2 px-4"
              onClick={() => investmentRoundAppend({})}
            >
              + Add Round
            </button>
          </div>
          <div className="mt-3">
            {investmentRoundFields.map((round, idx) => (
              <div key={round.id} className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-base leading-5 font-medium">
                    Round {idx + 1}
                  </span>
                  <button onClick={() => investmentRoundRemove(idx)}>
                    <CloseIcon className="size-5 bg-red-500/50 rounded-full p-0.5 hover:opacity-60 " />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-2">
                  <Controller
                    name={`investmentRound.${idx}.raiseAmount`}
                    control={control}
                    render={({ field }) => (
                      <NumberField
                        label="Raised Amount"
                        placeholder="0"
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(Number(values.floatValue))
                        }
                        isInvalid={
                          !!(errors as any)?.investmentRound?.[idx]?.raiseAmount
                        }
                        errorMessage={
                          (errors as any)?.investmentRound?.[idx]?.raiseAmount
                            ?.message
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`investmentRound.${idx}.valuationOfRound`}
                    control={control}
                    render={({ field }) => (
                      <NumberField
                        label="Valuation Of Round"
                        placeholder="0"
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(Number(values.floatValue))
                        }
                        isInvalid={
                          !!(errors as any)?.investmentRound?.[idx]
                            ?.valuationOfRound
                        }
                        errorMessage={
                          (errors as any)?.investmentRound?.[idx]
                            ?.valuationOfRound?.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name={`investmentRound.${idx}.tgePercentage`}
                    control={control}
                    render={({ field }) => (
                      <NumberField
                        label="TGE%"
                        placeholder="0"
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(Number(values.floatValue))
                        }
                        isInvalid={
                          !!(errors as any)?.investmentRound?.[idx]
                            ?.tgePercentage
                        }
                        errorMessage={
                          (errors as any)?.investmentRound?.[idx]?.tgePercentage
                            ?.message
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`investmentRound.${idx}.supplySoldRound`}
                    control={control}
                    render={({ field }) => (
                      <NumberField
                        label="% of Supply Sold in Round"
                        placeholder="0"
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(Number(values.floatValue))
                        }
                        isInvalid={
                          !!(errors as any)?.investmentRound?.[idx]
                            ?.supplySoldRound
                        }
                        errorMessage={
                          (errors as any)?.investmentRound?.[idx]
                            ?.supplySoldRound?.message
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`investmentRound.${idx}.vestingLengthTime`}
                    control={control}
                    render={({ field }) => (
                      <NumberField
                        label="Vesting Length (Seconds)"
                        placeholder="0"
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(Number(values.floatValue))
                        }
                        isInvalid={
                          !!(errors as any)?.investmentRound?.[idx]
                            ?.vestingLengthTime
                        }
                        errorMessage={
                          (errors as any)?.investmentRound?.[idx]
                            ?.vestingLengthTime?.message
                        }
                      />
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectInfo;
