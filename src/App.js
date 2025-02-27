import React, { useCallback, useState } from "react";
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
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: !token //if token is not present, then it indicates we're not logged in.
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
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, userId }}
    >
      <RouterProvider router={router}></RouterProvider>;
    </AuthContext.Provider>
  );
};

export default App;
