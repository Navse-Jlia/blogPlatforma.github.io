import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registration } from '../../services/services';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './SignUpForm.scss';

const schema = yup.object().shape({
  username: yup.string().required().min(3).max(20),
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(40),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
  checkbox: yup.boolean().oneOf([true], 'Please agree to the terms').required(),
});

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registration(data);
      message.info('you have successfully created an account');
      nav('/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='sign-up-form'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='username' className='username'>
          Username
          {errors.username && <span className='error'>{errors.username.message}</span>}
          <input
            className='inp-error'
            type='text'
            id='username'
            placeholder='some-username'
            {...register('username')}
          />
        </label>

        <label htmlFor='email' className='email'>
          Email address
          {errors.email && <span className='error'>{errors.email.message}</span>}
          <input
            className='inp-error'
            type='email'
            id='email'
            placeholder='Email address'
            {...register('email')}
          />
        </label>

        <label htmlFor='password' className='pass'>
          Password
          {errors.password && <span className='error'>{errors.password.message}</span>}
          <input
            className='inp-error'
            type='password'
            id='password'
            placeholder='Password'
            {...register('password')}
            autoComplete='off'
          />
        </label>

        <label htmlFor='repeatPassword'>
          Repeat Password
          {errors.repeatPassword && <span className='error'>{errors.repeatPassword.message}</span>}
          <input
            className='inp-error'
            type='password'
            id='repeatPassword'
            placeholder='Repeat Password'
            {...register('repeatPassword')}
            autoComplete='off'
          />
        </label>

        <label htmlFor='checkbox' className='check'>
          <input type='checkbox' id='checkbox' {...register('checkbox')} />I agree to the processing
          of my personal information
          <br />
          {errors.checkbox && <span className='error'>{errors.checkbox.message}</span>}
        </label>

        <button type='submit'>Create</button>

        <span className='already'>
          Already have an account ? <Link to='/sign-in'>Sign In.</Link>
        </span>
      </form>
    </div>
  );
}
