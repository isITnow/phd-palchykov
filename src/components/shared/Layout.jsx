import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { getPeriodsThunk } from "../../redux/publicationPeriods/operationsPublicationPeriods";
import { selectPeriods } from "../../redux/publicationPeriods/selectorPublicationPeriods";

import { Bounce, ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import Loader from "./Loader";
import ScrollToTop from "./ScrollToTop";
import Section from "./Section";

import setPageTitle from "../../assets/utils/setPageTitle";

const Layout = () => {
  const dispatch = useDispatch();
  const { periods } = useSelector(selectPeriods);
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    setPageTitle(pathname);
  }, [location]);

  useEffect(() => {
    if (!periods.length) {
      dispatch(getPeriodsThunk());
    }
  }, [dispatch, periods]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <header className="shadow-sm py-3 bg-light bg-gradient">
        <div className="container">
          <Navigation />
        </div>
      </header>
      <main className="container">
        <Section>
          <ScrollToTop />
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
