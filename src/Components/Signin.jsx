import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button } from 'react-bootstrap'
import { userLogIn } from '../redux/actions/userActions'
import Loader from './Loader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { errorToast, infoToast, successToast } from '../utils'
const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { loading, success, error, userInfo, registered } = userSignIn

  const formValidation = yup.object({
    email: yup
      .string()
      .required('Email is required')
      .matches('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', 'Invalid Email Address'),
    password: yup.string().required('Password is required'),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: '', password: '' },
      validationSchema: formValidation,
      onSubmit: () => {
        dispatch(userLogIn(values.email, values.password))
        values.email = ''
        values.password = ''
      },
    })
  const textFieldStyles = { style: { fontSize: 14 } }
  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate('/')
      }, 4000)
    }
    if (success) {
      successToast('User is Signed In')
    }
    if (registered)
      infoToast(
        'Account created. Verification Mail is sent.Please Verify your account.'
      )
    if (error) errorToast('Invalid Credentials')
  }, [userInfo, navigate, registered, success, error])
  return (
    <>
      <div className='container flex-col'>
        <ToastContainer />
        {loading ? (
          <Loader />
        ) : (
          <>
            <span className='secondary-heading'>Sign in</span>

            <form onSubmit={handleSubmit} className='form-container'>
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
              <span className='helper-text'>
                {errors.email && touched.email ? errors.email : ''}
              </span>
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
              <span className='helper-text'>
                {errors.password && touched.password ? errors.password : ''}
              </span>
              <a href='/forgotpassword' className='links'>
                Forgot password ?
              </a>
              <div className='btn-container'>
                <Button type='submit' variant='info' className='btn'>
                  Sign in
                </Button>{' '}
              </div>
              <div className='btn-container'>
                <span className='helper-text'>
                  New Customer ?{' '}
                  <a href='/signup' className='links'>
                    Sign Up
                  </a>
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default SignIn
