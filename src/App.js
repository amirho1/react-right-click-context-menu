import "./App.scss";
import RightClickMenu from "react-right-click-context-menu";
import { FaGithub, FaPaste, FaTrash } from "react-icons/fa";
import { AiFillCopy, AiFillLinkedin } from "react-icons/ai";

function App() {
  return (
    <div className="App">
      <div className="demo">
        <RightClickMenu
          menuClassName="menu-demo"
          rightClickTargets={[
            {
              className: "demo-right",
              menuList: [
                <a
                  href="https://github.com/amirho1/react-right-click-menu.git"
                  target="_blank"
                  rel="noreferrer">
                  <FaGithub /> github
                </a>,
                <a target="_blank">
                  <AiFillCopy /> Copy
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
                  target="_blank"
                  rel="noreferrer">
                  <AiFillLinkedin /> linkedin
                </a>,
                <a href="#" target="_blank">
                  <FaPaste /> Paste
                </a>,
                <span>
                  {" "}
                  <FaTrash /> delete
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
              <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript">
                Javascript
              </a>
              it gives you the ability to have different context menu based on
              element or where you are clicking so easy fur further reading go
              to repository
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
        <div className="demo-right">
          <h1>Right Click</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
