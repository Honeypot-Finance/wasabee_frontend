import { MUBAI_FTO_PAIR_ABI } from "@/lib/abis/ftoPair";
import { MemePairABI } from "@/lib/abis/MemePair";
import { chains, chainsMap } from "@/lib/chain";
import { createPublicClientByChain } from "@/lib/client";
import { exec } from "@/lib/contract";
import { pg } from "@/lib/db";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { MemePairContract } from "@/services/contract/memepair-contract";
import { wallet } from "@/services/wallet";
import { Contract, ethers, providers } from "ethers";
import { key } from "localforage";
import { getContract } from "viem";
import { readContract } from "viem/actions";
import { record } from "zod";

const super_api_key = process.env.FTO_API_KEY ?? "";

const fto_api_key_list = [
  "b3a3a02a-a665-4fb5-bb17-153d05863efe", //bera boyz
];

export const ftoService = {
  createFtoProject: async (data: {
    pair: string;
    provider: string;
    chain_id: number;
    creator_api_key: string;
    project_type?: string;
    projectName: string;
    project_logo?: string;
    banner_url?: string;
  }) => {
    if (
      !fto_api_key_list.includes(data.creator_api_key) &&
      data.creator_api_key !== super_api_key
    ) {
      return;
    }

    await pg`INSERT INTO fto_project ${pg({
      pair: data.pair.toLowerCase(),
      provider: data.provider.toLowerCase(),
      chain_id: data.chain_id,
      creator_api_key: data.creator_api_key,
      project_type: data.project_type ?? "",
      name: data.projectName,
      logo_url: data.project_logo ?? "",
      banner_url: data.banner_url ?? "",
    })}`;
  },
  getProjectInfo: async (data: {
    pair: string;
    chain_id: number;
    creator_api_key: string;
  }) => {
    if (
      !fto_api_key_list.includes(data.creator_api_key) &&
      data.creator_api_key !== super_api_key
    ) {
      return null;
    }

    let output;

    output = await selectFtoProject(data);

    if (!output || !output[0]) {
      console.log("no output");
      let provider = "";
      let project_type = "fto";

      const memePairContract = new Contract(
        data.pair as `0x${string}`,
        MemePairABI.abi,
        new providers.JsonRpcProvider(
          chainsMap[data.chain_id].rpcUrls.default.http.toString()
        )
      );

      const ftoPairContract = new Contract(
        data.pair as `0x${string}`,
        MUBAI_FTO_PAIR_ABI,
        new providers.JsonRpcProvider(
          chainsMap[data.chain_id].rpcUrls.default.http.toString()
        )
      );

      provider = await ftoPairContract.launchedTokenProvider().catch(() => {
        project_type = "meme";
      });

      if (!provider) {
        provider = await memePairContract.tokenDeployer().catch(() => {
          project_type = "";
        });
      }

      if (!provider) {
        return null;
      }

      await createFtoProject({
        pair: data.pair,
        chain_id: data.chain_id,
        provider: provider ?? "",
        creator_api_key: data.creator_api_key,
        project_type: project_type,
      });
      output = await selectFtoProject(data);
    } else {
      let needUpdate = false;
      let project_type = output[0].project_type;
      let provider = output[0].provider;

      if (!project_type || project_type == "" || !provider || provider == "") {
        needUpdate = true;
        project_type = "fto";
        const memePairContract = new Contract(
          data.pair as `0x${string}`,
          MemePairABI.abi,
          new providers.JsonRpcProvider(
            chainsMap[data.chain_id].rpcUrls.default.http.toString()
          )
        );

        const ftoPairContract = new Contract(
          data.pair as `0x${string}`,
          MUBAI_FTO_PAIR_ABI,
          new providers.JsonRpcProvider(
            chainsMap[data.chain_id].rpcUrls.default.http.toString()
          )
        );

        provider = await ftoPairContract.launchedTokenProvider().catch(() => {
          project_type = "meme";
        });

        if (!provider) {
          provider = await memePairContract.tokenDeployer().catch(() => {
            project_type = "";
          });
        }
      }

      if (needUpdate) {
        const updateData = {
          pair: data.pair,
          chain_id: data.chain_id,
          creator_api_key: data.creator_api_key,
          name: output[0].name,
          provider: provider,
          project_type: project_type,
        };

        await updateFtoProject(updateData);

        output = await selectFtoProject(data);
      }
    }

    return output?.[0] ?? null;
  },
  getFtoProjectsByAccount: async ({
    provider,
    chain_id,
  }: {
    provider: string;
    chain_id: number;
  }) => {
    return pg`SELECT * FROM fto_project WHERE provider = ${provider.toLowerCase()} and chain_id = ${chain_id} order by id desc`;
  },
  createOrUpdateProjectInfo: async (data: {
    twitter?: string;
    telegram?: string;
    website?: string;
    description?: string;
    projectName?: string;
    pair: string;
    chain_id: number;
    creator_api_key: string;
  }) => {
    if (
      !fto_api_key_list.includes(data.creator_api_key) &&
      data.creator_api_key.toLowerCase() != super_api_key.toLowerCase()
    ) {
      return false;
    }
    return await updateFtoProject({
      twitter: data.twitter ?? "",
      telegram: data.telegram ?? "",
      website: data.website ?? "",
      description: data.description ?? "",
      name: data.projectName ?? "",
      pair: data.pair,
      chain_id: data.chain_id,
      creator_api_key: data.creator_api_key,
    });
  },
  createOrUpdateProjectVotes: async (data: {
    project_pair: string;
    wallet_address: string;
    vote: string;
  }) => {
    await pg`INSERT INTO fto_project_vote ${pg({
      project_pair: data.project_pair.toLowerCase(),
      wallet_address: data.wallet_address.toLowerCase(),
      vote: data.vote,
    })} ON CONFLICT (wallet_address, project_pair) DO UPDATE SET vote = ${
      data.vote
    }`;
  },
  updateProjectBanner: async (data: {
    banner_url: string;
    pair: string;
    chain_id: number;
    creator_api_key: string;
  }) => {
    if (
      !fto_api_key_list.includes(data.creator_api_key) &&
      data.creator_api_key.toLowerCase() != super_api_key.toLowerCase()
    ) {
      return;
    }

    await pg`INSERT INTO fto_project ${pg({
      pair: data.pair.toLowerCase(),
      chain_id: data.chain_id,
      banner_url: data.banner_url,
    })} ON CONFLICT (pair, chain_id) DO UPDATE SET banner_url = ${
      data.banner_url
    }`;
  },
  updateFtoLogo: async (data: {
    logo_url: string;
    pair: string;
    chain_id: number;
    creator_api_key: string;
  }) => {
    if (
      !fto_api_key_list.includes(data.creator_api_key) &&
      data.creator_api_key.toLowerCase() != super_api_key.toLowerCase()
    ) {
      return;
    }

    await pg`INSERT INTO fto_project ${pg({
      pair: data.pair.toLowerCase(),
      chain_id: data.chain_id,
      logo_url: data.logo_url,
    })}
    ON CONFLICT (pair, chain_id) DO UPDATE SET logo_url = ${data.logo_url}`;
  },
  getProjectVotes: async (data: {
    pair: string;
  }): Promise<{
    rocket_count: number;
    fire_count: number;
    poo_count: number;
    flag_count: number;
  }> => {
    const res = await pg`SELECT 
    COUNT(CASE WHEN vote = 'rocket' THEN 1 END) AS rocket_count,
    COUNT(CASE WHEN vote = 'fire' THEN 1 END) AS fire_count,
    COUNT(CASE WHEN vote = 'poo' THEN 1 END) AS poo_count,
    COUNT(CASE WHEN vote = 'flag' THEN 1 END) AS flag_count
    FROM public.fto_project_vote
    WHERE project_pair = ${data.pair.toLowerCase()};
  `;
    Object.entries(res[0]).forEach(([key, value]) => {
      res[0][key] = Number(value);
    });

    const outdata = res[0];
    return outdata as any;
  },
  revalidateProject: async (data: {
    pair: string;
    chain_id: number;
    creator_api_key?: string;
  }) => {
    return await revalidateProject(data);
  },
};

