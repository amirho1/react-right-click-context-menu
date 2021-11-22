import React from "react";
import ReactDOM from "react-dom";
import RightClickMenu from "./RightClickMenu/RightClickMenu";
import "./demo.scss";

export default function Demo() {
  return (
    <div className="demo">
      <RightClickMenu
        menuClassName="context-wrapper"
        liClassName="context-li"
        rightClickTargets={[
          {
            className: "demo-right",
            menuList: [
              <a
                href="https://github.com/amirho1/react-right-click-menu.git"
                target="_blank">
                <i className="fab fa-github"></i> github
              </a>,
              <a target="_blank">
                <i className="fas fa-paste"></i> Copy
              </a>,
              <a>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">checkbox</label>
              </a>,
            ],
          },
          {
            className: "demo-left",
            menuList: [
              <a
                href="https://www.linkedin.com/in/amirhossien-salighedar-8b165618a/"
                target="_blank">
                <i className="fab fa-linkedin"></i> linkedin
              </a>,
              <a href="#" target="_blank">
                <i className="fas fa-paste"></i> Paste
              </a>,
              <span>
                {" "}
                <i className="fas fa-trash"></i> delete
              </span>,
            ],
          },
        ]}
      />

      <div className="demo-left">
        <div className="description">
          <h1>React-right-click-menu</h1>
          <p className="text">
            React right click menu is a library to help developer focus on the
            main concept it supports{" "}
            <a href="https://www.typescriptlang.org/">Typescript</a> also
            <a href="">Javascript</a>
            click on sides to see the default style and behavior of menu for
            further reading go to repository
          </p>

          <h2>
            <a href="https://github.com/amirho1/react-right-click-menu">
              Repository
            </a>
          </h2>

          <h2>
            Author :{" "}
            <a href="https://www.linkedin.com/in/amirhossien-salighedar-8b165618a/">
              {" "}
              AmirHossein Salighedar
            </a>
          </h2>
        </div>
      </div>
      <RightClickMenu />
      <div className="demo-right"></div>
    </div>
  );
}

const root = document.querySelector("#root");

ReactDOM.render(<Demo />, root);
