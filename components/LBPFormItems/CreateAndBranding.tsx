import React, { useEffect } from "react";
import { SelectItem } from "@nextui-org/react";
import { InputField, SelectField } from "./Components";
import { Controller, useFormContext } from "react-hook-form";
import EthereumIcon from "../svg/EthereumIcon";
import { useAccount, useReadContract } from "wagmi";
import { ERC20ABI } from "@/lib/abis/erc20";

const ECOSYSTEM_OPTIONS = [
  { key: "evm", value: 1, label: "EVM" },
  
];

const TARGET_NETWORK_OPTIONS = [
  { key: "berachain", value: 1, label: "Berachain", icon: <EthereumIcon /> },
];

const CreateAndBranding = () => {
  const {
    control,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useFormContext();

  const account = useAccount()

  const projectToken = watch('projectToken')

  const {data, refetch, isLoading} = useReadContract({
    abi: ERC20ABI,
    address: projectToken,
    functionName: 'balanceOf',
    args: [account.address!]
  })


  useEffect(() => {
    if(projectToken && !errors?.projectToken){
      console.log('refetching project')
      refetch()
    }
  }, [projectToken])

  if(data == undefined && projectToken && !errors?.projectToken && !isLoading){
    setError("projectToken", {message: "Invalid ERC20 address"})
  }

  // console.log(projectToken)
  return (
    <div>
      <div className="font-medium">
        <div className="text-xl">Select Network & Add Token Information</div>
        <div className="text-sm">
          Select the blockchain you would like to create a Token Sale on and
          enter your project token details.
        </div>
      </div>
      <div className="mt-[38px] flex flex-col gap-9">
        <Controller
          name="ecosystem"
          control={control}
          render={({ field }) => (
            <SelectField
              aria-label="1. Ecosystem"
              label="1. Ecosystem"
              items={ECOSYSTEM_OPTIONS}
              selectedKeys={[field.value]}
              onChange={(e) => field.onChange(e.target.value)}
              isInvalid={!!errors?.ecosystem}
              errorMessage={errors.ecosystem?.message?.toString()}
              isDisabled={true}
            >
              {ECOSYSTEM_OPTIONS.map((ecosystem) => (
                <SelectItem key={ecosystem.key} value={ecosystem.value}>
                  {ecosystem.label}
                </SelectItem>
              ))}
            </SelectField>
          )}
        />
        <div>
          <Controller
            name="targetNetwork"
            control={control}
            render={({ field }) => (
              <SelectField
                aria-label="2. Select Target Network"
                label="2. Select Target Network"
                items={TARGET_NETWORK_OPTIONS}
                renderValue={(items) => {
                  return items?.map((item) => (
                    <div key={item.key} className="flex items-center gap-4">
                      {item.data?.icon}
                      <span className="pt-0.5">{item.data?.label}</span>
                    </div>
                  ));
                }}
                selectedKeys={[field.value]}
                onChange={(e) => field.onChange(e.target.value)}
                isInvalid={!!errors?.targetNetwork}
                errorMessage={errors?.targetNetwork?.message?.toString()}
                isDisabled={true}
              >
                {(targetNetwork) => (
                  <SelectItem
                    key={targetNetwork.key}
                    value={targetNetwork.value}
                  >
                    <div className="flex items-center gap-4">
                      {targetNetwork.icon}
                      <span className="pt-1">{targetNetwork.label}</span>
                    </div>
                  </SelectItem>
                )}
              </SelectField>
            )}
          />
        </div>
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="3. Project Name"
              placeholder="Enter Project Name"
              isInvalid={!!errors?.projectName}
              errorMessage={errors?.projectName?.message?.toString()}
            />
          )}
        />
        <Controller
          name="projectToken"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="4. Project Token"
              placeholder="Enter token"
              isInvalid={!!errors?.projectToken}
              errorMessage={errors?.projectToken?.message?.toString()}
            />
          )}
        />
        <Controller
          name="projectTokenLogo"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="5. Project Token Logo"
              placeholder="Paste URL here"
              isInvalid={!!errors?.projectTokenLogo}
              errorMessage={errors?.projectTokenLogo?.message?.toString()}
            />
          )}
        />
        <Controller
          name="saleBanner"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="6. Sale Banner"
              placeholder="Paste URL here"
              isInvalid={!!errors?.saleBanner}
              errorMessage={errors?.saleBanner?.message?.toString()}
            />
          )}
        />
      </div>
    </div>
  );
};

export default CreateAndBranding;
