/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { InputField, NumberField, SliderField } from "./Components";
import { Controller, useFormContext } from "react-hook-form";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  Listbox,
  ListboxItem,
  Switch,
  Selection,
} from "@nextui-org/react";
import SearchIcon from "../svg/SearchIcon";
import { berachainBartioTestnetNetwork } from "@/services/chain";
import Image from "next/image";
import { useReadContract } from "wagmi";
import { ERC20ABI } from "@/lib/abis/erc20";

type AssetTokenData = {
  tokenName: string;
  tokenIcon: string;
};

const AssetTokenModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchValue, setSearchValue] = React.useState("");

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const listToken = Object.keys(
    berachainBartioTestnetNetwork.validatedTokensInfo
  ).map((address) => ({
    addr: address,
    ...berachainBartioTestnetNetwork.validatedTokensInfo[address],
  }));

  const filteredList = listToken.filter((token) =>
    token.symbol.toLowerCase().includes(searchValue.toLowerCase())
  );

  const selectedToken = listToken.find(
    (item) => item.symbol === watch("assetTokenType")
  );

  const handleSelect = (value: Selection) => {
    const assetTokenType = (value as Set<string>).values().next().value;
    const selectedToken = listToken.find(
      (item) => item.symbol === assetTokenType
    );
    setValue("assetTokenType", assetTokenType);
    setValue("assetTokenName", selectedToken?.name);
    setValue("assetTokenLogo", selectedToken?.logoURI);
  };

  return (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer bg-[#865215] w-fit px-3 py-1 rounded-md"
        onClick={onOpen}
      >
        {selectedToken ? (
          <>
            <img
              src={selectedToken?.logoURI}
              alt="Asset token"
              width={18}
              height={18}
            />
            <span className="text-sm text-nowrap">{selectedToken?.name}</span>
          </>
        ) : (
          <span className="text-sm text-white">Select Token</span>
        )}
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
              Token Selector
            </h3>
            <p className="mt-4 text-xs text-white/55 text-center">
              Select a token
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
                name="assetTokenType"
                control={control}
                render={({ field }) => (
                  <Listbox
                    aria-label="Token Selector"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={new Set([field.value])}
                    onSelectionChange={handleSelect}
                    className="bg-[#37250E] p-2 rounded-md"
                  >
                    {filteredList.map((token) => (
                      <ListboxItem
                        key={token.symbol}
                        className="hover:bg-primary/10"
                        classNames={{
                          base: "data-[selected=true]:bg-primary/10",
                          selectedIcon: "text-emerald-400 font-semibold",
                        }}
                        textValue={token.symbol}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={token.logoURI}
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

const TokenomicsAndPreview = () => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext();

  const projectTokenLogo = getValues("projectTokenLogo");
  const isCustomTotalSupply = getValues("customTotalSupplyType");
  const assetTokenName = getValues("assetTokenName");
  const assetTokenLogo = getValues("assetTokenLogo");

  const { data: projectTokenName, isLoading } = useReadContract({
    abi: ERC20ABI,
    address: getValues("projectToken"),
    functionName: "name",
  });

  return (
    <div>
      <div className="text-xl leading-[26px] font-medium">
        LBP Configuration
      </div>
      <div className="flex flex-col gap-5 mt-9">
        <h3 className="text-base font-medium text-white">
          1. Configure Quantities
        </h3>

        <Controller
          name="projectTokenQuantity"
          control={control}
          render={({ field }) => (
            <NumberField
              value={field.value}
              onValueChange={(values) =>
                field.onChange(Number(values.floatValue))
              }
              label="Project Token"
              placeholder="0"
              isInvalid={!!errors.projectTokenQuantity}
              errorMessage={errors.projectTokenQuantity?.message?.toString()}
              className="max-w-[400px]"
              startContent={
                <div className="flex items-center gap-1">
                  <img
                    src={projectTokenLogo}
                    alt={projectTokenName}
                    width={18}
                    height={18}
                  />
                  <span className="text-sm">{projectTokenName}</span>
                  {isLoading && (
                    <span className="h-2.5 w-8 bg-neutral-400 rounded-full animate-pulse"></span>
                  )}
                </div>
              }
              classNames={{
                input: "text-right flex-1",
              }}

              // description={
              //   <div className="text-[10px] text-white/50 px-4 flex items-center justify-between">
              //     <span>Use Max</span>
              //     <span>% supply: 0.000000003930187014%</span>
              //   </div>
              // }
            />
          )}
        />

        <Controller
          name="assetTokenQuantity"
          control={control}
          render={({ field }) => (
            <NumberField
              value={field.value}
              onValueChange={(values) =>
                field.onChange(Number(values.floatValue))
              }
              label="Asset Token"
              placeholder="0"
              isInvalid={!!errors.assetTokenQuantity}
              errorMessage={errors.assetTokenQuantity?.message?.toString()}
              className="max-w-[400px]"
              startContent={<AssetTokenModal />}
              classNames={{
                input: "text-right flex-1",
              }}
            />
          )}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <label className="text-xs text-white/50">Custom Total Supply</label>
            <Controller
              name="customTotalSupplyType"
              control={control}
              render={({ field }) => (
                <Switch
                  size="sm"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-[#865215]",
                    thumb: "bg-[#ECC94E]",
                  }}
                  isSelected={field.value}
                  onValueChange={(isSelected) => field.onChange(isSelected)}
                />
              )}
            />
          </div>

          {isCustomTotalSupply && (
            <Controller
              name="customTotalSupply"
              control={control}
              render={({ field }) => (
                <NumberField
                  value={field.value}
                  onValueChange={(values) =>
                    field.onChange(Number(values.floatValue))
                  }
                  placeholder="0"
                  isInvalid={!!errors.customTotalSupply}
                  errorMessage={errors.customTotalSupply?.message?.toString()}
                  className="max-w-[400px]"
                />
              )}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-12">
        <h3 className="text-base font-medium text-white">
          2. Configure Weights
        </h3>

        <Controller
          name="startWeight"
          control={control}
          render={({ field }) => (
            <SliderField
              label="Start Weight"
              firstTokenName={projectTokenName}
              firstTokenIcon={projectTokenLogo}
              secondTokenName={assetTokenName}
              secondTokenIcon={assetTokenLogo}
              value={field.value}
              onChange={(value) => field.onChange(Number(value))}
            />
          )}
        />

        <Controller
          name="endWeight"
          control={control}
          render={({ field }) => (
            <SliderField
              label="End Weight"
              firstTokenName={projectTokenName}
              firstTokenIcon={projectTokenLogo}
              secondTokenName={assetTokenName}
              secondTokenIcon={assetTokenLogo}
              value={field.value}
              onChange={(value) => field.onChange(Number(value))}
            />
          )}
        />
      </div>
    </div>
  );
};

export default TokenomicsAndPreview;
