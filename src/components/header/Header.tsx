import React, {FC} from 'react';
import Logo from "./Logo";

const Header :FC= () => {

    return (
        <header className='header'>
            <div className="container">
                <div className="header-wrapper">
                    <Logo title={'TESTTASK'}/>
                </div>
            </div>
        </header>
    );
};

export default React.memo(Header);