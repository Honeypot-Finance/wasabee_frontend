import { InputProps, Input as NextInput } from '@nextui-org/react';
import clsx from 'clsx';
export const Input = ({className, ...props}: InputProps) => {
    return <NextInput className={clsx('',className)} {...props}/>;
}
