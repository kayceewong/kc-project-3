import useSWR from 'swr'
import { fetcher } from '@/hooks/_utils'

const commonParams = {
  daily: 'weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration',
  current_weather: true,
  timezone: 'auto'
}

const useForecast = (params) => useSWR(params ? ['https://api.open-meteo.com/v1/forecast', { ...commonParams, ...params }] : null, fetcher)

export default useForecast
