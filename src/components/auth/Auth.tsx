import React, {FC} from 'react';
import AuthForm from "./AuthForm";

const Auth :FC= () => {
    return (
        <>
            <div className="container">
                <div className="auth-wrapper">
                    <h2 className="heading-auth">Working with POST request</h2>
                    <AuthForm/>
                </div>
            </div>
        </>
    );
};

export default React.memo(Auth);