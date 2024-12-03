import O from "@/assets/pumping/outline-border.svg";
import Image from "next/image";

const IrregularBorder = () => {
  return (
    <div className="bg-[#FFCD4D] inline-block">
      <div
        className="w-[288px] h-80 bg-white overflow-hidden"
        style={{
          clipPath: `path('M0,60 C10,60 15,20 25,25 C30,20 45,70 50,55 C60,40 70,85 80,60 C85,35 90,65 100,50 C110,20 120,80 125,45 C130,30 140,75 150,60 C160,20 170,85 175,50 C180,40 190,70 200,55 C210,25 220,80 230,60 C240,35 250,75 260,50 C270,30 280,85 290,55 C300,40 310,80 320,50 C330,20 340,65 350,55 C360,40 370,70 380,50 C390,25 400,85 410,60 C420,35 430,80 440,55 C450,25 460,75 470,50 C480,30 490,70 500,55 C510,35 520,80 530,60 C540,25 550,90 560,100 L560,300 L0,300 Z')`,
        }}
      >
        <div className="inset-0 flex items-center justify-center text-white text-lg font-semibold -z-1">
          Irregular Border
        </div>
      </div>
    </div>
  );
};

export default function TestPage() {
  return (
    <div>
      <IrregularBorder />
      <Image src={O} width={32} height={32}  className="w-full bg-no-repeat"/>
      11111
    </div>
  );
}
