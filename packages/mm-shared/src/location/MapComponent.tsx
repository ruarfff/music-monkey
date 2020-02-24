import React from 'react'
import GoogleMapReact from 'google-map-react'
import { LatLng } from './LatLng'
import mapMarker from '../assets/location-marker-icon.svg'
import './MapComponent.scss'

interface IMapComponentProps {
  coords: LatLng
}

const Marker = (_: any) => <img alt="map marker" src={mapMarker} />

const MapComponent = ({ coords }: IMapComponentProps) => {
  return (
    <div className="MapComponent-map-wrapper">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAW6WugUsDtlV9lImEB6cE5PtZqPtKSM3o' }}
        defaultCenter={{ lat: 0, lng: 0 }}
        center={coords}
        defaultZoom={9}
      >
        <Marker lat={coords.lat} lng={coords.lng} text="test" />
      </GoogleMapReact>
    </div>
  )
}

export default MapComponent
