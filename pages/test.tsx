import { trpcClient } from "@/lib/trpc";
import { useEffect } from "react";

export default function Test() {
  trpcClient.zapRouter.test.query().then((res) => {
    console.log(res);
  });
  return <div>test</div>;
}
