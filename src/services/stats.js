import axios from 'axios'

const statsService = {
  getTodayStats,
  getYesterdayStats,
  getPastNDaysStats,
}

function getTodayStats() {
  const dt = new Date()
  const [year, month, dateTimeString] = dt.toISOString().split('-')
  const [day] = dateTimeString.split('T')

  return axios
    .get(`/statsDay/${year}/${month}/${day}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.warn('Error getting stats:', err)
      return {}
    })
}

function getYesterdayStats() {
  const dt = new Date()
  dt.setDate(dt.getDate() - 1)
  const [year, month, dateTimeString] = dt.toISOString().split('-')
  const [day] = dateTimeString.split('T')

  return axios
    .get(`/statsDay/${year}/${month}/${day}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.warn('Error getting stats:', err)
      return {}
    })
}

function getPastNDaysStats(n) {
  const dates = Array(n)
    .fill(null)
    .map((_, idx) => getDateObjectNDaysAgo(n - 1 - idx))

  const requests = []

  dates.forEach((dt) => {
    const { year, month, day } = deformatDate(dt)
    requests.push(axios.get(`/statsDay/${year}/${month}/${day}`))
  })

  return Promise.all(requests)
    .then((responses) => responses.map((response) => response.data))
    .then((results) =>
      results.map((result, i) => ({
        ...result,
        date: dates[i],
      }))
    )
}

//
// Utility functions
//

export function deformatDate(dt) {
  const [year, month, dateTimeString] = dt.toISOString().split('-')
  const [day] = dateTimeString.split('T')
  return { year, month, day }
}

function getDateObjectNDaysAgo(n) {
  const dt = new Date()
  dt.setDate(dt.getDate() - n)
  return dt
}

export default statsService
