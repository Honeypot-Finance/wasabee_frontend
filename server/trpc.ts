import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import type {
  CreateNextContextOptions,
  NextApiRequest,
} from "@trpc/server/adapters/next";
import { helper } from "@/lib/helper";
import { SiweMessage } from "siwe";
import { userService } from "./service/user";

export const getUser = async (req: NextApiRequest) => {
  if (req.headers.message && req.headers.signature) {
    const message = Buffer.from(
      req.headers.message as string,
      "base64"
    ).toString("utf-8");
    const signature = Buffer.from(
      req.headers.signature as string,
      "base64"
    ).toString("utf-8");
    try {
      const siweMessage = new SiweMessage(message);

      const res = await siweMessage.verify({ signature });
      const address = res.data.address.toLowerCase();
      const user = await userService.getUser({
        provider: address,
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export const createContext = async ({ req }: CreateNextContextOptions) => {
  const user = await getUser(req);
  return {
    user,
    req
  };
};
// You can use any variable name you like.
// We use t to keep things simple.
export const t = initTRPC.context<typeof createContext>().meta<{
  
}>().create({
  transformer: superjson,
});
export const router = t.router;
export const publicProcedure = t.procedure;

export const authProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx,
  });
});
