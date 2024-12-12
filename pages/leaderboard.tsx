import { useRouter } from "next/router";
import { useState } from "react";

interface LeaderboardItem {
  rank: number;
  walletAddress: string;
  username?: string;
  xp: number;
  totalVolume?: number;
  bought?: number;
  sold?: number;
  platformNet?: number;
  transactions?: number;
  lastActive?: string;
}

interface StatsCard {
  title: string;
  value: string | number;
  subValue?: string;
}

const LeaderboardPage = () => {
  const router = useRouter();
  const [searchAddress, setSearchAddress] = useState("");
  const [showUSD, setShowUSD] = useState(true);

  // 顶部统计数据
  const statsCards: StatsCard[] = [
    { title: "Users", value: 685 },
    { title: "Total Trades", value: 3467 },
    { title: "Total Volume", value: "$275,417.10", subValue: "438,946.07 ₳" },
    { title: "TVL", value: "$25,374.33", subValue: "40,440.34 ₳" },
  ];

  const stats = [
    { title: "Top Trader", address: "0xbe8F...2A90", value: "800 Swaps" },
    { title: "Top Deployer", address: "0xc36f...9062", value: "749 Deploys" },
    {
      title: "Top Participant",
      address: "0x5906...5846",
      value: "6212 Participations",
    },
  ];

  const leaderboardData: LeaderboardItem[] = [
    {
      rank: 1,
      walletAddress: "0xFf1B...eb2382",
      totalVolume: 14066.97,
      bought: 7463.19,
      sold: 6603.78,
      platformNet: -859.41,
      transactions: 33,
      lastActive: "11/30/2024, 6:49:16 PM",
      xp: 176440,
    },
    // ... 其他数据
  ];

  return (
    <div className="w-full">
      <div className="max-w-[1200px] w-full mx-auto bg-[#FFCD4D] rounded-3xl relative overflow-hidden">
        <div className="bg-[url('/images/pumping/outline-border.png')] bg-contain bg-repeat-x bg-left-top h-[90px] absolute -top-1 left-0 w-full"></div>
        <div className="max-w-[1200px] w-full mx-auto px-6 pt-[90px] pb-[70px]">
          <div className="max-w-[480px] lg:max-w-[720px] xl:max-w-[1200px] mx-auto">
            {/* 顶部统计卡片 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              {statsCards.map((stat, index) => (
                <div key={index} className="bg-[#202020] rounded-2xl p-5">
                  <div className="text-gray-400 text-sm mb-2">{stat.title}</div>
                  <div className="text-white text-xl font-medium">{stat.value}</div>
                  {stat.subValue && (
                    <div className="text-gray-400 text-sm">{stat.subValue}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Top Traders/Deployers/Participants */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-[#202020] rounded-2xl p-5">
                  <div>
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-sm ${
                        index === 0
                          ? "bg-[#FFCD4D]"
                          : index === 1
                            ? "bg-purple-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {stat.title}
                    </span>
                  </div>
                  <div className="mt-6 text-xl text-white font-medium mb-2">
                    {stat.address}
                  </div>
                  <div className="text-[#FFCD4D] text-base">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* 搜索栏 */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 flex-1 max-w-md">
                <input
                  type="text"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  placeholder="Search by address"
                  className="w-full bg-[#1a1b1f] border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
                {searchAddress && (
                  <button
                    onClick={() => setSearchAddress("")}
                    className="px-4 py-2 bg-[#2a2a2a] rounded-lg text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">Show values in:</span>
                <button
                  onClick={() => setShowUSD(!showUSD)}
                  className="px-4 py-2 bg-[#2a2a2a] rounded-lg text-white"
                >
                  {showUSD ? "USD" : "ADA"}
                </button>
              </div>
            </div>

            {/* 交易数据表格 */}
            <div className="bg-[#202020] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-xl text-white font-bold">Top Traders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#323232] text-white">
                    <tr>
                      <th className="py-4 px-6 text-left text-base">Address</th>
                      <th className="py-4 px-6 text-left text-base">Total Volume</th>
                      <th className="py-4 px-6 text-left text-base">Bought</th>
                      <th className="py-4 px-6 text-left text-base">Sold</th>
                      <th className="py-4 px-6 text-left text-base">Platform Net</th>
                      <th className="py-4 px-6 text-center text-base">Transactions</th>
                      <th className="py-4 px-6 text-left text-base">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {leaderboardData.map((item) => (
                      <tr
                        key={item.rank}
                        className="border-b border-gray-700 hover:bg-[#2a2a2a] transition-colors"
                      >
                        <td className="py-4 px-6 text-base font-mono text-blue-400">
                          {item.walletAddress}
                        </td>
                        <td className="py-4 px-6 text-base">
                          ${item.totalVolume?.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-base">
                          ${item.bought?.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-base">
                          ${item.sold?.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-base">
                          <span
                            className={
                              item.platformNet && item.platformNet > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            ${item.platformNet && Math.abs(item.platformNet).toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-base">
                          {item.transactions}
                        </td>
                        <td className="py-4 px-6 text-base">{item.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 w-full">
          <div className="bg-[url('/images/pool-detail/bottom-border.svg')] bg-contain bg-repeat-x bg-left-bottom h-[70px] w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
