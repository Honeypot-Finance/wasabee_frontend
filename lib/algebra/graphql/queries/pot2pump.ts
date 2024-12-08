import { gql } from "@apollo/client";

export const TOKEN_FRAGMENT = gql`
  fragment TokenFields on Token {
    id
    symbol
    name
    decimals
    derivedMatic
  }
`;
