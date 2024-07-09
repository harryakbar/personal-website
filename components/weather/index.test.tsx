import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Weather from "./index";
import { getWeatherByCity } from "../../lib/weather";

// Mock the getWeatherByCity function
jest.mock("../../lib/weather", () => ({
  getWeatherByCity: jest.fn(),
}));

describe("Weather Component", () => {
  test("renders the Weather component and searches for weather", async () => {
    // Mock data to be returned by the getWeatherByCity function
    const mockWeatherData = { temp: 25, description: "Sunny" };
    (getWeatherByCity as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<Weather />);

    // Check if the initial components are rendered
    expect(screen.getByText("Weather")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("Input your place name...");
    const submitButton = screen.getByDisplayValue("Search");

    // Simulate user input and form submission
    fireEvent.change(input, { target: { value: "Singapore" } });
    fireEvent.click(submitButton);

    // Wait for the mock data to be displayed
    await waitFor(() => {
      expect(
        screen.getByText(JSON.stringify(mockWeatherData))
      ).toBeInTheDocument();
    });

    // Check if the getWeatherByCity function was called with the correct argument
    expect(getWeatherByCity).toHaveBeenCalledWith("Singapore");
  });
});
