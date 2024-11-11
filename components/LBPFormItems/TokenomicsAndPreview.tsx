import React from "react";
import { InputField, NumberField } from "./Components";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import SearchIcon from "../svg/SearchIcon";
import { berachainBartioTestnetNetwork } from "@/services/chain";

const AssetTokenModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const [searchValue, setSearchValue] = React.useState("");

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

  return (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer bg-[#865215] w-fit px-3 py-1 rounded-md"
        onClick={onOpen}
      >
        <Image
          src={selectedToken?.logoURI || ""}
          alt="Asset token"
          width={18}
          height={18}
        />
        <span className="text-sm text-nowrap">{selectedToken?.name}</span>
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
                    onSelectionChange={(value) => {
                      return field.onChange(
                        (value as Set<string>).values().next().value
                      );
                    }}
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
    watch,
  } = useFormContext();

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
              placeholder=" "
              isInvalid={!!errors.projectTokenQuantity}
              errorMessage={errors.projectTokenQuantity?.message?.toString()}
              className="max-w-[400px]"
              startContent={
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/usdc.png"
                    alt="Project token"
                    width={18}
                    height={18}
                  />
                  <span className="text-sm">USDC</span>
                </div>
              }
              classNames={{
                input: "text-right flex-1",
              }}
              description={
                <div className="text-[10px] text-white/50 px-4 flex items-center justify-between">
                  <span>Use Max</span>
                  <span>% supply: 0.000000003930187014%</span>
                </div>
              }
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
              placeholder=" "
              isInvalid={!!errors.projectTokenQuantity}
              errorMessage={errors.projectTokenQuantity?.message?.toString()}
              className="max-w-[400px]"
              startContent={<AssetTokenModal />}
              classNames={{
                input: "text-right flex-1",
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default TokenomicsAndPreview;
