import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import {inter} from "@/components/Fonts"


type Props = {
    title: string
    isActive: boolean
    isValidated: boolean
    stepNumber: number
    keyItem: string
    isShowDashes: boolean
    handleClickItem?: (key: string) => void
}

const StepItem = ({title, isActive,isValidated, stepNumber, keyItem ,isShowDashes,handleClickItem}: Props) => {

    const handleClick = () => {
        if(handleClickItem){
            handleClickItem(keyItem)
        }
    }

  return (
    <div className='flex gap-7 items-end'>
    <div className='flex flex-col items-center justify-center'>
        {isShowDashes &&
        <div className={clsx('w-[3px] h-6 bg-[#938c86] my-3 rounded-full', {"!bg-[#FFCD4D]": isActive || isValidated})}/>
        }
            <div className={clsx("flex w-[42px] h-[42px] rounded-full bg-[#938c86] text-[#4a4643] relative items-center justify-center cursor-default", {
                "!bg-[#FFCD4D]": isValidated,
                "!text-white": isActive,
                "outline-[#FFCD4D] outline outline-2 -outline-offset-2": isActive,
                "cursor-pointer": isActive || isValidated
            })} onClick={handleClick}>
                {isValidated ? <Image
                    src="/images/checked.png"
                    alt='checked'
                    width={18}
                    height={12}
                /> : <span className='font-semibold text-2xl'>
                    {stepNumber}
                    </span>}
            </div>
    </div>
    <div className={'h-[42px] flex items-center'} >
        <span className={clsx('text-2xl font-semibold text-[#4a4643] cursor-default', inter.className,{
            "cursor-pointer": isActive || isValidated,
            "!text-white": isActive || isValidated
        })} onClick={handleClick}>
            {title}
        </span>
    </div>
    </div>
  )
}

export default StepItem