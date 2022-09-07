import React, {FC} from 'react';
import BaseBtn from "./style/UI/button/BaseBtn";

const Layout: FC = () => {
    return (
        <div className='checked'>
            <BaseBtn children={'text1'}/>
        </div>
    );
};

export default React.memo(Layout);