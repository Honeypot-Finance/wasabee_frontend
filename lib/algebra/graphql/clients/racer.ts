import { infoClient } from ".";
import { AllRacersDocument, AllRacersQuery } from "../generated/graphql";

export interface Racer {
  tokenAddress: string;
  tokenHourScore: { starttimestamp: any; score: any }[];
}

export async function getAllRacers() {
  const allRacers = await infoClient.query<AllRacersQuery>({
    query: AllRacersDocument,
  });

  console.log(allRacers);

  const racers: Racer[] = [];

  allRacers.data.memeRacers.map((racer) => {
    const tokenAddress = racer.id;
    const tokenHourScore = racer.hourData.map((hourData) => {
      return {
        starttimestamp: hourData.timestamp,
        score: hourData.score,
      };
    });

    racers.push({
      tokenAddress: tokenAddress,
      tokenHourScore: tokenHourScore,
    });
  });

  console.log(racers);

  return racers;
}
