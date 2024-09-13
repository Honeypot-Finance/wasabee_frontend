import { publicProcedure, router } from "../trpc";
import z from "zod";
import { type PairFilter } from "@/services/launchpad";
import { cacheProvider, getCacheKey } from "@/lib/server/cache";
import { pg } from "@/lib/db";

export const metadataRouter = router({
  getServerMetadata: publicProcedure.query(async () => {
    const res = await pg`SELECT * FROM server_metadata`;
    return res?.[0];
  }),
});