const createFtoProject = async (data: {
  pair: string;
  chain_id: number;
  provider?: string;
  creator_api_key: string;
  project_type?: string;
}) => {
  await pg`INSERT INTO fto_project ${pg({
    pair: data.pair.toLowerCase(),
    provider: data.provider?.toLowerCase() ?? "",
    chain_id: data.chain_id,
    creator_api_key: data.creator_api_key,
    project_type: data.project_type ?? null,
  })}`;
};

const updateFtoProject = async (data: {
  twitter?: string;
  telegram?: string;
  website?: string;
  description?: string;
  name?: string;
  pair: string;
  chain_id: number;
  creator_api_key: string;
  project_type?: string;
  provider?: string;
}) => {
  try {
    //console.log("data: ", data);

    const fieldsToUpdate = Object.entries(data)
      .filter(([key, value]) => {
        if (key === "creator_api_key" || key === "pair" || key === "chain_id") {
          return false;
        }
        return !!value;
      }) // Only include valid values
      .map(([key, value]) => `${key}`);

    //console.log("fieldsToUpdate: ", fieldsToUpdate);

    await pg`
    UPDATE fto_project 
    SET ${pg(data, fieldsToUpdate as any)} 
    WHERE pair = ${data.pair.toLowerCase()} 
      AND chain_id = ${data.chain_id} 
      AND creator_api_key = ${data.creator_api_key ?? super_api_key};
  `;

    return true;
  } catch (e) {
    console.log("updateFtoProject error: ", e);
    return false;
  }
};

