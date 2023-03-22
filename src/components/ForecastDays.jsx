import React, { useState } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import Combobox from 'react-widgets/Combobox'
import moment from 'moment'

import useGeocoding from '@/hooks/useGeocoding'
import useForecast from '@/hooks/useForecast'

function ForecastDays() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const geocoding = useGeocoding(search)
  const forecast = useForecast(selected ? {
    latitude: selected.latitude,
    longitude: selected.longitude,
    forecast_days: 7
  } : null)

  if (geocoding.error || forecast.error) return <h1 className="text-center">Geocoding Error</h1>

  const renderWeather = () => {
    if (!forecast.data) return null
    if (forecast.isLoading) return <Loading />
    if (forecast.error) return <h1 className="text-center">Forecast Error</h1>

    const temperature = forecast.data?.current_weather?.temperature
    const name = selected?.name
    const windspeed = forecast.data?.current_weather?.windspeed
    const dateTime = forecast.data?.current_weather?.time
    const time = Number(dateTime.split('T')[1].split(':')[0])
    const timeSymbol = time >= 6 && time < 18 ? 'd' : 'n'

    return (

    <div class="card-group">
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
 </div>
       <div className="card-text fw-bolder mb-5">
         <div className="location">
           <p className="text-center">{name}</p>
         </div>
         <div className="temperature">
           <h2 className="text-center">{temperature} &deg;C</h2>
         </div>
         <div className="d-flex justify-content-center align-items-center">
//           <img alt="weather" className="weather-icon" src={`icons/${forecast.data?.current_weather.weathercode}${timeSymbol}.png`} />
         </div>
         <div className="windspeed">
           <p className="text-center">Windspeed {windspeed}</p>
         </div>
       </div>

    )
  }

  return (
    <Container fluid>
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="bg-dark text-white">
            <Card.Img src="https://source.unsplash.com/600x900/?nature, water, sun" alt="Card image" />
            <Card.ImgOverlay>
              <div className="mb-4 d-flex justify-content-center w-75 mx-auto">
                {/* <Combobox
                  className="flex-grow-1"
                  placeholder="Enter Location"
                  onChange={(value) => setSearch(value)}
                  onSelect={(value) => setSelected(value)}
                  data={geocoding?.data?.results || []}
                  dataKey="id"
                  textField={(item = {}) => {
                    if (typeof item === 'string') return item
                    const { admin1, admin2, admin3, admin4, country } = item
                    const name = `${admin1 || ''} ${admin2 || ''} ${admin3 || ''} ${admin4 || ''} ${country || ''}`
                    return name.replace(/\s+/g, ' ').trim()
                  }}
                  busy={geocoding.isLoading}
                  filter={false}
                /> */}
              </div>

              <div className="card bg-dark bg-opacity-50 py-3">
                <div className="card-title text-center">{}</div>
                <div className="card-text text-center">
                  {moment().format('dddd, MMMM DD, YYYY')}
                </div>
                {renderWeather()}
              </div>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ForecastDays
