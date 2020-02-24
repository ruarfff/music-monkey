import React, { useState } from 'react'
import { LocationAutoComplete, MapComponent } from '../../'
import { Event } from '../Event'

interface IEventLocationProps {
  isHost: boolean
  event: Event
  updateEvent(event: Event): any
}
const EventLocation = ({ isHost, event, updateEvent }: IEventLocationProps) => {
  const [location, setLocation] = useState(event.location)
  return (
    <div>
      {isHost && (
        <LocationAutoComplete
          value={location ? location.address || '' : ''}
          onSelect={(selectedLocation: any) => {
            setLocation(selectedLocation)
            updateEvent({ ...event, location })
          }}
          onChange={(address: string) => {
            setLocation({
              address,
              latLng: { lat: 0, lng: 0 }
            })
          }}
          onBlur={() => {
            if (event.location && event.location.address !== location.address) {
              updateEvent({ ...event, location })
            }
          }}
          placeholder="Search for place"
        />
      )}

      <MapComponent coords={location.latLng} />
    </div>
  )
}

export default EventLocation
