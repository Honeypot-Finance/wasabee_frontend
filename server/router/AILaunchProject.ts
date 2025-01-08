import {
  authProcedure,
  publicProcedure,
  rateLimitMiddleware,
  router,
} from "../trpc";
import z from "zod";
import { discussionService } from "../service/discussion";

const alphfa_network_api_key = process.env.ALPHFA_NETWORK_API_KEY ?? "";

export const aiLaunchProjectRouter = router({
  generateAiProject: publicProcedure
    // .use(rateLimitMiddleware({
    //   limit: 10,
    // }))
    .input(
      z.object({
        wallet_address: z.string(),
        prompt_input: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (!alphfa_network_api_key) {
        throw new Error("Alphfa Network API key is not set");
      }

      console.log("alphfa_network_api_key:", alphfa_network_api_key);
      console.log("input.prompt_input:", input.prompt_input);

      // 调用方式如下 curl --location --request POST 'https://api.alphaos.net/open-apis/ai/create-token' \
      // --header 'x-api-key: Fa9wsVJYhJYLXL8GC16jnbGeGNKvzJBmgNLfPan68Bn3B6iUCfjr8qRaOzXhmm1T' \
      // --header 'Accept: */*' \
      // --header 'Host: api.alphaos.net' \
      // --header 'Connection: keep-alive' \
      // --header 'Content-Type: application/x-www-form-urlencoded' \
      // --data-urlencode 'inputs=I love McDonald'\''s and I want to generate a token for McDonald'\''s first step into the blockchain'

      // 返回体中 { data: { name, symbol, image, description } } 是代币的信息，如果 data 中包的是 tip 字段，说明用户提供的内容质量太低，可以把 tip 直接展示给用户

      const response = await fetch(
        "https://api.alphaos.net/open-apis/ai/create-token",
        {
          method: "POST",
          headers: {
            "x-api-key": alphfa_network_api_key,
            "Content-Type": "application/x-www-form-urlencoded",
            connection: "keep-alive",
            host: "api.alphaos.net",
            Accept: "*/*",
          },
          keepalive: true,
          body: `inputs=${input.prompt_input}`,
        }
      );
      const data = await response.json();

      console.log(data);
      return data;
    }),
});
