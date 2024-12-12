import {
  InternalForwardRefRenderFunction,
  Progress,
  ProgressProps,
} from "@nextui-org/react";

interface Props extends ProgressProps {}

export function ProgressBar(props: Props) {
  return (
    <Progress
      classNames={{
        base: "relative",
        track: "bg-[#9D5E28] h-4",
        indicator: "bg-[#FFCD4D] h-4",
        label:
          "absolute top-0 left-0 w-full h-full flex items-end justify-center text-white text-xs text-center z-10",
      }}
      {...props}
    />
  );
}

export default ProgressBar;
