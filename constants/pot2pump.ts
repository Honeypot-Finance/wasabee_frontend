import { FilterState } from "./pot2pump.type";

export const defaultFilterState: FilterState = {
    tvl: {
        min: "",
        max: ""
    },
    participants: {
        min: "",
        max: ""
    },
    liquidity: {
        min: "",
        max: ""
    },
    marketcap: {
        min: "",
        max: ""
    },
    daytxns: {
        min: "",
        max: ""
    },
    daybuys: {
        min: "",
        max: ""
    },
    daysells: {
        min: "",
        max: ""
    },
    dayvolume: {
        min: "",
        max: ""
    },
    daychange: {
        min: "",
        max: ""
    },
}