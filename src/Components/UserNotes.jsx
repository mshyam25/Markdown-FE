import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import Loader from './Loader'
import { errorToast, successToast } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { deleteUserNote, getUserNotes } from '../redux/actions/notesActions'
const UserNotes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const userNotes = useSelector((state) => state.userNotes)
  const { loading, error, notes } = userNotes

  const deleteNote = useSelector((state) => state.deleteNote)
  const { loading: loadingDelete, error: errorDelete, success } = deleteNote
  useEffect(() => {
    if (!userInfo) navigate('/signin')
    else {
      dispatch(getUserNotes({ id: params.id }))
    }
    if (errorDelete) errorToast(errorDelete)
    if (success) successToast(success)
  }, [userInfo, dispatch, navigate, params.id, errorDelete, success])

  const handleEdit = (id) => {
    navigate(`/editnote/${id}`)
  }
  const handleView = (id) => {
    navigate(`/viewnote/${id}`)
  }
  const handleDelete = (id) => {
    dispatch(deleteUserNote(id))
  }
  return (
    <div className='container flex-col'>
      <ToastContainer />
      {loading || loadingDelete ? (
        <Loader />
      ) : (
        <>
          {notes ? (
            <>
              <h1>User Notes</h1>
              <Card className='grid grid--3--cols'>
                {notes.map((note) => {
                  return (
                    <div className='notes-container'>
                      <div>
                        <span className='span-label'>Title : </span>
                        <span className='secondary-heading'>{note.title}</span>
                      </div>
                      <div>
                        <span className='span-label'>Created At : </span>
                        <span className='primary-text'>
                          {note.createdAt.slice(0, 10)}
                        </span>
                      </div>

                      <div className='btn-container'>
                        <Button
                          className='btn'
                          onClick={() => handleView(note._id)}>
                          View
                        </Button>
                        <Button
                          className='btn'
                          variant='warning'
                          onClick={() => handleEdit(note._id)}>
                          Edit
                        </Button>
                        <Button
                          className='btn'
                          variant='danger'
                          onClick={() => handleDelete(note._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </Card>
            </>
          ) : (
            <span className='primary-text'>{error}</span>
          )}
        </>
      )}
    </div>
  )
}

export default UserNotes
