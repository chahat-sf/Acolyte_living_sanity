import React, { useCallback } from 'react'
import { Select } from '@sanity/ui'
import { set, unset, useFormValue } from 'sanity'
import { locationsData } from './locations'

export const CitySelect = (props) => {
  const { value, onChange } = props
  
  // Get the current value of the 'countryCode' field in this document
  const countryCode = useFormValue(['countryCode'])

  // Find the selected country's cities and sort them alphabetically
  const country = locationsData.find((c) => c.country_code === countryCode)
  const cities = country
    ? [...country.cities].sort((a, b) => a.city_name.localeCompare(b.city_name))
    : []

  const handleChange = useCallback(
    (event) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange]
  )

  return (
    <Select value={value || ''} onChange={handleChange}>
      <option value="">
        {countryCode ? '--- Select a city ---' : '--- Select a country first ---'}
      </option>
      {cities.map((city) => (
        <option key={city.city_code} value={city.city_code}>
          {city.city_name}
        </option>
      ))}
    </Select>
  )
}