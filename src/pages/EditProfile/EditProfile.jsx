import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { updateProfile } from '../../services/services';

import './EditProfile.scss';

export default function EditProfile() {
  const { jwt, username, email } = useSelector((state) => state.user);

  const nav = useNavigate();
  useEffect(() => {
    if (!jwt) {
      nav('/sign-in');
    }
  }, [jwt, nav]);

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .email('Email is invalid')
      .required('Email is required')
      .lowercase('Email must be lowercase'),
    password: yup.string().min(6, 'Password must be at least 6 characters'),
    image: yup.string().url('Avatar image URL is invalid'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await updateProfile(data, jwt);
      reset();
      message.info('profile updated');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div className='edit-profile'>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          {errors.username && <span className='error'>{errors.username.message}</span>}
          <input
            type='text'
            placeholder='Username'
            defaultValue={username}
            {...register('username')}
          />
        </label>
        <label className='email'>
          Email address
          {errors.email && <span className='error'>{errors.email.message}</span>}
          <input
            type='email'
            placeholder='Email address'
            defaultValue={email}
            {...register('email')}
          />
        </label>
        <label>
          New password
          {errors.password && <span className='error'>{errors.password.message}</span>}
          <input
            type='password'
            placeholder='New password'
            {...register('password')}
            autoComplete='off'
          />
        </label>

        <label>
          Avatar image (URL)
          {errors.image && <span className='error'>{errors.image.message}</span>}
          <input type='url' placeholder='Avatar image URL' {...register('image')} />
        </label>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
