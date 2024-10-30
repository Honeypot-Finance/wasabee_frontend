import PageContainer from "@/components/algebra/common/PageContainer";
import PageTitle from "@/components/algebra/common/PageTitle";
import PoolsList from "@/components/algebra/pools/PoolsList";
import { Button } from "@nextui-org/react";
import { Link } from "lucide-react";

const PoolsPage = () => {
  return (
    <PageContainer>
      <div className="w-full flex justify-between">
        <PageTitle title={"Pools"} showSettings={false} />
        <Link to={"create"}>
          <Button className="whitespace-nowrap" size={"md"}>
            Create Pool
          </Button>
        </Link>
      </div>

      <div className="w-full lg:gap-8 mt-8 lg:mt-16">
        <div className="pb-5 bg-card border border-card-border/60 rounded-3xl">
          <PoolsList />
        </div>
      </div>
    </PageContainer>
  );
};

export default PoolsPage;
