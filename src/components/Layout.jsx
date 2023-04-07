import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <>
      <header className="shadow-sm py-3">
        <div className="container">
          <Navigation />
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
