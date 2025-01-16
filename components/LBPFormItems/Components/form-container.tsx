import { cn } from '@/lib/utils'
import React, { HTMLProps, PropsWithChildren } from 'react'

interface FormContainerProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> { }

function FormContainer({ children, ...props }: FormContainerProps) {
   return (
      <div  {...props} className={`p-10 bg-white rounded-3xl border border-dashed border-black ${props.className}`}>{children}</div>
   )
}

export default FormContainer