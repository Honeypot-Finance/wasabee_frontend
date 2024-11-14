import { myPositionsColumns } from "@/components/algebra/common/Table/myPositionsColumns";
import { Address } from "viem";
import MyPositionsTable from "@/components/algebra/common/Table/myPositionsTable";
import { FormattedPosition } from "@/types/algebra/types/formatted-position";

interface MyPositionsProps {
  positions: FormattedPosition[];
  poolId: Address | undefined;
  selectedPosition: number | undefined;
  selectPosition: (positionId: number | null) => void;
}

const MyPositions = ({
  positions,
  selectedPosition,
  selectPosition,
}: MyPositionsProps) => {
  return (
    <div className="flex flex-col min-h-[377px] pb-8 rounded-3xl bg-[#211708]">
      <MyPositionsTable
        defaultSortingID="liquidityUSD"
        columns={myPositionsColumns}
        data={positions}
        action={selectPosition}
        selectedRow={selectedPosition}
        showPagination={false}
      />
    </div>
  );
};

export default MyPositions;
