import React from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

export default function Loader(props) {
  return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <MoonLoader size={50} color={'#007BFF'} />
      </div>
  )
}
