// getWeatherByCity.test.js
import { getWeatherByCity } from "./weather";

const BASE_URL = "https://weather-xdpzw23z7q-as.a.run.app/weather/";

describe("getWeatherByCity", () => {
  beforeEach(() => {
    global.fetch = jest.fn() as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch weather data for a given city", async () => {
    const query = "London";
    const mockResponse = {
      weather: "Sunny",
      temperature: 25,
    };

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await getWeatherByCity(query);

    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}${query}`);
    expect(result).toEqual(mockResponse);
  });

  it("should handle fetch error", async () => {
    global.fetch.mockRejectedValue(new Error("Fetch failed"));

    console.log = jest.fn(); // Mock console.log to test its output

    await getWeatherByCity("London");

    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}London`);
    expect(console.log).toHaveBeenCalledWith(
      "Unable to fetch -",
      expect.any(Error)
    );
  });
});
