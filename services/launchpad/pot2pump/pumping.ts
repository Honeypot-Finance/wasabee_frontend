import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { IndexerPaginationState, PageInfo } from "@/services/utils";
import {
  PAGE_LIMIT,
  PairFilter,
  SubgraphProjectFilter,
  defaultPairFilters,
} from "..";
import {
  fetchPot2PumpList,
  subgraphPageRequest,
} from "@/lib/algebra/graphql/clients/pair";
import { wallet } from "@/services/wallet";

export class Pot2PumpPumpingService {
  DEFAULT_FILTER: SubgraphProjectFilter = {
    status: "success",
    search: "",
    currentPage: 0,
    limit: PAGE_LIMIT,
    hasNextPage: true,
    orderBy: "endTime",
    orderDirection: "desc",
  };

  projectsPage = new IndexerPaginationState<
    SubgraphProjectFilter,
    MemePairContract
  >({
    namespace: "projectsPage",
    defaultFilter: this.DEFAULT_FILTER,
    LoadNextPageFunction: async (filter) => {
      console.log("query", "LoadNextPageFunction", JSON.stringify(filter));
      return await this.LoadMoreProjectPage(filter);
    },
  });

  LoadMoreProjectPage = async (filter: SubgraphProjectFilter) => {
    console.log("query", "filter", JSON.stringify(filter));
    const res = await fetchPot2PumpList({
      chainId: String(wallet.currentChainId),
      filter: filter,
    });

    if (res.status === "success") {
      return { items: res.data.pairs, filterUpdates: res.data.filterUpdates };
    } else {
      return {
        items: [],
      };
    }
  };
}
