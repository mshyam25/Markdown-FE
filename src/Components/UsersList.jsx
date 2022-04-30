import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { getUserList } from '../redux/actions/userActions'
import { Table } from 'react-bootstrap'

const UsersList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const userList = useSelector((state) => state.userList)
  const { users, loading } = userList

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin')
    } else dispatch(getUserList())
  }, [dispatch, userInfo, navigate])
  return (
    <>
      <div className='container flex-box-col'>
        <span>Users</span>
        {loading && <Loader />}
        {users && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <strong>USER ID</strong>
                </th>
                <th>Username</th>
                <th>Email</th>
                <th>Is Admin ?</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}

export default UsersList
