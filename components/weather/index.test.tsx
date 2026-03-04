import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Weather from "./index";
import { getWeatherByCity } from "../../lib/weather";

jest.mock("../../lib/weather", () => ({
  getWeatherByCity: jest.fn(),
}));

const mockWeatherData = {
  name: "Singapore",
  main: { temp: 303.15, temp_min: 301.48, temp_max: 304.82 },
};

describe("Weather Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and search button", () => {
    render(<Weather />);
    expect(screen.getByText("Weather")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter city name...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("shows weather card with temperature on success", async () => {
    (getWeatherByCity as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<Weather />);

    fireEvent.change(screen.getByPlaceholderText("Enter city name..."), {
      target: { value: "Singapore" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Singapore")).toBeInTheDocument();
      expect(screen.getByText(/30\.0°C/)).toBeInTheDocument();
    });

    expect(getWeatherByCity).toHaveBeenCalledWith("Singapore");
  });

  it("shows error message on failure", async () => {
    (getWeatherByCity as jest.Mock).mockRejectedValue(new Error("Not found"));

    render(<Weather />);

    fireEvent.change(screen.getByPlaceholderText("Enter city name..."), {
      target: { value: "InvalidCity" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByText("City not found. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("disables button when input is empty", () => {
    render(<Weather />);
    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });
});
