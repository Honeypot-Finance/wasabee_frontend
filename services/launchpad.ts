import dayjs from "dayjs";
import { wallet } from "./wallet";
import BigNumber from "bignumber.js";
import { FtoPairContract } from "./contract/ftopair-contract";
import {
  AsyncState,
  IndexerPaginationState,
  PageInfo,
  PaginationState,
  ValueState,
} from "./utils";
import { trpc, trpcClient } from "@/lib/trpc";
import { createSiweMessage } from "@/lib/siwe";
import { Address } from "viem";
import { Token } from "./contract/token";
import { reset } from "viem/actions";
import { debounce, initial } from "lodash";

const pagelimit = 9;

export type PairFilter = {
  search: string;
  status: "all" | "processing" | "success" | "fail";
  showNotValidatedPairs: boolean;
  limit: number;
};

export const statusTextToNumber = (status: string) => {
  switch (status) {
    case "processing":
      return 3;
    case "success":
      return 0;
    case "fail":
      return 1;
    default:
      return -1;
  }
};

function calculateTimeDifference(timestamp: number): string {
  if (timestamp.toString().length !== 13) {
    return "Invaild";
  }
  const now = dayjs();
  const targetTime = dayjs(timestamp);

  const diffDays = now.diff(targetTime, "days");

  if (Math.abs(diffDays) >= 1) {
    return `${diffDays} ${diffDays > 0 ? "days later" : "days ago"}`;
  }

  const diffHours = now.diff(targetTime, "hours");

  if (Math.abs(diffHours) >= 1) {
    return `${diffHours} ${diffHours > 0 ? "hours later" : "hours ago"}`;
  }

  const diffMinutes = now.diff(targetTime, "minutes");
  return `${diffMinutes} ${diffMinutes > 0 ? "minutes later" : "minutes ago"}`;
}

