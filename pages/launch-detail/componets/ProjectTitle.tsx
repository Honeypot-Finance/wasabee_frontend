import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { FaTelegram, FaGlobe } from "react-icons/fa";
import { Copy } from "@/components/copy";
import { VscCopy } from "react-icons/vsc";

interface ProjectTitleProps {
  name?: string;
  displayName?: string;
  telegram?: string;
  twitter?: string;
  website?: string;
  address?: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({
  name,
  displayName,
  telegram,
  twitter,
  website,
  address,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="md:text-2xl">
        {name ? (
          <div>{name}</div>
        ) : (
          <Skeleton className="h-8 w-[140px] bg-slate-200" />
        )}
      </div>
      <div className="flex items-center gap-3">
        {name ? (
          <div className="text-sm text-[#5C5C5C]/60">{displayName}</div>
        ) : (
          <Skeleton className="h-5 w-20 bg-slate-200" />
        )}

        {telegram && (
          <a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 text-[#5C5C5C]"
          >
            <FaTelegram size={16} />
          </a>
        )}
        {twitter && (
          <a
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 text-[#5C5C5C]"
          >
            <FaXTwitter size={16} />
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 text-[#5C5C5C]"
          >
            <FaGlobe size={16} />
          </a>
        )}
        {address && (
          <Copy
            content="Copy address"
            value={address}
            displayContent={
              <div className="relative hover:opacity-80 text-[#5C5C5C]">
                <VscCopy size={16} />
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProjectTitle;
