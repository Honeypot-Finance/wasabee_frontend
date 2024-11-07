import Image from 'next/image'
import React from 'react'
import { Button } from '../button'

type Props = {}

const SocialsAndCommunity = (props: Props) => {
  return (
    <div>
      <div className='font-medium'>
        <div className='text-xl leading-[26px]'>Social Media</div>
        <div className='text-[12px] leading-4 text-white/50'>Connect your social media to coninue. (Twitter is mandatory)</div>
      </div>
      <div className='mt-[38px]'>
        <div className='text-[12px] leading-4 text-white/50'>Required</div>
        <div className='flex items-center p-1 bg-[#3E2A0FC4] w-fit rounded-xl border border-[#F7931AA8] mt-1'>
          <div className='ml-4 flex gap-2'>
            <Image src="/images/x-icon.png" alt='x icon' width={19} height={17}/>
            <div className='text-sm font-normal'>X (Twitter)</div>
          </div>
          <Button styleMode='plain' className='border-0 outline-0 ml-4 h-10'><span className='text-sm font-normal '>Connect</span></Button>
        </div>
      </div>
      <div className='flex gap-9 mt-[50px]'>
      <Button className='outline-0 border-0 '>Back</Button>
      <Button className='outline-0 border-0 '>Continue to Confirm</Button>
    </div>
    </div>
  )
}

export default SocialsAndCommunity