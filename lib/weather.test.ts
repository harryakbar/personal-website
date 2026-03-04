import { getWeatherByCity, WeatherData } from "./weather";

const BASE_URL = "https://weather-xdpzw23z7q-as.a.run.app/weather/";

const mockWeatherData: WeatherData = {
  name: "London",
  main: { temp: 280.15, temp_min: 278.15, temp_max: 282.15 },
};

describe("getWeatherByCity", () => {
  beforeEach(() => {
    global.fetch = jest.fn() as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch weather data for a given city", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockWeatherData),
    });

    const result = await getWeatherByCity("London");

    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}London`);
    expect(result).toEqual(mockWeatherData);
  });

  it("should encode city name in URL", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockWeatherData),
    });

    await getWeatherByCity("New York");

    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}New%20York`);
  });

  it("should throw on non-ok response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn(),
    });

    await expect(getWeatherByCity("UnknownCity")).rejects.toThrow();
  });

  it("should throw on fetch error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    await expect(getWeatherByCity("London")).rejects.toThrow("Network error");
  });
});
