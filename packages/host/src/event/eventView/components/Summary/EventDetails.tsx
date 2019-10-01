import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import { RouteComponentProps, withRouter } from 'react-router'
import eventIcon from 'assets/date-icon.svg'
import locationIcon from 'assets/location-marker-icon.svg'
import MapItem from 'location/MapComponent'
import IEvent from 'event/IEvent'
import LinkButton from 'util/LinkButton'
import './EventDetails.scss'

interface IEventDetailsProps extends RouteComponentProps<any> {
  event: IEvent
}

const EventDetails = ({ event, location }: IEventDetailsProps) => {
  const [showMap, setShowMap] = useState(false)

  return (
    <div className="EditDetails-root">
      <Grid container={true}>
        <Grid item={true} xs={12}>
          <Typography variant="h5" gutterBottom={true}>
            Event Details
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <img className="event-img" src={event.imageUrl} alt={event.name} />
        </Grid>

        <Grid item={true} xs={12}>
          <Typography className="event-name" variant="h5" gutterBottom={true}>
            {event.name}
          </Typography>

          {event.description && (
            <Typography className="event-text" gutterBottom={true}>
              Event Description: {event.description}
            </Typography>
          )}

          <Typography
            className="event-text"
            variant="caption"
            gutterBottom={true}
          >
            <img alt="event time icon" src={eventIcon} className="event-icon" />
            {event.startDateTime
              ? event.startDateTime.format('Do MMMM YYYY')
              : ''}
          </Typography>

          {event.location && (
            <Typography
              className="event-text"
              variant="caption"
              gutterBottom={true}
            >
              <img
                alt="location icon"
                src={locationIcon}
                className="event-icon"
              />
              {event.location.address}
              <br />
            </Typography>
          )}
          <Typography
            className="show-on-map"
            onClick={() => {
              setShowMap(!showMap)
            }}
          >
            Show on Map
          </Typography>
        </Grid>
        <Grid
          justify="flex-start"
          direction="row"
          container={true}
          item={true}
          spacing={2}
          xs={12}
        >
          <Grid
            justify="flex-start"
            direction="row"
            container={true}
            item={true}
            spacing={2}
            xs={12}
          >
            <LinkButton
              variant="contained"
              color="secondary"
              to={location.pathname + '/edit'}
            >
              Edit Event
            </LinkButton>
          </Grid>
          {showMap && event.location && event.location.latLng && (
            <MapItem coords={event.location && event.location.latLng} />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(EventDetails)
