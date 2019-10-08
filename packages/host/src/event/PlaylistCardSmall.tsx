import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import Typography from '@material-ui/core/Typography/Typography'
import IPlaylist from 'playlist/IPlaylist'
import formatDuration from 'util/formatDuration'
import './PlaylistCardSmall.scss'

interface IPlaylistCardProps {
  playlist: IPlaylist
  disableLink?: boolean
}

const PlaylistCard = ({ playlist, disableLink }: IPlaylistCardProps) => {
  const durationSeconds =
    playlist && playlist.tracks.items.length > 0
      ? playlist.tracks.items
          .map(item => item.track.duration_ms)
          .reduce((acc, dur) => acc + dur)
      : 0

  const image =
    playlist && playlist.images && playlist.images.length > 0
      ? playlist.images[0].url
      : '/img/partycover-sm.png'

  if (!playlist) return null

  return (
    <Card className="PlaylistCardSmall-root">
      <div className="PlaylistCardSmall-image">
        <img src={image} alt="Playlist" />
      </div>
      <div className="PlaylistCardSmall-content-wrapper">
        <Typography className="PlaylistCardSmall-name">
          {playlist.name}
        </Typography>
        <Typography noWrap={true} className="PlaylistCardSmall-description">
          tracks: {playlist.tracks.items.length}
        </Typography>
        <Typography noWrap={true} className="PlaylistCardSmall-description">
          time: {formatDuration(durationSeconds)}
        </Typography>

        <div>
          <a
            href={playlist.external_urls.spotify}
            target={!disableLink ? '_blank' : ''}
            className="PlaylistCardSmall-link"
          >
            <Button color="primary">GO TO PLAYLIST</Button>
          </a>
        </div>
      </div>
    </Card>
  )
}

export default PlaylistCard
