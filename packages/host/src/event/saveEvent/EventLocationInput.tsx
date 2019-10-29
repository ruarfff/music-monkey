import React from 'react'
import { Field, FieldProps } from 'formik'
import LocationAutoComplete from 'location/LocationAutoComplete'
import MapComponent from 'location/MapComponent'

const EventLocationInput = () => {
  return (
    <Field name="location">
      {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
        <>
          <LocationAutoComplete
            value={value ? value.address || '' : ''}
            onSelect={(location: any) => {
              setFieldValue('location', location)
            }}
            onChange={(address: string) => {
              setFieldValue('location', {
                address,
                latLng: { lat: 0, lng: 0 }
              })
            }}
            placeholder="Search for place"
          />

          <MapComponent coords={value.latLng} />
        </>
      )}
    </Field>
  )
}

export default EventLocationInput
