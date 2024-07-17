import { cn } from "@/lib/tailwindcss";
import { ButtonProps, Button as NextButton } from "@nextui-org/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export const Button = ({
  children,
  className,
  isLoading,
  styleMode,
  ...props
}: {
  children: React.ReactNode;
  styleMode?: "plain" | "primary";
} & ButtonProps) => {
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { isConnected } = useAccount();
  styleMode = styleMode || "primary";
  const baseClassNames = cn(
    "flex h-[45px] font-bold text-[#000] justify-center items-center gap-2.5 self-stretch outline outline-[4px] outline-base [background:var(--Button-Gradient,linear-gradient(180deg,rgba(232,211,124,0.13)_33.67%,#FCD729_132.5%),#F7931A)] px-6 py-3 rounded-2xl hover:opacity-80 active:opacity-60",
    styleMode === "plain"
      ? " border-[color:var(--e-18-a-20,rgba(225,138,32,0.40))] [background:var(--e-18-a-20,rgba(225,138,32,0.40))] outline-0 backdrop-blur-[10px]  border-2 border-solid text-[#fff]"
      : "",
    className
  );
  return isConnected ? (
    <NextButton isLoading={isLoading} className={baseClassNames} {...props}>
      {children}
    </NextButton>
  ) : (
    <NextButton
      className={baseClassNames}
      isLoading={!!connectModalOpen}
      {...props}
      onClick={() => {
        openConnectModal?.();
      }}
    >
      Connect Wallet
    </NextButton>
  );
};
