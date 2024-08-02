import Draggable from "react-draggable";

export default function NavigationWidget() {
  return (
    <Draggable
      defaultClassName="cursor-move bg-[blue]"
      defaultClassNameDragged=""
      defaultClassNameDragging=""
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      bounds="parent"
      position={undefined}
      grid={[5, 5]}
      scale={1}
      allowAnyClick={true}
      // onStart={this.handleStart}
      // onDrag={this.handleDrag}
      // onStop={this.handleStop}
    >
      <div className=" handle select-none w-[100px] h-[100px]">
        <div>widget</div>
      </div>
    </Draggable>
  );
}
