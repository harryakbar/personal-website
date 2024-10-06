import { useState } from "react";

const CurrencyConverter: React.FC = () => {
  const [value, setValue] = useState("");
  const [data] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log("submitted");
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
          <select name="fromCurrency" className="border-2 p-2 mr-4">
            <option value="usd">USD</option>
            <option value="sgd">SGD</option>
            <option value="idr">IDR</option>
          </select>
          <input
            type="text"
            placeholder="Amount"
            value={value}
            onChange={handleChange}
            className="border-2 p-2 mr-4"
          />
        </div>

        <div>
          <select name="toCurrency" className="border-2 p-2 mr-4">
            <option value="usd">USD</option>
            <option value="sgd">SGD</option>
            <option value="idr">IDR</option>
          </select>
          <input
            type="text"
            value={data || ""}
            readOnly
            className="border-2 p-2 mr-4"
          />
        </div>
        <input
          type="submit"
          value="Convert"
          className="w-full border-none p-2 px-8 bg-sky-500 text-neutral-50 rounded-md cursor-pointer"
        />
      </form>
      {data ? <div>{JSON.stringify(data)}</div> : null}
    </div>
  );
};

export default CurrencyConverter;
