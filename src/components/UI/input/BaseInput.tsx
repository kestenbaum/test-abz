import React, {FC} from 'react';
import style from './BaseInput.module.css'

interface IInput {
    valueInput: string
    setValueInput: any
    placeholder?: string
    type: string
}

const BaseInput :FC<IInput> = ({valueInput, setValueInput, placeholder, type}) => {
    return (
        <input
            className={style.inputModule}
            placeholder={placeholder}
            type={type}
            value={valueInput}
            onChange={e => setValueInput(e.target.value)}
        />
    );
};

export default React.memo(BaseInput);