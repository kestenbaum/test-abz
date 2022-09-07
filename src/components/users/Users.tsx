import React, {FC} from 'react';
import UsersList from "./UsersList";

const Users :FC= () => {

    return (
        <>
            <div className="container">
                <div className='users-wrapper'>
                    <h2 className="heading-users">Working with GET request</h2>
                    <UsersList/>
                </div>
            </div>
        </>
    );
};

export default React.memo(Users);