import React, { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { LoadingSpinner } from "./shared/components/UIElements";

// Lazy load components
const Layout = React.lazy(() => import("./shared/pages/Layout"));
const Users = React.lazy(() => import("./user/pages/Users"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
  const { token, userId, login, logout } = useAuth();

  // Helper function to wrap components with Suspense
  const renderWithSuspense = (Component, excludeMain = false) => (
    <Suspense
      fallback={
        <div className="center">
          <LoadingSpinner />
        </div>
      }
    >
      {excludeMain ? Component : <main>{Component}</main>}
    </Suspense>
  );

  // Define routes based on authentication status
  const routes = token
    ? [
        { index: true, element: renderWithSuspense(<Users />) },
        { path: "places/new", element: renderWithSuspense(<NewPlace />) },
        {
          path: "places/:placeId",
          element: renderWithSuspense(<UpdatePlace />),
        },
        { path: ":userId/places", element: renderWithSuspense(<UserPlaces />) },
        { path: "*", element: <Navigate to="/" replace /> },
      ]
    : [
        { index: true, element: renderWithSuspense(<Users />) },
        { path: ":userId/places", element: renderWithSuspense(<UserPlaces />) },
        { path: "auth", element: renderWithSuspense(<Auth />) },
        { path: "*", element: <Navigate to="/auth" replace /> },
      ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: renderWithSuspense(<Layout />, true), // Exclude <main> for Layout
      children: routes,
    },
  ]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, userId }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
