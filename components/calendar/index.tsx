import clsx from "clsx";
import { useState } from "react";

const generateCalendar = () => {
  let calendar = [];
  for (let i = 0; i < 31; i += 1) {
    calendar[i] = i + 1;
  }
  return calendar;
};

const MonthMapping = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(12);
  const [currentDate, setDate] = useState(20);

  const handleLeft = () => {
    if (currentMonth - 1 === 0) {
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleRight = () => {
    if (currentMonth + 1 === 13) {
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleClickDate = (date) => () => {
    setDate(date);
  };

  return (
    <div className="my-8 w-[100%] flex justify-center flex flex-col border-2 rounded-md p-4">
      <div className="flex flex-row justify-center items-center space-between">
        <button className="w-16 h-16 border-2 rounded-md" onClick={handleLeft}>
          {"<"}
        </button>
        <article className="prose mx-4">
          <h1>{MonthMapping[currentMonth]} 2022</h1>
        </article>
        <button className="w-16 h-16 border-2 rounded-md" onClick={handleRight}>
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7">
        {generateCalendar().map((item) => (
          <button
            key="item"
            className={clsx(
              "flex justify-center center p-2",
              currentDate === item &&
                "border-none rounded-md bg-sky-500 text-neutral-50"
            )}
            onClick={handleClickDate(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
