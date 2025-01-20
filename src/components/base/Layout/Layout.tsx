import React from 'react';
import Header from '../Header/Header';
import './Layout.css';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="app-main">{children}</main>
    </div>
  );
};

export default Layout;
