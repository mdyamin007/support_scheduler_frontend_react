import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import api from "./util/api";

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [schedules, setSchedules] = useState();


  useEffect(() => {
	async function getSchedules(day, month, year) {
		const resp = await api.get(`/schedule/year/${year}/month/${month}/day/${day}`)
		console.log(resp.data);
		setSchedules(resp.data);
	}

	if(selectDate) {
		const day = selectDate.date()
		const month = selectDate.month()+1
		const year = selectDate.year()
		getSchedules(day, month, year)
	}	
  }, [selectDate])
  

//   console.log(today);

  return (
    <>
      <div className="mx-auto flex mt-20 items-center justify-center">
        <h1 className="font-bold text-blue-600 text-4xl">Support Schedule</h1>
      </div>
      <div className="flex gap-10 sm:divide-x -mt-20 justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col">
        <div className="w-96 h-96 ">
          <div className="flex justify-between items-center">
            <h1 className="select-none font-semibold">
              {months[today.month()]}, {today.year()}
            </h1>
            <div className="flex gap-10 items-center ">
              <GrFormPrevious
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1
                className=" cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setSelectDate(currentDate);
                }}
              >
                Today
              </h1>
              <GrFormNext
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 ">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                >
                  {day}
                </h1>
              );
            })}
          </div>

          <div className=" grid grid-cols-7 ">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today ? "bg-red-600 text-white" : "",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black text-white"
                          : "",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="h-96 w-96 sm:px-5">
          <h1 className=" font-semibold">
            Support Schedule for {selectDate.toDate().toDateString()}
          </h1>
          <div className="flex flex-col">{schedules && schedules.map((schedule, index) => {
			return (
				<div key={index} className="shadow-md bg-white my-1 px-10 py-10">
					<h4 className="font-bold text-xl text-green-400">{schedule.username}</h4>
				</div>
			); 
		  })}</div>
        </div>
      </div>
    </>
  );
}
