import { useState } from "react";
import { getWeatherByCity } from "../../lib/weather";

const Weather: React.FC = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => await getWeatherByCity(value);
    fetchData().then((data) => {
      setData(data);
    });
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
  };

  return (
    <div className="my-8 center w-[100%] flex justify-center flex flex-col border-2 rounded-md p-4">
      <article className="prose">
        <h1>Weather</h1>
      </article>
      <form onSubmit={handleSubmit} className="my-4 w-[100%]">
        <input
          type="text"
          placeholder="Input your place name..."
          value={value}
          onChange={handleChange}
          className="border-2 p-2 mr-4"
        />
        <input
          type="submit"
          value="Search"
          className="border-none p-2 px-8 bg-sky-500 text-neutral-50 rounded-md cursor-pointer"
        />
      </form>
      {data ? JSON.stringify(data) : null}
    </div>
  );
};

export default Weather;
