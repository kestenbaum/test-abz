import React, {FC} from 'react';

interface IUserCard {
   props: any
}

const UserCard :FC<IUserCard>= ({props}) => {
    return (
        <div className='user-card'>
            <img className="block-img" src={props.photo}/>
            <p className="person-name">{props.name}</p>
            <div className="person-info">
                <p className="person-info">{props.position}</p>
                <p className="person-mail">{props.email}</p>
                <p className="person-number">{props.phone}</p>
            </div>
        </div>
    );
};

export default React.memo(UserCard);