import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { FavorireFilms } from "./pages/FavoriteFilms";
import { WatchList } from "./pages/WatchList";
import { FilmPage } from "./pages/Film";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/favorite-films",
        element: <FavorireFilms />,
      },
      {
        path: "/watch-list",
        element: <WatchList/>,
      },
      {
        path: "/film/:id",
        element: <FilmPage/>,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
