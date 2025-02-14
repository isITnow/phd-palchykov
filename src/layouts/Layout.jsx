import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Bounce, ToastContainer } from 'react-toastify';
import Footer from '@/components/Footer/Footer';
import Navigation from '@/components/Navigation/Navigation';
import Loader from '@/components/shared/Loader';
import ScrollToTop from '@/components/shared/ScrollToTop';
import Section from '@/components/shared/Section';

import setPageTitle from '@/utils/setPageTitle';
import useSetPeriods from '@/layouts/hooks/useSetPeriods';

const Layout = () => {
  const location = useLocation();
  useSetPeriods();

  useEffect(() => {
    const { pathname } = location;
    setPageTitle(pathname);
  }, [location]);

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
