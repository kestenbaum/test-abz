import React, {FC} from 'react';
import style from './BaseCheckbox.module.css'

interface IBaseCheckbox {
    children: string
    valuePosition: string
    setValuePosition: any
}

const BaseCheckbox :FC<IBaseCheckbox> = ({children,valuePosition, setValuePosition}) => {
    return (
        <label className={style.label}>
            <input
                type={"radio"}
                name="check"
                className={style.checkbox}
                value={valuePosition}
                onChange = {e => setValuePosition(e.target.value)}
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