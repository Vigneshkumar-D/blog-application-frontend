import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

const Layout = () => {
  const location = useLocation();
  const shouldShowHeader = !['/login', '/account/register'].includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />}
      <Outlet /> 
      <Footer />
    </div>
  );
};

export default Layout;
