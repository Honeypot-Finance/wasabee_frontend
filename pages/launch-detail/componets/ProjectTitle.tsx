import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
        <Skeleton className="h-8 w-[140px] bg-slate-200" />
      )}
      {name ? (
        <div className="text-sm text-[#5C5C5C]/60">{displayName}</div>
      ) : (
        <Skeleton className="h-5 w-20 bg-slate-200" />
      )}
    </div>
  );
};

export default ProjectTitle;
