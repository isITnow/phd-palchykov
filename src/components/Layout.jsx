import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <>
      <header
        className="shadow-sm"
        // style={{ backgroundColor: "#e3f2fd" }}
      >
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
