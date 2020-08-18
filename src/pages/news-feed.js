import React from 'react'
import { Container } from 'react-bootstrap'
import NewsList from '../components/newsList'
import NewsCounter from '../components/newsCounter'

function LoginPage(props) {
  return (
    <Container
      style={{ width: '800px', overflow: 'auto' }}
      className='mt-4 mb-5 pt-2 pb-3 shadow-sm'
    >
      <NewsCounter />
      <NewsList />
    </Container>
  )
}

export default LoginPage
