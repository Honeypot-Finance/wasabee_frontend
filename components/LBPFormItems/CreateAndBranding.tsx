import React from 'react'
import { ItemSelect } from '../ItemSelect'
import InputField from './Components/InputField'
import { Button } from '../button'
import SelectField from './Components/SelectField'
import { SelectItem } from '@nextui-org/react'

const EcosystemData = [
    {key: "ethereum", value: 1, label: "Ethereum",},
    {key: "ethereum1", value: 2, label: "Ethereum",},
    {key: "ethereum3", value: 3, label: "Ethereum",},
]

const TargetNetwordData = [{}]

const CreateAndBranding = () => {
  return (
    <div>
        <div className='font-medium'>
            <div className='text-xl'>Select Network & Add Token Information</div>
            <div className='text-sm'>Select the blockchain you would like to create a Token Sale on and enter your project token details.</div>
        </div>
        <div className='mt-[38px] flex flex-col gap-9'>
            <SelectField label='1. Ecosystem' items={EcosystemData}>
                {EcosystemData.map((ecosystem) => <SelectItem key={ecosystem.key} value={ecosystem.value} >
                    {ecosystem.label}
                </SelectItem>)}
            </SelectField>
            <div>
                <SelectField label='2. Select Target Network' children={undefined}/>
                <div></div>
            </div>
            <InputField label='3. Project Token' placeholder='Enter token'/>
            <InputField label='4. Project Token Logo'/>
            <InputField label='5. Sale Banner'/>
        </div>
        <Button className='mt-14 !outline-none border-none ring-0'>
            <span className='font-semibold text-base'>Continue to Sales Structure</span>
        </Button>
    </div>
  )
}

export default CreateAndBranding