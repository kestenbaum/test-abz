import React, {FC, useEffect, useState} from 'react';
import UserCard from "./UserCard";
import axios from "axios";

const UsersList :FC= () => {

    const [userData, setUserData] = useState([])
    const [totalPage, setTotalPage] = useState<number>(0)

    async function fetch () {
        const responce =  await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users')
        const users = responce.data.users
        const pages = responce.data.total_pages
        setUserData(users)
        setTotalPage(pages)
    }

    useEffect(() => {
        fetch()
    }, [])


    return (
        <div className='user-list'>
            {userData.map((item, idx) => <UserCard key = {idx} props={item}/>)}
        </div>
    );
};

export default React.memo(UsersList);