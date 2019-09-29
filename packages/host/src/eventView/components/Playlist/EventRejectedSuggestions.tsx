import React from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { RouteComponentProps, withRouter } from 'react-router'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import formatDuration from 'util/formatDuration'
import ITrack from 'track/ITrack'
import './EventRejectSuggestions.scss'

interface IEventRejectedSuggestionsProps extends RouteComponentProps<any> {
  suggestions: IDecoratedSuggestion[]
  playlist: IPlaylist
  saveEventPlaylist(
    eventId: string,
    playlist: IPlaylist,
    suggestions: Map<string, IDecoratedSuggestion>
  ): IAction
}

const trackHasImage = (track: ITrack) => {
  return track.album && track.album.images && track.album.images.length
}

const EventRejectedSuggestions = ({
  suggestions,
  playlist,
  saveEventPlaylist,
  match
}: IEventRejectedSuggestionsProps) => {
  const handleSavePlaylist = (
    decoratedSuggestion: IDecoratedSuggestion
  ) => () => {
    const eventId = match.params.eventId
    const suggestionMap = new Map()
    suggestionMap.set(decoratedSuggestion.track.uri, decoratedSuggestion)
    saveEventPlaylist(eventId, playlist, suggestionMap)
  }

  const filteredSuggestions = suggestions.filter(
    suggest => !suggest.suggestion.accepted
  )
  if (!filteredSuggestions || filteredSuggestions.length < 1) {
    return (
      <Typography align="center" variant="subtitle1">
        Currently no Rejected Suggestions
      </Typography>
    )
  }

  return (
    <div className="EvenRejectSuggestion-root">
      <Grid container={true} spacing={24}>
        <Grid item={true} sm={12}>
          <List>
            {filteredSuggestions.map(({ track, user, suggestion }) => (
              <ListItem
                key={track.id}
                className="list-item"
                dense={true}
                button={true}
              >
                {trackHasImage(track) && (
                  <ListItemIcon>
                    <img
                      className="track-image"
                      src={
                        track.album.images[track.album.images.length - 1].url
                      }
                      alt={track.name}
                    />
                  </ListItemIcon>
                )}
                <div className="list-item-content">
                  <div className="list-item-text-block">
                    <div className="list-item-artist">
                      <span className="track-artist">
                        {track.album.artists[0].name}
                      </span>
                      <span>{track.name}</span>
                    </div>
                    <span className="track-duration">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </div>
                  {track.preview_url ? (
                    <audio
                      src={track.preview_url}
                      controls={true}
                      preload="none"
                    />
                  ) : (
                    <audio src={''} controls={true} preload="none" />
                  )}
                </div>
                {user.image ? (
                  <Avatar
                    alt={user.displayName}
                    src={user.image}
                    className="avatar"
                  />
                ) : (
                  <AccountCircle className="avatar-small" />
                )}
                <ListItemSecondaryAction>
                  <Button
                    className="accept"
                    variant="contained"
                    onClick={handleSavePlaylist({ track, user, suggestion })}
                  >
                    ACCEPT
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(EventRejectedSuggestions)
