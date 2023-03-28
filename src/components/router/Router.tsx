import { Dialog } from '@headlessui/react';
import { lazy, Suspense, useState } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));
const RmaScreen = lazy(() => import('~/components/screens/Rma'));
const MyApptScreen = lazy(() => import('~/components/screens/Rma'));


function Layout() {
  return (
    <div>
        <div className="navbar bg-base-100 min-w-screen dark:bg-slate-800">
          <a className="btn btn-ghost normal-case text-xl dark:text-white">PWA-Doctolib-User</a>
        </div>
      <Outlet />
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
        {
          path: '/rma',
          element: <RmaScreen />,
        },
        {
          path: '/myappt',
          element: <MyApptScreen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
