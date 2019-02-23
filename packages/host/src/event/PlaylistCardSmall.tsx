import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import { WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import IPlaylist from '../playlist/IPlaylist'

const decorate = withStyles(() => ({
  card: {
    height: '210px',
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
  }
}))

interface IPlaylistCardProps {
  playlist: IPlaylist
  disableLink?: boolean
}

class PlaylistCard extends React.Component<IPlaylistCardProps & WithStyles> {
  public render() {
    const { classes, playlist, disableLink } = this.props

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
        </Typography>
        <div>
          <a
            href={playlist ? playlist.external_urls.spotify : '/'}
            target={!disableLink ? '_blank' : ''}
            className={classes.link}
          >
            <Button color="primary">GO TO PLAYLIST</Button>
          </a>
        </div>
      </Card>
    )
  }
}

export default decorate(PlaylistCard)
