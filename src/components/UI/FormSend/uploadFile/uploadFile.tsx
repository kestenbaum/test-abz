import React, {FC, useState} from 'react';

interface IUploadFile {
    register: any
    errors: any
    ref: any
}

const UploadFile :FC<IUploadFile> = React.forwardRef(({register, errors}, ref) => {

    /*---- errors ----*/
    const [errorType, setErrorType] = useState<string>('')
    const [errorSize, setErrorSize] = useState<string>('')
    const [errorStyleFakeInput, setErrorStyleFakeInput] = useState<string>(['fakeInput'].join(' '))
    const [errorStyleFileCustom, setErrorStyleFileCustom] = useState<string>(['fileCustom'].join(' '))

    const [nameInput, setNameInput] = useState<string>('Upload your photo')
    const [file, setFile] = useState<any>(null);

    const fileChangedHandler = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        setNameInput(file.name)

        reader.onload = function (e: any) {
            setFile(e.target.value);
        };
        reader.readAsDataURL(event.target.files[0]);


        if (file.type.length === 10) {
            setErrorType('')
            setErrorStyleFileCustom('fileCustom')
            setErrorStyleFakeInput('fakeInput')
        } else {
            setErrorType("The photo format must be jpeg/jpg type.")
            setErrorStyleFileCustom([...errorStyleFileCustom.split(' '), 'errorCustomInput'].join(' '))
            setErrorStyleFakeInput([...errorStyleFakeInput.split(' '), 'errorFakeInput'].join(' '))
        }

        if (file.size > 5242880) {
            setErrorSize("The photo size must not be greater than 5 Mb")
        } else {
            setErrorSize('')
        }

    }

    return (
        <div className="form-personUpload">
            <label
                className='file'
            >
                <input
                    type="file"
                    className={'input'}
                    {...register('photo')}
                    ref={ref}
                    onChange={fileChangedHandler}
                />
                {errors.photo && <div style={{color: 'red'}}>{'error'}</div>}
                <span className={errorStyleFakeInput}>Upload</span>
                <span
                    className={errorStyleFileCustom}
                >
                                        {nameInput}
                                    </span>
            </label>
            {errorSize.length > 1 && <div style={{color: 'red'}}>{errorSize}</div>}
            {errorType.length > 1 && <div style={{color: 'red'}}>{errorType}</div>}
        </div>
    );
});

export default React.memo(UploadFile);