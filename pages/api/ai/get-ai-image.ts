import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-Type", "application/json");

  // Keep the connection alive
  req.socket.setTimeout(70000); // 70 seconds

  try {
    // Simulate a long-running taskconst res: string =
    await trpc.aiLaunchProject.generateAiProject.query({
      wallet_address: wallet.account as `0x${string}`,
      prompt_input: prompt,
    });
    res.status(200).json({ message: "Success after 60 seconds" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
