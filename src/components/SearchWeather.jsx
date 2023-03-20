import React, { useState } from 'react'
import { Card, Container, Button, Row, Col } from 'react-bootstrap'
import Combobox from 'react-widgets/Combobox'
import moment from 'moment'

import useGeocoding from '@/hooks/useGeocoding'
import useForecast from '@/hooks/useForecast'

import Loading from '@/components/Loading'

function SearchWeather() {
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

    return (
      <Card.Text className="fw-bolder mb-5">
        <h2 className="text-center">{temperature} &deg;C</h2>
      </Card.Text>
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
                <Combobox
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
                />
                <Button type="submit" variant="secondary" size="m">
                  Search
                </Button>
              </div>

              <Card className="bg-dark bg-opacity-50 py-3">
                <Card.Title className="text-center">{}</Card.Title>
                <Card.Text className="text-center">
                  {moment().format('dddd, MMMM DD, YYYY')}
                </Card.Text>
                {renderWeather()}
              </Card>

            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchWeather
