// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getDefinedTokenPriceForLast3Years,
  getPriceOfTokensInNetwork,
} from "@/lib/defined/defined";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await getDefinedTokenPriceForLast3Years(
      "0xebF244521CCAc3C5a18FeAE79b4BaFBFc8926B46",
      "80085"
    );
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
