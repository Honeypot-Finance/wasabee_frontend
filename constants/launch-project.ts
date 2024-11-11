import {
  CreateAndBrandingForm,
  LBP_TYPE,
  PRICE_TYPE,
  SalesStructureForm,
  TokenomicsAndPreviewForm,
} from "@/types/launch-project";
import { z, ZodType } from "zod";

export const DEFAULT_LAUNCH_PROJECT_FORM = {
  // 1.Create and Branding
  ecosystem: "",
  targetNetwork: "",
  projectToken: "",
  projectTokenLogo: "",
  saleBanner: "",
  // 2.Sales Structure
  priceType: PRICE_TYPE.LBP,
  lbpType: undefined,
  startTime: new Date(),
  endTime: new Date(),
  tokenClaimDelayHours: undefined,
  tokenClaimDelayMinutes: undefined,
  tokenClaimDelay: new Date(),
};

export const createAndBrandingSchema: ZodType<CreateAndBrandingForm> = z.object(
  {
    ecosystem: z.string().min(1, "Ecosystem is required."),
    targetNetwork: z.string().min(1, "Target network is required."),
    projectToken: z.string().min(1, "Project token is required."),
    projectTokenLogo: z.string().url("Project token logo must be a valid URL."),
    saleBanner: z.string().url("Sale banner must be a valid URL."),
  }
);

export const salesStructureSchema: ZodType<SalesStructureForm> = z
  .object({
    priceType: z.enum([PRICE_TYPE.LBP, PRICE_TYPE.FIXED]),
    lbpType: z.enum([LBP_TYPE.BUY_SELL, LBP_TYPE.SELL_ONLY]).optional(),
    startTime: z.date().refine((val) => !isNaN(val.getTime()), {
      message: "Start time is required",
    }),
    endTime: z.date().refine((val) => !isNaN(val.getTime()), {
      message: "End time is required",
    }),
    tokenClaimDelayHours: z.number().optional(),
    tokenClaimDelayMinutes: z.number().optional(),
    tokenClaimDelay: z.date().refine((val) => !isNaN(val.getTime()), {
      message: "Token claim delay is required",
    }),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  })
  .refine(
    (data) => {
      if (data.priceType === PRICE_TYPE.LBP) {
        return data.lbpType !== undefined;
      }
      return true;
    },
    {
      message: "LBP Type is required",
      path: ["lbpType"],
    }
  )
  .refine(
    (data) => {
      if (data.priceType === PRICE_TYPE.LBP) {
        return data.tokenClaimDelayHours !== undefined;
      }
      return true;
    },
    {
      message: "Token claim delay hours is required",
      path: ["tokenClaimDelayHours"],
    }
  )
  .refine(
    (data) => {
      if (data.priceType === PRICE_TYPE.LBP) {
        return data.tokenClaimDelayMinutes !== undefined;
      }
      return true;
    },
    {
      message: "Token claim delay hours is required",
      path: ["tokenClaimDelayMinutes"],
    }
  );

export const tokenomicsAndPreviewSchema: ZodType<TokenomicsAndPreviewForm> = z
  .object({
    projectTokenQuantity: z
      .number()
      .min(1, "Project token quantity is required"),
    assetTokenType: z.string().min(1, "Asset token type is required"),
    assetTokenQuantity: z.number().min(1, "Asset token quantity is required"),
    customTotalSupplyType: z.boolean(),
    customTotalSupply: z.number().optional(),
    startWeight: z.number().min(1, "Start weight is required"),
    endWeight: z.number().min(1, "End weight is required"),
  })
  .refine(
    (data) => {
      if (data.customTotalSupplyType) {
        return data.customTotalSupply !== undefined;
      }
      return true;
    },
    {
      message: "Custom total supply is required",
      path: ["customTotalSupply"],
    }
  );
