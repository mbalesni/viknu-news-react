import React, { Component, Fragment } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import NavBar from './components/navBar'
import Stats from './pages/stats'
import Login from './pages/login'
import NewsFeed from './pages/news-feed'
import userService from './services/user'
import Loader from './components/loader'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: null,
      active: 1,
      positive: 0,
      negative: 0,
      mood: 'neg',
      hasMore: true,
    }
  }

  async componentDidMount() {
    const authenticated = await userService.checkAuth()
    this.setState({ authenticated })
  }
  onSuccessfulLogin(authenticated) {
    this.setState({ authenticated: true })
  }

  render() {
    console.log('this.state.authenticated', this.state.authenticated)
    return (
      <Fragment>
        <Router>
          <NavBar />

          <Switch>
            <PrivateRoute
              authenticated={this.state.authenticated}
              exact
              path='/'
              render={(props) => <NewsFeed {...props} />}
            ></PrivateRoute>

            <PrivateRoute
              authenticated={this.state.authenticated}
              exact
              path='/stats'
              render={(props) => <Stats {...props} />}
            />

            <Route
              path='/login'
              render={(props) => (
                <Login
                  {...props}
                  setAuthenticated={this.onSuccessfulLogin.bind(this)}
                />
              )}
            />
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

const PrivateRoute = ({ render: Component, authenticated, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const loginPage = {
          pathname: '/login',
          state: { from: path },
        }

        switch (authenticated) {
          case true:
            return <Component {...props} />
          case false:
            return <Redirect to={loginPage} />
          default:
            return <Loader />
        }
      }}
    />
  )
}

export default App
