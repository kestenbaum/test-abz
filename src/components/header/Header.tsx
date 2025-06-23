import React, { FC } from 'react';

import Logo from './Logo';
import Button from '../UI/button/Button';
import Container from '../container/Container';

const Header: FC = () => {
  return (
    <header className="header">
      <Container>
        <header className="header-wrapper">
          <Logo title={'TESTTASK'} />
          <menu className="header-auth">
            <Button children={'Users'} />
            <Button children={'Sign up'} />
          </menu>
        </header>
      </Container>
    </header>
  );
};

export default Header;
