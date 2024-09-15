import { defaultContainerVariants, itemPopUpVariants } from "@/lib/animation";
import launchpad from "@/services/launchpad";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { LaunchCard } from "../LaunchCard";
import { IndexerPaginationState } from "@/services/utils";

type PaginationProps<FilterT, ItemT> = {
  paginationState: IndexerPaginationState<FilterT, ItemT>;
};

export default function Pagination<FilterT, ItemT>(props: {
  paginationState: IndexerPaginationState<FilterT, ItemT>;
}) {
  return (
    <div>
      <motion.div
        variants={defaultContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3"
      >
        {launchpad.projectsPage.pageItems.value.map((pair) => (
          <motion.div variants={itemPopUpVariants} key={pair.address}>
            <LaunchCard pair={pair} action={<></>} />
          </motion.div>
        ))}
      </motion.div>
      <div className="flex justify-around my-5">
        {launchpad.projectsPage.pageInfo.hasNextPage && (
          <Button
            onClick={() => {
              launchpad.projectsPage.loadMore();
            }}
            isDisabled={launchpad.projectsPage.isLoading}
          >
            {launchpad.projectsPage.isLoading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
}
