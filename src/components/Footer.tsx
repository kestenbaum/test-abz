import React, {FC} from 'react';

const Footer :FC= () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer-wrapper">
                    <span className="tm">© abz.agency specially for the test task</span>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);