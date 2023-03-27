import React from 'react'
import Loading from '@/components/Loading'

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function Forecast({ forecast }) {
  if (forecast.isLoading) return <Loading />
  if (forecast.error) return <h1 className="text-center">Forecast Error</h1>
  if (!forecast.data) return null

  const dayInAWeek = new Date().getDay()
  const forecastDays = weekdays.slice(dayInAWeek, weekdays.length).concat(weekdays.slice(0, dayInAWeek))

  return (
    <div className="row row-cols-1 row-cols-md-6 g-4 mt-3">
      {
        forecastDays.map((day, dayIndex) => {
          if (dayIndex === forecastDays.length - 1) return null

          const timeSymbol = dayIndex >= 6 && dayIndex < 18 ? 'd' : 'n'
          const dataIndex = dayIndex + 1
          const tempHigh = forecast.data.daily.temperature_2m_max[dataIndex]
          const tempLow = forecast.data.daily.temperature_2m_min[dataIndex]

          return (
            <div key={dayIndex} className="col">
              <div className="card bg-dark bg-opacity-50 py-3">
                <div className="card-title text-center">{day}</div>
                <div className="card-text fw-bolder mb-5">
                  <div className="temperature">
                    <h4 className="text-center" style={{ fontSize: '15px' }}>{tempLow} &deg;C - {tempHigh} &deg;C</h4>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    alt="weather"
                    className="forecast-icon"
                    src={`icons/${forecast.data?.daily.weathercode[dataIndex]}${timeSymbol}.svg`}

                  />
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Forecast
