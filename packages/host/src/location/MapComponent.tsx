import React from 'react'
import GoogleMapReact from 'google-map-react'
import ILatLng from './ILatLng'
import mapMarker from 'assets/location-marker-icon.svg'
import './MapComponent.scss'

interface IMapComponentProps {
  coords?: ILatLng
}

const MapComponent: React.SFC<IMapComponentProps> = props => {
  const { coords } = props
  return (
    <div className="map-wrapper">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAW6WugUsDtlV9lImEB6cE5PtZqPtKSM3o' }}
        center={coords}
        defaultZoom={18}
      >
        {coords && <img alt="map marker" src={mapMarker} />}
      </GoogleMapReact>
    </div>
  )
}

export default MapComponent
