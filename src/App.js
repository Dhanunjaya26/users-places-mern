import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./shared/pages";
import { Auth, Users } from "./user/pages";
import { NewPlace, UpdatePlace, UserPlaces } from "./places/pages";

const childrenMainWrapper = (element) => {
  return (
    <main>
      <element />
    </main>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <main>
            <Users />
          </main>
        ),
      },
      {
        path: "places/new",
        element: (
          <main>
            <NewPlace />
          </main>
        ),
      },
      {
        path: "places/:placeId",
        element: (
          <main>
            <UpdatePlace />
          </main>
        ),
      },
      {
        path: ":userId/places",
        element: (
          <main>
            <UserPlaces />
          </main>
        ),
      },
      {
        path: "auth",
        element: (
          <main>
            <Auth />
          </main>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
