import { ftoRouter } from "./router/fto";
import { pairRouter } from "./router/pair";
import { priceFeedRouter } from "./router/priceFeed";
import { indexerFeedRouter } from "./router/indexer";
import { discussionRouter } from "./router/discussion";
import { publicProcedure, router, t } from "./trpc";
import { tokenRouter } from "./router/token";

export const appRouter = router({
  pair: pairRouter,
  fto: ftoRouter,
  priceFeed: priceFeedRouter,
  indexerFeedRouter: indexerFeedRouter,
  discussionRouter: discussionRouter,
  token: tokenRouter
});
// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;

const createCaller = t.createCallerFactory(appRouter);
export const caller = createCaller({
  user: null,
  //@ts-ignore
  req: null,
});
