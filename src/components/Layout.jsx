import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Loader from "../components/Loader";
import Navigation from "./Navigation/Navigation";

import { periodsAPI } from "../services/publicationPeriodsAPI";

const Layout = () => {
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await periodsAPI.fetchPeriods();
        setPeriods(data);
      } catch (error) {
        console.log("Periods error", error);
      }
    })();
  }, []);

  return (
    <>
      <header className="shadow-sm py-3">
        <div className="container">
          <Navigation periods={periods} />
        </div>
      </header>
      <main className="container">
        <Suspense fallback={<Loader />}>
          <Outlet context={periods} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
