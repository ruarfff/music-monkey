import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import { formatDuration } from '../../util/formatDuration'
import ITrack from '../../track/ITrack'
import IAction from '../../IAction'

interface ITrackItemProps {
  track: ITrack
  playlistId: string
  addTrack(playlistId: string, track: ITrack): IAction
  showNotification(): void
}

const decorate = withStyles(() => ({
  accept: {
    background: '#27AE60',
    color: 'white'
  },
  trackBand: {
    padding: 0,
    fontWeight: 800,
  },
  trackName: {
    padding: 0,
  },
  listItem: {
    borderBottom: '1px solid #979797'
  },
  listItemContent: {
    maxWidth: '700px'
  }
}))

class TrackItem extends React.PureComponent<
  ITrackItemProps & WithStyles
  > {
  public state = {
    searchQuery: ''
  }

  public render() {
    const { classes, track } = this.props
    let trackImage = <span />
    if (track.album && track.album.images && track.album.images.length > 0) {
      trackImage = (
        <ListItemIcon>
          <img
            className="EventSuggestions-trackImage"
            src={track.album.images[track.album.images.length - 1].url}
            alt={track.name}
          />
        </ListItemIcon>
      )
    }

    return (
      <ListItem
        className={classes.listItem}
        dense={true}
        button={true}
      >
        {trackImage}
        <Grid
          className={classes.listItemContent}
          container={true}
          spacing={24}
        >
          <Grid
            item={true}
            md={4}
            container={true}
            direction={'row'}
            alignItems={'flex-end'}
          >
            <Grid
              container={true}
              direction={'column'}
              justify={'center'}
              md={4}
              item={true}
            >
              <ListItemText
                className={classes.trackBand}
                primary={track.album.artists[0].name}
              />
              <ListItemText
                className={classes.trackName}
                primary={track.name}
              />
            </Grid>
            <ListItemText primary={formatDuration(track.duration_ms)}/>
          </Grid>

          <Grid item={true} md={4}>
            <audio
              src={track.preview_url ? track.preview_url : ''}
              controls={true}
              className="EventSuggestions-audio"
              preload="none"
            />
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <Button
            className={classes.accept}
            variant="contained"
            onClick={this.handleAddTrack(track)}
          >
            ADD
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  private handleAddTrack = (track: ITrack) => () => {
    this.props.addTrack(this.props.playlistId, track)
    this.props.showNotification()
  }
}

export default decorate(TrackItem)