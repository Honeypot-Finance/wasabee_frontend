import { InputProps, Input as NextInput } from '@nextui-org/react';
import clsx from 'clsx';
export const Input = ({className, classNames, ...props}: InputProps) => {
    return <NextInput className={clsx('',className)}  classNames={{
        inputWrapper: clsx("bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:!bg-transparent", classNames?.inputWrapper),
        ...classNames
      }}
      fullWidth
      isClearable={true} {...props}/>;
}
