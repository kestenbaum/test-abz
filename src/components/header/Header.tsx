import React, { FC } from 'react';

import Logo from './Logo';
import Button from '../button/Button';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">
          <Logo title={'TESTTASK'} />
          <div className="header-auth">
            <Button children={'Users'} />
            <Button children={'Sign up'} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
