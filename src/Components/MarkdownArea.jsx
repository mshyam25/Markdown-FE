import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import TextField from '@mui/material/TextField'
import { Button } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { errorToast, infoToast, successToast } from '../utils'
import { newNote } from '../redux/actions/notesActions'
import Loader from './Loader'
const MarkdownArea = () => {
  const [input, setInput] = useState()
  const [userNote, setUserNote] = useState()
  const [title, setTitle] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const noteCreator = useSelector((state) => state.noteCreator)
  const { loading, success, error } = noteCreator

  const id = userInfo ? userInfo._id : ''
  const handleChange = (e) => {
    setInput(e.target.value)
    setUserNote(input)
  }

  const handleCreateNote = () => {
    const Note = {
      userId: id,
      content: userNote,
      title,
    }
    dispatch(newNote(Note))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
    if (error) errorToast(error)
    if (success) {
      successToast(success)
      setTimeout(() => {
        navigate(`/usernotes/${userInfo._id}`)
      }, 3000)
    }
  }, [userInfo, error, success, navigate, dispatch])

  return (
    <div className='container markdown-container'>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
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
              Add Title
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
              onClick={handleCreateNote}>
              Create Note
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const Component = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language ?? null} style={docco}>
      {value ? value : ''}
    </SyntaxHighlighter>
  )
}

export default MarkdownArea
