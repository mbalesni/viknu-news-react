import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import newsService from '../services/news'
import Skeleton from 'react-loading-skeleton'

const NewsCounter = (props) => {
  const [stats, setStats] = useState({})

  useEffect(() => {
    newsService.getStats().then((stats) => {
      console.log('stats:', stats)
      setStats(stats)
    })
  }, [])

  return (
    <Card.Title className='text-center mb-4'>
      {stats.countAll ? `${stats.countAll} новин` : <Skeleton width={100} />}
    </Card.Title>
  )
}

export default NewsCounter
