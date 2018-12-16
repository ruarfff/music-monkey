import { WithStyles } from '@material-ui/core/es'
import Grid from '@material-ui/core/Grid/Grid'
import withStyle from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import IEvent from '../../../event/IEvent'
import EventGuestsRightSideView from '../Guests/EventGuestsRightSideViewContainer'
import EventDetails from './EventDetailsContainer'
import EventSummaryPlaylist from './EventSummaryPlaylistContainer'
import './Styles/EventSummaryView.scss'

const decorated = withStyle(() => ({
  content: {
    height: '100%',
    margin: '-12px -8px'
  },
  leftSideContent: {
    borderRight: '1px solid #979797',
    padding: '0!important',
    margin: '0!important',
    width: '100%',
  }
}))

interface IEventSummaryViewProps {
  event: IEvent
}

class EventSummaryView extends React.PureComponent<IEventSummaryViewProps & WithStyles> {
  public render() {
    const { classes } = this.props
    return (
      <Grid className={classes.content} container={true} spacing={24}>
        <Grid
          className={classes.leftSideContent}
          container={true}
          spacing={24}
          item={true}
          direction={'column'}
          justify={'flex-start'}
          sm={4}
        >
          <div className="eventDetailsWrapper">
            <EventDetails />
          </div>
        </Grid>
        <Grid
          className={classes.leftSideContent}
          container={true}
          spacing={24}
          item={true}
          direction={'column'}
          justify={'flex-start'}
          sm={4}
        >
          <div className="eventPlaylistWrapper">
            <EventSummaryPlaylist />
          </div>
        </Grid>
        <Grid item={true} xs={12} sm={4}>
          <EventGuestsRightSideView />
        </Grid>
      </Grid>
    )
  }
}

export default decorated(EventSummaryView)
