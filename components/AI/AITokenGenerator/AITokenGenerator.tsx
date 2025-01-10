import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import { PeddingSvg } from "@/components/svg/Pedding";
import { RocketSvg } from "@/components/svg/Rocket";
import { uploadFile } from "@/components/UploadImage/UploadImage";
import { base64ToFile } from "@/lib/blob/uploadProjectIcon";
import { cn } from "@/lib/tailwindcss";

import { trpcClient } from "@/lib/trpc";
import { wallet } from "@/services/wallet";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaTruckLoading } from "react-icons/fa";
import { LuPersonStanding } from "react-icons/lu";
import { VscLoading } from "react-icons/vsc";

export type TokenGeneratedSuccessValues = {
  description: string;
  name: string;
  symbol: string;
  image: string;
};

export type PromptResponse = {
  code: number;
  data:
    | TokenGeneratedSuccessValues
    | {
        tip: string;
      };
};

interface AITokenGeneratorProps {
  tokenGeneratedCallback: (tokenInfo: TokenGeneratedSuccessValues) => void;
}

export default function AITokenGenerator({
  tokenGeneratedCallback,
}: AITokenGeneratorProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [tip, setTip] = useState<string>("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleAiLaunch = async () => {
    if (state === "loading") return;
    if (prompt.length === 0) {
      setState("error");
      setTip("Please enter a prompt");
      return;
    }

    setState("loading");
    const res: PromptResponse =
      await trpcClient.aiLaunchProject.generateAiProject.query({
        wallet_address: wallet.account as `0x${string}`,
        prompt_input: prompt,
      });

    if ("tip" in res.data) {
      setState("error");
      setTip(res.data.tip);
    } else {
      setState("success");
      setTip("");
      //convert image from api to file and blob
      const imageFile = base64ToFile(
        (res.data as TokenGeneratedSuccessValues).image,
        "test"
      );
      //upload file to vercel blob
      const generatedLogoUrl = await uploadFile(
        imageFile.file,
        imageFile.url.split("/")[-1]
      );

      tokenGeneratedCallback({
        name: res.data.name,
        symbol: res.data.symbol,
        image: generatedLogoUrl,
        description: res.data.description,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center gap-5">
        <textarea
          disabled={state === "loading"}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Try our Ai launch with prompt, eg: I love Honey and Bear and I want to generate a token for Bear eating Honey"
          className="w-full bg-orange-200 rounded-[16px] px-4 py-[18px] text-black outline-none border border-black shadow-[0px_332px_93px_0px_rgba(0,0,0,0.00),0px_212px_85px_0px_rgba(0,0,0,0.01),0px_119px_72px_0px_rgba(0,0,0,0.05),0px_53px_53px_0px_rgba(0,0,0,0.09),0px_13px_29px_0px_rgba(0,0,0,0.10)] placeholder:text-black/50 text-base font-medium"
        />
        <Button
          isDisabled={state === "loading"}
          className="p-6"
          onClick={() => {
            handleAiLaunch();
          }}
        >
          {state === "loading" ? (
            <div className="relative max-h-full scale-[25%] flex items-center justify-center">
              <PeddingSvg className="w-full h-full " />
            </div>
          ) : (
            "Generate Meme Token"
          )}
        </Button>
      </div>
      <p
        className={cn(
          "text-black text-base font-medium ",
          state === "success" && "text-green-700"
        )}
      >
        {state === "success" ? "Your token is ready to be launched" : tip}
      </p>
    </div>
  );
}
