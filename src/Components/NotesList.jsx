import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import Loader from './Loader'
import { errorToast, successToast } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  deleteUserNote,
  getAllNotes,
  getUserNotes,
} from '../redux/actions/notesActions'
const NotesList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const allNotes = useSelector((state) => state.allNotes)
  const { loading, error, notes } = allNotes

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin')
    } else {
      dispatch(getAllNotes())
    }
  }, [userInfo, dispatch, navigate])

  const handleView = (id) => {
    navigate(`/viewnote/${id}`)
  }

  return (
    <div className='container flex-col'>
      <ToastContainer />
      {loading ? (
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

export default NotesList
