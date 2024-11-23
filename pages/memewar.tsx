import MemeWarBannerV2 from "@/components/MemeWarBanner/MemeWarBannerV2";
import { observer } from "mobx-react-lite";

export const MemeWar = observer(() => {
  return (
    <div>
      <MemeWarBannerV2 />
    </div>
  );
});

export default MemeWar;
