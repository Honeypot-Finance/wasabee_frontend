import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import raceFieldBg from "public/images/horserace/race_field.png";
import { Token } from "@/services/contract/token";
import { V3SwapCard } from "@/components/algebra/swap/V3SwapCard";
import { popmodal } from "@/services/popmodal";
import { wallet } from "@/services/wallet";
import { observer } from "mobx-react-lite";

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

const mockData = {
  racers: [
    {
      tokenAddress: "0x150bcee57b23a79c9dd5e707c8a64c65016215d0",
      tokenHourScore: [
        { starttimestamp: 1734352147, score: 100 },
        { starttimestamp: 1734355747, score: 150 },
        { starttimestamp: 1734359347, score: 200 },
        { starttimestamp: 1734362947, score: 180 },
        { starttimestamp: 1734366547, score: 220 },
        { starttimestamp: 1734370147, score: 250 },
        { starttimestamp: 1734373747, score: 190 },
        { starttimestamp: 1734377347, score: 230 },
      ],
    },
    {
      tokenAddress: "0x5b0c7cccc718ee837238be9323ccb63aee538ff4",
      tokenHourScore: [
        { starttimestamp: 1734352147, score: 50 },
        { starttimestamp: 1734355747, score: 250 },
        { starttimestamp: 1734359347, score: 200 },
        { starttimestamp: 1734362947, score: 280 },
        { starttimestamp: 1734366547, score: 260 },
        { starttimestamp: 1734370147, score: 290 },
        { starttimestamp: 1734373747, score: 240 },
        { starttimestamp: 1734377347, score: 270 },
      ],
    },
    {
      tokenAddress: "0x8b045d02c581284295be33d4f261f8e1e6f78f18",
      tokenHourScore: [
        { starttimestamp: 1734352147, score: 180 },
        { starttimestamp: 1734355747, score: 220 },
        { starttimestamp: 1734359347, score: 280 },
        { starttimestamp: 1734362947, score: 300 },
        { starttimestamp: 1734366547, score: 260 },
        { starttimestamp: 1734370147, score: 310 },
        { starttimestamp: 1734373747, score: 290 },
        { starttimestamp: 1734377347, score: 320 },
      ],
    },
    {
      tokenAddress: "0xff4abcd6d4cea557e4267bc81f1d2064615cb49e",
      tokenHourScore: [
        { starttimestamp: 1734352147, score: 120 },
        { starttimestamp: 1734355747, score: 190 },
        { starttimestamp: 1734359347, score: 160 },
        { starttimestamp: 1734362947, score: 210 },
        { starttimestamp: 1734366547, score: 180 },
        { starttimestamp: 1734370147, score: 230 },
        { starttimestamp: 1734373747, score: 200 },
        { starttimestamp: 1734377347, score: 240 },
      ],
    },
    {
      tokenAddress: "0x3F7AAE503000A08A8d4A9AFefa738b565f3A6CD6",
      tokenHourScore: [
        { starttimestamp: 1734352147, score: 90 },
        { starttimestamp: 1734355747, score: 170 },
        { starttimestamp: 1734359347, score: 240 },
        { starttimestamp: 1734362947, score: 200 },
        { starttimestamp: 1734366547, score: 260 },
        { starttimestamp: 1734370147, score: 220 },
        { starttimestamp: 1734373747, score: 280 },
        { starttimestamp: 1734377347, score: 250 },
      ],
    },
    {
      tokenAddress: "0xEF348b9FD378c91b00874d611b22062d7ee60284",
      tokenHourScore: [
        { starttimestamp: 1734352147, score: 150 },
        { starttimestamp: 1734355747, score: 180 },
        { starttimestamp: 1734359347, score: 195 },
        { starttimestamp: 1734362947, score: 220 },
        { starttimestamp: 1734366547, score: 240 },
        { starttimestamp: 1734370147, score: 260 },
        { starttimestamp: 1734373747, score: 270 },
        { starttimestamp: 1734377347, score: 290 },
      ],
    },
    {
      tokenAddress: "0xf71218db215d61f895d7acda7b6dd36b595d4484",
      tokenHourScore: [
        { starttimestamp: 1734352147, score: 130 },
        { starttimestamp: 1734355747, score: 210 },
        { starttimestamp: 1734359347, score: 270 },
        { starttimestamp: 1734362947, score: 240 },
        { starttimestamp: 1734366547, score: 290 },
        { starttimestamp: 1734370147, score: 260 },
        { starttimestamp: 1734373747, score: 300 },
        { starttimestamp: 1734377347, score: 280 },
      ],
    },
  ],
};

export const MemeHorseRace = observer(() => {
  const [timeIndex, setTimeIndex] = useState(2);
  const [tokens, setTokens] = useState<Record<string, Token>>({});
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  useEffect(() => {
    if (!wallet.isInit) return;
    // Initialize tokens
    const initTokens = async () => {
      const tokenMap: Record<string, Token> = {};
      for (const racer of mockData.racers) {
        const token = Token.getToken({ address: racer.tokenAddress });
        await token.init();
        tokenMap[racer.tokenAddress] = token;
      }
      setTokens(tokenMap);
    };

    initTokens();
  }, [wallet.isInit]);

  const timestamps = mockData.racers[0].tokenHourScore.map(
    (score) => score.starttimestamp
  );

  const allTimeHighScore = Math.max(
    ...mockData.racers.flatMap((racer) =>
      racer.tokenHourScore.map((score) => score.score)
    )
  );

  const getCurrentScores = () => {
    return mockData.racers.map((racer) => ({
      ...racer,
      token: tokens[racer.tokenAddress],
      currentScore: racer.tokenHourScore[timeIndex].score,
    }));
  };

  const currentRacers = getCurrentScores();
  const totalRacers = mockData.racers.length;

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    popmodal.openModal({
      content: <V3SwapCard toTokenAddress={token.address} />,
    });
  };

  return (
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
                <RacerIcon
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
                  {/* <span
                    style={{
                      color: "#FFFFFF",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {racer.token?.symbol}: {racer.currentScore}
                  </span> */}
                </RacerIcon>
              </RaceLane>
            ))}
          </RaceLanesContainer>

          <TimeSlider
            type="range"
            min={0}
            max={timestamps.length - 1}
            value={timeIndex}
            onChange={(e) => setTimeIndex(parseInt(e.target.value))}
          />
          <div>
            Time: {new Date(timestamps[timeIndex] * 1000).toLocaleString()}
          </div>
        </ContentWrapper>
      </RaceTrack>
    </>
  );
});

export default MemeHorseRace;
