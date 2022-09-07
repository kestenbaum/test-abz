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
                <p className="person-information">{props.position}</p>
                <a href={`mailto:${props.email}`}  title={props.email} className="person-information">{props.email}</a>
                <a href={`tel: ${props.phone}`} className="person-information">{props.phone}</a>
            </div>
        </div>
    );
};

export default React.memo(UserCard);