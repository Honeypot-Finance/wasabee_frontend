import { useRouter } from "next/router";

interface LeaderboardItem {
  rank: number;
  walletAddress: string;
  username?: string;
  xp: number;
}

const LeaderboardPage = () => {
  const router = useRouter();

  const leaderboardData: LeaderboardItem[] = [
    {
      rank: 1,
      walletAddress: "0x5906B3Af789664fb199a08B16b413f2adc215846",
      xp: 176440,
    },
    {
      rank: 2,
      walletAddress: "0x2A4F47923cf68e2329624575B19F4Af4ae9Cf82",
      xp: 157350,
    },
    {
      rank: 3,
      walletAddress: "0xbe8F5C0B7cC2098b967fB812129F546B83A32A90",
      xp: 134300,
    },
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

  return (
    <div className="w-full">
      <div className="max-w-[1200px] w-full mx-auto bg-[#FFCD4D] rounded-3xl relative overflow-hidden">
        <div className="bg-[url('/images/pumping/outline-border.png')] bg-contain bg-repeat-x bg-left-top h-[90px] absolute -top-1 left-0 w-full"></div>
        <div className="max-w-[1200px] w-full mx-auto px-6 pt-[90px] pb-[70px]">
          <div className="max-w-[480px] lg:max-w-[720px] xl:max-w-[1200px] mx-auto">
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

            <div className="bg-[#202020] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-xl text-white font-bold">Top Traders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#323232] text-white">
                    <tr>
                      <th className="py-4 px-6 text-left text-base">Rank</th>
                      <th className="py-4 px-6 text-left text-base">
                        Wallet Address
                      </th>
                      <th className="py-4 px-6 text-left text-base">
                        Username
                      </th>
                      <th className="py-4 px-6 text-right text-base">XP</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {leaderboardData.map((item) => (
                      <tr
                        key={item.rank}
                        className="border-b border-gray-700 hover:bg-[#2a2a2a] transition-colors"
                      >
                        <td className="py-4 px-6 text-base">{item.rank}</td>
                        <td className="py-4 px-6 text-base font-mono">
                          {item.walletAddress.slice(0, 6)}...
                          {item.walletAddress.slice(-4)}
                        </td>
                        <td className="py-4 px-6 text-base">
                          {item.username || "-"}
                        </td>
                        <td className="py-4 px-6 text-right text-base">
                          {item.xp.toLocaleString()}
                        </td>
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
