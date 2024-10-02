import React, { FC, ReactNode } from 'react';

import style from './Container.module.css';
interface Container {
  children: ReactNode;
}

const Container: FC<Container> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default Container;
