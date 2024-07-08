// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { trpcClient } from "@/lib/trpc";
import { resolutionType } from "@/services/priceFeed/priceFeedTypes";
import { priceFeedRouter } from "@/server/router/priceFeed";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  //   Object.entries(req.query).forEach(([key, value]) => {
  //     console.log(key, value);
  //   });

  const ticker = req.query.symbol as string;
  const resolution = req.query.resolution as resolutionType;
  const from = req.query.from as string;
  const to = req.query.to as string;
  const countback = req.query.countback as string;

  const symbol = ticker.split(":")[0];
  const chain = ticker.split(":")[1];
  const address = ticker.split(":")[2];

  const data = await trpcClient.priceFeed.getChartData.query({
    chainId: chain,
    tokenAddress: address,
    from: parseInt(from),
    to: parseInt(to),
    resolution: resolution,
  });

  if (data.status === "success") {
    console.log(data.data);
    res.status(200).json({
      s: "ok",
      t: data.data.getBars.t,
      c: data.data.getBars.c,
      o: data.data.getBars.o,
      h: data.data.getBars.h,
      l: data.data.getBars.l,
    });
  } else if (data.status === "error") {
    return res.status(500).json({
      s: "error",
      errmsg: data.message,
    });
  }
}
