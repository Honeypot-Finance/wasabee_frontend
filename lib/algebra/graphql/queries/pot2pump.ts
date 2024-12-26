import { gql } from "@apollo/client";

export const POT_2_PUMP_POTTING_NEW_TOKENS = gql`
  query Pot2PumpPottingNewTokens($endTime: BigInt) {
    pot2Pumps(
      first: 25
      orderBy: createdAt
      orderDirection: desc
      where: { raisedTokenReachingMinCap: false, endTime_gt: $endTime }
    ) {
      ...Pot2PumpField
    }
  }
`;

export const POT_2_PUMP_POTTING_NEAR_SUCCESS = gql`
  query Pot2PumpPottingNearSuccess($endTime: BigInt) {
    pot2Pumps(
      first: 25
      orderBy: DepositRaisedToken
      orderDirection: desc
      where: { raisedTokenReachingMinCap: false, endTime_gt: $endTime }
    ) {
      ...Pot2PumpField
    }
  }
`;

export const POT_2_PUMP_PUMPING_HIGH_PRICE = gql`
  query Pot2PumpPottingHighPrice {
    pot2Pumps(
      first: 25
      orderBy: LaunchTokenTVLUSD
      orderDirection: desc
      where: { raisedTokenReachingMinCap: true }
    ) {
      ...Pot2PumpField
    }
  }
`;

export const POT2_PUMP_FRAGMENT = gql`
  fragment Pot2PumpField on Pot2Pump {
    id
    launchTokenInitialPrice
    DepositLaunchToken
    LaunchTokenTVLUSD
    LaunchTokenMCAPUSD
    raisedTokenMinCap
    raisedTokenReachingMinCap
    DepositRaisedToken
    creator
    participantsCount
    totalRefundAmount
    totalClaimLpAmount
    buyCount
    sellCount
    createdAt
    endTime
    state
    searchString
    launchToken {
      ...TokenFields
    }
    raisedToken {
      ...TokenFields
    }
    participantTransactionHistorys {
      ...ParticipantTransactionHistoryFields
    }
    participants(first: 10) {
      ...ParticipantFields
    }
  }
`;

export const PARTICIPANT_TRANSACTION_HISTORY_FRAGMENT = gql`
  fragment ParticipantTransactionHistoryFields on ParticipantTransactionHistory {
    id
  }
`;

export const PARTICIPANT_FRAGMENT = gql`
  fragment ParticipantFields on Participant {
    id
    amount
    totalRefundAmount
    totalclaimLqAmount
    canClaim
  }
`;
