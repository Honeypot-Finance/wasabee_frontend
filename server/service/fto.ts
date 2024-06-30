import { pg } from "@/lib/db";

export const ftoService = {
  createFtoProject: async (data: {
    pair: string;
    provider: string;
    chain_id: number;
  }) => {
    await pg`INSERT INTO fto_project ${pg({
      pair: data.pair.toLowerCase(),
      provider: data.provider.toLowerCase(),
      chain_id: data.chain_id,
    })}`;
  },
  getProjectInfo: async (data: { pair: string; chain_id: number }) => {
    const res = await pg<
      {
        twitter: string;
        telegram: string;
        website: string;
        description: string;
        name: string;
      }[]
    >`SELECT twitter, telegram, website,description,name  FROM fto_project WHERE pair = ${data.pair.toLowerCase()} and chain_id = ${
      data.chain_id
    }`;
    return res?.[0];
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
    twitter: string;
    telegram: string;
    website: string;
    description: string;
    projectName: string;
    pair: string;
    chain_id: number;
  }) => {
    await pg`INSERT INTO fto_project ${pg({
      twitter: data.twitter,
      telegram: data.telegram,
      website: data.website,
      description: data.description,
      name: data.projectName,
      pair: data.pair.toLowerCase(),
      chain_id: data.chain_id,
    })} ON CONFLICT (pair, chain_id) DO UPDATE SET twitter = ${
      data.twitter
    }, telegram = ${data.telegram}, website = ${data.website}, description = ${
      data.description
    }, name = ${data.projectName}`;
  },
};
