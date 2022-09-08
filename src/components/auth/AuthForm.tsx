import React, {useEffect, useRef, useState} from 'react';
import BaseBtn from "../UI/button/BaseBtn";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {IPerson} from "../../types";
import SuccessRegister from "./SuccessRegister";

const AuthForm = () => {
    const [positions, setPositions] = useState<any[]>([])
    const [disabled, setDisabled] = useState<boolean>(false)
    const [token, setToken] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)
    const [nameInput, setNameInput] = useState<string>('Upload your photo')
    const ref:any = useRef()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IPerson>()

    async function getPosition() {
       await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(response => setPositions([...response.data.positions]))
    }

    async function getTokenApi () {
        await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then(response => setToken(response.data.token))
    }

    const onSubmit:SubmitHandler<IPerson> = (data) => {
        const formData = new FormData()
        formData.append('registration_timestamp', String(Date.now()))
        formData.append('id', String(Date.now()))
        formData.append('position_id', '2')
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('photo', ref.current.files[0]);
        axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, {headers: {'Token': token}})
            .then(responve => setSuccess(responve.data.success))
    }

    useEffect(() => {
        getPosition()
        getTokenApi()
    }, [])

    useEffect(() => {
        Object.keys(errors).length === 0 ? setDisabled(false) : setDisabled(true)
    }, [Object.keys(errors).length])

    const updatePhotoUser = () => {
        const getPhotoUser = ref?.current?.files[0]
        setNameInput(getPhotoUser.name)
    }

    return (
        <>
            {success
                ?   <SuccessRegister/>
                :   <form className='form-base' onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-personContact">
                        <input
                            className='input-base'
                            placeholder='Name'
                            {...register('name',
                                {
                                    required: 'Username should contain 2-60 characters',
                                    pattern: {
                                        value: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,60}$/,
                                        message: 'Username should contain 2-60 characters',
                                    }
                                })}
                        />
                        {errors.name && <div style={{color: 'red'}}>{errors.name.message}</div>}
                        <input
                            className='input-base'
                            placeholder='Email'
                            {...register('email', {
                                required: 'Please enter valid email!',
                                pattern: {
                                    value:
                                        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                                    message: 'Please enter valid email'
                                }
                            })}
                        />
                        {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
                        <input
                            className='input-base'
                            placeholder='Phone'
                            {...register('phone', {
                                required: 'Number should start with code of Ukraine +380',
                                pattern: {
                                    value: /^[\+]{0,1}380([0-9]{9})$/,
                                    message: 'Number should start with code of Ukraine +380'
                                }
                            })}
                        />
                        {errors.phone && <div style={{color: 'red'}}>{errors.phone.message}</div>}
                    </div>

                    <div className="form-personSelect">
                        <h3 className="person-select">Select your position</h3>
                        {positions.map((item, idx) =>
                            <label className={'label'} key={idx}>
                                <input
                                    type="radio"
                                    value={item.name}
                                    {...register('position')}
                                    className={'checkbox'}
                                />
                                <span className={'fakeCheckbox'}></span>
                                <span>{item.name}</span>
                            </label>
                        )}
                    </div>


                    <div className="form-personUpload">
                        <label className='file'>
                            <input
                                type="file"
                                className={'input'}
                                {...register('photo')}
                                ref={ref}
                                accept="image/jpeg"
                                onChange={updatePhotoUser}
                            />
                            {errors.photo && <div style={{color: 'red'}}>{'error'}</div>}
                            <span className={'fakeInput'}>Upload</span>
                            <span
                                className={'fileCustom'}
                            >
                                {nameInput}
                            </span>
                        </label>
                    </div>

                    <BaseBtn
                        children={'Sign up'}
                        disabled={disabled}
                    />
                </form>
            }
        </>
    );
};

export default React.memo(AuthForm);