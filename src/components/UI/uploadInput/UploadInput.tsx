import React, {FC} from 'react';
import style from './UploadInput.module.css'

const UploadInput :FC= () => {

    return (
        <label className={style.file}>
            <input
                    type="file"
                    id="file"
                    className={style.input}
            />
                <span className={style.fakeInput}>Upload</span>
                <span className={style.fileCustom}>Upload your photo</span>
        </label>
    );
};

export default React.memo(UploadInput);