import { trpcClient } from "@/lib/trpc";
import React from "react";

interface LaunchChartProps {
  tokenAddress: string;
}

const LaunchChart: React.FC<LaunchChartProps> = ({ tokenAddress }) => {
  // trpcClient.indexerFeedRouter.getMemeGraphData
  //   .query({
  //     tokenAddress,
  //   })
  //   .then((data) => {
  //     console.log("chart data", data);
  //   });
  const data = [
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732499928",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "57485000000000000000000",
      currentAmount: "208639270973154285886737",
      timestamp: "1732499928",
      txHash:
        "0xb1c8d5a5eebed9f1859353a7f00c4c39d60735bee6bb3596eedd07f2bcf18206",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732484820",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "10000000000000000000000",
      currentAmount: "151154270973154285886737",
      timestamp: "1732484820",
      txHash:
        "0x35f964f8b8bf8dc58f207a4529e383254e3358da663203faaa72db0a43447881",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732478436",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "5000000000000000000",
      currentAmount: "141154270973154285886737",
      timestamp: "1732478436",
      txHash:
        "0xf1df3ce419fd16cad4ae6838c98e6b76241f368f0e0df054420f7767aea082c1",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732472627",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "10000000000000000000000",
      currentAmount: "141149270973154285886737",
      timestamp: "1732472627",
      txHash:
        "0x14ff313d72c1ed4638057abf3d95620b8d50be9ae1def4104380bc6d19096430",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732471666",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "100000000000000000000",
      currentAmount: "131149270973154285886737",
      timestamp: "1732471666",
      txHash:
        "0xa8f81d3c5d8da2d994b96f0ca68313a2dcca3a4c2c6dbfd3c2798079baa09631",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732465182",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "2999000000000000000000",
      currentAmount: "131049270973154285886737",
      timestamp: "1732465182",
      txHash:
        "0x1ae512442b509473671ca72527cd12c4567383d4226af0712b0be3a03809241c",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732461649",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "8000000000000000000000",
      currentAmount: "128050270973154285886737",
      timestamp: "1732461649",
      txHash:
        "0x1cebb43fef505ddfb7e55b6ca66869f7a6b0e17d600db3bfc0d304381208f1cf",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732461523",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "2000000000000000000000",
      currentAmount: "120050270973154285886737",
      timestamp: "1732461523",
      txHash:
        "0xe2e302d019f56b3b5b5bfecb43f85ae27917d98100e835cc378c70e3de661c43",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732460681",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "1000000000000000000",
      currentAmount: "118050270973154285886737",
      timestamp: "1732460681",
      txHash:
        "0x069d18c79d42c707b9da76ffafa37ecf8638a5d3059b7c710d010fdf6fc28c75",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732459575",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "20000000000000000000000",
      currentAmount: "118049270973154285886737",
      timestamp: "1732459575",
      txHash:
        "0xce0df01817bef184010fad962a14caad2474d4266700e6bf7e9d89926f248ed6",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732456543",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "1000000000000000000",
      currentAmount: "98049270973154285886737",
      timestamp: "1732456543",
      txHash:
        "0xb47f6235b2a72bf1bfd2064a046c43351c78b1e90cd7e94903598a3516954b3d",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732445645",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "1000000000000000000",
      currentAmount: "98048270973154285886737",
      timestamp: "1732445645",
      txHash:
        "0xfa5393a1e4d313177cf2966cd76cdae57450881b405bb66bae6bcb6a14a943e0",
    },
    {
      id: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed1732441977",
      launchId: "0x0e3d1c49a07ebd3b972e42e65b2eac492228e7ed",
      amount: "98047270973154285886737",
      currentAmount: "98047270973154285886737",
      timestamp: "1732441977",
      txHash:
        "0x4a2d977d8e39d58beac3b9bdc7588333b7aeae17682a1000d23506d95ad71914",
    },
  ];
  return <div className="flex flex-col gap-y-2">{tokenAddress}</div>;
};

export default LaunchChart;
