import { ButtonHTMLAttributes, FC } from 'react';

import style from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className={style.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
