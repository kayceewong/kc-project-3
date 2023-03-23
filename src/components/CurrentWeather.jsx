import React from 'react'
import moment from 'moment'

import Loading from '@/components/Loading'

function CurrentWeather({ forecast, selected }) {
  const renderHeading = () => (
    <>
      <div className="card-title text-center">Today</div>
      <div className="card-text text-center">
        {moment().format('dddd, MMMM DD, YYYY')}
      </div>
    </>
  )

  if (forecast.isLoading) return <Loading />
  if (forecast.error) return <h1 className="text-center">Forecast Error</h1>
  if (!forecast.data) {
    return (
      <div className="card bg-dark bg-opacity-50 py-3">
        {renderHeading()}
      </div>
    )
  }

  const temperature = forecast.data?.current_weather?.temperature
  const name = selected?.name
  const windspeed = forecast.data?.current_weather?.windspeed
  const dateTime = forecast.data?.current_weather?.time
  const time = Number(dateTime.split('T')[1].split(':')[0])
  const timeSymbol = time >= 6 && time < 18 ? 'd' : 'n'

  return (
    <div className="card bg-dark bg-opacity-50 py-3">
      {renderHeading()}
      <div className="card-text fw-bolder mb-5">
        <div className="location">
          <p className="text-center">{name}</p>
        </div>
        <div className="temperature">
          <h2 className="text-center">{temperature} &deg;C</h2>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <img alt="weather" className="weather-icon" src={`icons/${forecast.data?.current_weather.weathercode}${timeSymbol}.png`} />
        </div>
        <div className="windspeed">
          <p className="text-center">Windspeed {windspeed}</p>
        </div>
      </div>
    </div>

  )
}

export default CurrentWeather
