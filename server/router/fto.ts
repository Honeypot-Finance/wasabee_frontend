import { authProcedure, publicProcedure, router } from "../trpc";
import z from "zod";
import PQueue from "p-queue";
import { ftoService } from "../service/fto";

const queue = new PQueue({ concurrency: 10 });

export const ftoRouter = router({
  createProject: publicProcedure
    .input(
      z.object({
        chain_id: z.number(),
        pair: z.string(),
        provider: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // const { index } = input;
      await ftoService.createFtoProject(input);
    }),
    getProjectInfo: publicProcedure.input(z.object({
      pair: z.string(),
      chain_id: z.number()
    })).output(z.object({
      twitter: z.string().or(z.null()),
      telegram: z.string().or(z.null()),
      website: z.string().or(z.null()),
      description: z.string().or(z.null()),
      name: z.string().or(z.null()),
      provider: z.string()
    })).query(async ({ input }) => {
      return ftoService.getProjectInfo(input)
    }),
    getProjectsByAccount: publicProcedure
    .input(
      z.object({
        provider: z.string(),
        chain_id: z.number()
      })
    ).query(async ({ input }) => {
        return ftoService.getFtoProjectsByAccount(input)
        }),
  createOrUpdateProjectInfo: authProcedure.input(z.object({
    twitter: z.string(),
    telegram: z.string(),
    website: z.string(),
    description: z.string(),
    projectName: z.string(),
    pair: z.string(),
    chain_id: z.number()
  })).mutation(async ({input}) => {
     await ftoService.createOrUpdateProjectInfo(input)
  })
});
