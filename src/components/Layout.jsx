import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Loader from "../components/Loader";
import Navigation from "./Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <header className="shadow-sm py-3">
        <div className="container">
          <Navigation />
        </div>
      </header>
      <main className="container">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
