import useSWR from 'swr'
import { fetcher } from '@/hooks/_utils'

const useGeocoding = (location) => useSWR(location ? [`https://geocoding-api.open-meteo.com/v1/search?name=${location}`] : null, fetcher)

export default useGeocoding
