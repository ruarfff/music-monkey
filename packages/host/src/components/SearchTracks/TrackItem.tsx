import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import IAction from '../../IAction'
import ITrack from '../../track/ITrack'
import { formatDuration } from '../../util/formatDuration'

interface ITrackItemProps {
  track: ITrack
  playlistId: string
  addTrack(playlistId: string, track: ITrack): IAction
  handleClearSearch(): void
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
    width: '100%',
    maxWidth: '900px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
        <div className={classes.listItemContent}>
          <div className='trackNameContainer'>
            <span
              className={classes.trackBand}
            >
              {track.album.artists[0].name}
            </span>
            <span
              className={classes.trackName}
            >
              {track.name}
            </span>
          </div>
          <div className='trackDuration'>
            {formatDuration(track.duration_ms)}
          </div>
          <div className='trackContainer'>
            <audio
              src={track.preview_url ? track.preview_url : ''}
              controls={true}
              className="EventSuggestions-audio"
              preload="none"
            />
          </div>
        </div>
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
    this.props.handleClearSearch()
  }
}

export default decorate(TrackItem)