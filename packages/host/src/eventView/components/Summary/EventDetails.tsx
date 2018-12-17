import { Grid } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import { WithStyles } from '@material-ui/core/styles'
import withStyle from '@material-ui/core/styles/withStyles'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import eventIcon from '../../../assets/date-icon.svg'
import locationIcon from '../../../assets/location-marker-icon.svg'
import MapItem from '../../../components/MapComponent/index'
import IEvent from '../../../event/IEvent'
import IAction from '../../../IAction'
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
  toggleDynamicVoting(event: IEvent): IAction
  toggleAutoAcceptSuggestions(event: IEvent): IAction
  toggleSuggestingPlaylists(event: IEvent): IAction
}

class EventDetails extends React.PureComponent<
  IEventDetailsProps & WithStyles
> {
  public state = {
    showMap: false,
    showSettings: false,
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

            <Typography
              className={classes.endDate}
              variant="caption"
              gutterBottom={true}
            >
              Pre-Game closes:
              {event.startDateTime
                ? event.endDateTime.format('Do MMMM YYYY')
                : ''}
            </Typography>

            {event.eventCode && (
              <Typography variant="body2" gutterBottom={true}>
                Event Code: {event.eventCode}
              </Typography>
            )}

            {event.venue && (
              <Typography variant="body2" gutterBottom={true}>
                Venue: {event.venue}
              </Typography>
            )}
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
            <Grid item={true}>
              <span
                className={classes.showOnMap}
                onClick={this.toggleSettings}
              >
                Event's modes
              </span>
              {this.state.showSettings && (
                <FormGroup row={true}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={event.settings.suggestingPlaylistsEnabled}
                        onChange={this.suggestingPlaylistsToggled}
                        value="suggestingPlaylistsEnabled"
                      />
                    }
                    label="Allow Playlist Suggestions"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={event.settings.autoAcceptSuggestionsEnabled}
                        onChange={this.autoAcceptSuggestionsToggled}
                        value="autoAcceptSuggestionsEnabled"
                      />
                    }
                    label="Auto Accept Suggestions"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={event.settings.dynamicVotingEnabled}
                        onChange={this.handleDynamicVotingToggled}
                        value="dynamicVotingEnabled"
                      />
                    }
                    label="Dynamic Voting"
                  />
                </FormGroup>
              )}
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
              <LinkButton
                variant="contained"
                color="secondary"
                to={location.pathname + '/edit'}
              >
                Edit Event
              </LinkButton>
            </Grid>
            {this.state.showMap && (
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

  private toggleSettings = () => {
    this.setState({ showSettings: !this.state.showSettings })
  }

  private handleDynamicVotingToggled = () => {
    const { event, toggleDynamicVoting } = this.props
    toggleDynamicVoting(event)
  }

  private autoAcceptSuggestionsToggled = () => {
    const { event, toggleAutoAcceptSuggestions } = this.props
    toggleAutoAcceptSuggestions(event)
  }

  private suggestingPlaylistsToggled = () => {
    const { event, toggleSuggestingPlaylists } = this.props
    toggleSuggestingPlaylists(event)
  }
}

export default decorated(EventDetails)
