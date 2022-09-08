import React, {FC, useEffect, useMemo, useState} from 'react';
import UserCard from "./UserCard";
import axios from "axios";
import BaseBtn from "../UI/button/BaseBtn";
import Loader from "../UI/loader/Loader";
import {IPerson} from "../../types";

const UsersList :FC= () => {

    const [userData, setUserData] = useState<IPerson[]>([])
    const [arrayLength, setArrayLength] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [countItem, setCountItem] = useState<number>(6)


    async function fetchUser () {
        const response =  await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=${countItem}`)
        const users = response.data.users
        const currentPages = response.data.page
        const totalUsers = response.data.total_users

        setUserData(users)
        setCurrentPage(currentPages)
        setArrayLength(totalUsers)
    }

    const sortUserData = [...userData].sort((a:IPerson, b:IPerson) => b.registration_timestamp - a.registration_timestamp)

    const showItems = () => {
        setCurrentPage(currentPage + 1)
        setUserData(prev => [...prev, ...userData])
    }

    useEffect(() => {
        fetchUser()
        setArrayLength(arrayLength + 6)
    }, [currentPage])

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