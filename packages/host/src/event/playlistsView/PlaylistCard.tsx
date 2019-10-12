import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import { Link } from 'react-router-dom'
import IPlaylist from 'playlist/IPlaylist'
import formatDuration from 'util/formatDuration'
import './PlaylistCard.scss'

interface IPlaylistCardProps {
  eventId: string
  playlist: IPlaylist
}

const PlaylistCard = ({ playlist, eventId }: IPlaylistCardProps) => {
  const durationSeconds =
    playlist.tracks.items.length > 0
      ? playlist.tracks.items
          .map(item => item.track.duration_ms)
          .reduce((acc, dur) => acc + dur)
      : 0

  const image =
    playlist.images && playlist.images.length
      ? playlist.images[0].url
      : '/img/partycover-sm.png'

  return (
    <Card className="PlaylistCard-root">
      <div className="PlaylistCard-img-container">
        <img src={image} alt="Playlist cover" />
      </div>
      <Grid
        container={true}
        direction="column"
        justify="space-between"
        className="PlaylistCard-content"
      >
        <Typography className="PlaylistCard-title">{playlist.name}</Typography>
        <div className="PlaylistCard-description">
          <Typography>{playlist.tracks.total + ' Tracks'}</Typography>
          <Typography>{formatDuration(durationSeconds)}</Typography>
        </div>
        <div>
          <Link to={`/events/${eventId}/edit`}>
            <Button color="secondary">EDIT EVENT</Button>
          </Link>
        </div>
      </Grid>
    </Card>
  )
}

export default PlaylistCard
