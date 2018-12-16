import GoogleMapView from '../../map/GoogleMapView'
import IEvent from '../IEvent'

const React = require('react')
const { useState } = React

interface IEventLocationProps {
  event: IEvent
}
const EventLocation = ({ event }: IEventLocationProps) => {
  const [mapOpen, setMapOpen] = useState(false)
  return (
    <GoogleMapView
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      position={event.location.latLng}
      isOpen={mapOpen}
      onOpen={setMapOpen}
      address={event.location.address}
      venue={event.venue}
    />
  )
}

export default EventLocation
