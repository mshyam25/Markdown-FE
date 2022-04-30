import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button } from 'react-bootstrap'
import { registerUser } from '../redux/actions/userActions'

import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { errorToast, infoToast } from '../utils'
const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userSignIn = useSelector((state) => state.userSignIn)
  const {
    loading: loadingUserInfo,

    userInfo,
  } = userSignIn

  const userRegister = useSelector((state) => state.userRegister)
  const {
    loading,
    error: errorRegistered,
    userInfo: userRegistered,
  } = userRegister
  const textFieldStyles = { style: { fontSize: 14 } }
  const formValidation = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .matches(
        '^[a-zA-Z ]{2,16}$',
        'Name should be minimum 2 characters and only letters are allowed'
      ),
    email: yup
      .string()
      .required('Email is required')
      .matches('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', 'Invalid Email Address'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
        'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
    confirmpassword: yup
      .string()
      .required('Password is required')
      .matches(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
        'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { name: '', email: '', password: '', confirmpassword: '' },
      validationSchema: formValidation,
      onSubmit: () => {
        if (values.password === values.confirmpassword) {
          dispatch(registerUser(values.name, values.email, values.password))
          values.name = ''
          values.email = ''
          values.password = ''
          values.confirmpassword = ''
        } else {
          errorToast('Passwords do not match')
        }
      },
    })
  useEffect(() => {
    if (userInfo) {
      infoToast('User Registration Completed.')
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
    if (errorRegistered) {
      errorToast(errorRegistered)
    }
  }, [userRegistered, errorRegistered, userInfo, dispatch, navigate])

  return (
    <>
      <div className='container flex-col'>
        <ToastContainer />
        {loading || loadingUserInfo ? (
          <Loader />
        ) : (
          <>
            <span className='secondary-heading'>New User ? Register here.</span>
            <form onSubmit={handleSubmit} className='form-container'>
              <TextField
                InputProps={textFieldStyles}
                InputLabelProps={textFieldStyles}
                id='name'
                name='name'
                value={values.name}
                label='Name'
                variant='standard'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name}
              />
              <span>{errors.name && touched.name ? errors.name : ''}</span>
              <TextField
                InputProps={textFieldStyles}
                InputLabelProps={textFieldStyles}
                id='email'
                name='email'
                value={values.email}
                label='Email'
                variant='standard'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
              />
              <span>{errors.email && touched.email ? errors.email : ''}</span>
              <TextField
                InputProps={textFieldStyles}
                InputLabelProps={textFieldStyles}
                id='password'
                name='password'
                type='password'
                value={values.password}
                label='Password'
                variant='standard'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
              />
              <span>
                {errors.password && touched.password ? errors.password : ''}
              </span>
              <TextField
                InputProps={textFieldStyles}
                InputLabelProps={textFieldStyles}
                id='confirmpassword'
                name='confirmpassword'
                type='password'
                value={values.confirmpassword}
                label='Confirm Password'
                variant='standard'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmpassword && touched.confirmpassword}
              />
              <span>
                {errors.confirmpassword && touched.confirmpassword
                  ? errors.confirmpassword
                  : ''}
              </span>
              <div className='btn-container'>
                {' '}
                <Button type='submit' className='btn' variant='info'>
                  Sign Up
                </Button>
              </div>{' '}
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default Signup
