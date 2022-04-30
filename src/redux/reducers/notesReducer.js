import { notesConstants } from '../constants/notesConstants'

export const noteCreatorReducer = (state = {}, action) => {
  switch (action.type) {
    case notesConstants.CREATE_NOTE_REQUEST:
      return { loading: true }
    case notesConstants.CREATE_NOTE_SUCCESS:
      return { loading: false, success: action.payload }
    case notesConstants.CREATE_NOTE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const allNotesReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case notesConstants.NOTES_LIST_REQUEST:
      return { loading: true }
    case notesConstants.NOTES_LIST_SUCCESS:
      return { loading: false, notes: action.payload }
    case notesConstants.NOTES_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userNotesReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case notesConstants.USER_NOTES_LIST_REQUEST:
      return { loading: true }
    case notesConstants.USER_NOTES_LIST_SUCCESS:
      return { loading: false, notes: action.payload }
    case notesConstants.USER_NOTES_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const getNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case notesConstants.GET_NOTE_REQUEST:
      return { loading: true }
    case notesConstants.GET_NOTE_SUCCESS:
      return { loading: false, userNote: action.payload }
    case notesConstants.GET_NOTE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const editNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case notesConstants.EDIT_NOTE_REQUEST:
      return { loading: true }
    case notesConstants.EDIT_NOTE_SUCCESS:
      return { loading: false, updatedNote: action.payload }
    case notesConstants.EDIT_NOTE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const deleteNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case notesConstants.DELETE_NOTE_REQUEST:
      return { loading: true }
    case notesConstants.DELETE_NOTE_SUCCESS:
      return { loading: false, success: action.payload }
    case notesConstants.DELETE_NOTE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
