import NavigationWidget from "@/components/atoms/NavigationWidget/NavigationWidget";
import Draggable from "react-draggable";

export default function Navigation() {
  return (
    <div className="relative w-full h-full min-h-[80vh] border-orange-800 border-5 bg-orange-400">
      <NavigationWidget />
    </div>
  );
}
