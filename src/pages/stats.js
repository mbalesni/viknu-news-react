import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Chart from '../components/chart'
import statsService from '../services/stats'
import Skeleton from 'react-loading-skeleton'

function getDateString(dt) {
  const date = dt.getDate().toString().padStart(2, '0')
  const month = dt.getMonth().toString().padStart(2, '0')
  return `${date}.${month}`
}

function formatData(rawData) {
  const positives = []
  const negatives = []
  const neutrals = []

  rawData.forEach((datum) => {
    positives.push({
      x: getDateString(datum.date),
      y: datum.countPos,
    })

    negatives.push({
      x: getDateString(datum.date),
      y: datum.countNeg,
    })

    neutrals.push({
      x: getDateString(datum.date),
      y: datum.countNeu,
    })
  })

  const formattedData = [
    {
      label: 'Позитивні',
      datums: positives,
    },
    {
      label: 'Негативні',
      datums: negatives,
    },
    {
      label: 'Нейтральні',
      datums: neutrals,
    },
  ]

  return formattedData
}

function calcTotals(data) {
  console.log('data for totals:', data)
  const totals = { pos: 0, neg: 0, neu: 0, tot: 0 }
  data.forEach((datum) => {
    totals.pos += datum.countPos
    totals.neg += datum.countNeg
    totals.neu += datum.countNeu
    totals.tot += datum.countAll
  })
  return totals
}

function Stats(props) {
  const [data, setData] = useState([])
  const [totals, setTotals] = useState({ pos: 0, neg: 0, neu: 0, tot: 0 })
  const [daysToShow, setDaysToShow] = useState(28)

  useEffect(() => {
    statsService
      .getPastNDaysStats(daysToShow)
      .then((data) => {
        const formattedData = formatData(data)
        const totals = calcTotals(data)
        console.log('Formatted data:', formattedData)
        console.log('Totals:', totals)
        setTotals(totals)
        setData(formattedData)
      })
      .catch((err) => {
        console.warn(`Error getting past 28 days stats:`, err)
      })
  }, [daysToShow])

  return (
    <Container
      className=' pt-5 pb-5 mt-4'
      style={{
        width: '1100px',
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Chart data={data} />
      <br />
      {data.length ? <h4>Дані за останні {daysToShow} днів</h4> : <Skeleton width={350} height={32} />}
    </Container>
  )
}

export default Stats
