import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IPlaylist from 'playlist/IPlaylist'
import formatDuration from 'util/formatDuration'
import Image from 'components/Image'
import getPlaylistImage from 'playlist/getPlaylistImage'
import backgroundImg from 'assets/partycover.jpg'
import getPlaylistDuration from 'playlist/getPlaylistDuration'

import './SmallPlaylistCard.scss'

interface ISmallPlaylistCardProps {
  playlist: IPlaylist
  classes?: { root: string }
}

const SmallPlaylistCard = ({
  playlist,
  classes = { root: '' }
}: ISmallPlaylistCardProps) => {
  const durationSeconds = getPlaylistDuration(playlist)
  const image = getPlaylistImage(playlist)

  if (!playlist) return null

  return (
    <Card className={`SmallPlaylistCard-root ${classes.root}`}>
      <CardContent>
        <div className="SmallPlaylistCard-image">
          <Image src={image} alt="Playlist" fallbackSrc={backgroundImg} />
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
        </div>
      </CardContent>
      <Hidden smDown implementation="js">
        <div>
          <a
            href={playlist.external_urls.spotify}
            target={'_blank'}
            className="SmallPlaylistCard-link"
          >
            <Button color="primary">GO TO PLAYLIST</Button>
          </a>
        </div>
      </Hidden>
    </Card>
  )
}

export default SmallPlaylistCard
