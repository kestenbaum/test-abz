import React, {FC} from 'react';
import Header from "./components/header/Header";

const Layout: FC = () => {
    return (
        <>
            <Header/>
        </>
    );
};

export default React.memo(Layout);