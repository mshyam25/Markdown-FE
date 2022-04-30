import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/actions/userActions'
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap'
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn
  const userLogout = () => {
    dispatch(logout())
    navigate('/signin')
  }
  return (
    <div className='header'>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand href='/'>
          <span className='nav-link'>Markdown</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav className='ms-auto'>
            <Nav.Link href='/createmarkdown'>Create Markdown</Nav.Link>
            {userInfo && userInfo.isAdmin ? (
              <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                <NavDropdown.Item href={`/profile/${userInfo._id}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/userslist'>Users</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/noteslist'>
                  User Notes
                </NavDropdown.Item>
              </NavDropdown>
            ) : userInfo && !userInfo.isAdmin ? (
              <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                <NavDropdown.Item href={`/profile/${userInfo._id}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={`/usernotes/${userInfo._id}`}>
                  Notes
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              ''
            )}
            {userInfo ? (
              <Nav.Link href='/signin' onClick={userLogout}>
                Sign out
              </Nav.Link>
            ) : (
              <Nav.Link href='/signin'>Sign in</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
