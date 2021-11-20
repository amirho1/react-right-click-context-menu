import React from "react";
import ReactDOM from "react-dom";
import RightClickMenu from "./RightClickMenu/RightClickMenu";

export default function Demo() {
  return (
    <div>
      <RightClickMenu rightClickTargets={[]} />
    </div>
  );
}

const root = document.querySelector("root");

ReactDOM.render(<Demo />, root);
