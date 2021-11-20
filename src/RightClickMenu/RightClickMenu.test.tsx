import React from "react";
import { screen, cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RightClickMenu from "./RightClickMenu";

describe("RightClickMenu", () => {
  let element: HTMLElement;
  beforeEach(() => {
    // clean up
    cleanup();

    // render component
    const page = (
      <div className="test" data-testid="test">
        <RightClickMenu
          rightClickTargets={[
            { className: "test", menuList: ["hello", "world"] },
          ]}
        />
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
    const testElement = screen.queryByTestId("test");

    if (testElement) {
      fireEvent.contextMenu(testElement);
    }
    expect(element.className).toMatch("display");
  });
});
