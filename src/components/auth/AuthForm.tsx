import { useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

import BaseBtn from '../button/Button';
import SuccessRegister from './SuccessRegister';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchPositionDate } from '../../store/reducer/positionSlice';
import { fetchTokenSlice } from '../../store/reducer/tokenSlice';
import { fetchUsersDate } from '../../store/reducer/userSlice';
import SelectedPositions from '../selectedPositions/SelectedPositions';
import UploadFile from '../uploadFile/uploadFile';

const AuthForm = () => {
  const ref = useRef();
  const tokenData = useAppSelector((state) => state.ActionTokenSlice.tokenData);
  const positionData = useAppSelector(
    (state) => state.ActionPositionSlice.positionData,
  );
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<Status>({
    disabled: false,
    success: false,
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInterface>();

  const onSubmit: SubmitHandler<UserInterface> = (data) => {
    const getPositionItem = positionData.find(
      (item) => item.name === data.position,
    );
    const photoItem = ref.current.files[0];
    const formData = new FormData();
    formData.append('registration_timestamp', String(Date.now()));
    formData.append('id', String(Date.now()));
    formData.append(
      'position_id',
      data.position === null ? '1' : String(getPositionItem.id),
    );
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position', data.position);
    formData.append('photo', photoItem);

    axios
      .post(
        'https://frontend-test-assignment-api.abz.agency/api/v1/users',
        formData,
        { headers: { Token: tokenData } },
      )
      .then((response) => {
        setStatus({ ...status, success: response.data.success });
        dispatch(fetchUsersDate(1));
      });
  };

  const handlerUploadFile = useCallback(() => {
    ref.current.files.length === 0 &&
      setStatus({ ...status, error: 'You must upload your avatar' });
  }, [ref.current.files]);

  useEffect(() => {
    dispatch(fetchPositionDate());
    dispatch(fetchTokenSlice());
  }, []);

  useEffect(() => {
    Object.keys(errors).length === 0 &&
      setStatus({ ...status, disabled: false });
  }, [Object.keys(errors).length]);

  return (
    <>
      {status.success ? (
        <SuccessRegister />
      ) : (
        <form className="form-base" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-personContact">
            <input
              className="input-base"
              placeholder="Name"
              {...register('name', {
                required: 'Username should contain 2-60 characters',
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,60}$/,
                  message: 'Username should contain 2-60 characters',
                },
              })}
            />
            {errors.name && (
              <div style={{ color: 'red' }}>{errors.name.message}</div>
            )}
            <input
              className="input-base"
              placeholder="Email"
              {...register('email', {
                required: 'Please enter valid email!',
                pattern: {
                  value:
                    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                  message: 'Please enter valid email',
                },
              })}
            />
            {errors.email && (
              <div style={{ color: 'red' }}>{errors.email.message}</div>
            )}
            <input
              className="input-base"
              placeholder="Phone"
              {...register('phone', {
                required: 'Number should start with code of Ukraine +380',
                pattern: {
                  value: /^[\+]{0,1}380([0-9]{9})$/,
                  message: 'Number should start with code of Ukraine +380',
                },
              })}
            />
            {errors.phone && (
              <div style={{ color: 'red' }}>{errors.phone.message}</div>
            )}
          </div>

          <SelectedPositions array={positionData} register={register} />
          {status.error?.length > 0 && (
            <div style={{ color: 'red', marginBottom: '20px' }}>
              {status.error}
            </div>
          )}
          <UploadFile register={register} errors={errors} ref={ref} />
          <BaseBtn
            children={'Sign up'}
            disabled={status.disabled}
            onClick={handlerUploadFile}
          />
        </form>
      )}
    </>
  );
};

export default AuthForm;
