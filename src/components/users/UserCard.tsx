import { FC } from 'react';

const UserCard: FC<UserInterface> = ({
  phone,
  email,
  position,
  name,
  photo,
}) => {
  return (
    <div className="user-card">
      <img className="block-img" src={photo} alt="photo" />
      <p className="person-name">{name}</p>
      <div className="person-info">
        <p className="person-information">{position}</p>
        <a
          href={`mailto:${email}`}
          title={email}
          className="person-information"
        >
          {email}
        </a>
        <a href={`tel: ${phone}`} className="person-information">
          {phone}
        </a>
      </div>
    </div>
  );
};

export default UserCard;
