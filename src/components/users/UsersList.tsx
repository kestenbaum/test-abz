import React, { FC, useEffect, useState } from 'react';

import UserCard from './UserCard';
import BaseBtn from '../button/Button';
import Loader from '../loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUsersDate } from '../../store/reducer/userSlice';

const UsersList: FC = () => {
  const dispatch = useAppDispatch();
  const totalAllUsers = useAppSelector(
    (state) => state.ActionUserSlice.totalUsers,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentUserDate, setCurrentUserDate] = useState<UserInterface[]>([]);

  async function showItems() {
    setCurrentPage(currentPage + 1);
    const users = dispatch(fetchUsersDate(currentPage));
    const newUsers = await users.then((response) => response.payload.users);
    setCurrentUserDate([...currentUserDate, ...newUsers]);
  }

  useEffect(() => {
    setCurrentPage(currentPage + 1);
    const users = dispatch(fetchUsersDate(currentPage));
    users.then((response) => setCurrentUserDate(response.payload.users));
  }, []);

  useEffect(() => {
    const users = dispatch(fetchUsersDate(1));
    users.then((response) => setCurrentUserDate(response.payload.users));
  }, [totalAllUsers]);

  return (
    <>
      <div className="user-list">
        <>
          {currentUserDate.length > 0 ? (
            currentUserDate.map((item: UserInterface, idx: number) => (
              <UserCard
                key={idx}
                name={item.name}
                email={item.email}
                position={item.position}
                photo={item.photo}
                phone={item.phone}
                id={item.id}
              />
            ))
          ) : (
            <Loader />
          )}
        </>
      </div>
      <>
        {currentUserDate.length === !totalAllUsers &&
          <BaseBtn onClick={showItems} children={'Show more'} />
        }
      </>
    </>
  );
};

export default UsersList;
