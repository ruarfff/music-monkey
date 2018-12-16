import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import IPlaylist from '../playlist/IPlaylist'

const decorate = withStyles((theme: Theme) => ({
  card: {
    height: '390px',
    marginTop: '1em',
    marginLeft: '1em',
    marginRight: '1em',
    width: '300px'
  },
  title: {
    marginBottom: 24,
    fontSize: '20px',
    lineHeight: '23px',
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
    height: '250px'
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

class PlaylistCard extends React.Component<
  IEventBigCardProps & WithStyles> {

  public render() {
    const { classes, playlist } = this.props

    const durationSeconds =
      playlist.tracks.items.length > 0
        ? playlist.tracks.items
        .map(item => item.track.duration_ms)
        .reduce((acc, dur) => acc + dur) / 1000
        : 0

    const image =
      playlist.images && playlist.images.length ? playlist.images[0].url : '/img/partycover-sm.png'

    return (
      <Card className={classes.card}>
        <div className={classes.imgContainer}>
          <img className={classes.img} src={image} alt=""/>
        </div>
        <Grid container={true} direction='column' justify='space-between' className={classes.cardContent}>
          <Typography className={classes.title}>
            {playlist.name}
          </Typography>
          <div className={classes.trackLength}>
            <Typography>
              {playlist.tracks.total + ' Tracks'}
            </Typography>
            <Typography>
              {this.formatDuration(durationSeconds)}
            </Typography>
          </div>
          <div>
            <a href={playlist ? playlist.external_urls.spotify : '/'} target="_blank" className={classes.link}>
              <Button
                color='secondary'
              >
                GO TO PLAYLIST
              </Button>
            </a>
          </div>

        </Grid>
      </Card>
    )
  }
  private formatDuration = (durationSeconds: number) => {
    const hours = Math.floor(durationSeconds / 3600)
    const minutes = Math.floor((durationSeconds - hours * 3600) / 60)

    return hours + 'h ' + minutes + 'm '
  }
}

export default decorate(PlaylistCard)