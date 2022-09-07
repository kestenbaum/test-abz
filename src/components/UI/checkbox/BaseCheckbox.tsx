import React, {FC} from 'react';
import style from './BaseCheckbox.module.css'

interface IBaseCheckbox {
    children: string
}

const BaseCheckbox :FC<IBaseCheckbox> = ({children}) => {
    return (
        <label className={style.label}>
            <input
                type={"radio"}
                name="check"
                className={style.checkbox}
            />
            <span className={style.fakeCheckbox}></span>
            <span
                className={style.text}
            >
                {children}
            </span>
        </label>
    );
};

export default React.memo(BaseCheckbox);