import React, {FC, useEffect, useRef, useState} from 'react';
import BaseBtn from "../UI/button/BaseBtn";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import {IPerson} from "../../types";
import SuccessRegister from "./SuccessRegister";
import Loader from "../UI/loader/Loader";

const AuthForm :FC = () => {
    const [userData, setUserData] = useState<IPerson[]>([])

    async function fetchUser () {
        const response =  await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users`)
        const users = response.data.users
        setUserData(users)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const [positions, setPositions] = useState<any[]>([])
    const [disabled, setDisabled] = useState<boolean>(false)
    const [token, setToken] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)
    const [nameInput, setNameInput] = useState<string>('Upload your photo')
    const [file, setFile] = useState<any>(null);
    //errors
    const [errorType, setErrorType] = useState<string>('')
    const [errorSize, setErrorSize] = useState<string>('')
    const [errorStyleFakeInput, setErrorStyleFakeInput] = useState<string>(['fakeInput'].join(' '))
    const [errorStyleFileCustom, setErrorStyleFileCustom] = useState<string>(['fileCustom'].join(' '))
    const ref:any = useRef()
    const [checked, setChecked] = useState<boolean>(true)


    const handlerChecked = (event: React.ChangeEvent<HTMLInputElement>)  => {
        console.log(event.target.checked)
        setChecked(true)
    }

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
        const getPositionItem = positions.find(item => item.name === data.position)
        const formData = new FormData()
        formData.append('registration_timestamp', String(Date.now()))
        formData.append('id', String(Date.now()))
        formData.append('position_id',  data.position === null ? '1' : String(getPositionItem.id))
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('position', data.position);
        formData.append('photo', ref.current.files[0]);
        axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, {headers: {'Token': token}})
            .then(response => setSuccess(response.data.success))
    }

    useEffect(() => {
        getPosition()
        getTokenApi()
    }, [])

    useEffect(() => {
        Object.keys(errors).length === 0 ? setDisabled(false) : setDisabled(true)
    }, [Object.keys(errors).length])

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
        <>
            {userData.length === 0
                ? <Loader/>
                :
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
                                            onChange={handlerChecked}
                                            //checked={checked}
                                        />
                                        <span className={'fakeCheckbox'}></span>
                                        <span>{item.name}</span>
                                    </label>
                                )}
                            </div>

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
                            <BaseBtn
                                children={'Sign up'}
                                disabled={disabled}
                            />
                        </form>
                    }
                </>
            }
        </>
    );
};

export default React.memo(AuthForm);