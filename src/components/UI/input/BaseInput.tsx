import React, {FC} from 'react';
import style from './BaseInput.module.css'
interface IBaseInput {
    props?: any
}
const BaseInput :FC<IBaseInput> = (props) => {
    return (
        <input
            {...props}
            className={style.inputModule}
        />
    );
};

export default React.memo(BaseInput);