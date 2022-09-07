import React, {FC, useEffect, useMemo, useState} from 'react';
import UserCard from "./UserCard";
import axios from "axios";
import BaseBtn from "../UI/button/BaseBtn";
import Loader from "../UI/loader/Loader";

const UsersList :FC= () => {

    const [userData, setUserData] = useState([])
    const [arrayLength, setArrayLength] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [countItem, setCountItem] = useState<number>(6)

    async function fetchUser () {
        const responce =  await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=${countItem}`)
        const users = responce.data.users
        const currentPages = responce.data.page
        const totalUsers = responce.data.total_users

        setUserData(users)
        setCurrentPage(currentPages)
        setArrayLength(totalUsers)
    }

    const showItems = () => {
        setCountItem(countItem + 6)
    }

    useEffect(() => {
        fetchUser()
        setArrayLength(arrayLength + 6)
    }, [countItem])

    return (
        <>
            <div className='user-list'>
                <>
                    {userData.length > 0
                        ? userData.map((item, idx) => <UserCard key = {idx} props={item}/>)
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