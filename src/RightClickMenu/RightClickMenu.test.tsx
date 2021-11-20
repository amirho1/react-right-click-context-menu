import React from "react";
import { screen, cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RightClickMenu from "./RightClickMenu";

describe("RightClickMenu", () => {
  let element: HTMLElement;
  beforeEach(() => {
    // clean up
    cleanup();

    // render component
    render(<RightClickMenu />);

    element = screen.getByTestId("RightClickMenu");
  });

  it("should be in the documentation", () => {
    expect(element).toBeInTheDocument();
  });
});
