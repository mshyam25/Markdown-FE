import { notesConstants } from '../constants/notesConstants'
import { API } from '../../utils'
import axios from 'axios'
export const getUserNotes =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: notesConstants.USER_NOTES_LIST_REQUEST })

      const {
        userSignIn: { userInfo },
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `${API}/notes/usernotes`,
        { id },
        config
      )

      dispatch({ type: notesConstants.USER_NOTES_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: notesConstants.USER_NOTES_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const getAllNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: notesConstants.NOTES_LIST_REQUEST })

    const {
      userSignIn: { userInfo },
    } = getState()

    console.log(userInfo.isAdmin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API}/notes`, config)

    dispatch({ type: notesConstants.NOTES_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: notesConstants.NOTES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const newNote = (Note) => async (dispatch, getState) => {
  try {
    dispatch({ type: notesConstants.CREATE_NOTE_REQUEST })

    const {
      userSignIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`${API}/notes`, Note, config)

    dispatch({ type: notesConstants.CREATE_NOTE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: notesConstants.CREATE_NOTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserNote = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: notesConstants.GET_NOTE_REQUEST })

    const {
      userSignIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API}/notes/${id}`, config)

    dispatch({ type: notesConstants.GET_NOTE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: notesConstants.GET_NOTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUserNote = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: notesConstants.DELETE_NOTE_REQUEST })

    const {
      userSignIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`${API}/notes/${id}`, config)

    dispatch({ type: notesConstants.DELETE_NOTE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: notesConstants.DELETE_NOTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateNote =
  (id, { content, title }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: notesConstants.EDIT_NOTE_REQUEST })

      const {
        userSignIn: { userInfo },
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `${API}/notes/${id}`,
        { content, title },
        config
      )

      dispatch({ type: notesConstants.EDIT_NOTE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: notesConstants.EDIT_NOTE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
