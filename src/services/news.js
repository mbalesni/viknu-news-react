import axios from 'axios'

const newsService = {
  getNewsBatch,
  getStats
}

function getNewsBatch(page) {
  return axios.get(`/events/${page}`)
    .then((res) => {
      return res.data.events
    })
}

function getStats() {
  return axios.get(`/statsAll`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.warn('Error getting stats:', err)
      return {}
    })
}

export default newsService