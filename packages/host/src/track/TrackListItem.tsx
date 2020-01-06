import React from 'react'
import Badge from '@material-ui/core/Badge'
import Fab from '@material-ui/core/Fab'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import isFunction from 'lodash/isFunction'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import { Track, getTrackImage } from 'mm-shared'
import ITrackWithFeatures from './ITrackWithFeatures'
import Remove from '@material-ui/icons/Remove'
import { Divider, Avatar } from '@material-ui/core'
import './TrackListItem.scss'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

/* <ListItemText
        primary={
          tracksWithFeature && 'tempo ' + Math.round(tracksWithFeature.tempo)
        }
      /> */

interface ITrackListItemProps {
  track: Track
  tracksWithFeature: ITrackWithFeatures
  withVoting: boolean
  numberOfVotes: number
  disableRemoveTrack?: boolean
  avatar?: string
  onVote(track: Track): void
  onTrackSelected?(track: Track): void
  onTrackRemoved?(track: Track): void
}

const TrackListItem = ({
  track,
  tracksWithFeature,
  withVoting,
  numberOfVotes,
  disableRemoveTrack,
  onVote,
  onTrackSelected,
  onTrackRemoved,
  avatar
}: ITrackListItemProps) => {
  if (!track) {
    return <span />
  }
  const handleTrackSelected = () => {
    if (isFunction(onTrackSelected)) {
      onTrackSelected(track)
    }
  }

  const handleTrackVote = () => {
    onVote(track)
  }

  const handleRemoveTrack = (track: Track) => () => {
    if (isFunction(onTrackRemoved)) {
      onTrackRemoved(track)
    }
  }

  const trackImage = (
    <Img
      src={[getTrackImage(track), backgroundImage]}
      alt={track.name}
      className="TrackListItem-track-image"
    />
  )

  let votingButton = <span />
  if (withVoting) {
    votingButton = (
      <IconButton aria-label="Vote" onClick={handleTrackVote}>
        <Badge
          badgeContent={numberOfVotes}
          color="secondary"
          className="TrackListItem-voting"
        >
          <FavouriteIcon />
        </Badge>
      </IconButton>
    )
  }

  return (
    <>
      <ListItem
        className="TrackListItem-root"
        alignItems="flex-start"
        button
        onClick={handleTrackSelected}
      >
        <ListItemIcon>{trackImage}</ListItemIcon>
        <ListItemText
          className="TrackListItem-content"
          primary={track.name}
          primaryTypographyProps={{ noWrap: true }}
          secondary={track.album.artists[0].name}
          secondaryTypographyProps={{
            variant: 'body2',
            noWrap: true
          }}
        />

        <ListItemSecondaryAction className="TrackListItem-actions">
          {!!avatar && (
            <Avatar alt="user avatar" src={avatar} className="avatar" />
          )}
          {!disableRemoveTrack && (
            <Fab
              aria-label="remove"
              size="small"
              color="primary"
              onClick={handleRemoveTrack(track)}
            >
              <Remove />
            </Fab>
          )}
          {votingButton}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default TrackListItem
