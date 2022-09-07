import React, {useEffect, useState} from 'react';
import BaseInput from "../UI/input/BaseInput";
import BaseBtn from "../UI/button/BaseBtn";
import BaseCheckbox from "../UI/checkbox/BaseCheckbox";
import UploadInput from "../UI/uploadInput/UploadInput";
import axios from "axios";

const AuthForm = () => {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [positions, setPositions] = useState<any[]>([])
    const [checkedPositions, setCheckedPositions] = useState<string>('frontend')
    const [valueImgUpload, setValueImgUpload] = useState<any>()

    async function getPosition() {
        const responce = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        const positionsPerson = responce.data.positions
        setPositions([...positionsPerson])
    }

    console.log(positions)
    useEffect(() => {
        getPosition()
    }, [])


    const createNewPerson = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const newPerson = {
            id: Date.now(),
            position_id: 1,
            registration_timestamp: Date.now(),
            name, phone, mail, checkedPositions, valueImgUpload
        }
        console.log(newPerson)
    }


    const changePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
       let value = event
        setCheckedPositions(String(value))
    }


    return (
        <>
            <form className='form-base'>

                <div className="form-personContact">
                    <BaseInput
                        placeholder={'Your name'}
                        type={'text'}
                        valueInput={name}
                        setValueInput={setName}
                    />
                    <BaseInput
                        placeholder={'Email'}
                        type={'text'}
                        valueInput={mail}
                        setValueInput={setMail}
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
                    {positions.map(item =>
                        <BaseCheckbox
                            key={item.id}
                            children={item.name}
                            valuePosition={item.name}
                            setValuePosition={changePosition}
                        />
                    )}
                </div>

                <div className="form-personUpload">
                    <UploadInput
                        valueImg={valueImgUpload}
                        setValueImg={setValueImgUpload}
                    />
                </div>

                <BaseBtn
                    children={'Sign up'}
                    disabled={false}
                    onClick = {createNewPerson}
                />
            </form>
        </>
    );
};

export default React.memo(AuthForm);