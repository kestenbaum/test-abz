import React, {FC, useEffect, useState} from 'react';
import UserCard from "./UserCard";
import BaseBtn from "../UI/button/BaseBtn";
import Loader from "../UI/loader/Loader";
import {IPerson} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchUsersDate, userSlice} from "../../store/reducer/userSlice";



const UsersList :FC= () => {
    const dispatch = useAppDispatch()
    const [arrayLength] = useState<number>(1)

    /*---- get users ----*/
    const userData = useAppSelector(state => state.ActionUserSlice.userData)

    useEffect(() => {
        dispatch(fetchUsersDate([]));
    }, [])

    const showItems = () => {
        dispatch(userSlice.actions.showMore())
    }

    /*---- Sorted Post ----*/
    const sortUserData = [...userData].sort((a:IPerson, b:IPerson) => b.registration_timestamp - a.registration_timestamp)

    return (
        <>
            <div className='user-list'>
                <>
                    {userData.length > 0
                        ? sortUserData.map((item, idx) => <UserCard key = {idx} props={item}/>)
                        : <Loader/>
                    }
                </>
            </div>
            <>
                {
                    userData.length === arrayLength || userData.length === 0
                    ? null
                    : <BaseBtn
                            onClick={showItems}
                            children={'Show more'}
                        />
                }
            </>
        </>
    );
};

export default React.memo(UsersList);