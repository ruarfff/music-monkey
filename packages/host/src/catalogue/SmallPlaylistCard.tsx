import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import Typography from '@material-ui/core/Typography/Typography'
import IPlaylist from 'playlist/IPlaylist'
import formatDuration from 'util/formatDuration'
import Image from 'components/Image'
import './SmallPlaylistCard.scss'

interface ISmallPlaylistCardProps {
  playlist: IPlaylist
}

const SmallPlaylistCard = ({ playlist }: ISmallPlaylistCardProps) => {
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
    <Card className="SmallPlaylistCard-root">
      <div className="SmallPlaylistCard-image">
        <Image
          src={image}
          alt="Playlist"
          fallbackSrc="/img/partycover-sm.png"
        />
      </div>
      <div className="SmallPlaylistCard-content-wrapper">
        <Typography className="SmallPlaylistCard-name">
          {playlist.name}
        </Typography>
        <Typography noWrap={true} className="SmallPlaylistCard-description">
          tracks: {playlist.tracks.items.length}
        </Typography>
        <Typography noWrap={true} className="SmallPlaylistCard-description">
          time: {formatDuration(durationSeconds)}
        </Typography>

        <div>
          <a
            href={playlist.external_urls.spotify}
            target={'_blank'}
            className="SmallPlaylistCard-link"
          >
            <Button color="primary">GO TO PLAYLIST</Button>
          </a>
        </div>
      </div>
    </Card>
  )
}

export default SmallPlaylistCard
