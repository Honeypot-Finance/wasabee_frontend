// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { LRUCache } from "lru-cache";
import { createPublicClientByChain } from "@/lib/client";
import BigNumber from "bignumber.js";
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { berachainBartioTestnet } from "@/lib/chain";

const ethPublicClient = createPublicClientByChain(mainnet)
const beraPublicClient = createPublicClientByChain(berachainBartioTestnet)
const account = privateKeyToAccount(process.env.FAUCET_PRIVATE_KEY! as `0x${string}`) 
 
const walletClient = createWalletClient({
  account,
  chain: berachainBartioTestnet,
  transport: http()
})

const ipCache = new LRUCache<string, {
  claimableUntil: number;
}>({
  max: 100000,
  ttl: 1000 * 60 * 60 * 24,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = requestIp.getClientIp(req);
  const query = req.query;
  const address = query.address;
  if (!ip) {
    res.status(200).json({ 
      success: false, 
      message: "Invalid IP"
     });
  }
  const cache = ipCache.get(JSON.stringify(ip!));
  console.log('ip', ip, cache)
  if (cache) {
    res.status(200).json(
      {
        success: false,
        data: {
          claimableUntil: cache.claimableUntil,
        },
        message: `You can claim after ${new Date().toISOString()}`,
      }
    );
    return
  } else {
    const ethBalance = await ethPublicClient.getBalance({
      address: address as `0x${string}`,
    }); 
    console.log('ethBalance', ethBalance.toString())
    if (new BigNumber(ethBalance.toString()).lt(0.01 * 10 ** 18)) {
      res.status(200).json({ 
        success: false, 
        message: "Please make sure you have at least 0.01ETH to claim"
      })
      return
    }
    const preparedReq = await beraPublicClient.prepareTransactionRequest({
      // address: address as `0x${string}`,
      to: address as `0x${string}`,
      value: BigInt(0.01 * 10 ** 18),
    });
    const hash = await walletClient.sendTransaction(preparedReq);
    console.log('hash', hash)
    const sendRes = await beraPublicClient.waitForTransactionReceipt({
      hash,
    })
    if (sendRes.status === 'success') {
      ipCache.set(JSON.stringify(ip!), {
        claimableUntil: Date.now() + 1000 * 60 * 60 * 24,
      });
      res.status(200).json({ success: true, data: {
        hash: hash
      },message: `Claimed Successful` });
    } else {
      res.status(200).json({ success: false,data: {
        hash: hash
      }, message: "Claimed Failed" });
    }

  }
}
