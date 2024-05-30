import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import RootLayot from "./Pages/RootLayout";
import NewDayPage from "./Pages/NewDayPage";

import DetailPage from "./Pages/DetailPage";

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
          { path: ":dayId", element: <DetailPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
