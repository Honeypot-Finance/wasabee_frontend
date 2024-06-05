import { ftoRouter } from './router/fto';
import { pairRouter } from './router/pair';
import { publicProcedure, router } from './trpc';
 
export const appRouter = router({
  pair: pairRouter,
  fto: ftoRouter
});
 
// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;