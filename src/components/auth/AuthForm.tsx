import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { z } from 'zod';

import BaseBtn from '../UI/button/Button';
import SuccessRegister from './SuccessRegister';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchPositionDate } from '../../store/reducer/positionSlice';
import { fetchTokenSlice } from '../../store/reducer/tokenSlice';
import { fetchUsersDate } from '../../store/reducer/userSlice';
import SelectedPositions from '../selectedPositions/SelectedPositions';
import UploadFile from '../uploadFile/uploadFile';

const schema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\+380\d{9}$/, 'Number should start with +380 and have 12 digits'),
  position: z.string(),
  photo: z
      .any()
      .refine((file) => file instanceof File, 'You must upload your avatar'),
});

type FormValues = z.infer<typeof schema>;

const AuthForm = () => {
  const ref = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const tokenData = useAppSelector((state) => state.ActionTokenSlice.tokenData);
  const positionData = useAppSelector((state) => state.ActionPositionSlice.positionData);

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormValues) => {
    const selectedPosition = positionData.find((item) => item.name === data.position);
    const photoFile = data.photo as File;

    const formData = new FormData();
    formData.append('registration_timestamp', String(Date.now()));
    formData.append('id', String(Date.now()));
    formData.append('position_id', selectedPosition?.id.toString() || '1');
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('photo', photoFile);

    try {
      const response = await axios.post(
          'https://frontend-test-assignment-api.abz.agency/api/v1/users',
          formData,
          { headers: { Token: tokenData } },
      );

      if (response.data.success) {
        setSuccess(true);
        dispatch(fetchUsersDate(1));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(fetchPositionDate());
    dispatch(fetchTokenSlice());
  }, []);

  if (success) return <SuccessRegister />;

  return (
      <form className="form-base" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-personContact">
          <input
              className="input-base"
              placeholder="Name"
              {...register('name')}
          />
          {errors.name && <div className="error">{errors.name.message}</div>}

          <input
              className="input-base"
              placeholder="Email"
              {...register('email')}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}

          <input
              className="input-base"
              placeholder="Phone"
              {...register('phone')}
          />
          {errors.phone && <div className="error">{errors.phone.message}</div>}
        </div>

        <SelectedPositions array={positionData} register={register} />

        <UploadFile
            ref={ref}
            register={register}
            errors={errors}
            onFileChange={(file) => setValue('photo', file, { shouldValidate: true })}
        />

        {errors.photo && <div className="error">{errors.photo.message}</div>}

        <BaseBtn children="Sign up" />
      </form>
  );
};

export default AuthForm;
