import React from 'react'
import { Chart as ReactChart } from 'react-charts'
import LoadingSpinner from '../components/loader'

export default function Chart({ data }) {
  const series = React.useMemo(
    () => ({
      type: 'area',
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'ordinal' },
      { secondary: true, position: 'left', type: 'linear', stacked: true },
    ],
    []
  )

  return (
    <>
      <div style={{ width: 800, height: 600 }}>
        {data.length ? (
          <ReactChart data={data} series={series} axes={axes} tooltip />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  )
}