const revalidateProject = async (data: {
  pair: string;
  chain_id: number;
  creator_api_key?: string;
}) => {
  const res =
    await pg`SELECT * FROM fto_project WHERE pair = ${data.pair.toLowerCase()} and chain_id = ${data.chain_id}`;

  const publicClient = createPublicClientByChain(chainsMap[data.chain_id]);

  if (!res || !res[0]) {
    //create
    let provider = "";
    let project_type = "fto";

    const memePairContract = {
      address: data.pair as `0x${string}`,
      abi: MemePairABI.abi,
    };

    const ftoPairContract = {
      address: data.pair as `0x${string}`,
      abi: MUBAI_FTO_PAIR_ABI,
    };

    await publicClient
      .readContract({
        ...ftoPairContract,
        functionName: "launchedTokenProvider",
      })
      .then((data: string) => {
        console.log("data: ", data);
        provider = data.toLowerCase();
      })
      .catch((e) => {
        console.log("ftoPairContract error", e);
        project_type = "meme";
      });

    if (!provider) {
      await publicClient
        .readContract({ ...memePairContract, functionName: "memeToken" })
        .then((data) => {
          console.log("data: ", data);
          provider = data.toLowerCase();
        })
        .catch((e) => {
          console.log("memePairContract error", e);
          project_type = "";
        });
    }

    // if (!provider) {
    //   return null;
    // }

    await createFtoProject({
      pair: data.pair,
      chain_id: data.chain_id,
      provider: provider ?? "",
      creator_api_key: data.creator_api_key ?? super_api_key,
      project_type: project_type,
    });

    return await selectFtoProject(data);
  } else {
    //revalidate
    let needUpdate = false;
    let project_type = res[0].project_type;
    let provider = res[0].provider;

    if (!project_type || project_type == "" || !provider || provider == "") {
      needUpdate = true;
      project_type = "fto";

      const memePairContract = {
        address: data.pair as `0x${string}`,
        abi: MemePairABI.abi,
      };

      const ftoPairContract = {
        address: data.pair as `0x${string}`,
        abi: MUBAI_FTO_PAIR_ABI,
      };

      await publicClient
        .readContract({
          ...ftoPairContract,
          functionName: "launchedTokenProvider",
        })
        .then((data: string) => {
          provider = data.toLowerCase();
        })
        .catch(() => {
          project_type = "meme";
        });

      if (!provider) {
        await publicClient
          .readContract({ ...memePairContract, functionName: "tokenDeployer" })
          .then((data) => {
            provider = data.toLowerCase();
          })
          .catch(() => {
            project_type = "";
          });
      }

      // if (!provider) {
      //   return null;
      // }
    }

    if (needUpdate) {
      const updateData = {
        pair: data.pair,
        chain_id: data.chain_id,
        creator_api_key: data.creator_api_key ?? super_api_key,
        name: res[0].name,
        provider: provider,
        project_type: project_type,
      };

      await updateFtoProject(updateData);

      return await selectFtoProject(data);
    }
  }
};

const selectFtoProject = async (data: { pair: string; chain_id: number }) => {
  const res = await pg<
    {
      id: number;
      twitter: string;
      telegram: string;
      website: string;
      description: string;
      logo_url: string;
      name: string;
      provider: string;
      project_type: string;
      banner_url: string;
    }[]
  >`SELECT id,twitter,logo_url, telegram, website,description,name, provider, project_type,banner_url  FROM fto_project WHERE pair = ${data.pair.toLowerCase()} and chain_id = ${
    data.chain_id
  }`;
  console.log("res: ", res);
  return res;
};
