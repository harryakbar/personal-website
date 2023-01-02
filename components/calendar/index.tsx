import clsx from "clsx";
import { useState } from "react";

const generateCalendar = (month, year) => {
  const numOfDaysInMonth = new Date(year, month, 0).getDate();

  let calendar = [];
  for (let i = 0; i < numOfDaysInMonth; i += 1) {
    calendar[i] = i + 1;
  }
  return calendar;
};

const generatePlaceholderDatesBeforeCurrentMonth = (month, year) => {
  const startingDayIndex = new Date(year, month - 1, 1).getDay();
  const numOfDaysInMonth = new Date(year, month - 1, 0).getDate();

  const indexDays = Array.from(Array(startingDayIndex).keys()).reverse();
  return indexDays.map((day) => numOfDaysInMonth - day);
};

const generatePlaceholderDatesAfterCurrentMonth = (month, year) => {
  const numOfDaysInMonth = new Date(year, month, 0).getDate();
  const lastDayIndex = new Date(year, month - 1, numOfDaysInMonth).getDay() + 1;

  return Array.from(Array(7 - lastDayIndex).keys()).map((day) => day + 1);
};

const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setDate] = useState(new Date().getDate());

  const handleLeft = () => {
    if (currentMonth - 1 === 0) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleRight = () => {
    if (currentMonth + 1 === 13) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleClickDate = (date) => () => {
    setDate(date);
  };

  return (
    <div className="my-8 w-[100%] flex justify-center flex flex-col border-2 rounded-md p-4">
      <div className="flex flex-row justify-center items-center align-center space-between">
        <button className="w-16 h-16 border-2 rounded-md" onClick={handleLeft}>
          {"<"}
        </button>
        <article className="prose mx-4 flex flex-grow justify-center">
          <h1 className="text-center">
            {MonthMapping[currentMonth]} {currentYear}
          </h1>
        </article>
        <button className="w-16 h-16 border-2 rounded-md" onClick={handleRight}>
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7">
        {Days.map((item) => (
          <button
            key="item"
            className={clsx("flex justify-center center p-2 text-blue-600/100")}
            onClick={handleClickDate(item)}
          >
            {item}
          </button>
        ))}
        {generatePlaceholderDatesBeforeCurrentMonth(
          currentMonth,
          currentYear
        ).map((item) => (
          <button
            key="item"
            className={clsx("flex justify-center center p-2 text-gray-400/100")}
            onClick={handleClickDate(item)}
          >
            {item}
          </button>
        ))}
        {generateCalendar(currentMonth, currentYear).map((item, index) => (
          <button
            key="item"
            className={clsx(
              "flex justify-center center p-2",
              currentDate === item &&
                new Date(currentYear, currentMonth - 1, item).getDay() !== 0 &&
                new Date(currentYear, currentMonth - 1, item).getDay() !== 6 &&
                "border-none rounded-md bg-sky-500 text-neutral-50",
              currentDate === item &&
                (new Date(currentYear, currentMonth - 1, item).getDay() === 0 ||
                  new Date(currentYear, currentMonth - 1, item).getDay() ===
                    6) &&
                "border-none rounded-md bg-red-400/100 text-white",
              currentDate !== item &&
                (new Date(currentYear, currentMonth - 1, item).getDay() === 0 ||
                  new Date(currentYear, currentMonth - 1, item).getDay() ===
                    6) &&
                "text-red-400/100"
            )}
            onClick={handleClickDate(item)}
          >
            {item}
          </button>
        ))}
        {generatePlaceholderDatesAfterCurrentMonth(
          currentMonth,
          currentYear
        ).map((item) => (
          <button
            key="item"
            className={clsx("flex justify-center center p-2 text-gray-400/100")}
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
