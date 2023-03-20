import axios from 'axios'

export const fetcher = ([url, params]) => axios.get(url, { params }).then((res) => res.data)
