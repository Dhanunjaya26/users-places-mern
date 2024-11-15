import React from "react";
import { Outlet } from "react-router-dom";

import { MainNavigation } from "../components/Navigation";

const Layout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default Layout;
