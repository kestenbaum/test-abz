import React, {FC} from 'react';
import style from './UploadInput.module.css'

interface IUploadInput {
    valueImg: any
    setValueImg: any
}

const UploadInput :FC<IUploadInput>= ({valueImg, setValueImg}) => {
    return (
        <label className={style.file}>
            <input
                    type="file"
                    id="file"
                    aria-label="File browser example"
                    accept="image/png, image/jpg, image/gif, image/jpeg"
                    className={style.input}
                    value={valueImg}
                    onChange = {e => setValueImg(e.target.value)}
            />
                <span className={style.fakeInput}>Upload</span>
                <span className={style.fileCustom}>Upload your photo</span>
        </label>
    );
};

export default React.memo(UploadInput);