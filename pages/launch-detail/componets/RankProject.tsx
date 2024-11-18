import React from "react";
import { trpcClient } from "@/lib/trpc";
import { Skeleton } from "@nextui-org/react";

interface RankProjectProps {
  votes?: Record<string, number>;
  walletAccount?: string;
  projectAddress?: string;
  refreshVotes: () => void;
}

const RankProject: React.FC<RankProjectProps> = ({
  votes,
  walletAccount,
  projectAddress,
  refreshVotes,
}) => {
  return (
    <div className="space-y-2">
      <p className="text-white/65 text-sm mt-2.5">Rank Project</p>
      <div className="flex gap-5">
        {votes ? (
          Object.entries(votes).map(([key, value]) => (
            <div
              key={key}
              onClick={() => {
                if (!walletAccount || !projectAddress) return;

                trpcClient.projects.createOrUpdateProjectVotes
                  .mutate({
                    project_pair: projectAddress,
                    wallet_address: walletAccount,
                    vote: key.split("_")[0],
                  })
                  .then(() => {
                    refreshVotes();
                  });
              }}
              className="mt-[8px] flex-1 flex flex-col justify-center items-center [background:#3B2912] px-3 py-3 rounded-[10px] hover:[background:#FFCD4D] active:[background:#F0A000] cursor-pointer select-none"
            >
              <p>
                {(key.split("_")[0] === "rocket" && "🚀") ||
                  (key.split("_")[0] === "fire" && "🔥") ||
                  (key.split("_")[0] === "poo" && "💩") ||
                  (key.split("_")[0] === "flag" && "🚩")}
              </p>
              <p>{value}</p>
            </div>
          ))
        ) : (
          <Skeleton className="rounded-lg h-24 w-full" />
        )}
      </div>
    </div>
  );
};

export default RankProject;
