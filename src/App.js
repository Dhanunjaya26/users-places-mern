import React, { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "./shared/pages";
import { Auth, Users } from "./user/pages";
import { NewPlace, UpdatePlace, UserPlaces } from "./places/pages";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);

  const logout = () => setIsLoggedIn(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: !isLoggedIn
        ? [
            {
              index: true,
              element: (
                <main>
                  <Users />
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
            {
              path: "*",
              element: <Navigate to="/auth" replace />,
            },
          ]
        : [
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
              path: "*",
              element: <Navigate to="/" replace />,
            },
          ],
    },
  ]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <RouterProvider router={router}></RouterProvider>;
    </AuthContext.Provider>
  );
};

export default App;
