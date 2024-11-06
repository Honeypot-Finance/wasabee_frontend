import React from 'react'
import StepItem from './StepItem'

type Props = {
    data?: any[]
}

const Stepper = ({data}: Props) => {
  return (
    <div className='flex justify-center'>

    <div className='flex flex-col'>
        {data && data.map((item, index) => (
            <StepItem key={item.key} keyItem={item.key} title={item.title} isActive={item.isActive} isValidated={item.isValidated} stepNumber={index + 1} isShowDashes={index != 0}/>
        ))}
    </div>
    </div>
  )
}

export default Stepper