import { cn } from "@/lib/tailwindcss";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { MemePairContract } from "@/services/contract/memepair-contract";

interface ProjectStatusDisplayProps {
  pair: FtoPairContract | MemePairContract | null | undefined;
}

const ProjectStatus = observer(({ pair }: ProjectStatusDisplayProps) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <motion.div
        animate={{
          boxShadow: [
            `inset 0px 0px 5px 0px rgba(255,255,255,0.3)`,
            `inset 0px 0px 10px 2px rgba(255,255,255,0.3)`,
          ],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "flex px-[8px] h-[29px] justify-center items-center gap-[5px] rounded-[20px] select-none",
          pair?.ftoStatusDisplay?.color
        )}
      >
        <div className="rounded-full bg-current w-2 h-2"></div>
        <span className="text-ss text-current xs:text-xs">
          {pair?.ftoStatusDisplay?.status}
        </span>
      </motion.div>
      {pair?.isValidated && (
        <motion.div
          animate={{
            boxShadow: [
              `inset 0px 0px 5px 0px rgba(255,255,255,0.3)`,
              `inset 0px 0px 10px 2px rgba(255,255,255,0.3)`,
            ],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "flex px-[8px] h-[29px] justify-center items-center gap-[5px] rounded-[20px]  bg-[#4bbdea58] text-white select-none"
          )}
        >
          <div className="rounded-full bg-current w-2 h-2"></div>
          <span className="text-ss  text-current">Validated</span>
        </motion.div>
      )}
    </div>
  );
});

export default ProjectStatus;
