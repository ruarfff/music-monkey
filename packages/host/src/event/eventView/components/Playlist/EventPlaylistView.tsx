import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import uniqBy from 'lodash/uniqBy'
import isEmpty from 'lodash/isEmpty'
import EventSearchTracksContainer from 'components/SearchTracks/EventSearchTracksContainer'
import { Event } from 'mm-shared'
import EventPlaylist from 'event/eventPlaylist/EventPlaylistContainer'
import EventPlaylistSummary from 'event/eventPlaylist/EventPlaylistSummaryContainer'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import EventRejectedSuggestions from './EventRejectedSuggestionsContainer'
import EventSuggestions from './EventSuggestionsContainer'

import './EventPlaylistView.scss'

interface IEventPlaylistViewProps {
  event: Event
  acceptedSuggestions: IDecoratedSuggestion[]
  stagedSuggestions: IDecoratedSuggestion[]
  pendingSuggestions: IDecoratedSuggestion[]
}

function TabContainer({ children, dir }: any) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{
        padding: '10px',
        boxShadow:
          '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
          '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
          '0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
      }}
    >
      {children}
    </Typography>
  )
}

class EventPlaylistView extends React.Component<IEventPlaylistViewProps> {
  public state = {
    tabIndex: 0
  }

  public render() {
    const { tabIndex } = this.state
    const { pendingSuggestions, event } = this.props

    const playlistTracks = event.playlist!.tracks.items.map(
      track => track.track.uri
    )

    let filteredSuggestions = pendingSuggestions

    if (!isEmpty(pendingSuggestions)) {
      filteredSuggestions = uniqBy(
        pendingSuggestions.filter(
          suggestedTrack =>
            playlistTracks.indexOf(suggestedTrack.track.uri) === -1
        ),
        'track.uri'
      )
    }

    return (
      <Grid container={true} spacing={3} className="EventPlaylistView-root">
        <Grid item={true} sm={12}>
          <EventPlaylistSummary />
        </Grid>
        <Grid className="tabs-wrapper" item={true} sm={12}>
          <AppBar position="static" color="inherit">
            <Tabs
              value={tabIndex}
              onChange={this.handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
            >
              <Tab label="Event Playlist" />
              <Tab
                label={
                  filteredSuggestions.length > 0 ? (
                    <Badge
                      badgeContent={filteredSuggestions.length}
                      color="secondary"
                      className="suggestions"
                    >
                      Maybe
                    </Badge>
                  ) : (
                    'Maybe'
                  )
                }
              />
              <Tab label="Rejected" />
              <Tab label="Add track" />
            </Tabs>
          </AppBar>
          {tabIndex === 0 && (
            <TabContainer dir={'x'}>
              <EventPlaylist />
            </TabContainer>
          )}
          {tabIndex === 1 && (
            <TabContainer dir={'x'}>
              <EventSuggestions />
            </TabContainer>
          )}
          {tabIndex === 2 && (
            <TabContainer dir={'x'}>
              <EventRejectedSuggestions />
            </TabContainer>
          )}
          {tabIndex === 3 && (
            <TabContainer dir={'x'}>
              <EventSearchTracksContainer playlist={event.playlist!} />
            </TabContainer>
          )}
        </Grid>
      </Grid>
    )
  }

  private handleTabChange = (event: any, index: number) => {
    this.setState({ tabIndex: index })
  }
}

export default EventPlaylistView
