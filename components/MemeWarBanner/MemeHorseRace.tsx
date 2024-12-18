import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import raceFieldBg from "public/images/horserace/race_field.png";
import { Token } from "@/services/contract/token";
import { V3SwapCard } from "@/components/algebra/swap/V3SwapCard";
import { popmodal } from "@/services/popmodal";
import { wallet } from "@/services/wallet";
import { observer } from "mobx-react-lite";
import { getAllRacers, Racer } from "@/lib/algebra/graphql/clients/racer";
import { Tooltip } from "@nextui-org/react";

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
  position: relative;
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

export const MemeHorseRace = observer(() => {
  const [timeIndex, setTimeIndex] = useState(0);
  const [tokens, setTokens] = useState<Record<string, Token>>({});
  const [racers, setRacers] = useState<Racer[]>([]);

  useEffect(() => {
    getAllRacers().then((racers) => {
      setRacers(racers);
    });
  }, []);

  useEffect(() => {
    if (!wallet.isInit || !racers) return;
    // Initialize tokens
    const initTokens = async () => {
      const tokenMap: Record<string, Token> = {};
      for (const racer of racers) {
        const token = Token.getToken({ address: racer.tokenAddress });
        await token.init();
        tokenMap[racer.tokenAddress] = token;
      }
      setTokens(tokenMap);
    };

    initTokens();
  }, [wallet.isInit, racers]);

  // Find the racer with the most data points to use as timeline reference
  const maxTimelineRacer = racers.reduce(
    (prev, current) =>
      current.tokenHourScore.length > prev.tokenHourScore.length
        ? current
        : prev,
    racers[0] || { tokenHourScore: [] }
  );

  // Get sorted unique timestamps across all racers
  const timestamps = [
    ...new Set(
      maxTimelineRacer.tokenHourScore.map((score) =>
        parseInt(score.starttimestamp)
      )
    ),
  ].sort((a, b) => a - b);

  // Get score for a racer at specific timeIndex
  const getRacerScore = (racer: Racer, timestamp: number) => {
    if (timestamp < START_TIMESTAMP) {
      return 0;
    }
    // Find the exact timestamp match first
    const exactScore = racer.tokenHourScore.find(
      (score) => parseInt(score.starttimestamp) === timestamp
    );
    if (exactScore) {
      return parseFloat(exactScore.score);
    }

    // If no exact match, find the latest score before this timestamp
    const lastValidScore = racer.tokenHourScore
      .filter((score) => parseInt(score.starttimestamp) <= timestamp)
      .sort(
        (a, b) => parseInt(b.starttimestamp) - parseInt(a.starttimestamp)
      )[0];

    return lastValidScore ? parseFloat(lastValidScore.score) : 0;
  };

  const getCurrentScores = () => {
    const currentTimestamp = timestamps[timeIndex];
    return racers.map((racer) => ({
      ...racer,
      token: tokens[racer.tokenAddress],
      currentScore: getRacerScore(racer, currentTimestamp),
    }));
  };

  // Calculate max score across all timestamps and racers
  const allTimeHighScore = Math.max(
    ...racers.flatMap((racer) =>
      racer.tokenHourScore.map((score) => parseFloat(score.score))
    )
  );

  const currentRacers = getCurrentScores();
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

  //sorted Rank by latest timestamp
  const getSortedRacers = () => {
    return currentRacers.sort((a, b) => {
      return b.currentScore - a.currentScore;
    });
  };

  return (
    <>
      {racers && racers.length > 0 && timestamps.length > 0 && (
        <>
          <RaceTrack totalRacers={totalRacers}>
            <ContentWrapper totalRacers={totalRacers}>
              <h2>Berachain Derby Dashboard</h2>

              <RaceLanesContainer>
                {currentRacers.map((racer) => (
                  <RaceLane key={racer.tokenAddress}>
                    <RaceTrail
                      position={(racer.currentScore / allTimeHighScore) * 85}
                    />
                    <Tooltip content={racer.token?.symbol}>
                      <RacerIcon
                        className="relative"
                        position={(racer.currentScore / allTimeHighScore) * 85}
                      >
                        {racer.token?.logoURI && (
                          <div
                            onClick={() => handleTokenClick(racer.token)}
                            style={{ cursor: "pointer" }}
                          >
                            <Image
                              src={racer.token?.logoURI}
                              alt={racer.token?.symbol || ""}
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
                          MCAP:{" "}
                          {(racer.currentScore / Math.pow(10, 18)).toFixed(3)}$
                        </span>
                      </RacerIcon>
                    </Tooltip>
                  </RaceLane>
                ))}
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
          {getSortedRacers().map((racer, index) => (
            <div
              key={racer.tokenAddress}
              className="flex justify-start items-center p-2"
            >
              <div>
                <Image
                  src={racer.token?.logoURI}
                  alt={racer.token?.symbol || ""}
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <span className="inline-block w-[150px]">
                  {index === 0 ? `👑` : `${index + 1}.`} {racer.token?.symbol}
                </span>{" "}
                - {(racer.currentScore / Math.pow(10, 18)).toFixed(3)}$
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
});

export default MemeHorseRace;
