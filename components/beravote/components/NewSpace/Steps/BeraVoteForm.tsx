import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { StyledButton } from "../../styled";
import FormInput from "../../Input";
import { BtnWrapper, FormContainer } from "./styled";
import LogoUploader from "../../logoUploader";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ethers } from "ethers";
import APIAccessPayment from "@/lib/abis/beravote/abi/APIAccessPayment.json";
import { wallet } from "@/services/wallet";
import { WrappedToastify } from "@/lib/wrappedToastify";
import { FtoPairContract } from "@/services/contract/ftopair-contract";
import { MemePairContract } from "@/services/contract/memepair-contract";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { trpcClient } from "@/lib/trpc";

const payContract = "0x7833fE2A60123b1873a6EB3277506df1416F829a";
const ethersProvider =
  typeof window !== "undefined" && window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : null;

const createDaoSpace = async (requestBody: {
  data: {
    name: any;
    description: any;
    symbol: any;
    decimals: number; // usually 18, WBTC is 8 decimals
    logo: any;
    website: any;
    forum: any;
    twitter: any;
    assets: {
      symbol: any;
      decimals: number; // usually 18, WBTC is 8 decimals
      votingThreshold: string; // "1000000000000000000", // voting threshold 1 token (18 decimals)
      type: string;
      contract: string;
      chain: string;
      votingWeight: number;
      name: any;
      ss58Format: number;
    }[];
    weightStrategy: string[];
    proposalThreshold: string;
    pubkey: string;
    address: string;
    timestamp: number;
  };
  address: string;
  signature: any;
}) => {
  const cloudflareCorsProxy =
    "https://white-mud-e962.forgingblock.workers.dev/corsproxy/?apiurl=";
  try {
    const response = await fetch(
      cloudflareCorsProxy + "https://beravote.com/api/wlspaces",
      {
        method: "POST",
        //mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
      return { success: true, data };
    } else {
      console.error("Error:", response.statusText);
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.error("Request failed:", error);
    return { success: false, error };
  }
};

const handleYes = async (
  values: {
    name: any;
    description: any;
    ticker: any;
    logo: any;
    website: any;
    forum: any;
    twitter: any;
  },
  signer: ethers.Signer,
  paymentFee: any,
  pair: FtoPairContract | MemePairContract
) => {
  console.log("Form Data:", values);
  console.log("paymentFee", paymentFee);
  const address = await signer.getAddress();
  console.log(address);
  const paymentContract = new ethers.Contract(
    payContract,
    APIAccessPayment,
    signer
  );
  const tx = await paymentContract.purchaseAccessFor(address, {
    value: paymentFee,
  });
  const receipt = await tx.wait();
  if (receipt.status === 1) {
    console.log("Transaction succeeded:", receipt);
    if (!pair.launchedToken) {
      console.error("pair.launchedToken is undefined");
      return;
    }
    const timestamp = parseInt((Date.now() / 1000).toString());
    const pubkey = address;

    const data = {
      name: values.name,
      description: values.description,
      symbol: values.ticker,
      decimals: 8, // usually 18, WBTC is 8 decimals
      logo: values.logo,
      website: values.website,
      forum: values.forum,
      twitter: values.twitter,
      assets: [
        {
          symbol: pair.launchedToken.symbol,
          decimals: pair.launchedToken.decimals,
          votingThreshold: Math.pow(10, pair.launchedToken.decimals).toFixed(), // "1000000000000000000", // voting threshold 1 token (18 decimals)
          type: "erc20",
          contract: pair.launchedToken.address,
          chain: "berachain-b2",
          votingWeight: 1,
          name: pair.launchedToken.name,
          ss58Format: 80084,
        },
      ],
      weightStrategy: ["balance-of"],
      proposalThreshold: "0",
      pubkey: pubkey,
      address: pubkey,
      timestamp: timestamp,
    };

    const msg = JSON.stringify({
      ...data,
      timestamp: timestamp,
    });
    function stringToHex(str: string) {
      return (
        "0x" +
        Array.from(str)
          .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
          .join("")
      );
    }
    const hex = stringToHex(msg);
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [hex, address],
    });
    console.log(signature);
    const requestBody = {
      data,
      address: pubkey,
      signature: signature,
    };
    const result = await createDaoSpace(requestBody);

    if (result.success) {
      console.log("https://beravote.com/space/" + result.data.spaceId);
      WrappedToastify.success({
        title: "Governance Space created: ",
        message: "https://beravote.com/space/" + result.data.spaceId,
      });
      trpcClient.projects.createOrUpdateProjectInfo
        .mutate({
          chain_id: wallet.currentChainId,
          pair: pair.address,
          beravote_space_id: result.data.spaceId,
        })
        .then(() => {
          //refresh page
          window.location.reload();
        });
    } else {
      WrappedToastify.error({ message: "Failed to create Governance space" });
      console.error("Failed to create DAO space:", result.error);
    }
  } else {
    console.log("Transaction failed:", receipt);
  }
};

