import {
  InternalForwardRefRenderFunction,
  Progress,
  ProgressProps,
} from "@nextui-org/react";

interface Props extends ProgressProps {}

export function ProgressBar(props: Props) {
  console.log("ProgressBar", props);
  return <Progress {...props} />;
}

export default ProgressBar;
