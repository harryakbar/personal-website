import { useState } from "react";
import { getWeatherByCity, WeatherData } from "../../lib/weather";

const kelvinToCelsius = (k: number): string => (k - 273.15).toFixed(1);

const Weather: React.FC = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    getWeatherByCity(value.trim())
      .then((result) => {
        setData(result);
      })
      .catch(() => {
        setError("City not found. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="my-8 w-full flex flex-col border-2 rounded-md p-4">
      <article className="prose">
        <h1>Weather</h1>
      </article>
      <form onSubmit={handleSubmit} className="my-4 w-full">
        <input
          type="text"
          placeholder="Enter city name..."
          value={value}
          onChange={handleChange}
          className="border-2 p-2 my-2 w-full"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="w-full border-none p-2 px-8 bg-sky-500 text-neutral-50 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      {data && (
        <div className="mt-2 p-4 bg-sky-50 rounded-md border border-sky-200">
          <div className="text-lg font-semibold">{data.name}</div>
          <div className="text-4xl font-bold my-2">
            {kelvinToCelsius(data.main.temp)}°C
          </div>
          <div className="text-sm text-neutral-500">
            Min: {kelvinToCelsius(data.main.temp_min)}°C · Max:{" "}
            {kelvinToCelsius(data.main.temp_max)}°C
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
