import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routes/MainRouter";

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
