import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//export const API = 'http://localhost:9000'

export const API = 'https://react-markdown-appl.herokuapp.com'

export const validation = (name, email, password) => {
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
  const namePattern = /^[a-zA-Z ]{2,16}$/
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

  if (name) {
    if (!namePattern.test(name)) {
      return 'Please enter a valid username. Username should have only letters and a minimum of 2 and maximum of 16 letters are allowed'
    }
  }
  if (email) {
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email id'
    }
  }
  if (password) {
    if (!passwordPattern.test(password)) {
      return 'Password should contain Minimum six characters, at least one letter and one number'
    }
  }
  return 'Validations Passed'
}

export const errorToast = (msg) =>
  toast.error(msg, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
export const successToast = (msg) =>
  toast.success(msg, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

export const infoToast = (msg) =>
  toast.info(msg, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
