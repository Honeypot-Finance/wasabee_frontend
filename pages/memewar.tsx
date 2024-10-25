import MemeWarBannerV2 from "@/components/MemeWarBanner/MemeWarBannerV2";
import { observer } from "mobx-react-lite";

export const MemeWar = observer(() => {
  return (
    <div>
      <h1>Meme War</h1>
      <MemeWarBannerV2 />
    </div>
  );
});

export default MemeWar;
