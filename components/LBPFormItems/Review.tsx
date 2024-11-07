import { Checkbox } from '@nextui-org/react'
import clsx from 'clsx'
import React from 'react'
import { Button } from '../button'

type Props = {}

const EditBtn = () => {
  return <div className='text-end text-white/50 text-[12px] leading-4 flex justify-end items-center gap-0.5' >
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path opacity="0.5" d="M11.6597 2.16094L9.84048 0.340328C9.62051 0.12036 9.32861 0 9.01871 0C8.70744 0 8.41553 0.12036 8.19695 0.340328L0.576934 7.95896C0.504994 8.0309 0.457957 8.12497 0.444123 8.22596L0.00418737 11.4701C-0.0151809 11.6154 0.0332397 11.7607 0.136998 11.863C0.225538 11.9516 0.344515 12 0.467641 12C0.488393 12 0.509145 11.9986 0.529896 11.9958L3.77407 11.5559C3.87507 11.5421 3.96914 11.495 4.04108 11.4231L11.6583 3.80586C11.8783 3.58589 11.9987 3.29398 11.9987 2.98409C12 2.67282 11.8797 2.38091 11.6597 2.16094ZM3.49185 10.6498L1.01272 10.9859L1.3489 8.5068L6.7471 3.1086L8.89005 5.25156L3.49185 10.6498ZM10.9984 3.14457L9.55134 4.59165L7.40977 2.4487L8.85547 1.00161C8.91357 0.94351 8.98136 0.935209 9.01733 0.935209C9.0533 0.935209 9.12109 0.94351 9.17919 1.00161L10.9984 2.82084C11.0565 2.87895 11.0648 2.94674 11.0648 2.98271C11.0648 3.01868 11.0565 3.08647 10.9984 3.14457Z" fill="white"/>
  </svg>
  Edit
  </div>
}

const Content = ({title, value, valueClassName}: {title: string, value: string, valueClassName?: string}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-base leading-5 font-medium'>{title}</div>
      <div className={clsx('font-medium text-[12px] leading-4 text-white/50', valueClassName)}>{value}</div>
    </div>
  )
}

const Review = (props: Props) => {
  return (
  <div className='flex flex-col gap-[38px] max-w-[752px]'>
    <div className='font-medium'>
      <div className='text-xl leading-[26px]'>Token Sale Summary</div>
      <div className='text-[12px] leading-4 text-white/50'>Please review all aspects before finishing</div>
    </div>
    <div className='flex flex-col gap-2'>
      <EditBtn/>      
      <Content title={'Project Token Contract Address'} value={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'}/>
      <div className='flex'>
        <div className='flex-1'><Content title={'Token Name'} value={'Token Ticker'} /></div>
        <div className='flex-1'><Content title={'Token Name'} value={'USDC'} /></div>
      </div>
    </div>
    <div className='flex flex-col gap-2'>
      <EditBtn/>
      <div className='flex gap-8' >
        <Content title={'Project Token Quantity'} value={'1USDC'} />
        <Content title={'Collateral Token Quantity'} value={'10M DAI '}/>
      </div>
      <div className='flex gap-8' >
        <Content title={'Price Range'} value={'$989,670,141.9 - $6,126,990.125806'} />
        <Content title={'Liquidity'} value={'$1'}/>
      </div>
      <div className='flex gap-8' >
        <Content title={'Starting Weigh'} value={'99% USDC 1% DAI'} />
        <Content title={'End Weight'} value={'38% USDC 62% DAI'}/>
      </div>
      <div className='flex gap-8' >
        <Content title={'Token Claim Time'} value={'2024/10/31 00:00:00'} />
      </div>
      <div className='flex gap-8' >
        <Content title={'Start Time'} value={'10/24/2024,12:00 AM'} />
        <Content title={'End Time Weight'} value={'10/31/2024,12:00 AM'}/>
        <Content title={'Duration'} value={'in7days'}/>
      </div>
      <div className='flex gap-8' >
        <Content title={'Platform Fee'} value={'3%'} />
      </div>
    </div>
    <div className='flex flex-col gap-2'>
      <EditBtn/>
      <Content title={'Description'} value={'123qweddddasd'} valueClassName='!text-white' />
      <div className='mt-[10px]'>
        <div className='text-base leading-5 font-medium '>Rights</div>
        <div className='flex flex-col gap-2 mt-2'>
          <Checkbox radius='none' >Pause LBP</Checkbox>
          <Checkbox radius='none' >Unpause LBP</Checkbox>
        </div>
      </div>
    </div>
    <div className='flex gap-9'>
      <Button className='outline-0 border-0 '>Back</Button>
      <Button className='outline-0 border-0 '>Continue to Confirm</Button>
    </div>
  </div>
  )
}

export default Review