import { Bounce, ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Footer from '@/components/Footer/Footer';
import Loader from '@/components/shared/Loader';
import Navigation from '@/components/Navigation/Navigation';
import ScrollToTop from '@/components/shared/ScrollToTop';
import Section from '@/components/shared/Section';

import useDocumentTitle from '@/hooks/useDocumentTitle';
import useRefreshAuth from '@/hooks/useRefreshAuth';
import useSetPeriods from '@/layouts/hooks/useSetPeriods';

const Layout = () => {
  useRefreshAuth();
  useSetPeriods();
  useDocumentTitle();

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
