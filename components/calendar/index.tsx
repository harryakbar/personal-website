import clsx from "clsx";
import { useMemo, useState } from "react";

const generateCalendar = (month: number, year: number): number[] => {
  const numOfDaysInMonth = new Date(year, month, 0).getDate();

  const calendar: number[] = [];
  for (let i = 0; i < numOfDaysInMonth; i += 1) {
    calendar[i] = i + 1;
  }
  return calendar;
};

const generatePlaceholderDatesBeforeCurrentMonth = (
  month: number,
  year: number,
): number[] => {
  const startingDayIndex = new Date(year, month - 1, 1).getDay();
  const numOfDaysInMonth = new Date(year, month - 1, 0).getDate();

  const indexDays = Array.from(Array(startingDayIndex).keys()).reverse();
  return indexDays.map((day) => numOfDaysInMonth - day);
};

const generatePlaceholderDatesAfterCurrentMonth = (
  month: number,
  year: number,
): number[] => {
  const numOfDaysInMonth = new Date(year, month, 0).getDate();
  const lastDayIndex = new Date(year, month - 1, numOfDaysInMonth).getDay() + 1;

  return Array.from(Array(7 - lastDayIndex).keys()).map((day) => day + 1);
};

const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthMapping: Record<number, string> = {
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

const isWeekend = (day: number, month: number, year: number): boolean => {
  const d = new Date(year, month - 1, day).getDay();
  return d === 0 || d === 6;
};

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setDate] = useState<number | null>(null);
  const dateNow = useMemo(() => new Date(), []);

  const handleLeft = () => {
    if (currentMonth - 1 === 0) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setDate(null);
  };

  const handleRight = () => {
    if (currentMonth + 1 === 13) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setDate(null);
  };

  const handleClickDate = (date: number, month: number, year: number) => () => {
    setDate(date);
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  return (
    <div className="mt-8 mb-4 w-[100%] flex flex-col border-2 rounded-md p-4 h-[24rem] justify-start">
      <div className="flex flex-row justify-center items-center align-center space-between">
        <button
          className="h-16 border-2 rounded-md px-4"
          onClick={handleLeft}
          aria-label="Previous month"
        >
          {"<"}
        </button>
        <h2 className="mx-4 flex flex-grow justify-center text-center text-2xl font-semibold">
          {MonthMapping[currentMonth]} {currentYear}
        </h2>
        <button
          className="h-16 border-2 rounded-md px-4"
          onClick={handleRight}
          aria-label="Next month"
        >
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7" role="grid" aria-label="Calendar">
        {Days.map((item) => (
          <div
            key={item}
            role="columnheader"
            aria-label={item}
            className={clsx("flex justify-center center p-2 text-blue-600/100")}
          >
            {item}
          </div>
        ))}
        {generatePlaceholderDatesBeforeCurrentMonth(
          currentMonth,
          currentYear,
        ).map((item, id) => (
          <div
            key={`prev-${id}`}
            role="gridcell"
            aria-disabled="true"
            className={clsx("flex justify-center center p-2 text-gray-400/100")}
          >
            {item}
          </div>
        ))}

        {generateCalendar(currentMonth, currentYear).map((item, index) => {
          const weekend = isWeekend(item, currentMonth, currentYear);
          const selected = currentDate === item;
          const isToday =
            dateNow.getDate() === item &&
            dateNow.getMonth() + 1 === currentMonth &&
            dateNow.getFullYear() === currentYear;

          return (
            <button
              key={index}
              aria-label={`${item} ${MonthMapping[currentMonth]} ${currentYear}${isToday ? ", today" : ""}${selected ? ", selected" : ""}`}
              aria-pressed={selected}
              aria-current={isToday ? "date" : undefined}
              className={clsx(
                "flex justify-center center p-2",
                selected &&
                  !weekend &&
                  "border-none rounded-md bg-sky-500 text-neutral-50",
                selected &&
                  weekend &&
                  "border-none rounded-md bg-red-400/100 text-white",
                !selected && weekend && "text-red-400/100",
                isToday && "border-2 border-black font-bold",
              )}
              onClick={handleClickDate(item, currentMonth, currentYear)}
            >
              {item}
            </button>
          );
        })}

        {generatePlaceholderDatesAfterCurrentMonth(
          currentMonth,
          currentYear,
        ).map((item, index) => (
          <div
            key={`next-${index}`}
            role="gridcell"
            aria-disabled="true"
            className={clsx("flex justify-center center p-2 text-gray-400/100")}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
