import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import { WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import IPlaylist from '../playlist/IPlaylist'
import { formatDuration } from '../util/formatDuration'

const decorate = withStyles(() => ({
  card: {
    height: '230px',
    marginLeft: '1em',
    marginRight: '1em',
    marginBottom: '1em',
    width: '210px',

    '&:hover': {
      boxShadow: '0px 1px 1px black'
    }
  },
  title: {
    marginBottom: '5px',
    marginLeft: '16px',
    fontSize: '16px',
    lineHeight: '16px'
  },
  link: {
    textDecoration: 'none'
  },
  imgContainer: {
    width: '100%'
  },
  img: {
    width: 'inherit',
    height: '140px'
  },
  btn: {
    marginLeft: '8px'
  }
}))

interface IPlaylistCardProps {
  playlist: IPlaylist
  disableLink?: boolean
}

const PlaylistCard = ({
  classes,
  playlist,
  disableLink
}: IPlaylistCardProps & WithStyles) => {
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

  return (
    <Card className={classes.card}>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={image} alt="" />
      </div>

      <Typography className={classes.title}>
        {playlist && playlist.name}
        <br />
        tracks: {playlist && playlist.tracks.items.length}
        <br />
        time: {formatDuration(durationSeconds)}
      </Typography>
      <div>
        <a
          href={playlist ? playlist.external_urls.spotify : '/'}
          target={!disableLink ? '_blank' : ''}
          className={classes.link}
        >
          <Button color="primary" className={classes.btn}>
            GO TO PLAYLIST
          </Button>
        </a>
      </div>
    </Card>
  )
}

export default decorate(PlaylistCard)
