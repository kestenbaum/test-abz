import React, {FC} from 'react';
import loader from './../../../assetc/Preloaderloader.svg'
import style from './Loader.module.css'

const Loader :FC= () => {

    return (
        <div className={style.loader}>
            <img src={loader} alt="loader" className={style.loaderIcon}/>
            <span>Loading...</span>
        </div>
    );
};

export default React.memo(Loader);