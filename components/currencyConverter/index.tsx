import { useState } from "react";
import { getWeatherByCity } from "../../lib/weather";

const CurrencyConverter: React.FC = () => {
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
    <div className="center w-[100%] flex justify-center flex flex-col border-2 rounded-md p-4">
      <article className="prose">
        <h1>Currency Converter</h1>
      </article>
      <form onSubmit={handleSubmit} className="my-4 w-[100%]">
        <div className="my-2">
          <select name="currencies" className="border-2 p-2 mr-4">
            <option value="usd">USD</option>
            <option value="sgd">SGD</option>
            <option value="idr">IDR</option>
          </select>
          <input
            type="text"
            value={1}
            onChange={handleChange}
            className="border-2 p-2 mr-4"
          />
        </div>

        <div>
          <select name="currencies" className="border-2 p-2 mr-4">
            <option value="usd">USD</option>
            <option value="sgd">SGD</option>
            <option value="idr">IDR</option>
          </select>
          <input
            type="text"
            value={0}
            onChange={handleChange}
            className="border-2 p-2 mr-4"
          />
        </div>
      </form>
      {data ? JSON.stringify(data) : null}
    </div>
  );
};

export default CurrencyConverter;
