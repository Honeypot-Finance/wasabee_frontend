import React, { HTMLProps, PropsWithChildren } from 'react'

interface FormContainerProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> { }

function FormContainer({ children, ...props }: FormContainerProps) {
   return (
      <div  {...props} className={`mt-[24px] p-10 bg-white rounded-3xl border border-dashed border-black ${props.className}`}>{children}</div>
   )
}

export default FormContainer