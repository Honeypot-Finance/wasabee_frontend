// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDefinedTokenPriceForLast3Years } from "@/lib/defined/defined";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { tokenaddress, networkId } = req.query;
      if (!tokenaddress || !networkId) {
        throw new Error("Invalid query parameters.");
      }
      const data = await getDefinedTokenPriceForLast3Years(
        tokenaddress as string,
        networkId as string
      );
      res.status(200).json({
        status: "success",
        message: "success",
        data: { ...data },
      } as ApiResponseType);
    } else {
      res.status(405).json({
        status: "error",
        message: "method not allowed",
      } as ApiResponseType);
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ status: "error", message: error ?? "" } as ApiResponseType);
  }
}
