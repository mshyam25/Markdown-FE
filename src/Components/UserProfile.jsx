import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button, Card } from 'react-bootstrap'
import { getUser, updateUser } from '../redux/actions/userActions'
import Loader from './Loader'
import { errorToast, infoToast, successToast } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [edit, setEdit] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, success } = userUpdate
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
      .matches(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
        'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
    confirmpassword: yup
      .string()
      .matches(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
        'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: userInfo.name,
        email: userInfo.email,
        password: '',
        confirmpassword: '',
      },
      validationSchema: formValidation,
      onSubmit: () => {
        if (values.password !== values.confirmpassword) {
          alert('Passwords do not match')
          values.password = ''
          values.confirmpassword = ''
        } else {
          dispatch(
            updateUser({
              name: values.name,
              email: values.email,
              password: values.password,
            })
          )
          dispatch(getUser(userInfo.email))
          setEdit(!edit)
        }
      },
    })
  const handleCancelEdit = () => {
    setEdit(!edit)
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(getUser(userInfo.email))
    }
    if (error) {
      errorToast(error)
    }

    if (success) {
      successToast('User Details Updated')
    }
  }, [userInfo, error, success, dispatch, navigate])

  return (
    <>
      <div className='container'>
        <ToastContainer />
        {loading ? (
          <Loader />
        ) : (
          <Card className='flex-col update-section'>
            <Card.Body>
              <Card.Title className='primary-heading margin-bt'>
                {userInfo.name} : {userInfo.email}
              </Card.Title>
              <div className='btn-container-2'>
                <Button
                  variant='warning'
                  className='btn'
                  onClick={() => navigate(`/usernotes/${userInfo._id}`)}>
                  {' '}
                  View Notes
                </Button>
                {!edit ? (
                  <Button
                    variant='info'
                    className='btn'
                    onClick={() => setEdit(!edit)}>
                    {' '}
                    Edit Profile
                  </Button>
                ) : (
                  ''
                )}
              </div>
            </Card.Body>
            {edit && (
              <>
                <form onSubmit={handleSubmit} className='update-form-container'>
                  <TextField
                    id='name'
                    name='name'
                    value={values.name}
                    label='Name'
                    variant='filled'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                  />
                  <span>{errors.name && touched.name ? errors.name : ''}</span>
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
                  <span>
                    {errors.email && touched.email ? errors.email : ''}
                  </span>
                  <TextField
                    id='password'
                    name='password'
                    type='password'
                    value={values.password}
                    label='Password'
                    variant='filled'
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
                    type='password'
                    value={values.confirmpassword}
                    label='Confirm Password'
                    variant='filled'
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
                    <Button type='submit' className='btn' variant='success'>
                      Update
                    </Button>

                    <Button
                      variant='danger'
                      className='btn'
                      onClick={() => handleCancelEdit()}>
                      {' '}
                      Cancel Edit
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Card>
        )}
      </div>
    </>
  )
}

export default UserProfile
