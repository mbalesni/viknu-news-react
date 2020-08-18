import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import userService from '../services/user'

const NavBar = (props) => {
  function logout() {
    userService
      .logout()
      .then(() => {
        props.history.push('/login')
      })
      .catch((err) => {
        console.warn('Error:', err)
      })
  }

  return (
    <Navbar bg='light' className='shadow-sm'>
      <Link
        to=''
        style={{
          color: '#333',
          fontSize: '1.25rem',
          textDecoration: 'none',
        }}
      >
        <img
          alt="Logo"
          src='https://img.icons8.com/cute-clipart/64/000000/news.png'
          width='30px'
        />
        Парсер ВІКНУ
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link
            to='/'
            style={{
              color: 'rgba(0,0,0,.5)',
              textDecoration: 'none',
              padding: '.5rem',
            }}
          >
            Стрічка новин
          </Link>
          <Link
            to='/stats'
            style={{
              color: 'rgba(0,0,0,.5)',
              textDecoration: 'none',
              padding: '.5rem',
            }}
          >
            Статистика
          </Link>
        </Nav>
        <Button variant='link' onClick={logout}>
          Вийти
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default withRouter(NavBar)
