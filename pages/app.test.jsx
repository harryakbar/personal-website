import React from "react";
import { render } from "@testing-library/react";
import App from "./app.tsx";

describe("Test", () => {
  it("should true", () => {
    const { getByText } = render(<App />);

    expect(getByText(/Tools/)).toBeInTheDocument();
  });
});
