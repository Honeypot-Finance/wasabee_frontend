import {
  PairFilter as FtoPairFilter,
  statusTextToNumber,
} from "@/services/launchpad";
import {
  IndexerProvider,
  GhostFtoPairResponse,
  GhostAPIOpt,
  GhostFtoTokensResponse,
  GhostPair,
  GhostPairResponse,
  GhostFTOPair,
  PageRequest,
  GhostToken,
  PairFilter,
} from "./../indexerTypes";
import { networksMap } from "@/services/chain";
import { PageInfo } from "@/services/utils";

const ftoGraphHandle = "3cbba216-c29c-465b-95d4-be5ebeed1f35/ghostgraph";
const pairGraphHandle = "531ce928-b10c-4f1c-a875-d6ebdddc0228/ghostgraph";

export class GhostIndexer {
  apiKey: string;
  apiEndpoint: string;

  constructor(apiKey: string, apiEndpoint: string) {
    this.apiKey = apiKey;
    this.apiEndpoint = apiEndpoint;
  }

  callIndexerApi = async <T>(
    query: string,
    option: GhostAPIOpt
  ): Promise<ApiResponseType<any>> => {
    if (!this.apiKey || !query) {
      return {
        status: "error",
        message: "Error: API Key or query is missing.",
      };
    }

    const res = await fetch(this.apiEndpoint + option.apiHandle, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GHOST-KEY": this.apiKey,
      },
      body: JSON.stringify({ query: query }),
    });

    if (res.status === 200) {
      const data = await res.json();
      return {
        status: "success",
        data: data.data,
        message: "Success",
      };
    } else {
      throw new Error(res.statusText);
    }
  };

  getMostSuccessfulFTOPairs = async (
    chainId: string,
    limit: number
  ): Promise<ApiResponseType<GhostFtoPairResponse>> => {
    const query = `#graphql
    {
      pairs(
        where:{
          status: "3"
        }
        orderBy: "depositedRaisedToken"
        orderDirection: "desc"
        limit: ${limit}
      ) {
        items {
          id
          token0Id
          token1Id
          depositedRaisedToken
          depositedLaunchedToken
          createdAt
          endTime
          status
          token0 {
            id
            name
            symbol
            decimals
          }
          token1 {
            id
            name
            symbol
            decimals
          }
        }
      }
    }
  `;

    const res = await this.callIndexerApi(query, { apiHandle: ftoGraphHandle });

    if (res.status === "error") {
      return res;
    } else {
      let pairs = ((res.data as any)?.pairs?.items as GhostFTOPair[]) ?? [];
      let pageInfo = (res.data as any)?.pairs?.pageInfo as PageInfo;

      return {
        status: "success",
        message: "Success",
        data: { pairs: pairs, pageInfo: pageInfo },
      };
    }
  };

  getFilteredFtoPairs = async (
    filter: Partial<FtoPairFilter>,
    chainId: string,
    provider?: string,
    pageRequest?: PageRequest
  ): Promise<ApiResponseType<GhostFtoPairResponse>> => {
    const statusNum = statusTextToNumber(filter?.status ?? "all");

    const dirCondition = pageRequest?.cursor
      ? pageRequest?.direction === "next"
        ? `after:"${pageRequest?.cursor}"`
        : `before:"${pageRequest?.cursor}"`
      : "";

    const statusCondition = statusNum != -1 ? `status: "${statusNum}",` : "";
    const searchIdCondition =
      filter?.search && filter.search.startsWith("0x")
        ? `id: "${filter.search}",`
        : "";

    const searchToken0IdCondition =
      filter?.search && filter.search.startsWith("0x")
        ? `token0Id: "${filter?.search}",`
        : "";

    const searchToken1IdCondition =
      filter?.search && filter.search.startsWith("0x")
        ? `token1Id: "${filter?.search}",`
        : "";

    const providerCondition = provider
      ? `launchedTokenProvider: "${provider}",`
      : "";

    const filteredTokens = filter.search
      ? await this.getFilteredFtoTokens(filter)
      : {
          status: "success",
          data: { items: [] },
        };

    const query = `#graphql
        {
          pairs(
            where: {
              OR:[
                ${
                  (statusCondition || searchIdCondition || !filter.search) &&
                  (!filter.search || filter.search.startsWith("0x"))
                    ? `{
                    ${statusCondition}
                    ${searchIdCondition}
                    ${providerCondition}
                  }
                  {
                    ${statusCondition}
                    ${searchToken0IdCondition}
                    ${providerCondition}
                  }
                  {
                    ${statusCondition}
                    ${searchToken1IdCondition}
                    ${providerCondition}
                  }`
                    : ""
                }
                ${
                  filteredTokens.status === "success" &&
                  filteredTokens.data!.items.map((token: GhostToken) => {
                    return `
                    {token0Id: "${token.id}"
                    ${statusCondition}
                    ${searchIdCondition}
                    ${providerCondition}}
                    {token1Id: "${token.id}"
                    ${statusCondition}
                    ${searchIdCondition}
                    ${providerCondition}}
                    `;
                  })
                }
              ]
            }
            orderBy:"createdAt"
            orderDirection: "desc"
            limit: ${filter?.limit ?? 9}
            ${dirCondition}
          ) {
            items {
              id
              token0Id
              token1Id
              depositedRaisedToken
              depositedLaunchedToken
              createdAt
              endTime
              status
              token0 {
                id
                name
                symbol
                decimals
              }
              token1 {
                id
                name
                symbol
                decimals
              }
            }
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      `;

    const res = await this.callIndexerApi(query, { apiHandle: ftoGraphHandle });

    if (res.status === "error") {
      return res;
    } else {
      let pairs = ((res.data as any)?.pairs?.items as GhostFTOPair[]) ?? [];
      let pageInfo = (res.data as any)?.pairs?.pageInfo as PageInfo;

      if (filter && !filter.showNotValidatedPairs) {
        pairs = pairs?.filter((pair: GhostPair) => {
          return networksMap[chainId].validatedFtoAddresses.includes(pair.id);
        });
      }

      return {
        status: "success",
        message: "Success",
        data: { pairs: pairs, pageInfo: pageInfo },
      };
    }
  };

  getAllFtoTokens = async (): Promise<
    ApiResponseType<GhostFtoTokensResponse>
  > => {
    const query = `#graphql
        {
          erc20s {
            items {
              id
              name
              symbol
              decimals
            }
          }
        }
      `;

    const res = await this.callIndexerApi(query, { apiHandle: ftoGraphHandle });

    if (res.status === "error") {
      return res;
    } else {
      return {
        status: "success",
        message: "Success",
        data: (res.data as any).erc20s.items as GhostFtoTokensResponse,
      };
    }
  };

  getFilteredFtoTokens = async (
    filter: Partial<FtoPairFilter>
  ): Promise<ApiResponseType<GhostFtoTokensResponse>> => {
    const query = `#graphql
        {
          erc20s(
            where: {
              OR: [
                { name_contains: "${filter.search}" },
                { symbol_contains: "${filter.search}" }
              ]
            }
          ) {
            items {
              id
              name
              symbol
              decimals
            }
          }
        }
      `;

    const res = await this.callIndexerApi(query, { apiHandle: ftoGraphHandle });

    if (res.status === "error") {
      return res;
    } else {
      return {
        status: "success",
        message: "Success",
        data: { items: (res.data as any).erc20s.items as GhostToken[] },
      };
    }
  };

  getAllPairs = async (): Promise<ApiResponseType<GhostPairResponse>> => {
    const query = `#graphql
        {
          pairs (
            limit: 1000
          ){
            items {
              id
              token0 {
                id
                name
                symbol
                decimals
              }
              token1 {
                id
                name
                symbol
                decimals
              }
            }
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      `;

    const res = await this.callIndexerApi(query, {
      apiHandle: pairGraphHandle,
    });

    if (res.status === "error") {
      return res;
    } else {
      return {
        status: "success",
        message: "Success",
        data: {
          pairs: (res.data as any).pairs?.items as GhostPair[],
          pageInfo: (res.data as any).pairs?.pageInfo as PageInfo,
        } ?? {
          pairs: [],
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
            startCursor: "",
            endCursor: "",
          },
        },
      };
    }
  };

  getFilteredPairs = async (
    filter: Partial<PairFilter>,
    chainId: string,
    provider?: string,
    pageRequest?: PageRequest
  ): Promise<ApiResponseType<GhostPairResponse>> => {
    const dirCondition = pageRequest?.cursor
      ? pageRequest?.direction === "next"
        ? `after:"${pageRequest?.cursor}"`
        : `before:"${pageRequest?.cursor}"`
      : "";

    const providerFtos = provider
      ? this.getFilteredFtoPairs(
          {
            limit: 9999,
          },
          chainId,
          provider
        )
      : undefined;

    console.log(filter.searchString);

    const query = `#graphql
        {
          pairs(
            where: {
              ${
                filter.searchString
                  ? `
              OR: [
                ${
                  filter.searchString.startsWith("0x")
                    ? `{ id: "${filter.searchString}"  }`
                    : ""
                }
                
                 ${
                   filter.searchString.startsWith("0x")
                     ? `{ token1Id: "${filter.searchString}"  }`
                     : ""
                 }
                {token0name_contains:"${filter.searchString}" }
                {token0symbol_contains:"${filter.searchString}" }
                
                 ${
                   filter.searchString.startsWith("0x")
                     ? `{ token1Id: "${filter.searchString}"  }`
                     : ""
                 }
                {token1name_contains:"${filter.searchString}" }
                {token1symbol_contains:"${filter.searchString}" }
              ]`
                  : ""
              }
            }
            limit: ${filter.limit}
            ${dirCondition}
          ) {
            items {
              id
              token0 {
                id
                name
                symbol
                decimals
              }
              token1 {
                id
                name
                symbol
                decimals
              }
            }
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      `;

    console.log(query);

    const res = await this.callIndexerApi(query, {
      apiHandle: pairGraphHandle,
    });

    if (res.status === "error") {
      return res;
    } else {
      return {
        status: "success",
        message: "Success",
        data: {
          pairs: (res.data as any).pairs?.items as GhostPair[],
          pageInfo: (res.data as any).pairs?.pageInfo as PageInfo,
        } ?? {
          pairs: [],
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
            startCursor: "",
            endCursor: "",
          },
        },
      };
    }
  };

  async getPairByTokens({
    token0,
    token1,
  }: {
    token0: string;
    token1: string;
  }) {
    const query = `#graphql
      query {   
        pairs0: pairs(
        where: {token0Id: "${token0}", token1Id: "${token1}"}
  ) {
    items {
      address: id
      token0{
        address: id
        name
        symbol
        decimals
      }
      token1{
        address: id
        name
        symbol
        decimals
      }
      reserve0
      reserve1
    }
  }
    
  pairs1: pairs(
    where: {token0Id: "${token1}", token1Id: "${token0}"}
  ) {
    items {
      address: id
      token0{
        address: id
        name
        symbol
        decimals
      }
      token1{
        address: id
        name
        symbol
        decimals
      }
      reserve0
      reserve1
    }
  }

  }`;

    const res = await this.callIndexerApi(query, {
      apiHandle: pairGraphHandle,
    });
    if (res.status === "success") {
      return res.data.pairs0.items[0] || res.data.pairs1.items[0];
    }
    return res;
  }
}
