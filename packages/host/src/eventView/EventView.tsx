import AppBar from '@material-ui/core/AppBar/AppBar'
import { WithStyles } from '@material-ui/core/es'
import Grid from '@material-ui/core/Grid/Grid'
import withStyle from '@material-ui/core/styles/withStyles'
import Tab from '@material-ui/core/Tab/Tab'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Typography from '@material-ui/core/Typography/Typography'
import { isEmpty } from 'lodash'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import InviteCopyAlert from '../components/InviteLink/InviteCopyAlert'
import EventFetchError from '../event/EventFetchError'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import LoadingSpinner from '../loading/LoadingSpinner'
import {
  onGuestUpdate,
  subscribeToSuggestionsAccepted,
  subscribeToVotesModified
} from '../notification'
import EventGuests from './components/Guests/EventGuestsContainer'
import EventPlaylistView from './components/Playlist/EventPlaylistViewContainer'
import EventSummaryView from './components/Summary/EventSummaryViewContainer'
import './EventView.scss'

const decorated = withStyle(() => ({
  tabContainer: {
    background: 'transparent',
    boxShadow: 'none',
    borderBottom: '1px solid #d6d6d6',
    marginBottom: '10px'
  },
  tab: {
    color: '#979797'
  },
  tabs: {
    color: '#AF00FF!important',
    borderBottom: '1px solid #979797'
  },
  TabIndicator: {
    backgroundColor: '#AF00FF!important',
    height: '1px'
  },
  content: {
    paddingTop: 0,
    height: '100%'
  }
}))

interface IEventViewState {
  tabIndex: number
}

interface IEventViewProps extends RouteComponentProps<any> {
  error: Error
  event: IEvent
  loading: boolean
  copiedToClipboard: boolean
  getEventById(eventId: string): IAction
  copyEventInvite(): IAction
  acknowledgeEventInviteCopied(): IAction
  getEventSuggestions(eventId: string): IAction
  fetchEventVotes(eventId: string): IAction
  getEventByIdNoLoading(eventId: string): IAction
}

function TabContainer({ children, dir }: any) {
  return (
    <Typography style={{ height: '100%' }} component="div" dir={dir}>
      {children}
    </Typography>
  )
}

class EventView extends React.Component<
  IEventViewProps & WithStyles,
  IEventViewState
> {
  public state = {
    tabIndex: 0
  }

  public componentDidMount() {
    const eventId = this.props.match.params.eventId

    this.props.getEventById(eventId)
    this.props.fetchEventVotes(eventId)
    this.props.getEventSuggestions(eventId)
  }

  public componentWillReceiveProps(newProps: IEventViewProps) {
    const eventId = newProps.match.params.eventId
    if (isEmpty(newProps.event) && !newProps.loading) {
      this.props.getEventById(eventId)
      this.props.fetchEventVotes(eventId)
      this.props.getEventSuggestions(eventId)
    }
  }

  public componentWillUpdate() {
    const eventId = this.props.match.params.eventId
    subscribeToSuggestionsAccepted(eventId, () => {
      if (this.props.event.settings.autoAcceptSuggestionsEnabled) {
        this.props.getEventById(eventId)
      } else {
        this.props.getEventSuggestions(eventId)
      }
    })
    subscribeToVotesModified(eventId, this.handleEventVotesModified)
    onGuestUpdate(eventId, this.handleUpdateGuests)
  }

  public render() {
    const {
      loading,
      error,
      event,
      copiedToClipboard,
      acknowledgeEventInviteCopied
    } = this.props

    const shouldShowEvent: boolean = !loading && !isEmpty(event)

    return (
      <div className="eventViewWrapper">
        {loading && <LoadingSpinner />}
        {loading && !isEmpty(error) && (
          <EventFetchError onTryAgain={this.handleGetEvent} />
        )}
        {shouldShowEvent && this.renderEventView()}
        {copiedToClipboard && (
          <InviteCopyAlert
            message="Copied to Clipboard"
            onClose={acknowledgeEventInviteCopied}
          />
        )}
      </div>
    )
  }

  private renderEventView = () => {
    const { tabIndex } = this.state
    const { classes } = this.props

    return (
      <Grid className={classes.content} container={true} spacing={16}>
        <Grid className={classes.content} item={true} xs={12}>
          <AppBar
            position="static"
            color="primary"
            className={classes.tabContainer}
          >
            <Tabs
              value={tabIndex}
              onChange={this.handleTabChange}
              indicatorColor={'primary'}
              textColor={'primary'}
              TabIndicatorProps={{ className: classes.TabIndicator }}
              centered={true}
              className={classes.tabs}
              fullWidth={true}
            >
              <Tab className={classes.tab} label="Event Summary" />
              <Tab className={classes.tab} label="Playlist" />
              <Tab className={classes.tab} label="Guest List" />
            </Tabs>
          </AppBar>
          {tabIndex === 0 && (
            <TabContainer className={classes.content} dir={'x'}>
              <EventSummaryView />
            </TabContainer>
          )}
          {tabIndex === 1 && (
            <TabContainer className={classes.content} dir={'x'}>
              <EventPlaylistView />
            </TabContainer>
          )}
          {tabIndex === 2 && (
            <TabContainer className={classes.content} dir={'x'}>
              <EventGuests />
            </TabContainer>
          )}
        </Grid>
      </Grid>
    )
  }

  private handleGetEvent() {
    this.props.getEventById(this.props.match.params.eventId)
  }

  private handleTabChange = (event: any, index: number) => {
    this.setState({ tabIndex: index })
  }

  private handleUpdateGuests = () => {
    const eventId = this.props.match.params.eventId
    if (eventId) {
      this.props.getEventById(eventId)
    }
  }

  private handleEventVotesModified = () => {
    const eventId = this.props.match.params.eventId
    const { event } = this.props
    console.log('Handling vote modified')
    if (eventId) {
      console.log('Fetching votes for ' + eventId)
      this.props.fetchEventVotes(eventId)
    }
    if (!isEmpty(event) && event.settings.dynamicVotingEnabled) {
      console.log('Fetching votes for ' + eventId + ' using no loading method')
      this.props.getEventByIdNoLoading(eventId)
    }
  }
}

export default decorated(EventView)
