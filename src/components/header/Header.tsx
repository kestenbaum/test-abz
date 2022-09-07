import React, {FC} from 'react';
import Logo from "./Logo";
import BaseBtn from "../UI/button/BaseBtn";

const Header :FC= () => {

    return (
        <header className='header'>
            <div className="container">
                <div className="header-wrapper">
                    <Logo title={'TESTTASK'}/>
                    <div className='header-auth'>
                        <BaseBtn children={'Users'}/>
                        <BaseBtn children={'Sign up'}/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default React.memo(Header);