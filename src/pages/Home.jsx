import React from 'react'
import SearchWeather from '@/components/SearchWeather'
import ForecastDays from '@/components/ForecastDays'

function PagesHome() {
  return (
    <div id="pages-home" className="container">
      <SearchWeather />
      <ForecastDays />
    </div>
  )
}

export default PagesHome
