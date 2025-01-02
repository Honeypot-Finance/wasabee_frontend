import { ColumnDef } from "@tanstack/react-table";
import { HeaderItem } from "./common";
import { Address } from "viem";
import { DynamicFeePluginIcon } from "../PluginIcons";
import { usePoolPlugins } from "@/lib/algebra/hooks/pools/usePoolPlugins";
import { Skeleton } from "@/components/ui/skeleton";
import { FarmingPluginIcon } from "../PluginIcons";
import { useCurrency } from "@/lib/algebra/hooks/common/useCurrency";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/algebra/ui/hover-card";
import { TokenFieldsFragment } from "@/lib/algebra/graphql/generated/graphql";
import { formatPercent } from "@/lib/algebra/utils/common/formatPercent";
import { formatUSD } from "@/lib/algebra/utils/common/formatUSD";
import { ReactNode } from "react";
import TokenLogo from "@/components/TokenLogo/TokenLogo";
import { Token } from "@/services/contract/token";
import { locale } from "dayjs";

interface Pair {
  token0: TokenFieldsFragment;
  token1: TokenFieldsFragment;
}

interface Pool {
  marktetcap: any;
  id: Address;
  pair: Pair;
  fee: number;
  tvlUSD: number;
  volume24USD: number;
  poolMaxApr: number;
  poolAvgApr: number;
  avgApr: number;
  farmApr: number;
  isMyPool: boolean;
  hasActiveFarming: boolean;
  createdAtTimestamp: number;
  liquidity: any;
  token0Price: any;
  changeHour: any;
  change24h: any;
  changeWeek: any;
  changeMonth: any;
  txCount: any;
  volumeUSD: any;
}

