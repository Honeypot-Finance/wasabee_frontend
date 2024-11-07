import { Select } from '@nextui-org/react'
import clsx from 'clsx'
import React from 'react'

type Props = {
    label?: string
    items?:Iterable<object>
    children: any
    className?: string
}

const SelectField = ({label, items, className,children}: Props) => {
  return (
    <div className='flex flex-col gap-2 w-fit'>
        <div className='font-medium text-base leading-5'>
            {label}
        </div>
            <Select size='md' classNames={{
                base: "bg-[#3E2A0FC4] rounded-xl border",
                mainWrapper: 'bg-[#3E2A0FC4] rounded-xl',
                innerWrapper: "bg-[#3E2A0FC4] rounded-xl",
                trigger: "bg-[#3E2A0FC4] rounded-xl data-[hover=true]:bg-[#3E2A0FC4]",
                listboxWrapper: "bg-[#3E2A0FC4]"
            }}
                className={clsx('min-w-32', className)}
                items={items}
            >
                {children}
            </Select>
    </div>
  )
}

export default SelectField