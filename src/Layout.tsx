import React, {FC} from 'react';
import Header from "./components/header/Header";
import FirstScreen from "./components/FirstScreen";
import Users from "./components/users/Users";
import Auth from "./components/auth/Auth";
import Footer from "./components/Footer";


const Layout: FC = () => {
    return (
        <>
            <Header/>
            <FirstScreen/>
            <Users/>
            <Auth/>
            <Footer/>
        </>
    );
};

export default React.memo(Layout);