function timeSince(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const diff = now - timestamp; // Time difference in seconds

  if (diff < 60) return `${diff}s`; // Seconds
  if (diff < 3600) return `${Math.floor(diff / 60)}m`; // Minutes
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`; // Hours
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d`; // Days
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo`; // Months
  return `${Math.floor(diff / 31536000)}y`; // Years
}

const PoolPair = ({ pair, fee }: Pool) => {
  const token0 = pair.token0.id as Address;
  const token1 = pair.token1.id as Address;

  const currencyA = useCurrency(token0, true);
  const currencyB = useCurrency(token1, true);

  return (
    <div className="flex items-center gap-4 ml-2">
      <div className="flex">
        <div className="z-10">
          <TokenLogo
            size={30}
            token={Token.getToken({
              address: token0,
            })}
          />
        </div>
        <div className="-ml-3">
          <TokenLogo
            size={30}
            token={Token.getToken({
              address: token1,
            })}
          />
        </div>
      </div>

      {currencyA && currencyB ? (
        <div>{`${currencyA?.symbol} - ${currencyB?.symbol}`}</div>
      ) : (
        <Skeleton className="h-[20px] w-[90px] bg-card" />
      )}

      <div className="bg-muted-primary text-primary-text rounded-xl px-2 py-1">{`${fee}%`}</div>
    </div>
  );
};

export const Plugins = ({ poolId }: { poolId: Address }) => {
  const { dynamicFeePlugin, farmingPlugin } = usePoolPlugins(poolId);

  return (
    <div className="flex gap-2">
      {dynamicFeePlugin && <DynamicFeePluginIcon />}
      {farmingPlugin && <FarmingPluginIcon />}
    </div>
  );
};

export const AvgAPR = ({
  children,
  avgApr,
  farmApr,
  maxApr,
}: {
  children: ReactNode;
  avgApr: string;
  farmApr: string | undefined;
  maxApr: string;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <p>Avg. APR - {avgApr}</p>
        {farmApr && <p>Farm APR - {farmApr}</p>}
        <p>Max APR - {maxApr}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

// export const poolsColumns: ColumnDef<Pool>[] = [
//   {
//     accessorKey: "pair",
//     header: () => <HeaderItem className="ml-2">Pool name</HeaderItem>,
//     cell: ({ row }) => <PoolPair {...row.original} />,
//     filterFn: (v, _, value) =>
//       [
//         v.original.pair.token0.symbol,
//         v.original.pair.token1.symbol,
//         v.original.pair.token0.name,
//         v.original.pair.token1.name,
//       ]
//         .join(" ")
//         .toLowerCase()
//         .includes(value),
//   },
//   {
//     accessorKey: "plugins",
//     header: () => <HeaderItem>Plugins</HeaderItem>,
//     cell: ({ row }) => <Plugins poolId={row.original.id} />,
//     filterFn: (v, _, value: boolean) => v.original.hasActiveFarming === value,
//   },
//   {
//     accessorKey: "tvlUSD",
//     header: ({ column }) => (
//       <HeaderItem
//         sort={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         isAsc={column.getIsSorted() === "asc"}
//       >
//         TVL
//       </HeaderItem>
//     ),
//     cell: ({ getValue }) => formatUSD.format(getValue() as number),
//   },
//   {
//     accessorKey: "volume24USD",
//     header: ({ column }) => (
//       <HeaderItem
//         sort={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         isAsc={column.getIsSorted() === "asc"}
//       >
//         Volume 24H
//       </HeaderItem>
//     ),
//     cell: ({ getValue }) => formatUSD.format(getValue() as number),
//   },
//   {
//     accessorKey: "fees24USD",
//     header: ({ column }) => (
//       <HeaderItem
//         sort={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         isAsc={column.getIsSorted() === "asc"}
//       >
//         Fees 24H
//       </HeaderItem>
//     ),
//     cell: ({ getValue }) => formatUSD.format(getValue() as number),
//   },
//   {
//     accessorKey: "avgApr",
//     header: ({ column }) => (
//       <HeaderItem
//         sort={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         isAsc={column.getIsSorted() === "asc"}
//       >
//         Avg. APR
//       </HeaderItem>
//     ),
//     cell: ({ getValue, row }) => {
//       return (
//         <AvgAPR
//           avgApr={formatPercent.format(row.original.poolAvgApr / 100)}
//           maxApr={formatPercent.format(row.original.poolMaxApr / 100)}
//           farmApr={
//             row.original.hasActiveFarming
//               ? formatPercent.format(row.original.farmApr / 100)
//               : undefined
//           }
//         >
//           {formatPercent.format((getValue() as number) / 100)}
//         </AvgAPR>
//       );
//     },
//   },
// {
//   accessorKey: "actions",
//   header: () => <></>,
//   cell: () => {
//     return (
//       <div className="space-x-2">
//         <button
//           className="border border-[#E18A20]/40 text-black rounded-lg shrink-0 p-2.5"
//           style={{
//             background:
//               "var(--f-7931-a-2-paints, linear-gradient(180deg, rgba(232, 211, 124, 0.13) 33.67%, #FCD729 132.5%), #F7931A)",
//           }}
//         >
//           Add
//         </button>
//         <button className="border border-[#E18A20]/40 bg-[#E18A20]/40 text-white rounded-lg p-2.5 shrink-0">
//           Remove
//         </button>
//       </div>
//     );
//   },
// },
//];

export const poolsColumns: ColumnDef<Pool>[] = [
  {
    accessorKey: "pair",
    header: () => <HeaderItem className="ml-2">Pool name</HeaderItem>,
    cell: ({ row }) => <PoolPair {...row.original} />,
    filterFn: (v, _, value) =>
      [
        v.original.pair.token0.symbol,
        v.original.pair.token1.symbol,
        v.original.pair.token0.name,
        v.original.pair.token1.name,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value),
  },
  {
    accessorKey: "token0Price",
    id: "token0Price",
    header: () => <HeaderItem className="uppercase">Price</HeaderItem>,
    cell: ({ row }) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(row.original.token0Price);
    },
  },
  {
    accessorKey: "createdAtTimestamp",
    header: () => <HeaderItem className="uppercase">Age</HeaderItem>,
    cell: ({ row }) => timeSince(row?.original?.createdAtTimestamp ?? 0),
  },
  {
    accessorKey: "txCount",
    header: () => <HeaderItem className="uppercase">txns</HeaderItem>,
    cell: ({ row }) => row.original.txCount,
  },
  {
    accessorKey: "volumeUSD",
    header: () => <HeaderItem className="uppercase">volumn</HeaderItem>,
    cell: ({ row }) => (
      <span>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(row?.original?.volumeUSD)}
      </span>
    ),
  },
  {
    accessorKey: "changeHour",
    header: () => <HeaderItem className="uppercase">hour</HeaderItem>,
    cell: ({ row }) => {
      return (
        <span
          style={{ color: row.original.changeHour > 0 ? "#48bb78" : "#F56565" }}
        >
          {row.original.changeHour}%
        </span>
      );
    },
  },
  {
    accessorKey: "change24h",
    header: () => <HeaderItem className="uppercase">24h</HeaderItem>,
    cell: ({ row }) => {
      return (
        <span
          style={{ color: row.original.change24h > 0 ? "#48bb78" : "#F56565" }}
        >
          {row.original.change24h}%
        </span>
      );
    },
  },
  {
    accessorKey: "changeWeek",
    header: () => <HeaderItem className="uppercase">Week</HeaderItem>,
    cell: ({ row }) => {
      return (
        <span
          style={{ color: row.original.changeWeek > 0 ? "#48bb78" : "#F56565" }}
        >
          {row.original.changeWeek}%
        </span>
      );
    },
  },
  {
    accessorKey: "changeMonth",
    header: () => <HeaderItem className="uppercase">Month</HeaderItem>,
    cell: ({ row }) => {
      return (
        <span
          style={{
            color: row.original.changeMonth > 0 ? "#48bb78" : "#F56565",
          }}
        >
          {row.original.changeMonth}%
        </span>
      );
    },
  },
  {
    accessorKey: "liquidity",
    header: () => <HeaderItem className="uppercase">liquidity</HeaderItem>,
    cell: ({ row }) => row.original.liquidity,
  },
  {
    accessorKey: "marktetcap",
    header: () => <HeaderItem className="uppercase">marktet cap</HeaderItem>,
    cell: ({ row }) => row.original.marktetcap,
  },
];

//for hours gain maybe change it to weekly monthly yearly as in our subgraph
