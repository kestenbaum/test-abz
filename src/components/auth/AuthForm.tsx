import React, {useState} from 'react';
import BaseInput from "../UI/input/BaseInput";
import BaseBtn from "../UI/button/BaseBtn";
import BaseCheckbox from "../UI/checkbox/BaseCheckbox";
import UploadInput from "../UI/uploadInput/UploadInput";

const AuthForm = () => {
    const [phone, setPhone] = useState('')

    return (
        <>
            <form className='form-base'>

                <div className="form-personContact">
                    <BaseInput
                        placeholder={'Your name'}
                        type={'text'}
                        valueInput={phone}
                        setValueInput={setPhone}
                    />
                    <BaseInput
                        placeholder={'Email'}
                        type={'text'}
                        valueInput={phone}
                        setValueInput={setPhone}
                    />
                    <BaseInput
                        placeholder={'Phone'}
                        type={'text'}
                        valueInput={phone}
                        setValueInput={setPhone}
                    />
                </div>

                <div className="form-personSelect">
                    <h3 className="person-select">Select your position</h3>
                    <BaseCheckbox
                        children={'Frontend developer'}
                    />
                    <BaseCheckbox
                        children={'Backend developer'}
                    />
                    <BaseCheckbox
                        children={'Designer'}
                    />
                    <BaseCheckbox
                        children={'QA'}
                    />
                </div>

                <div className="form-personUpload">
                    <UploadInput/>
                </div>

                <BaseBtn
                    children={'Sign up'}
                    disabled={true}
                />
            </form>
        </>
    );
};

export default AuthForm;