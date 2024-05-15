import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Schedule from "./components/Schedule";
import Admin from "./components/Admin";
import UserList from "./components/UserList";
import { Toaster } from "react-hot-toast";
import ScheduleList from "./components/ScheduleList";

export default function Calendar() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Schedule />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/admin/userlist",
      element: <UserList />,
    },
    {
      path: "/admin/schedulelist",
      element: <ScheduleList />,
    },
  ]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <RouterProvider router={router} />
    </>
  );
}
