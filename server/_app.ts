import { ftoRouter } from "./router/fto";
import { pairRouter } from "./router/pair";
import { priceFeedRouter } from "./router/priceFeed";
import { zapRouter } from "./router/zap";
import { publicProcedure, router, t } from "./trpc";

export const appRouter = router({
  pair: pairRouter,
  fto: ftoRouter,
  priceFeed: priceFeedRouter,
  zapRouter: zapRouter,
});
// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;

const createCaller = t.createCallerFactory(appRouter);
export const caller = createCaller({
  user: null,
});
