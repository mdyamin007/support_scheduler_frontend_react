import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";

function Admin() {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [schedules, setSchedules] = useState();

  return (
    <div className="flex h-screen mx-auto justify-center items-center space-x-10">
      <Link
        to={"userlist"}
        className="bg-green-500 text-white px-10 py-6 rounded-md text-xl hover:bg-green-600"
      >
        User List
      </Link>
      <Link
        to={"schedulelist"}
        className="bg-blue-500 text-white px-10 py-6 rounded-md text-xl hover:bg-blue-600"
      >
        Schedule List
      </Link>
    </div>
  );
}

export default Admin;
