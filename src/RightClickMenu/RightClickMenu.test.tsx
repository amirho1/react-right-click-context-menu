import React from "react";
import { screen, cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RightClickMenu from "./RightClickMenu";

describe("RightClickMenu", () => {
  let element: HTMLElement;

  // initializing before each
  beforeEach(() => {
    // clean up
    cleanup();

    // render component
    const page = (
      <div className="test" data-testid="test">
        <RightClickMenu
          menuClassName="context-wrapper"
          liClassName="context-li"
          rightClickTargets={[
            { className: "test0", menuList: ["hello"] },
            {
              className: "test1",
              menuList: [
                <p className="description">description</p>,
                <button className="btn">click</button>,
              ],
            },
          ]}
        />
        <div className="test0" data-testid="test0"></div>
        <div className="test1" data-testid="test1"></div>
      </div>
    );
    render(page);

    element = screen.getByTestId("RightClickMenu");
  });

  it("should be in the documentation", () => {
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("UL");
  });

  it("shouldn't have the display className or not be visible", () => {
    expect(element.className).not.toMatch("display");
  });

  it("should show menu on page on the right click on targetClass", () => {
    const testElement = screen.getByTestId("test0");

    expect(testElement).toBeInTheDocument();
    if (testElement) {
      fireEvent.contextMenu(testElement);
    }
    console.log(testElement);
    expect(element.className).toMatch("display");
  });

  it("should append correct children to menu on contextmenu event on each element", () => {
    const test0 = screen.getByTestId("test0");
    if (test0) fireEvent.contextMenu(test0);
    expect(element?.children.length).toBe(1);
    expect(element?.textContent).toMatch("hello");

    const test1 = screen.getByTestId("test1");
    if (test1) fireEvent.contextMenu(test1);
    expect(element?.children.length).toBe(2);
    expect(element?.querySelector("button")?.textContent).toMatch("click");
    expect(element?.querySelector("button")?.className).toMatch("btn");
    expect(element.querySelector(".description")).toBeInTheDocument();
    expect(element.lastElementChild?.className).toMatch("context-li");
  });
});
