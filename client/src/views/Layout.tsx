import Navbar from "@/containers/NavBar";
import {Fragment} from "react";
import {Outlet} from "react-router-dom";

function Layout() {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}

export default Layout;
