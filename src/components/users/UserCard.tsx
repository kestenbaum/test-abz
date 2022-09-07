import React, {FC} from 'react';

interface IUserCard {
   props: any
}

const UserCard :FC<IUserCard>= ({props}) => {
    return (
        <div className='user-card'>
            <img className="block-img" src={props.photo}/>
            <span className="person-name">{props.name}</span>
            <div className="person-info">
                <div className="person-info">{props.position}</div>
                <span className="person-mail">{props.email}</span>
                <span className="person-number">{props.phone}</span>
            </div>
        </div>
    );
};

export default React.memo(UserCard);