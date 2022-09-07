import React, {FC} from 'react';
import style from './BaseCheckbox.module.css'

interface IBaseCheckbox {
    disabled ?: boolean
    children: string
    checked?: boolean
}

const BaseCheckbox :FC<IBaseCheckbox> = ({disabled,children, checked}) => {
    return (
        <label className={style.label}>
            <input
                type={"radio"}
                name="check"
                disabled={disabled}
                checked={checked}
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