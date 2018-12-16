import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import IPlaylist from '../playlist/IPlaylist'

const decorate = withStyles((theme: Theme) => ({
  card: {
    height: '210px',
    marginLeft: '1em',
    marginRight: '1em',
    width: '210px',

    '&:hover': {
      boxShadow: '0px 1px 1px black',
    },
  },
  title: {
    marginBottom: '5px',
    marginLeft: '16px',
    fontSize: '16px',
    lineHeight: '16px',
  },
  link: {
    textDecoration: 'none',
  },
  eventDescription: {
    color: '#979797',
    fontSize: '12px',
    lineHeight: '16px',
    marginBottom: '4px',
    display: 'flex'
  },
  imgContainer: {
    width: '100%'
  },
  img: {
    width: 'inherit',
    height: '140px'
  },
  cardContent: {
    padding: '15px 25px',
    height: 'calc(100% - 250px)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  trackLength: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

interface IEventBigCardProps {
  playlist: IPlaylist
}

class PlaylistCard extends React.Component<IEventBigCardProps & WithStyles> {

  public render() {
    const { classes, playlist } = this.props

    const image =
      (playlist && playlist.images && playlist.images.length > 0) ? playlist.images[0].url : '/img/partycover-sm.png'

    return (
      <Card className={classes.card}>
        <a href={playlist ? playlist.external_urls.spotify : '/'} target="_blank" className={classes.link}>
          <div className={classes.imgContainer}>
            <img className={classes.img} src={image} alt=""/>
          </div>

          <Typography className={classes.title}>
            {playlist && playlist.name}
          </Typography>
          <div>
            <Button
              color='primary'
            >
              GO TO PLAYLIST
            </Button>
          </div>
        </a>
      </Card>
    )
  }
}

export default decorate(PlaylistCard)