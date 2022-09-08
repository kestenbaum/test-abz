import React, {FC} from 'react';
import icon from './../../assetc/success-image.svg'

const SuccessRegister :FC= () => {
    return (
        <div className='block-success'>
            <h2 className="heading">User successfully registered</h2>
            <img src={icon} alt="" className='success-image'/>
        </div>
    );
};

export default React.memo(SuccessRegister);