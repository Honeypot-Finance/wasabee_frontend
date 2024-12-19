import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import Image from "next/image";
import raceFieldBg from "public/images/horserace/race_field.png";
import { Token } from "@/services/contract/token";
import { V3SwapCard } from "@/components/algebra/swap/V3SwapCard";
import { popmodal } from "@/services/popmodal";
import { wallet } from "@/services/wallet";
import { observer } from "mobx-react-lite";
import { getAllRacers, Racer } from "@/lib/algebra/graphql/clients/racer";
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useSpring, animated } from "react-spring";
import { getTokenTop10Holders } from "@/lib/algebra/graphql/clients/token";
import { Modal, Table } from "@nextui-org/react";
import { TokenTop10HoldersQuery } from "@/lib/algebra/graphql/generated/graphql";
import BigNumber from "bignumber.js";
import { truncateEthAddress } from "@usecapsule/rainbowkit-wallet";
import Link from "next/link";
import { poolsByTokenPair } from "@/lib/algebra/graphql/clients/pool";
import { useRouter } from "next/router";
const START_TIMESTAMP = 1734436800;

const RaceTrack = styled.div<{ totalRacers: number }>`
  width: 100%;
  height: ${(props) => Math.min(70, props.totalRacers * 15)}vh;
  background-image: url(${raceFieldBg.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  border-radius: 10px;
  position: sticky;
  top: 0;
  z-index: 10;
  overflow-y: auto;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
`;

const ContentWrapper = styled.div<{ totalRacers: number }>`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 10px;
  }
`;

const RaceLanesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 0;
`;

const RaceLane = styled.div`
  height: 80px;
  position: relative;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const RaceTrail = styled.div<{ position: number }>`
  position: absolute;
  left: 0;
  height: 8px;
  width: ${(props) => props.position}%;
  background: linear-gradient(
    to right,
    rgba(255, 215, 0, 1),
    rgba(255, 215, 0, 0.5)
  );
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const RacerIcon = styled.div<{ position: number }>`
  position: absolute;
  left: ${(props) => props.position}%;
  transform: translateX(-50%);
  transition: left 0.5s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
`;

const TimeSlider = styled.input`
  width: 100%;
  margin: 20px 0;
`;

const AnimatedValue = styled.span<{ changed: boolean }>`
  display: inline-block;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) =>
    props.changed ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 20px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  position: relative;
  z-index: 1;
