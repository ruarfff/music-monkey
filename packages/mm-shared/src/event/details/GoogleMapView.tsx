import React from 'react'
import { ListItemText } from '@material-ui/core'
import { GoogleMap, InfoWindow, Marker, withGoogleMap } from 'react-google-maps'
import './GoogleMapView.scss'

interface IMapProps {
  position: any
  isOpen: boolean
  address: string
  venue: string
  onOpen(value: boolean): any
}

const onMapClicked = (open: boolean, callback: any) => () => {
  callback(open)
}

const GoogleMapView = withGoogleMap((props: IMapProps) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultOptions={{
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false
      }}
      defaultCenter={props.position}
    >
      {' '}
      <Marker
        position={props.position}
        onClick={onMapClicked(!props.isOpen, props.onOpen)}
      >
        {props.isOpen && (
          <InfoWindow onCloseClick={onMapClicked(false, props.onOpen)}>
            <ListItemText
              className="googlemap-popup-title"
              primary={props.address || ''}
              secondary={props.venue || ''}
            />
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  )
})

export default GoogleMapView