class LaunchPad {
  ftoPageInfo = new IndexerPaginationState<PairFilter, FtoPairContract>({
    filter: {
      search: "",
      status: "all",
      showNotValidatedPairs: true,
      limit: pagelimit,
    },
    LoadNextPageFunction: async (filter) => {
      if (!filter.showNotValidatedPairs) {
        return {
          items: await this.loadVerifiedFTOProjects(),
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: "",
            endCursor: "",
          },
        };
      } else {
        return await this.LoadMoreFtoPage();
      }
    },
  });

  set pairFilterSearch(search: string) {
    this.ftoPageInfo.updateFilter({ search });
  }

  set pairFilterStatus(status: "all" | "processing" | "success" | "fail") {
    this.ftoPageInfo.updateFilter({ status });
  }

  set showNotValidatedPairs(show: boolean) {
    this.ftoPageInfo.updateFilter({ showNotValidatedPairs: show });
  }

  get ftofactoryContract() {
    return wallet.contracts.ftofactory;
  }

  get ftofacadeContract() {
    return wallet.contracts.ftofacade;
  }

  allPairsLength = async () =>
    await this.ftofactoryContract.allPairsLength.call();

  getPairAddress = async (index: bigint) =>
    await this.ftofactoryContract.allPairs.call([index]);

  async mostSuccessfulFtos(): Promise<FtoPairContract[]> {
    const mostSuccessfulFtos =
      await trpcClient.indexerFeedRouter.getMostSuccessfulFtos.query({
        chainId: String(wallet.currentChainId),
        limit: 5,
      });

    if (mostSuccessfulFtos.status === "success") {
      return mostSuccessfulFtos.data.pairs.map((pairAddress) => {
        const pair = new FtoPairContract({
          address: pairAddress.id,
        });

        const raisedToken = this.isFtoRaiseToken(pairAddress.token1.id)
          ? Token.getToken({
              ...pairAddress.token1,
              address: pairAddress.token1.id,
            })
          : Token.getToken({
              address: pairAddress.token0.id,
            });

        const launchedToken =
          raisedToken.address.toLowerCase() ===
          pairAddress.token1.id.toLowerCase()
            ? Token.getToken({
                ...pairAddress.token0,
                address: pairAddress.token0.id,
              })
            : Token.getToken({
                ...pairAddress.token1,
                address: pairAddress.token1.id,
              });

        if (!pair.isInit) {
          pair.init({
            raisedToken: raisedToken,
            launchedToken: launchedToken,
            depositedLaunchedToken: pairAddress.depositedLaunchedToken,
            depositedRaisedToken: pairAddress.depositedRaisedToken,
            startTime: pairAddress.createdAt,
            endTime: pairAddress.endTime,
            ftoState: Number(pairAddress.status),
          });
        }

        return pair;
      });
    } else {
      return [];
    }
  }

  loadVerifiedFTOProjects = async () => {
    this.setFtoPageLoading(true);
    const projects = await Promise.all(
      wallet.currentChain.validatedFtoAddresses.map(async (pairAddress) => {
        const pair = new FtoPairContract({
          address: pairAddress,
        });
        await pair.init();
        return pair;
      })
    );

    this.setFtoPageLoading(false);
    return projects;
  };

  getMyFtoParticipatedPairs = new AsyncState<FtoPairContract[]>(async () => {
    if (!this.myFtoParticipatedPairs.value) {
      await this.myFtoParticipatedPairs.call();
    } else {
      this.myFtoParticipatedPairs.value.data.forEach(async (pair) => {
        if (!pair.isInit) await pair.init();
      });
    }

    return this.myFtoParticipatedPairs.value?.data ?? [];
  });

  LoadMoreFtoPage = async () => {
    const res = await trpcClient.indexerFeedRouter.getFilteredFtoPairs.query({
      filter: this.ftoPageInfo.filter,
      chainId: String(wallet.currentChainId),
      pageRequest: {
        direction: "next",
        cursor: this.ftoPageInfo.pageInfo.endCursor,
      },
    });

    if (res.status === "success") {
      const data = {
        items: res.data.pairs.map((pairAddress) => {
          const pair = new FtoPairContract({
            address: pairAddress.id,
          });

          const raisedToken = this.isFtoRaiseToken(pairAddress.token1.id)
            ? Token.getToken({
                ...pairAddress.token1,
                address: pairAddress.token1.id,
              })
            : Token.getToken({
                address: pairAddress.token0.id,
              });

          const launchedToken =
            raisedToken.address.toLowerCase() ===
            pairAddress.token1.id.toLowerCase()
              ? Token.getToken({
                  ...pairAddress.token0,
                  address: pairAddress.token0.id,
                })
              : Token.getToken({
                  ...pairAddress.token1,
                  address: pairAddress.token1.id,
                });

          pair.init({
            raisedToken: raisedToken,
            launchedToken: launchedToken,
            depositedLaunchedToken: pairAddress.depositedLaunchedToken,
            depositedRaisedToken: pairAddress.depositedRaisedToken,
            startTime: pairAddress.createdAt,
            endTime: pairAddress.endTime,
            ftoState: Number(pairAddress.status),
          });

          return pair;
        }),
        pageInfo: res.data.pageInfo,
      };
      return data;
    } else {
      return {
        items: [],
        pageInfo: {
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: "",
          endCursor: "",
        },
      };
    }
  };

  myFtoParticipatedPairs = new AsyncState<{
    data: FtoPairContract[];
    total: number;
  }>(async () => {
    const projects = await this.ftofactoryContract.events(
      wallet.account as Address
    );

    let data = await Promise.all(
      projects.map(async (pairAddress) => {
        const pair = new FtoPairContract({ address: pairAddress as string });
        if (!pair.isInit) {
          await pair.init();
          pair.raiseToken?.init();
          pair.launchedToken?.init();
        }
        return pair;
      })
    );

    data.sort((a, b) => {
      return Number(b.startTime) - Number(a.startTime);
    });

    this.myFtoParticipatedPairsPagination.setTotal(data.length);

    return {
      data,
      total: data.length,
    };
  });

  myFtoPairs = new AsyncState<{
    data: FtoPairContract[];
    total: number;
  }>(async () => {
    const ftoAddresses =
      await trpcClient.indexerFeedRouter.getFilteredFtoPairs.query({
        filter: this.ftoPageInfo.filter,
        chainId: String(wallet.currentChainId),
        provider: wallet.account,
      });

    if (!ftoAddresses || ftoAddresses.status === "error") {
      return { data: [], total: 0 };
    }

    const data: Array<FtoPairContract> = (
      await Promise.all(
        ftoAddresses.data.pairs.map(async (pairAddress, idx) => {
          const pair = new FtoPairContract({
            address: pairAddress.id,
          });

          const raisedToken = this.isFtoRaiseToken(pairAddress.token1.id)
            ? Token.getToken({
                ...pairAddress.token1,
                address: pairAddress.token1.id,
              })
            : Token.getToken({
                address: pairAddress.token0.id,
              });

          const launchedToken =
            raisedToken.address.toLowerCase() ===
            pairAddress.token1.id.toLowerCase()
              ? Token.getToken({
                  ...pairAddress.token0,
                  address: pairAddress.token0.id,
                })
              : Token.getToken({
                  ...pairAddress.token1,
                  address: pairAddress.token1.id,
                });

          if (!pair.isInit) {
            pair.init({
              raisedToken: raisedToken,
              launchedToken: launchedToken,
              depositedLaunchedToken: pairAddress.depositedLaunchedToken,
              depositedRaisedToken: pairAddress.depositedRaisedToken,
              startTime: pairAddress.createdAt,
              endTime: pairAddress.endTime,
              ftoState: Number(pairAddress.status),
            });
          }
          return pair;
        })
      )
    ).filter((pair) => pair !== undefined) as FtoPairContract[];

    return {
      data,
      total: 999,
    };
  });

  ftoPairsPagination = new PaginationState({
    limit: pagelimit,
  });

  myFtoParticipatedPairsPagination = new PaginationState({
    limit: pagelimit,
  });

  createFTO = async ({
    provider,
    raisedToken,
    tokenName,
    tokenSymbol,
    tokenAmount,
    poolHandler,
    raisingCycle,
  }: {
    provider: string;
    raisedToken: string;
    tokenName: string;
    tokenSymbol: string;
    tokenAmount: number;
    poolHandler: string;
    raisingCycle: number;
  }) => {
    const res = await this.ftofactoryContract.createFTO.call([
      provider as `0x${string}`,
      raisedToken as `0x${string}`,
      tokenName,
      tokenSymbol,
      BigInt(new BigNumber(tokenAmount).multipliedBy(1e18).toFixed()),
      poolHandler as `0x${string}`,
      BigInt(raisingCycle),
    ]);
    const pairAddress = res.logs.pop()?.address as string;
    await trpcClient.fto.createProject.mutate({
      pair: pairAddress,
      chain_id: wallet.currentChainId,
      provider: provider,
    });
    return pairAddress;
  };

  updateFtoProject = new AsyncState(
    async (data: {
      pair: string;
      chain_id: number;
      twitter: string;
      telegram: string;
      website: string;
      description: string;
      projectName: string;
    }) => {
      await createSiweMessage(
        wallet.account,
        "Sign In With Honeypot",
        wallet.walletClient
      );
      await trpcClient.fto.createOrUpdateProjectInfo.mutate(data);
    }
  );

  updateProjectLogo = new AsyncState(
    async (data: { logo_url: string; pair: string; chain_id: number }) => {
      await createSiweMessage(
        wallet.account,
        "Sign In With Honeypot",
        wallet.walletClient
      );

      await trpcClient.fto.updateProjectLogo.mutate(data);
    }
  );

  isFtoRaiseToken(tokenAddress: string): boolean {
    return wallet.currentChain.contracts.ftoTokens.some(
      (ftoToken) =>
        ftoToken.address?.toLowerCase() === tokenAddress.toLowerCase()
    );
  }

  setCurrentPageInfo = (pageInfo: PageInfo) => {
    this.ftoPageInfo.pageInfo = pageInfo;
  };

  setFtoPageIsInit = (isInit: boolean) => {
    this.ftoPageInfo.isInit = isInit;
  };

  setFtoPageLoading = (isLoading: boolean) => {
    this.ftoPageInfo.isLoading = isLoading;
  };
}

const launchpad = new LaunchPad();

export default launchpad;
