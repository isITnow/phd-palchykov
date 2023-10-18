import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectPeriods } from "../../redux/publicationPeriods/selectorPublicationPeriods";
import { getPeriodsThunk } from "../../redux/publicationPeriods/operationsPublicationPeriods";

import Footer from "../Footer/Footer";
import Loader from "./Loader";
import Navigation from "../Navigation/Navigation";

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
      <header className="shadow-sm py-3 bg-light bg-gradient">
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
