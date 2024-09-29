import React, { FC } from 'react';

import logo from '../../assets/Grouplogo.svg';

interface LogoProps {
  title: string;
}

const Logo: FC<LogoProps> = ({ title }) => {
  return (
    <div className="logo">
      <img className="logo-img" src={logo} alt="logo website" />
      <span className="logo-title">{title}</span>
    </div>
  );
};

export default React.memo(Logo);