const BeraVoteForm = observer(
  ({ pair }: { pair: FtoPairContract | MemePairContract }) => {
    const [logoBase64, setLogoBase64] = useState("");
    const [paymentFee, setPaymentFee] = useState("");

    const signer = ethersProvider?.getSigner();

    //convert pair.logoUrl to base64
    useEffect(() => {
      if (pair.logoUrl) {
        toDataURL(pair.logoUrl as string, (dataUrl: string) => {
          console.log(dataUrl);
          setLogoBase64(dataUrl);
        });
      }
    }, [pair.logoUrl]);

    useEffect(() => {
      if (!signer) {
        return;
      }
      const fetchPaymentFee = async () => {
        const paymentContract = new ethers.Contract(
          payContract,
          APIAccessPayment,
          signer
        );
        const fee = await paymentContract.accessFee();
        setPaymentFee(fee);
      };
      fetchPaymentFee();
    }, [signer]);

    return (
      <Formik
        initialValues={{
          name: pair.projectName ?? pair.launchedToken?.name,
          ticker: pair.launchedToken?.symbol,
          description: pair.description,
          website: pair.website,
          twitter: pair.twitter,
          github: "",
          doc: "",
          forum: "",
          logo: logoBase64,
          createDaoSpace: true,
        }}
        onSubmit={(values) => {
          console.log("Form Data:", values);
          if (values.createDaoSpace === true) {
            values.logo = logoBase64;
            signer && handleYes(values, signer, paymentFee, pair);
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <FormContainer>
            <Form>
              <div className="flex flex-col w-full justify-center items-center gap-2">
                <h2 className="text-xl">What is voting space?</h2>
                <p>
                  Voting space is a decentralized autonomous organization (DAO)
                  where users can vote on proposals and make decisions on the
                  project.{" "}
                </p>
                <p>
                  <Link
                    href={"https://quicksnap.gitbook.io/beravote"}
                    className="text-yellow underline"
                  >
                    learn more on beravote
                  </Link>
                </p>
                <p>
                  cost of dao creation:{" "}
                  {paymentFee && ethers.utils.formatEther(paymentFee)}
                  Bera
                </p>

                {/* <pre>{JSON.stringify(values)}</pre> */}
              </div>
              <BtnWrapper>
                <StyledButton type="submit">Create Coin</StyledButton>
              </BtnWrapper>
            </Form>
          </FormContainer>
        )}
      </Formik>
    );
  }
);

export default BeraVoteForm;

function toDataURL(src: string, callback: (arg0: string) => void) {
  var image = new Image();
  image.crossOrigin = "Anonymous";
  image.onload = function () {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    // @ts-ignore
    canvas.height = this.naturalHeight;
    // @ts-ignore
    canvas.width = this.naturalWidth;
    // @ts-ignore
    context.drawImage(this, 0, 0);
    var dataURL = canvas.toDataURL("image/jpeg");
    callback(dataURL);
  };
  image.src = src;
}
