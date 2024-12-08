import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

interface ProjectTitleProps {
  name?: string;
  displayName?: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ name, displayName }) => {
  return (
    <div className="flex flex-col gap-[7.5px] md:text-2xl">
      {name ? (
        <div>{name}</div>
      ) : (
        <Skeleton className="rounded-lg h-8 w-[140px] bg-blue-500" />
      )}
      {name ? (
        <div className="text-sm text-[#5C5C5C]/60">{displayName}</div>
      ) : (
        <Skeleton className="rounded-lg h-5 w-20" />
      )}
    </div>
  );
};

export default ProjectTitle;
