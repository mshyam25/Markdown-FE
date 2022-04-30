import MarkdownArea from './Components/MarkdownArea'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './Components/ForgotPassword'
import Header from './Components/Header'
import UserProfile from './Components/UserProfile'
import ResetPassword from './Components/ResetPassword'
import UserNotes from './Components/UserNotes'
import EditNote from './Components/EditNote'
import ViewNote from './Components/ViewNote'
import UsersList from './Components/UsersList'
import NotesList from './Components/NotesList'
import Footer from './Components/Footer'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createmarkdown' element={<MarkdownArea />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword/:id' element={<ResetPassword />} />
        <Route path='/profile/:id' element={<UserProfile />} />
        <Route path='/usernotes/:id' element={<UserNotes />} />
        <Route path='/editnote/:id' element={<EditNote />} />
        <Route path='/viewnote/:id' element={<ViewNote />} />
        <Route path='/userslist' element={<UsersList />} />
        <Route path='/noteslist' element={<NotesList />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
