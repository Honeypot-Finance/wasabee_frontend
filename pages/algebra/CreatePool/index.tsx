import PageContainer from "@/components/algebra/common/PageContainer";
import PageTitle from "@/components/algebra/common/PageTitle";
import CreatePoolForm from "@/components/algebra/CreatePoolForm";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import { liquidity } from "@/services/liquidity";
import { wallet } from "@/services/wallet";
import { Button } from "@nextui-org/react";
import { Link } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const CreatePoolPage = observer(() => {
  const isInit = wallet.isInit && liquidity.isInit;
  useEffect(() => {
    if (!wallet.isInit) {
      return;
    }

    liquidity.initPool();
  }, [wallet.isInit]);
  return (
    <PageContainer>
      {isInit ? (
        <>
          <div className="w-full flex justify-between">
            <PageTitle title={"Create Pool"} showSettings={false} />
            <Link to={"/pools"}>
              <Button className="whitespace-nowrap" size={"md"}>
                Go back
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-0 gap-y-8 w-full lg:gap-8 mt-8 lg:mt-16">
            <div className="col-span-1 flex flex-col gap-2">
              <CreatePoolForm />
            </div>
          </div>
        </>
      ) : (
        <LoadingDisplay />
      )}
    </PageContainer>
  );
});

export default CreatePoolPage;
