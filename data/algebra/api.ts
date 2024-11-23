const apiDomain = "http://localhost";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ETERNAL_FARMINGS_API =
  //"http://localhost/api/APR/eternalFarmings/?network=berachain";
  `${apiDomain}/api/APR/eternalFarmings/?network=berachain`;

export const POOL_MAX_APR_API =
  //"https://localhost/api/APR/pools/max?network=berachain";
  `${apiDomain}/api/APR/pools/max?network=berachain`;

export const POOL_AVG_APR_API =
  //"https://localhost/api/APR/pools/?network=berachain";
  `${apiDomain}/api/APR/pools/?network=berachain`;
