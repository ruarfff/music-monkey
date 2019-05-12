import * as React from 'react'
import mapMarker from '../../assets/location-marker-icon.svg'
import './MapComponent.scss'

interface IMapComponentProps {
  lat: number
  lng: number
}

const MapComponent: React.FC<IMapComponentProps> = props => {
  return (
    <div>
      <img alt="map marker" src={mapMarker} />
    </div>
  )
}

export default MapComponent
