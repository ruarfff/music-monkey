import { Grid } from '@material-ui/core'
import { WithStyles } from '@material-ui/core/styles'
import withStyle from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import eventIcon from '../../../assets/date-icon.svg'
import locationIcon from '../../../assets/location-marker-icon.svg'
import MapItem from '../../../components/MapComponent/index'
import IEvent from '../../../event/IEvent'
import LinkButton from '../../../util/LinkButton'
import './Styles/EventDetails.scss'

const decorated = withStyle(() => ({
  eventName: {
    fontSize: '34px',
    lineHeight: '40px',
    marginBottom: '15px'
  },
  imgRow: {
    display: 'flex',
    fontSize: '15px',
    marginBottom: '10px'
  },
  img: {
    marginRight: '10px',
    width: '20px'
  },
  showOnMap: {
    color: '#FFB000',
    cursor: 'pointer',
    marginBottom: '10px'
  },
  endDate: {}
}))

interface IEventDetailsProps {
  event: IEvent
}

class EventDetails extends React.PureComponent<
  IEventDetailsProps & WithStyles
> {
  public state = {
    showMap: false,
  }

  public render() {
    const { event, classes } = this.props
    return (
      <div className="event-details-container">
        <Grid className="EventDetails-grid" container={true}>
          <Grid item={true} xs={12}>
            <Typography
              className="EventDetails-title"
              variant="h5"
              gutterBottom={true}
            >
              Event Details
            </Typography>
          </Grid>
          <Grid className="EventDetails-title-container" item={true} xs={12}>
            <img
              className="EventDetails-img"
              src={event.imageUrl}
              alt={event.name}
            />
          </Grid>

          <Grid className="EventDetails-info" item={true} xs={12}>
            <Typography
              className={classes.eventName}
              variant="h5"
              gutterBottom={true}
            >
              {event.name}
            </Typography>

            {event.description && (
              <Typography variant="h6" gutterBottom={true}>
                Event Description: {event.description}
              </Typography>
            )}

            <Typography
              className={classes.imgRow}
              variant="caption"
              gutterBottom={true}
            >
              <img src={eventIcon} className={classes.img} />
              {event.startDateTime
                ? event.startDateTime.format('Do MMMM YYYY')
                : ''}
            </Typography>

            {event.location && (
              <Typography
                className={classes.imgRow}
                variant="caption"
                gutterBottom={true}
              >
                <img src={locationIcon} className={classes.img} />
                {event.location.address}
                <br />
              </Typography>
            )}
            <Typography className={classes.showOnMap} onClick={this.toggleMap}>
              Show on Map
            </Typography>

            {/*<Typography*/}
              {/*className={classes.endDate}*/}
              {/*variant="caption"*/}
              {/*gutterBottom={true}*/}
            {/*>*/}
              {/*Pre-Game closes:*/}
              {/*{event.startDateTime*/}
                {/*? event.endDateTime.format('Do MMMM YYYY')*/}
                {/*: ''}*/}
            {/*</Typography>*/}

            {/*{event.eventCode && (*/}
              {/*<Typography variant="body2" gutterBottom={true}>*/}
                {/*Event Code: {event.eventCode}*/}
              {/*</Typography>*/}
            {/*)}*/}
          </Grid>

          <Grid
            className="EventDetails-actions"
            justify="flex-start"
            direction="row"
            container={true}
            item={true}
            spacing={16}
            xs={12}
          >
            <Grid
              className="EventDetails-actions"
              justify="flex-start"
              direction="row"
              container={true}
              item={true}
              spacing={16}
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
            {this.state.showMap && event.location && event.location.latLng && (
              <MapItem coords={event.location && event.location.latLng} />
            )}
          </Grid>
        </Grid>
      </div>
    )
  }

  private toggleMap = () => {
    this.setState({ showMap: !this.state.showMap })
  }
}

export default decorated(EventDetails)
