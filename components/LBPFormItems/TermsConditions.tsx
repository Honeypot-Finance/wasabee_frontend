import {Checkbox } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../button'

type Props = {}

const TermsConditions = (props: Props) => {
  return (
    <div> 
      <div className='font-medium'>
        <div className='text-xl leading-[26px]'>Terms and Conditions</div>
        <div className='text-[12px] leading-4 text-white/50'>You must read and agree.</div>
      </div>
      <div className='mt-[10px]'>
        <Checkbox radius='none' size="sm" classNames={{
          label: "text-base leading-5"
        }}>I have read and understood the <Link href={'/'} target='_blank' className='underline text-[#ecc94e]'>Terms and Conditions.</Link></Checkbox>
      </div>
      <div className='flex items-center gap-9'>
        <Button className='outline-0 border-0 mt-[50px]'>Back</Button>
        <Button className='outline-0 border-0 mt-[50px]'>Continue to Confirm</Button>
      </div>
    </div>
  )
}

export default TermsConditions