import React, { useState } from 'react'
import { Button } from '../button'
import clsx from 'clsx'

type Props = {}

const ContentInfo = ({title, subTitle}: {title: string, subTitle: string}) => {
    return <div className=' flex flex-col gap-[10px] font-medium'>
      <div className='text-base leading-5'>{title}</div>
      <div className='text-[12px] leading-4 text-white/50'>{subTitle}</div>
    </div>
}

const TokenVesting = (props: Props) => {

  const [isEnabledVesting, setIsEnabledVesting] = useState<boolean>(true)
  const [isEnabledVestingCliff, setIsEnabledVestingCliff] = useState<boolean>(true)

  const handleToggleVesting = (value: boolean) => {
    setIsEnabledVesting(value)
  }

  const handleToggleVestingCliff = (value: boolean) => {
    setIsEnabledVestingCliff(value)
  }

  return (
    <div className='flex flex-col gap-9'>
      <div className='font-medium'>
        <div className='text-xl leading-[26px]'>Token Vesting</div>
        <div className='text-[12px] leading-4 text-white/50'>Token Vesting enables creators to choose a specific date in the future when Sale participants receive their tokens, rather than an immediate unlock.</div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-base leading-5 font-medium'>Do you want token vesting for your LBP ?</div>
        <div className='flex gap-5'>
          <div className={clsx('px-6 py-2 bg-[#3E2A0FC4] rounded-xl cursor-pointer', {
            "outline outline-1 -outline-offset-1 outline-[#F7931AA8]": !isEnabledVesting,
            "bg-[#865215]": isEnabledVesting
            })}
            onClick={() => handleToggleVesting(true)}>
            <span className={clsx('text-xl leading-[26px]', {"font-extrabold ": isEnabledVesting})}>Yes</span>
          </div>
          <div onClick={() => handleToggleVesting(false)} className={clsx('px-6 py-2 bg-[#3E2A0FC4] rounded-xl cursor-pointer', {"outline outline-1 -outline-offset-1 outline-[#F7931AA8]": isEnabledVesting,
            "bg-[#865215]": !isEnabledVesting
          })}>
            <span className={clsx('text-xl leading-[26px]', {"font-extrabold ": !isEnabledVesting})}>No</span>
          </div>
        </div>
      </div>
      {isEnabledVesting &&
        <>
          <div className='flex flex-col gap-[18px]'>
            <ContentInfo title={'1. Vesting Start Time'} subTitle={'Token Vesting enables creators to choose a specific date in the future when Sale participants receive their tokens, rather than an immediate unlock.'} />
            <div className='flex flex-col gap-2 font-medium'>
              <div className='text-[12px] leading-4  text-white/50'>Vesting Start Time</div>
              <div className='text-base leading-5'>Oct 31,2024-12:00 AM</div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <ContentInfo title='2.Vesting Cliff Time' subTitle='The cliff start represents when the tokens are first unlocked. The % of tokens unlocked here depends on the time of the LBP and how long you set your vesting for. if you select no for cliff times, tokens will be automatically streamed from the start time.'/>
            <div className='flex gap-5'>
          <div className={clsx('px-6 py-2 bg-[#3E2A0FC4] rounded-xl cursor-pointer', {
            "outline outline-1 -outline-offset-1 outline-[#F7931AA8]": !isEnabledVesting,
            "bg-[#865215]": isEnabledVestingCliff
            })}
            onClick={() => handleToggleVestingCliff(true)}>
            <span className={clsx('text-xl leading-[26px]', {"font-extrabold ": isEnabledVestingCliff})}>Yes</span>
          </div>
          <div onClick={() => handleToggleVestingCliff(false)} className={clsx('px-6 py-2 bg-[#3E2A0FC4] rounded-xl cursor-pointer', {"outline outline-1 -outline-offset-1 outline-[#F7931AA8]": isEnabledVesting,
            "bg-[#865215]": !isEnabledVestingCliff
          })}>
            <span className={clsx('text-xl leading-[26px]', {"font-extrabold ": !isEnabledVestingCliff})}>No</span>
          </div>
        </div>
          </div>
          <div className='flex flex-col gap-2'>
            <ContentInfo title='3. Vesting End Time' subTitle='Token are automatically streamed and linearly vested to the buyers wallet from the moment the vesting start time begins, to the vesting end time selected here.'/>
            <div className='flex gap-5'>
          <div className={clsx('px-6 py-2 bg-[#3E2A0FC4] rounded-xl cursor-pointer', {
            "outline outline-1 -outline-offset-1 outline-[#F7931AA8]": !isEnabledVesting,
            "bg-[#865215]": isEnabledVestingCliff
            })}
            onClick={() => handleToggleVestingCliff(true)}>
            <span className={clsx('text-xl leading-[26px]', {"font-extrabold ": isEnabledVestingCliff})}>Yes</span>
          </div>
          <div onClick={() => handleToggleVestingCliff(false)} className={clsx('px-6 py-2 bg-[#3E2A0FC4] rounded-xl cursor-pointer', {"outline outline-1 -outline-offset-1 outline-[#F7931AA8]": isEnabledVesting,
            "bg-[#865215]": !isEnabledVestingCliff
          })}>
            <span className={clsx('text-xl leading-[26px]', {"font-extrabold ": !isEnabledVestingCliff})}>No</span>
          </div>
        </div>
          </div>
        </>
      }
    </div>
  )
}

export default TokenVesting