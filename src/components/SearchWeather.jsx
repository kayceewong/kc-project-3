import React, { useState } from 'react'
import useForecast from '@/hooks/useForecast'

import CurrentWeather from '@/components/CurrentWeather'
import GeoForm from '@/components/GeoForm'
import Forecast from '@/components/ForecastDays'

function SearchWeather() {
  const [selected, setSelected] = useState(null)

  const forecast = useForecast(selected ? {
    latitude: selected.latitude,
    longitude: selected.longitude,
    forecast_days: 7
  } : null)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 mx-auto text-white">
          <GeoForm setSelected={setSelected} />
          <CurrentWeather forecast={forecast} selected={selected} />
          <Forecast forecast={forecast} />
        </div>
      </div>
    </div>
  )
}

export default SearchWeather
