const BASE_URL = "https://weather-xdpzw23z7q-as.a.run.app/weather/";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
}

export function getWeatherByCity(query: string): Promise<WeatherData> {
  return fetch(BASE_URL + encodeURIComponent(query))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.status}`);
      }
      return response.json() as Promise<WeatherData>;
    })
    .catch(function (err) {
      console.log("Unable to fetch -", err);
      throw err;
    });
}
