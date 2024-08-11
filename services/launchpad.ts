import dayjs from "dayjs";
import { wallet } from "./wallet";
import BigNumber from "bignumber.js";
import { FtoPairContract } from "./contract/ftopair-contract";
import { AsyncState, PaginationState, ValueState } from "./utils";
import { trpc, trpcClient } from "@/lib/trpc";
import { createSiweMessage } from "@/lib/siwe";
import { Address } from "viem";
import { Token } from "./contract/token";
import { PageInfo } from "./indexer/indexerTypes";
import { reset } from "viem/actions";
import { debounce } from "lodash";

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
  ftoPageInfo = new ValueState<{
    pageInfo: PageInfo;
    pairFilter: PairFilter;
    ftoPageInit: boolean;
    ftoPageLoading: boolean;
  }>({
    value: {
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: "",
        endCursor: "",
      },
      pairFilter: {
        search: "",
        status: "all",
        showNotValidatedPairs: true,
        limit: 9,
      },
      ftoPageInit: false,
      ftoPageLoading: false,
    },
  });

  updateFilter = debounce((filter: Partial<PairFilter>) => {
    this.ftoPageInfo.value.pairFilter = {
      ...this.ftoPageInfo.value.pairFilter,
      ...filter,
    };

    this.reloadFtoPage();
    this.myFtoPairs.call();
    this.getMyFtoParticipatedPairs.call();
  }, 500);

  ftoPageItems = new ValueState<FtoPairContract[]>({
    value: [],
  });

  resetFtoPageInfo = () => {
    this.ftoPageInfo.value.pageInfo = {
      hasNextPage: true,
      hasPreviousPage: false,
      startCursor: "",
      endCursor: "",
    };
    this.ftoPageItems.setValue([]);
  };

  set pairFilterSearch(search: string) {
    this.updateFilter({ search });
  }

  set pairFilterStatus(status: "all" | "processing" | "success" | "fail") {
    this.updateFilter({ status });
  }

  set showNotValidatedPairs(show: boolean) {
    this.updateFilter({ showNotValidatedPairs: show });
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
          ? new Token({
              ...pairAddress.token1,
              address: pairAddress.token1.id,
            })
          : new Token({
              address: pairAddress.token0.id,
            });

        const launchedToken =
          raisedToken.address.toLowerCase() ===
          pairAddress.token1.id.toLowerCase()
            ? new Token({
                ...pairAddress.token0,
                address: pairAddress.token0.id,
              })
            : new Token({
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

  reloadFtoPage = async () => {
    if (this.ftoPageInfo.value.ftoPageLoading) return;

    this.setFtoPageIsInit(false);
    this.setFtoPageLoading(true);
    if (this.ftoPageInfo.value.pairFilter.showNotValidatedPairs) {
      this.resetFtoPageInfo();
      await this.LoadMoreFtoPage();
    } else {
      await this.loadVerifiedFTOProjects();
    }
    this.setFtoPageIsInit(true);
    this.setFtoPageLoading(false);
  };

  loadVerifiedFTOProjects = async () => {
    const projects = wallet.currentChain.validatedFtoAddresses.map(
      (pairAddress) => {
        const pair = new FtoPairContract({
          address: pairAddress,
        });
        pair.init();
        return pair;
      }
    );

    this.ftoPageItems.setValue(projects);
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
    const newPage =
      await trpcClient.indexerFeedRouter.getFilteredFtoPairs.query({
        filter: this.ftoPageInfo.value.pairFilter,
        chainId: String(wallet.currentChainId),
        pageRequest: {
          direction: "next",
          cursor: this.ftoPageInfo.value.pageInfo.endCursor,
        },
      });

    if (newPage.status === "success") {
      this.setCurrentPageInfo(newPage.data.pageInfo);

      const newPageToContracts = newPage.data.pairs.map((pairAddress) => {
        const pair = new FtoPairContract({
          address: pairAddress.id,
        });

        const raisedToken = wallet.currentChain.contracts.ftoTokens.find(
          (token) =>
            token.address?.toLowerCase() === pairAddress.token1.id.toLowerCase()
        )
          ? new Token({
              ...pairAddress.token1,
              address: pairAddress.token1.id,
            })
          : new Token({
              address: pairAddress.token0.id,
            });

        const launchedToken =
          raisedToken.address.toLowerCase() ===
          pairAddress.token1.id.toLowerCase()
            ? new Token({
                ...pairAddress.token0,
                address: pairAddress.token0.id,
              })
            : new Token({
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

      this.ftoPageItems.setValue([
        ...this.ftoPageItems.value,
        ...newPageToContracts,
      ]);
    } else {
      console.error(newPage);
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
          pair.raiseToken.init();
          pair.launchedToken.init();
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
        filter: this.ftoPageInfo.value.pairFilter,
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
            ? new Token({
                ...pairAddress.token1,
                address: pairAddress.token1.id,
              })
            : new Token({
                address: pairAddress.token0.id,
              });

          const launchedToken =
            raisedToken.address.toLowerCase() ===
            pairAddress.token1.id.toLowerCase()
              ? new Token({
                  ...pairAddress.token0,
                  address: pairAddress.token0.id,
                })
              : new Token({
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
    this.ftoPageInfo.value.pageInfo = pageInfo;
  };

  setFtoPageIsInit = (isInit: boolean) => {
    this.ftoPageInfo.value.ftoPageInit = isInit;
  };

  setFtoPageLoading = (isLoading: boolean) => {
    this.ftoPageInfo.value.ftoPageLoading = isLoading;
  };
}

const launchpad = new LaunchPad();

export default launchpad;
