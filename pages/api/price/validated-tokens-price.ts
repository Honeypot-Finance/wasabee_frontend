import type { NextApiResponse, NextApiRequest, PageConfig } from "next";
import { appRouter, caller } from "@/server/_app";
import { networksMap } from "@/services/chain";
import { TokenCurrentPriceResponseType } from "@/services/priceFeed/priceFeedTypes";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const chainId = request.query.chain;
  if (!chainId) {
    return response.status(400).json({
      s: "error",
      errmsg: "chainId is required",
    });
  }

  let output: TokenCurrentPriceResponseType[] = [];

  for (let i = 0; i < 100; i += 10) {
    console.log(
      Object.keys(networksMap[chainId as string].validatedTokensInfo).slice(
        i,
        i + 10
      )
    );
    const res = await caller.priceFeed.getMultipleTokenPrice({
      chainId: chainId as string,
      tokenAddresses: Object.keys(
        networksMap[chainId as string].validatedTokensInfo
      ).slice(i, i + 10),
    });

    if (res.status === "error") {
      return response.status(500).json({
        s: "error",
        errmsg: res.message,
      });
    } else {
      output = output.concat(res.data);
    }
  }

  return response.status(200).json({
    s: "ok",
    data: output.map((d) => ({
      ...networksMap[chainId as string].validatedTokensInfo[d.address],
      address: d.address,
      price: d.price,
      lastUpdated: d.lastUpdated,
    })),
  });
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
