import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import TextField from '@mui/material/TextField'
import Loader from './Loader'
import { errorToast, successToast } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUserNote, updateNote } from '../redux/actions/notesActions'

const EditNote = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const getNote = useSelector((state) => state.getNote)
  const { userNote } = getNote

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(getUserNote(params.id))
    }
  }, [dispatch, params.id, userInfo, navigate])

  return (
    <>{userNote ? <UpdateUserNote userNote={userNote} id={params.id} /> : ''}</>
  )
}

function UpdateUserNote({ userNote, id }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [input, setInput] = useState(userNote.content)

  const [title, setTitle] = useState(userNote.title)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const [userContent, setUserContent] = useState(input)
  const editNote = useSelector((state) => state.editNote)
  const { error: errorUpdate, updatedNote } = editNote
  const handleChange = (e) => {
    setInput(e.target.value)
    setUserContent(input)
  }
  const handleEditNote = () => {
    const Note = {
      content: userContent,
      title,
    }
    dispatch(updateNote(id, Note))
  }

  useEffect(() => {
    if (errorUpdate) errorToast(errorUpdate)
    if (updatedNote) {
      successToast('Note Updated')
      setTimeout(() => {
        navigate(`/usernotes/${userInfo._id}`)
      }, 2000)
    }
  }, [navigate, errorUpdate, updatedNote])

  return (
    <div className='container markdown-container'>
      <ToastContainer />
      <div className='title-box'>
        <TextField
          id='name'
          name='name'
          value={title}
          label='Title'
          variant='standard'
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant='info' className='btn'>
          Edit Title
        </Button>
      </div>
      <div className='markdown-area'>
        <textarea
          autoFocus
          className='content'
          value={input}
          onChange={(e) => handleChange(e)}
        />
        <ReactMarkdown className='markdown' children={input} />
      </div>
      <div className='btn-container'>
        <Button
          type='submit'
          variant='success'
          className='btn'
          onClick={handleEditNote}>
          Update Note
        </Button>
      </div>
    </div>
  )
}
export default EditNote
