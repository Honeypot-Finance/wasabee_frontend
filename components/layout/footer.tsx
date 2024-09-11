import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <div>
      <div className="flex justify-end">
        <Link
          href={"https://tryghost.xyz/log"}
          target="_blank"
          className="flex p-2 gap-2 items-center"
        >
          <Image
            className="h-4"
            src="/images/partners/powered_by_ghost_light.png"
            alt=""
            width={100}
            height={100}
          />
        </Link>
      </div>
    </div>
  );
};
