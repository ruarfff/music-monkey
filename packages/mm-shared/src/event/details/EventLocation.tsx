import React, { useState } from 'react'
import GoogleMapView from './GoogleMapView'
import { Event } from '../Event'

interface IEventLocationProps {
  event: Event
}
const EventLocation = ({ event }: IEventLocationProps) => {
  const [mapOpen, setMapOpen] = useState(false)
  return (
    <GoogleMapView
      containerElement={<div style={{ height: `400px`, width: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      position={event.location.latLng}
      isOpen={mapOpen}
      onOpen={setMapOpen}
      address={event.location.address}
      venue={event.venue!}
    />
  )
}

export default EventLocation
