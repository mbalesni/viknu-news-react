import React from 'react'

export default function MoodNews(props) {
  let tonality = ''

  switch (props.mood) {
    case 'neg':
      tonality = <span className='badge badge-danger'>Негативна</span>
      break
    case 'pos':
      tonality = <span className='badge badge-success'>Позитивна</span>
      break
    case 'neu':
      tonality = <span className='badge badge-secondary'>Нейтральна</span>
      break
    default:
      tonality = <span className='badge badge-secondary'>Не оцінено</span>
  }

  return tonality
}
