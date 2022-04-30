import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button } from 'react-bootstrap'
import Loader from './Loader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { errorToast, infoToast, successToast } from '../utils'
import { findUser, resetPasswordLink } from '../redux/actions/userActions'
const ForgotPassword = () => {
  const dispatch = useDispatch()

  const userFind = useSelector((state) => state.userFind)
  const { loading, error, success } = userFind

  const passwordResetLink = useSelector((state) => state.passwordResetLink)
  const {
    loading: loadingLink,
    error: errorLink,
    success: successLink,
  } = passwordResetLink

  const formValidation = yup.object({
    email: yup
      .string()
      .required('Email is required')
      .matches('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', 'Invalid Email Address'),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: '' },
      validationSchema: formValidation,
      onSubmit: () => {
        dispatch(findUser(values.email))
      },
    })

  const sendVerificationLink = () => {
    dispatch(resetPasswordLink(values.email))
  }

  useEffect(() => {
    if (error) errorToast(error)
    if (errorLink) errorToast(errorLink)
    if (successLink) {
      successToast('Email Sent')
    }
  }, [error, errorLink, successLink])

  return (
    <>
      <div className='container flex-col'>
        <ToastContainer />
        {loading || (loadingLink && <Loader />)}
        {successLink && (
          <div className='form-container'>
            <span className='primary-text'>{successLink}</span>
          </div>
        )}
        {!success && (
          <>
            <span className='secondary-heading'>Lets find your Account</span>
            <form onSubmit={handleSubmit} className='form-container'>
              <TextField
                id='email'
                name='email'
                value={values.email}
                label='Email'
                variant='filled'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
              />
              <span>{errors.email && touched.email ? errors.email : ''}</span>
              <div className='btn-container'>
                <Button type='submit' className='cta-btn-md' variant='warning'>
                  Find Account
                </Button>{' '}
              </div>
            </form>
          </>
        )}
        {success && !successLink && (
          <div className='form-container'>
            <span className='primary-text'>
              <h3>Your Account is Verified.</h3>
              Please click below to send a new password reset link to your
              email.
            </span>
            <Button
              className='cta-btn-md'
              variant='info'
              onClick={() => sendVerificationLink()}>
              Reset Password
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default ForgotPassword
