import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import RootLayot from "./Pages/RootLayout";
import NewDayPage from "./Pages/NewDayPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fbDays } from "./API/api";
import { getAllDays } from "./store/days";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <h1>Something went Wrong!!</h1>,
    id: "root",
    children: [
      { index: true, element: <Navigate to={"/home"} replace /> },
      {
        path: "/",
        element: <RootLayot />,
        children: [
          { path: "home", element: <Home /> },
          { path: "create", element: <NewDayPage /> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDays(fbDays));
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
