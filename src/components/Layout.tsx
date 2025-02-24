import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white p-100 m-100">
      <Sidebar /> 
      <div className="flex-1" >
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;