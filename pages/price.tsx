"use client";
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { TokenHistoryPrice } from "@/lib/defined/defined";

export default function Price() {
  const [data, setData] = useState<TokenHistoryPrice[]>();
  useEffect(() => {
    fetch("/api/defined/get-price").then(
      (response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((data) => {
            setData(data! as TokenHistoryPrice[]);
          });
        } else {
          throw new Error("Network response was not ok");
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }, []);

  return (
    <div>
      {data &&
        data.map((token) => {
          return (
            <div key={token.token.address}>
              <h1>{token.token.name}</h1>
              <p>{token.token.address}</p>
              <p>{token.token.symbol}</p>
              <p>{token.token.decimals}</p>
              <ReactECharts
                option={{
                  tooltip: {
                    trigger: "axis",
                    axisPointer: { type: "cross" },
                  },
                  xAxis: {
                    type: "category",
                    data: token.data.reverse().map((d, idx) => {
                      return new Date(
                        new Date().getTime() -
                          (token.data.length - idx) * 60 * 60 * 24 * 1000
                      ).toLocaleDateString();
                    }),
                  },
                  yAxis: {
                    type: "value",
                  },
                  series: [
                    {
                      type: "line",
                      data: token.data.reverse().map((d) => {
                        return d?.priceUsd ?? 0;
                      }),
                      smooth: true,
                    },
                  ],
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
