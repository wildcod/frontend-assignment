import React from 'react';
import Typography from '../../common/Typography/Typography';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <Typography
        as="h2"
        size="title1"
        color="--white-color"
        ariaLabel="crowed funding homepage"
        role="presentation"
        tabIndex={0}
        className="heading"
      >
        Crowed Funding
      </Typography>
    </header>
  );
};

export default Header;
