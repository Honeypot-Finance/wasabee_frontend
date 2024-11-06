import CheckedIcon from '@/components/svg/CheckedIcon'
import ErrorIcon from '@/components/svg/ErrorIcon'
import React from 'react'

type Props = {
    placeholder?: string
    label?: string
    errorMessage?: string
    value?: string
}

const InputField = ({placeholder,label,errorMessage,value }: Props) => {
  return (
    <div className='flex flex-col max-w-[775px] w-full gap-2'>
        <div className='flex justify-between'>
            <label className='font-medium text-base leading-5'>{label}</label>     
            <span className='font-medium text-[12px] leading-4 text-[#D53F3F]'>{errorMessage}</span>                  
        </div>
        <div className='px-[14px] py-[10px] bg-[#3E2A0FC4] rounded-xl leading-5 outline outline-1 outline-[#F7931AA8] flex items-center gap-2'>
            <input className='w-full bg-transparent outline-none h-5 leading-5' placeholder={placeholder} value={value}/>
            {errorMessage && errorMessage.length > 0 && <ErrorIcon/>} 
            {value && <CheckedIcon/>}
        </div>
    </div>
  )
}

export default InputField