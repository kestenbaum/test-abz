import React, {useEffect, useState} from 'react';
import BaseInput from "../UI/input/BaseInput";
import BaseBtn from "../UI/button/BaseBtn";
import BaseCheckbox from "../UI/checkbox/BaseCheckbox";
import UploadInput from "../UI/uploadInput/UploadInput";
import axios from "axios";

const AuthForm = () => {
    const [phone, setPhone] = useState('')
    const [positions, setPositions] = useState<any[]>([])

    async function getPosition() {
        const responce = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        const positionsPerson = responce.data.positions
        setPositions([...positions, ...positionsPerson])
    }

    console.log(positions)
    useEffect(() => {
        getPosition()
    }, [])


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
                    {positions.map(item =>  <BaseCheckbox key={item.id}children={item.name}/>)}
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