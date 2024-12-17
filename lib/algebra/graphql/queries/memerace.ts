import { gql } from "@apollo/client";

export const ALL_RACERS = gql`
  query AllRacers {
    memeRacers {
      id
      currentScore
      token {
        symbol
      }
      hourData(orderBy: timestamp, orderDirection: asc) {
        timestamp
        score
      }
    }
  }
`;
