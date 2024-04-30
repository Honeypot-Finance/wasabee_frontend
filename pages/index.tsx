import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className=" relative">
      <Image src="/images/homepage.png" alt="homepage" fill />
      <div className=" relative z-10">
        <></>
      </div>
    </div>
  );
}
