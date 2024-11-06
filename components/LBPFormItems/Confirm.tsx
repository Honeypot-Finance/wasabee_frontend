import React from 'react'

type Props = {}

const SummaryItem = ({title, value}: {title: string, value: string}) => {
    return (
        <div className='flex flex-col items-start gap-1'>
            <div className='text-[12px] leading-4 font-medium'>{title}</div>
            <div className='text-[12px] leading-4 font-medium'>{value}</div>
        </div>
    )
}

const data = [
    {
        title: "Swap Fee",
        value: "2%"
    },
    {
        title: "Platform Fee",
        value: "3%"
    },
    {
        title: "Project Token Quantity",
        value: "1USDC"
    },
    {
        title: "Collateral Token Quantity",
        value: "10M DAI"
    },
    {
        title: "Start Time",
        value: "10/24/2024, 12:00 AM"
    },
    {
        title: "End Time",
        value: "10/31/2024, 12:00 AM"
    },
    {
        title: "Duration",
        value: "7 days"
    },
]

const Confirm = (props: Props) => {
  return (
    <div>
            <div className='text-xl font-medium'>Quick Summary</div>
            <div className='mt-3 flex flex-wrap gap-8 p-[10px]'>
                {data.map(d => <SummaryItem title={d.title} value={d.value} key={d.value}/>)}
            </div>
    </div>
  )
}

export default Confirm