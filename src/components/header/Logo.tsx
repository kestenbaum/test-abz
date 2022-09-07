import React, {FC} from 'react';
import logo from './../../assetc/Grouplogo.svg'

interface ILogo {
    title: string
}

const Logo :FC<ILogo>= ({title}) => {

    return (
        <div className='logo'>
            <img src={logo} alt="logo website"/>
            <span>{title}</span>
        </div>
    );
};

export default React.memo(Logo);