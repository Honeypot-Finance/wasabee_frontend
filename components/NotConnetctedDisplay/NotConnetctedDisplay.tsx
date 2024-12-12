import HoneyStickSvg from "../svg/HoneyStick";

export default function NotConnetctedDisplay() {
  return (
    <div className="w-full h-full min-h-[90vh] flex flex-col items-center relative">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
        <HoneyStickSvg />
        <div className="text-[#eee369] mt-2  text-[3rem] text-center">
          Please connect your wallet to continue
        </div>
      </div>
    </div>
  );
}
