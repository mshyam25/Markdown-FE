import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  passwordResetLinkReducer,
  userFindReducer,
  userListReducer,
  userRegisterReducer,
  userSignInReducer,
  userUpdateReducer,
} from './reducers/userReducer'

import {
  allNotesReducer,
  deleteNoteReducer,
  editNoteReducer,
  getNoteReducer,
  noteCreatorReducer,
  userNotesReducer,
} from './reducers/notesReducer'

const reducer = combineReducers({
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  userFind: userFindReducer,
  userList: userListReducer,
  passwordResetLink: passwordResetLinkReducer,
  userUpdate: userUpdateReducer,
  noteCreator: noteCreatorReducer,
  allNotes: allNotesReducer,
  userNotes: userNotesReducer,
  getNote: getNoteReducer,
  editNote: editNoteReducer,
  deleteNote: deleteNoteReducer,
})

const middleware = [thunk]

const userInfoFromStorage = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null

const initialState = {
  userSignIn: {
    userInfo: userInfoFromStorage,
  },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
