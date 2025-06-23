import { FC } from 'react';

import style from './Checkbox.module.css';

interface CheckboxProps {
  children: string;
}

const Checkbox: FC<CheckboxProps> = ({ children }) => {
  return (
    <label className={style.label}>
      <input type={'radio'} name="check" className={style.checkbox} />
      <span className={style.fakeCheckbox}></span>
      <span className={style.text}>{children}</span>
    </label>
  );
};

export default Checkbox;
