import React from "react";
import { screen, cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MapLI from "./MapLI";

describe("MapLI", () => {
  let element: HTMLElement;
  const menuList = ["test", <div> Hello world</div>];
  const testId = "MapLi";
  beforeEach(() => {
    cleanup();

    render(
      <ul data-testid={testId}>
        <MapLI menuList={menuList} />
      </ul>
    );

    element = screen.getByTestId(testId);
  });

  it("should be in the documentation", () => {
    expect(element).toBeInTheDocument();
  });

  it("should have 2 children", () => {
    expect(element.children.length).toBe(2);
    expect(element.querySelector("div")?.innerHTML).toMatch("Hello world");
    expect(element.querySelector("li")?.innerHTML).toMatch("test");
  });
});
