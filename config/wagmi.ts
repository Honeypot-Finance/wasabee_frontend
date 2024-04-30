
import { networks } from '@/services/chain';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: 'honeypotfinance',
  projectId: '1d1c8b5204bfbd57502685fc0934a57d',
  // @ts-ignore
  chains: networks.map((network) => network.chain),
  ssr: true, // If your dApp uses server side rendering (SSR)
});
