import axios from 'axios'

function login(username, password) {
  var formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)

  return axios.post(`/auth/`, formData).then((res) => {
    console.log(res.data)
    return res.data
  })
}

function logout() {
  return axios.get('/logout/')
}

function checkAuth() {
  return axios
    .get('/events/1')
    .then((res) => {
      return true
    })
    .catch((err) => {
      console.log('Error checking auth:', err)
      return false
    })
}

const userService = { login, logout, checkAuth }

export default userService
