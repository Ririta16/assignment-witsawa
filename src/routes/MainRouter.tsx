import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Home from "../page/Home";

const mainRouter = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default mainRouter;
