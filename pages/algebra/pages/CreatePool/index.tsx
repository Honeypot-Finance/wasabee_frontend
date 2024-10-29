import CreatePoolForm from "@/components/algebra";
import PageContainer from "@/components/algebra/common/PageContainer";
import PageTitle from "@/components/algebra/common/PageTitle";
import LoadingDisplay from "@/components/LoadingDisplay/LoadingDisplay";
import { liquidity } from "@/services/liquidity";
import { wallet } from "@/services/wallet";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const CreatePoolPage = observer(() => {
  useEffect(() => {
    if (!wallet.isInit) return;

    liquidity.initPool();
  }, [wallet.isInit]);
  return (
    <PageContainer>
      <div className="w-full flex justify-between">
        <PageTitle title={"Create Pool"} showSettings={false} />
      </div>
      {wallet.isInit ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-0 gap-y-8 w-full lg:gap-8 mt-8 lg:mt-16">
          <div className="col-span-1 flex flex-col gap-2">
            <CreatePoolForm />
          </div>
        </div>
      ) : (
        <LoadingDisplay />
      )}
    </PageContainer>
  );
});

export default CreatePoolPage;
