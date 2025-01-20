import React from 'react';
import Typography from '../../common/Typography/Typography';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <Typography as="h2" size="title1" color="--white-color">
        Header
      </Typography>
    </header>
  );
};

export default Header;
