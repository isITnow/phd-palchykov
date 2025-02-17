import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import UserContextProvider from '@/context/UserContext';
import Layout from '@/layouts/Layout';
import NotFoundPage from '@/pages/NotFoundPage';
import PrivateRoute from '@/components/shared/PrivateRoute';

import navTabs from '@/utils/navTabs';
import queryClient from '@/app/queryClient.js';

import { privateRoutes, publicRoutes } from '@/app/routes';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={navTabs.root.path} element={<Layout />}>
            {/* PUBLIC ROUTES */}
            {publicRoutes.map(({ element, path }) => (
              <Route element={element} key={path} path={path} />
            ))}

            {/* PRIVATE ROUTES */}
            <Route path={navTabs.root.path} element={<PrivateRoute />}>
              {privateRoutes.map(({ element, path }) => (
                <Route element={element} key={path} path={path} />
              ))}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </QueryClientProvider>
);

export default App;
