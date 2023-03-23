import React from 'react'
import Loading from '@/components/Loading'

// const tempMax = forecast.data?.daily?.temperature_2m_max
// const tempMin = forecast.data?.daily?.temperature_2m_min

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function Forecast({ forecast }) {
  const dayInAWeek = new Date().getDay()
  const forecastDays = weekdays.slice(dayInAWeek, weekdays.length).concat(weekdays.slice(0, dayInAWeek))

  const renderDay = (time) => {
    if (!forecast) return null
    if (forecast.isLoading) return <Loading />
    if (forecast.error) return <h1 className="text-center">Forecast Error</h1>

    const timeSymbol = time >= 6 && time < 18 ? 'd' : 'n'

    return (
      <>
        <div className="card-text fw-bolder mb-5" />
        <div className="card-group" />
        <div className="Icon">
          <img alt="weather" className="weather-icon" src={`icons/${forecast.daily.weathercode}${timeSymbol}.png`} />
        </div>

        <div className="card-body" />
        <div className="title">Daily</div>
        {forecast.list.slice(0, 7).map((item, index) => (
          <div className="min-max" key={index}>
            {Math.round(item.temperature_2m_max)}°C /{Math.round(item.temperature_2m_min)}°C
          </div>
        ))}
      </>
    )
  }

  return (
    <>

      {forecastDays.map((day, index) => (
        <div key={index}>
          <h2>{day}</h2>
          {renderDay(index * 24)}
        </div>
      ))}
    </>
  )
}

export default Forecast