`;

const formatMarketCap = (value: number) => {
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  return value.toFixed(2);
};

const LerpingValue = ({
  value,
  formatter = (val: number) => val.toFixed(3),
}: {
  value: number;
  formatter?: (val: number) => string;
}) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    config: { duration: 300 },
    immediate: false,
  });

  return <animated.span>{number.to((val) => formatter(val))}</animated.span>;
};

export const MemeHorseRace = observer(() => {
  const [timeIndex, setTimeIndex] = useState(-1);
  const [tokens, setTokens] = useState<Record<string, Token>>({});
  const [racers, setRacers] = useState<Racer[]>([]);
  const [prevScores, setPrevScores] = useState<Record<string, number>>({});
  const [changedValues, setChangedValues] = useState<Record<string, boolean>>(
    {}
  );
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        // Get initial racers
        const initialRacers = await getAllRacers();

        setRacers(initialRacers);

        // Initialize tokens if wallet is ready
        if (wallet.isInit) {
          const tokenMap: Record<string, Token> = {};
          for (const racer of initialRacers) {
            const token = Token.getToken({ address: racer.tokenAddress });
            await token.init();
            tokenMap[racer.tokenAddress] = token;
          }
          setTokens(tokenMap);
        }

        setIsInitializing(false);

        // Set up interval for updates after initialization
        // const interval = setInterval(async () => {
        //   const updatedRacers = await getAllRacers();
        //   setRacers(updatedRacers);
        // }, 1000);

        // return () => clearInterval(interval);
      } catch (error) {
        console.error("Initialization error:", error);
        setIsInitializing(false);
      }
    };

    initialize();
  }, [wallet.isInit]);

  const maxTimelineRacer = racers.reduce(
    (prev, current) =>
      current.tokenHourScore.length > prev.tokenHourScore.length
        ? current
        : prev,
    racers[0] || { tokenHourScore: [] }
  );

  const timestamps = [
    ...new Set(
      maxTimelineRacer.tokenHourScore.map((score) =>
        parseInt(score.starttimestamp)
      )
    ),
  ].sort((a, b) => a - b);

  const getRacerScore = (racer: Racer, timestamp: number) => {
    if (timestamp < START_TIMESTAMP) {
      return 0;
    }
    const exactScore = racer.tokenHourScore.find(
      (score) => parseInt(score.starttimestamp) === timestamp
    );
    if (exactScore) {
      return parseFloat(exactScore.score);
    }

    const lastValidScore = racer.tokenHourScore
      .filter((score) => parseInt(score.starttimestamp) <= timestamp)
      .sort(
        (a, b) => parseInt(b.starttimestamp) - parseInt(a.starttimestamp)
      )[0];

    return lastValidScore ? parseFloat(lastValidScore.score) : 0;
  };

  const getHourlyChange = (racer: Racer, currentTimestamp: number) => {
    const currentScore = getRacerScore(racer, currentTimestamp);

    const oneHourAgoTimestamp = currentTimestamp - 3600;
    const previousScore = getRacerScore(racer, oneHourAgoTimestamp);

    if (previousScore === 0) return 0;
    return ((currentScore - previousScore) / previousScore) * 100;
  };

  const getCurrentScores = () => {
    const currentTimestamp = timestamps[timeIndex];
    return racers.map((racer) => ({
      ...racer,
      tokenOnchainData: tokens[racer.tokenAddress],
      currentScore: getRacerScore(racer, currentTimestamp),
      hourlyChange: getHourlyChange(racer, currentTimestamp),
    }));
  };

  const allTimeHighScore = Math.max(
    ...racers.flatMap((racer) =>
      racer.tokenHourScore.map((score) => parseFloat(score.score))
    )
  );

  const currentRacers = useMemo(() => getCurrentScores(), [getCurrentScores]);

  const totalRacers = racers.length;

  const handleTokenClick = (token: Token) => {
    popmodal.openModal({
      content: (
        <V3SwapCard
          fromTokenAddress={wallet.currentChain.platformTokenAddress.HPOT}
          toTokenAddress={token.address}
        />
      ),
    });
  };

  const getSortedRacers = () => {
    return currentRacers.sort((a, b) => {
      return b.currentScore - a.currentScore;
    });
  };

  useEffect(() => {
    const currentScores = currentRacers.reduce(
      (acc, racer) => {
        acc[racer.tokenAddress] = racer.currentScore;
        return acc;
      },
      {} as Record<string, number>
    );

    const newChangedValues: Record<string, boolean> = {};
    Object.keys(currentScores).forEach((address) => {
      if (
        prevScores[address] !== undefined &&
        prevScores[address] !== currentScores[address]
      ) {
        newChangedValues[address] = true;
      }
    });

    setChangedValues(newChangedValues);
    setPrevScores(currentScores);

    const timer = setTimeout(() => {
      setChangedValues({});
    }, 300);

    return () => clearTimeout(timer);
  }, [racers]);

  useEffect(() => {
    if (timestamps.length > 0 && timeIndex === -1) {
      setTimeIndex(timestamps.length - 1);
    }
  }, [timestamps.length, timeIndex]);

  useEffect(() => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollTop);
    }
  }, [racers]);

  useEffect(() => {
    if (containerRef.current && scrollPosition > 0) {
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  const handleShowHolders = async (tokenId: string) => {
    if (!racers.find((racer) => racer.tokenAddress === tokenId)) {
      return;
    }
    try {
      setIsLoading(true);
      const data = await getTokenTop10Holders(tokenId);
      popmodal.openModal({
        content: (
          <TopHoldersList
            racer={racers.find((racer) => racer.tokenAddress === tokenId)!}
            holders={data}
          />
        ),
      });
    } catch (error) {
      console.error("Error fetching holders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLP = async (tokenAddress: string) => {
    const pools = await poolsByTokenPair(
      tokenAddress,
      wallet.currentChain.platformTokenAddress.HPOT
    );

    if (pools && pools.length > 0) {
      const pool = pools[0];
      //redirect to add liquidity page
      router.push(`/pooldetail/${pool.id}`);
    }
  };

  const TopHoldersList = ({
    racer,
    holders,
  }: {
    racer: Racer;
    holders: TokenTop10HoldersQuery;
  }) => {
    const TotalHoldingValue = holders.token?.holders?.reduce(
      (acc, holder) => acc + Number(holder.holdingValue),
      0
    );
    console.log(TotalHoldingValue);
    return (
      <Table>
        <TableHeader>
          <TableColumn>Rank</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>Balance</TableColumn>
          <TableColumn>Percentage</TableColumn>
        </TableHeader>
        <TableBody>
          {holders.token?.holders?.map((holder, index) => (
            <TableRow key={holder.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{truncateEthAddress(holder.account.id)}</TableCell>
              <TableCell>
                {BigNumber(holder.holdingValue).dividedBy(1e18).toFixed(0)}{" "}
                {holders.token?.symbol}
              </TableCell>
              <TableCell>
                {(
                  (holder.holdingValue / (TotalHoldingValue ?? 0)) *
                  100
                ).toFixed(2)}
                %
              </TableCell>
            </TableRow>
          )) || []}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="relative">
      {isInitializing ? (
        <LoadingWrapper>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-lg text-gray-300">Loading Derby Data...</div>
        </LoadingWrapper>
      ) : racers && racers.length > 0 && timestamps.length > 0 ? (
        <>
          <RaceTrack totalRacers={totalRacers}>
            <ContentWrapper totalRacers={totalRacers}>
              <h2>Berachain Derby Dashboard</h2>

              <RaceLanesContainer className="md:pl-[120px]">
                {currentRacers.map((racer) => {
                  // Calculate rank based on market cap
                  const rank = currentRacers.reduce(
                    (count, other) =>
                      other.currentScore > racer.currentScore
                        ? count + 1
                        : count,
                    0
                  );
                  // Calculate position based on rank with minimum distance of 15%
                  const position =
                    85 - rank * (70 / (currentRacers.length - 1 || 1));

                  return (
                    <RaceLane key={racer.tokenAddress}>
                      <RaceTrail position={Math.max(15, position)} />
                      <Tooltip content={racer.tokenOnchainData?.symbol}>
                        <RacerIcon
                          className="relative"
                          position={Math.max(15, position)}
                        >
                          {racer.tokenOnchainData?.logoURI && (
                            <div
                              onClick={() =>
                                handleTokenClick(racer.tokenOnchainData)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <Image
                                src={racer.tokenOnchainData?.logoURI}
                                alt={racer.tokenOnchainData?.symbol || ""}
                                width={100}
                                height={100}
                                style={{
                                  transition: "transform 0.2s ease-in-out",
                                }}
                                className="scale-100 hover:scale-110"
                              />
                            </div>
                          )}
                          <span
                            className="absolute top-[50%] left-0 translate-x-[-100%] translate-y-[-50%] text-right"
                            style={{
                              color: "#FFFFFF",
                              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                            }}
                          >
                            MCAP: $
                            <LerpingValue
                              value={racer.currentScore / Math.pow(10, 18)}
                              formatter={formatMarketCap}
                            />
                          </span>
                        </RacerIcon>
                      </Tooltip>
                    </RaceLane>
                  );
                })}
              </RaceLanesContainer>

              <TimeSlider
                type="range"
                min={0}
                max={timestamps.length - 1}
                value={timeIndex}
                onChange={(e) => setTimeIndex(parseInt(e.target.value))}
                style={{ cursor: "pointer" }}
              />
              <div>
                Time: {new Date(timestamps[timeIndex] * 1000).toLocaleString()}
              </div>
            </ContentWrapper>
          </RaceTrack>

          <TableContainer>
            <div className="overflow-x-auto" ref={containerRef}>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-3 text-left w-[10%]">Rank</th>
                    <th className="p-3 text-left w-[30%]">Token</th>
                    <th className="p-3 text-left w-[25%]">Market Cap</th>
                    <th className="p-3 text-left w-[15%]">1h Change</th>
                    <th className="p-3 text-left w-[20%]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedRacers().map((racer, index) => (
                    <tr
                      key={racer.tokenAddress}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="p-3 whitespace-nowrap">
                        <span className="flex items-center gap-2">
                          {index === 0 ? `👑` : `${index + 1}.`}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Image
                            src={racer.tokenOnchainData?.logoURI}
                            alt={racer.tokenOnchainData?.symbol || ""}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {racer.tokenOnchainData?.symbol}
                            </span>
                            <span className="text-sm text-gray-400">
                              {racer.tokenOnchainData?.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <AnimatedValue
                          changed={changedValues[racer.tokenAddress]}
                        >
                          <LerpingValue
                            value={racer.currentScore / Math.pow(10, 18)}
                            formatter={formatMarketCap}
                          />
                        </AnimatedValue>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={
                            racer.hourlyChange >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {racer.hourlyChange.toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <button
                          onClick={() =>
                            handleTokenClick(racer.tokenOnchainData)
                          }
                          className="px-4 py-2 mx-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          Swap
                        </button>
                        <button
                          onClick={() => handleShowHolders(racer.tokenAddress)}
                          className="px-4 py-2 mx-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Top Holders
                        </button>
                        <button
                          onClick={() => handleAddLP(racer.tokenAddress)}
                          className="px-4 py-2 mx-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          Add LP
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableContainer>
        </>
      ) : (
        <LoadingWrapper>
          <div className="text-lg text-gray-300">No race data available</div>
        </LoadingWrapper>
      )}
    </div>
  );
});

export default MemeHorseRace;
