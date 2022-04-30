import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUserNote } from '../redux/actions/notesActions'

const ViewNote = () => {
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
    <>
      {userNote ? <UserNoteComponent userNote={userNote} id={params.id} /> : ''}
    </>
  )
}

function UserNoteComponent({ userNote, id }) {
  const navigate = useNavigate()
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  return (
    <div className='container markdown-container'>
      <ToastContainer />
      <div className='title-box'>
        <span className='span-label'>Title : </span>
        <span className='secondary-heading'>{userNote.title}</span>
      </div>
      <div className='markdown-area'>
        <textarea
          autoFocus
          className='content'
          value={userNote.content}
          disabled
        />
        <ReactMarkdown className='markdown' children={userNote.content} />
      </div>
      <div className='btn-container'>
        <Button
          type='submit'
          variant='danger'
          className='btn'
          onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  )
}
export default ViewNote
