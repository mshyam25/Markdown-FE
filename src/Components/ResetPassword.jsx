import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button } from 'react-bootstrap'
import { resetPassword } from '../redux/actions/userActions'
import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify'
import { successToast, errorToast, infoToast } from '../utils'
import 'react-toastify/dist/ReactToastify.css'
const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, success, updatedUser } = userUpdate
  const formValidation = yup.object({
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
      initialValues: { password: '', confirmpassword: '' },
      validationSchema: formValidation,
      onSubmit: () => {
        if (values.password === values.confirmpassword) {
          dispatch(resetPassword(params.email, values.password))
        } else {
          errorToast('Passowords do not match !')
        }
      },
    })

  useEffect(() => {
    if (error) errorToast(error)
    if (updatedUser) {
      successToast('Password Reset is Completed.Please Sign in.')
      setTimeout(() => {
        navigate('/signin')
      }, 3000)
    }
  }, [])
  return (
    <>
      <div className='container flex-col'>
        <ToastContainer />

        {loading ? (
          <Loader />
        ) : (
          <>
            <span className='secondary-heading'>Reset Password</span>
            <form onSubmit={handleSubmit} className='form-container'>
              <TextField
                id='password'
                name='password'
                type='password'
                value={values.password}
                label='Password'
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
              />
              <span>
                {errors.password && touched.password ? errors.password : ''}
              </span>
              <TextField
                id='confirmpassword'
                name='confirmpassword'
                value={values.confirmpassword}
                label='Confirm Password'
                variant='outlined'
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
                <Button type='submit' variant='success' className='btn'>
                  Confirm
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default ResetPassword
