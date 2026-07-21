import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import App from "./App";
import { render } from "./utils/test-utils";

describe("App", () => {
  it("renders the heading correctly", () => {
    render(<App />);

    const headingElement = screen.getByText(/Motorway UI/i);
    expect(headingElement).toBeInTheDocument();
  });

  // TODO: test tabs
});
