import { authProcedure, publicProcedure, router } from "../trpc";
import z from "zod";
import PQueue from "p-queue";
import { ftoService } from "../service/fto";
import { cacheProvider, getCacheKey } from "@/lib/server/cache";
import { id } from "ethers/lib/utils";

const queue = new PQueue({ concurrency: 10 });

const api_key = process.env.FTO_API_KEY ?? "";

export const ftoRouter = router({
  createProject: publicProcedure
    .input(
      z.object({
        chain_id: z.number(),
        pair: z.string(),
        provider: z.string(),
        project_type: z.string().optional(),
        projectName: z.string(),
        project_logo: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await ftoService.createFtoProject({ ...input, creator_api_key: api_key });
    }),
  getProjectInfo: publicProcedure
    .input(
      z.object({
        pair: z.string(),
        chain_id: z.number(),
      })
    )
    .output(
      z
        .object({
          id: z.number(),
          twitter: z.string().or(z.null()),
          telegram: z.string().or(z.null()),
          website: z.string().or(z.null()),
          description: z.string().or(z.null()),
          logo_url: z.string().or(z.null()),
          name: z.string().or(z.null()),
          provider: z.string(),
          project_type: z.string().or(z.null()),
          banner_url: z.string().or(z.null()),
        })
        .or(z.null())
    )
    .query(async ({ input }) => {
      return cacheProvider.getOrSet(
        getCacheKey("getProjectInfo", input),
        async () => {
          const info = await ftoService.getProjectInfo({
            ...input,
            creator_api_key: api_key,
          });
          return info;
        }
      );
    }),
  getProjectsByAccount: publicProcedure
    .input(
      z.object({
        provider: z.string(),
        chain_id: z.number(),
      })
    )
    .query(async ({ input }) => {
      return cacheProvider.getOrSet(
        getCacheKey("getProjectsByAccount", input),
        async () => ftoService.getFtoProjectsByAccount(input)
      );
    }),
  createOrUpdateProjectInfo: authProcedure
    .input(
      z.object({
        twitter: z.string(),
        telegram: z.string(),
        website: z.string(),
        description: z.string(),
        projectName: z.string(),
        pair: z.string(),
        chain_id: z.number(),
        project_type: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await ftoService.createOrUpdateProjectInfo({
        ...input,
        creator_api_key: api_key,
      });
    }),
  updateProjectLogo: authProcedure
    .input(
      z.object({
        logo_url: z.string(),
        pair: z.string(),
        chain_id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);
      await ftoService.updateFtoLogo({
        logo_url: input.logo_url,
        pair: input.pair,
        chain_id: input.chain_id,
        creator_api_key: api_key,
      });
    }),
  updateProjectBanner: authProcedure
    .input(
      z.object({
        banner_url: z.string(),
        pair: z.string(),
        chain_id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);
      await ftoService.updateProjectBanner({
        banner_url: input.banner_url,
        pair: input.pair,
        chain_id: input.chain_id,
        creator_api_key: api_key,
      });
    }),
  createOrUpdateProjectVotes: publicProcedure
    .input(
      z.object({
        project_pair: z.string(),
        wallet_address: z.string(),
        vote: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await ftoService.createOrUpdateProjectVotes(input);
    }),
  getProjectVotes: publicProcedure
    .input(
      z.object({
        pair: z.string(),
      })
    )
    .output(
      z.object({
        rocket_count: z.number(),
        fire_count: z.number(),
        poo_count: z.number(),
        flag_count: z.number(),
      })
    )
    .query(async ({ input }) => {
      return cacheProvider.getOrSet(
        getCacheKey("getProjectVotes", input),
        async () => ftoService.getProjectVotes(input)
      );
    }),
  revalidateProjectType: publicProcedure
    .input(
      z.object({
        pair: z.string(),
        chain_id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await ftoService.revalidateProject(input);
    }),
});
