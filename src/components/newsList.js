import React, { useState, useEffect } from 'react'
import styles from '../animation/animations'
import { Card } from 'react-bootstrap'
import { StyleRoot } from 'radium'
import MoodNews from './moodNews'
import InfiniteScroll from 'react-infinite-scroll-component'
import newsService from '../services/news'
import Skeleton from 'react-loading-skeleton'

const getDateString = (secTimestamp) => {
  const timestamp = secTimestamp * 1000
  const lowerCaseString = new Date(timestamp).toLocaleDateString('uk', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return lowerCaseString[0].toUpperCase() + lowerCaseString.slice(1)
}

const NewsList = (props) => {
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorLoadingNews, setErrorLoadingNews] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function fetchNews() {
    console.log('fetching news page:', page)
    setLoading(true)
    return newsService
      .getNewsBatch(page)
      .then((newNews) => {
        console.log(`Got news from page ${page}:`, newNews)
        setNewsList(newsList.concat(newNews))
        setPage(page + 1)
        setErrorLoadingNews(false)
      })
      .catch((err) => {
        console.error(err)
        setErrorLoadingNews(true)
        return []
      })
      .finally(() => setLoading(false))
  }

  return (
    <InfiniteScroll
      dataLength={newsList.length}
      next={fetchNews}
      hasMore={true}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Це всі новини, що є.</b>
        </p>
      }
    >
      {errorLoadingNews && (
        <p style={{ textAlign: 'center' }}>
          <b>Помилка при завантаженні новин</b>
        </p>
      )}
      {newsList.length > 0 &&
        newsList.map((el) => (
          <StyleRoot key={el.id}>
            <div style={styles.fadeIn}>
              <Card style={{ width: '100%' }} className='mt-2'>
                <Card.Body>
                  <Card.Title>
                    <a href={el.link}>{el.title}</a>
                  </Card.Title>
                  <Card.Text>
                    <MoodNews mood={(el.analyze_id[0] || {}).mood} />
                  </Card.Text>
                  <Card.Text>
                    <small>
                      {el.author ? el.author : 'Невідоме джерело'} |{' '}
                      {getDateString(el.date_published)}
                    </small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </StyleRoot>
        ))}

      {loading &&
        [...Array(5).keys()].map((el) => (
          <StyleRoot key={el}>
            <div style={styles.fadeIn}>
              <Card style={{ width: '100%' }} className='mt-2'>
                <Card.Body>
                  <Card.Title>
                    <Skeleton />
                  </Card.Title>
                  <Card.Text>
                    <Skeleton width={80} />
                  </Card.Text>
                  <Card.Text>
                    <small>
                      <Skeleton width={200} />
                    </small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </StyleRoot>
        ))}
    </InfiniteScroll>
  )
}

export default NewsList
