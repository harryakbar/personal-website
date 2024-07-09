import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CurrencyConverter from "./index";

describe("CurrencyConverter Component", () => {
  test("renders the CurrencyConverter component", () => {
    render(<CurrencyConverter />);

    // Check if the initial components are rendered
    expect(screen.getByText("Currency Converter")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Convert")).toBeInTheDocument();
  });

  test("handles form submission", () => {
    render(<CurrencyConverter />);

    // Check initial state
    const amountInput = screen.getByPlaceholderText("Amount");
    const submitButton = screen.getByDisplayValue("Convert");

    // Simulate user input and form submission
    fireEvent.change(amountInput, { target: { value: "100" } });
    fireEvent.click(submitButton);

    // Check console log output (assuming handleSubmit logs "submitted")
    expect(console.log).toHaveBeenCalledWith("submitted");
  });

  test("handles input change", () => {
    render(<CurrencyConverter />);

    // Check initial state
    const amountInput = screen.getByPlaceholderText("Amount");

    // Simulate user input change
    fireEvent.change(amountInput, { target: { value: "100" } });

    // Check if the input value has changed
    expect(amountInput.value).toBe("100");
  });
});
