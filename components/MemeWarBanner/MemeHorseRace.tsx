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

[
  {
    tokenAddress: "0x05d0dd5135e3ef3ade32a9ef9cb06e8d37a6795d",
    tokenHourScore: [
      {
        starttimestamp: "1733940000",
        score: "999999999999999.9999999999999999999",
      },
      {
        starttimestamp: "1732593600",
        score: "999999999999999.9999999999999999999",
      },
    ],
  },
  {
    tokenAddress: "0x150bcee57b23a79c9dd5e707c8a64c65016215d0",
    tokenHourScore: [
      {
        starttimestamp: "1734008400",
        score: "0",
      },
      {
        starttimestamp: "1733587200",
        score: "945972938773624809.4775008679422248",
      },
    ],
  },
  {
    tokenAddress: "0xd6d83af58a19cd14ef3cf6fe848c9a4d21e5727c",
    tokenHourScore: [
      {
        starttimestamp: "1734400800",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734397200",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734375600",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734368400",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734364800",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734361200",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734354000",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734343200",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734321600",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734314400",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734260400",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734163200",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734156000",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1734152400",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1733940000",
        score: "9975012990099499999999.999999999999",
      },
      {
        starttimestamp: "1732586400",
        score: "0",
      },
      {
        starttimestamp: "1732579200",
        score: "0",
      },
      {
        starttimestamp: "1732568400",
        score: "0",
      },
    ],
  },
  {
    tokenAddress: "0xfc5e3743e9fac8bb60408797607352e24db7d65e",
    tokenHourScore: [
      {
        starttimestamp: "1734400800",
        score: "1918227205984510117640136.128015128",
      },
      {
        starttimestamp: "1734397200",
        score: "1918227205984510117640136.128015128",
      },
      {
        starttimestamp: "1734393600",
        score: "1918227205984510117640136.128015128",
      },
      {
        starttimestamp: "1734390000",
        score: "1918227205984510117640136.128015128",
      },
      {
        starttimestamp: "1734386400",
        score: "1918227205984510117640136.128015128",
      },
      {
        starttimestamp: "1734382800",
        score: "1918227205984510117640136.128015128",
      },
      {
        starttimestamp: "1734379200",
        score: "1918227205984510117640136.128015128",
      },
      {
        starttimestamp: "1734375600",
        score: "30059660291819027134163298746.18329",
      },
      {
        starttimestamp: "1734372000",
        score: "30059660291819027134163298746.18329",
      },
      {
        starttimestamp: "1734368400",
        score: "30059660291819027134163298746.18329",
      },
      {
        starttimestamp: "1734364800",
        score: "30059660291819027134163298746.18329",
      },
      {
        starttimestamp: "1734357600",
        score: "30059660291819027134163298746.18329",
      },
      {
        starttimestamp: "1734310800",
        score: "30059660291819027134163298746.18329",
      },
      {
        starttimestamp: "1734260400",
        score: "30059660291819027134163298746.18329",
      },
      {
        starttimestamp: "1734253200",
        score: "30059660291819027134163298746.18329",
      },
      {
        starttimestamp: "1734231600",
        score: "284350351892059472627522254.660071",
      },
      {
        starttimestamp: "1734159600",
        score: "284350351892059472627522254.660071",
      },
      {
        starttimestamp: "1734141600",
        score: "284350351892059472627522254.660071",
      },
      {
        starttimestamp: "1734015600",
        score: "284350351892059472627522254.660071",
      },
      {
        starttimestamp: "1734012000",
        score: "284350351892059472627522254.660071",
      },
      {
        starttimestamp: "1733731200",
        score: "284350351892059472627522254.660071",
      },
      {
        starttimestamp: "1733587200",
        score: "284350351892059472627522254.660071",
      },
      {
        starttimestamp: "1732996800",
        score: "284350351892059472627522254.660071",
      },
      {
        starttimestamp: "1732960800",
        score: "284350351892059472627522254.660071",
      },
      {
        starttimestamp: "1732953600",
        score: "297789331184564947388859258.4931356",
      },
      {
        starttimestamp: "1732669200",
        score: "297789331184564947388859258.4931356",
      },
      {
        starttimestamp: "1732600800",
        score: "297789331184564947388859258.4931356",
      },
      {
        starttimestamp: "1732593600",
        score: "0",
      },
      {
        starttimestamp: "1732586400",
        score: "0",
      },
      {
        starttimestamp: "1732410000",
        score: "0",
      },
      {
        starttimestamp: "1731744000",
        score: "0",
      },
    ],
  },
];

export const MemeHorseRace = observer(() => {
  const [timeIndex, setTimeIndex] = useState(0);
  const [tokens, setTokens] = useState<Record<string, Token>>({});
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
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

  const timestamps = racers[0]?.tokenHourScore.map(
    (score) => score.starttimestamp
  );

  const allTimeHighScore = Math.max(
    ...racers.flatMap((racer) =>
      racer.tokenHourScore.map((score) => score.score)
    )
  );

  const getCurrentScores = () => {
    return racers.map((racer) => ({
      ...racer,
      token: tokens[racer.tokenAddress],
      currentScore: racer.tokenHourScore[timeIndex].score,
    }));
  };

  const currentRacers = getCurrentScores();
  const totalRacers = racers.length;

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    popmodal.openModal({
      content: <V3SwapCard toTokenAddress={token.address} />,
    });
  };

  return (
    <>
      {racers && racers.length > 0 && (
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
      )}
    </>
  );
});

export default MemeHorseRace;
