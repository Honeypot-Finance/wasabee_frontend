import { defaultContainerVariants, itemPopUpVariants } from "@/lib/animation";
import { Button } from "../button";
import { motion } from "framer-motion";
import { IndexerPaginationState } from "@/services/utils";
import { observer } from "mobx-react-lite";

type PaginationProps<FilterT, ItemT> = {
  paginationState: IndexerPaginationState<FilterT, ItemT>;
  render: (item: ItemT) => React.ReactNode;
  classNames?: {
    base?: string;
    itemsContainer?: string;
    item?: string;
  };
};

export const Pagination = observer(
  <FilterT, ItemT>(props: PaginationProps<FilterT, ItemT>) => {
    return (
      <div className={props.classNames?.base ?? ""}>
        <motion.div
          variants={defaultContainerVariants}
          initial="hidden"
          animate="visible"
          className={props.classNames?.itemsContainer ?? ""}
        >
          {props.paginationState.pageItems.value.map((pair, idx) => (
            <motion.div
              variants={itemPopUpVariants}
              key={idx}
              className={props.classNames?.item ?? ""}
            >
              {props.render(pair)}
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-around my-5">
          {props.paginationState.pageInfo.hasNextPage && (
            <Button
              onClick={() => {
                props.paginationState.loadMore();
              }}
              isDisabled={props.paginationState.isLoading}
            >
              {props.paginationState.isLoading ? "Loading..." : "Load More"}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

export default Pagination;
