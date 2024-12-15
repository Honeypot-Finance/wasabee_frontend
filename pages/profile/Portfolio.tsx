import { observer } from "mobx-react-lite";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { TokenBalanceCard } from "@/components/TokenBalanceCard/TokenBalanceCard";
import { portfolio } from "@/services/portfolio";
import { useEffect } from "react";

export const PortfolioTab = observer(() => {
  useEffect(() => {
    portfolio.initPortfolio();
  }, []);

  return (
    <Card className="bg-[#1C1C1C] border-none">
      <CardBody className="p-0">
        <table className="w-full">
          <thead className="bg-[#323232] text-white">
            <tr>
              <th className="py-4 px-6 text-left">Asset</th>
              <th className="py-4 px-6 text-right">Price</th>
              <th className="py-4 px-6 text-right">Balance</th>
              <th className="py-4 px-6 text-right">Proportion</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D2D2D]">
            {portfolio.isLoading
              ? // Skeleton loading rows
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index}>
                      <td className="py-4 px-6">
                        <Skeleton className="h-12 w-32 rounded-lg" />
                      </td>
                      <td className="py-4 px-6">
                        <Skeleton className="h-12 w-24 rounded-lg ml-auto" />
                      </td>
                      <td className="py-4 px-6">
                        <Skeleton className="h-12 w-24 rounded-lg ml-auto" />
                      </td>
                      <td className="py-4 px-6">
                        <Skeleton className="h-12 w-24 rounded-lg ml-auto" />
                      </td>
                      <td className="py-4 px-6">
                        <Skeleton className="h-12 w-24 rounded-lg mx-auto" />
                      </td>
                    </tr>
                  ))
              : portfolio.sortedTokens.map((token) => (
                  <TokenBalanceCard key={token.address} token={token} />
                ))}
          </tbody>
        </table>

        <div className="p-4 border-t border-[#2D2D2D]">
          <div className="flex justify-between items-center">
            <span className="text-white">Total Portfolio Value:</span>
            {portfolio.isLoading ? (
              <Skeleton className="h-8 w-32 rounded-lg" />
            ) : (
              <span className="text-white font-bold">
                ${portfolio.totalBalanceFormatted}
              </span>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
});

export default PortfolioTab;
