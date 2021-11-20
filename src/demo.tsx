import React from "react";
import ReactDOM from "react-dom";
import RightClickMenu from "./RightClickMenu/RightClickMenu";
import "./demo.scss";

export default function Demo() {
  return (
    <div className="demo">
      <RightClickMenu
        rightClickTargets={[
          { className: "demo", menuList: ["hello", "how are you"] },
        ]}
      />
    </div>
  );
}

const root = document.querySelector("#root");

ReactDOM.render(<Demo />, root);
