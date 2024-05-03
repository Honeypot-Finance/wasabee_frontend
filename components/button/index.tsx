import { ButtonProps, Button as NextButton } from "@nextui-org/react";
import { useConnectModal } from "@rainbow-me/rainbowkit"
import clsx from "clsx"
import { useAccount } from "wagmi"

export const Button = ({children, className,isLoading, ...props}: {
    children: React.ReactNode
} & ButtonProps) => {
    const { openConnectModal, connectModalOpen} = useConnectModal()
    const { isConnected } = useAccount()
    const baseClassNames = clsx('flex h-[45px] justify-center items-center gap-2.5 self-stretch outline outline-[4px] outline-base [background:var(--Button-Gradient,linear-gradient(180deg,rgba(232,211,124,0.13)_33.67%,#FCD729_132.5%),#F7931A)] px-6 py-3 rounded-2xl hover:opacity-80 active:opacity-60', className)
    return isConnected ? <NextButton isLoading={isLoading} className={baseClassNames}  {...props}>{children}</NextButton> : <NextButton className={baseClassNames} isLoading={!!connectModalOpen} {...props} onClick={() => {
        openConnectModal?.()
    }}>Connect Wallet</NextButton>
}