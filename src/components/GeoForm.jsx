import React, { useState } from 'react'
import Combobox from 'react-widgets/Combobox'

import useGeocoding from '@/hooks/useGeocoding'

function GeoForm({ setSelected }) {
  const [search, setSearch] = useState('')
  const geocoding = useGeocoding(search)

  return (
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
    </div>
  )
}

export default GeoForm
