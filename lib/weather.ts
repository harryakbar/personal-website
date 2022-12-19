const BASE_URL = "https://weather-xdpzw23z7q-as.a.run.app/weather/";

export function getWeatherByCity(query) {
  return fetch(BASE_URL + query)
    .then((response) => response.json())
    .catch(function (err) {
      console.log("Unable to fetch -", err);
    });
}
