import React, {FC} from 'react';
import style from './BaseBtn.module.css'

interface IBaseBtn extends
    React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
{
    disabled?: boolean
}

const BaseBtn :FC<IBaseBtn>= (props) => {

    const {children, ...rest} = props

    return (
        <button
            className={style.baseBtn}
            {...rest}
        >
            <span className={style.childrenBtn}>{children}</span>
        </button>
    );
};

export default React.memo(BaseBtn);