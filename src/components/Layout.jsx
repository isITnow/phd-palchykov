import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";
import { getPeriodsThunk } from "../redux/publicationPeriods/operationsPublicationPeriods";

import Footer from "./Footer/Footer";
import Loader from "../components/Loader";
import Navigation from "./Navigation/Navigation";

const Layout = () => {
  const dispatch = useDispatch();
  const { periods } = useSelector(selectPeriods);

  useEffect(() => {
    if (!periods.length) {
      dispatch(getPeriodsThunk());
    }
  }, [dispatch, periods]);

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
