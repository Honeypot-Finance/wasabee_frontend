import React from 'react'
import SelectField from './Components/SelectField'
import { SelectItem } from '@nextui-org/react'

type Props = {}

const PriceTypeData = [
    {key: 'lbp', value: "lbp", label: 'LBP'},
    {key: 'fixed', value: "fixed", label: 'Fixed Price'}
]

const LBPTypeData = [
    {key: 'buySell', value: "lbp", label: 'Buy & Sell'},
    {key: 'sellOnly', value: "lbp", label: 'Sell Only'}
]

const SalesStructure = (props: Props) => {
  return (
    <div>
        <div className='text-xl leading-[26px] font-medium'>Sales Structure</div>
        <div className='flex flex-col mt-9 gap-9'>
            <div className='flex flex-col'>
                    <div className='text-base leading-5 font-medium'>
                        Sale price type
                    </div>          
                    <div className='mt-2 font-medium text-[12px] leading-4 text-white/50'>Choose between an LBP or a Fixed Price Sale</div>          
                    <div className='flex flex-col gap-3 mt-5'>
                        <SelectField items={PriceTypeData} className='w-44' > 
                            {PriceTypeData.map((PriceType) => <SelectItem key={PriceType.key}>
                                {PriceType.label}
                            </SelectItem>)}
                        </SelectField>
                        <SelectField items={LBPTypeData} className='w-44'> 
                            {LBPTypeData.map((LBPType) => <SelectItem key={LBPType.key}>
                                {LBPType.label}
                            </SelectItem>)}
                        </SelectField>
                    </div>
            </div>
            <div className='flex flex-col'>
                <div className='text-base leading-5 font-medium'>
                    Configure Duration
                </div>        
                <div className='flex flex-col gap-5 mt-6'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default SalesStructure