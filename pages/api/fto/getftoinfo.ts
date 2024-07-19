// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { caller } from "@/server/_app";

interface resType {
  ftoName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ftoaddress, chainid } = req.query;
  console.log(ftoaddress, chainid);
  if (!ftoaddress || chainid) {
    return res.status(400);
  }

  const data = await caller.fto.getProjectInfo({
    pair: ftoaddress as string,
    chain_id: parseInt(chainid as string),
  });

  console.log(data);

  if (!data) {
    return res.status(404).json({ ftoName: "Not Found" });
  }

  res.status(200).json({ ftoName: data.name });

  return data;
}
