import React, { useState } from 'react'
import { Field, FieldProps } from 'formik'
import { LocationAutoComplete, MapComponent } from 'mm-shared'

const EventLocationInput = () => {
  const [location, setLocation] = useState()
  return (
    <Field name="location">
      {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
        if (!location) {
          setLocation(value)
        }
        return (
          <>
            <LocationAutoComplete
              value={location ? location.address || '' : ''}
              onSelect={(selectedLocation: any) => {
                setFieldValue('location', selectedLocation)
                setLocation(selectedLocation)
              }}
              onChange={(address: string) => {
                setLocation({
                  address,
                  latLng: { lat: 0, lng: 0 }
                })
              }}
              onBlur={() => {
                if (value && value.address !== location.address) {
                  setFieldValue('location', location)
                }
              }}
              placeholder="Search for place"
            />

            <MapComponent coords={value.latLng} />
          </>
        )
      }}
    </Field>
  )
}

export default EventLocationInput
