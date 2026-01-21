import { render } from "@testing-library/react";
import React from "react";

import App from "../pages/app.tsx";

describe("Test", () => {
  it("should true", () => {
    const { getByText } = render(<App />);

    // The Tools section is intentionally hidden by default (see SHOW_TOOLS_SECTION in pages/app.tsx)
    // so assert on content that is always rendered.
    expect(getByText(/Personal Projects/i)).toBeInTheDocument();
  });
});
