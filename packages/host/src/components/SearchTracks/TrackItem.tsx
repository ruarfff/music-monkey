import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import IAction from 'IAction'
import ITrack from 'track/ITrack'
import formatDuration from 'util/formatDuration'

interface ITrackItemProps {
  track: ITrack
  playlistId: string
  layout?: string
  disableAddButton?: boolean
  addTrack(playlistId: string, track: ITrack): IAction
  handleClearSearch?(): void
}

const decorate = withStyles(() => ({
  accept: {
    background: '#27AE60',
    color: 'white'
  },
  listItem: {
    borderBottom: '1px solid #979797'
  }
}))

class TrackItem extends React.PureComponent<ITrackItemProps & WithStyles> {
  public state = {
    searchQuery: ''
  }

  public render() {
    const { classes, track, layout, disableAddButton } = this.props
    let trackImage = <span />
    if (track.album && track.album.images && track.album.images.length > 0) {
      trackImage = (
        <ListItemIcon>
          <img
            className="EventSuggestions-trackImage"
            src={track.album.images[0].url}
            alt={track.name}
          />
        </ListItemIcon>
      )
    }

    return (
      <ListItem className={classes.listItem} dense={true} button={true}>
        {trackImage}
        <div
          className={
            layout === 'column'
              ? 'listItemContent-column listItemContent'
              : 'listItemContent'
          }
        >
          <div className="trackLeftContent">
            <div className="trackNameContainer">
              <span className="trackBand">{track.album.artists[0].name}</span>
              <span className="trackName">{track.name}</span>
            </div>
            <div className="trackDuration">
              {formatDuration(track.duration_ms)}
            </div>
          </div>
          <div className="trackContainer">
            <audio
              src={track.preview_url ? track.preview_url : ''}
              controls={true}
              className="EventSuggestions-audio"
              preload="none"
            />
          </div>
        </div>
        {!disableAddButton && (
          <ListItemSecondaryAction>
            <Button
              className={classes.accept}
              variant="contained"
              onClick={this.handleAddTrack(track)}
            >
              ADD
            </Button>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    )
  }

  private handleAddTrack = (track: ITrack) => () => {
    this.props.addTrack(this.props.playlistId, track)
    if (this.props.handleClearSearch) {
      this.props.handleClearSearch()
    }
  }
}

export default decorate(TrackItem)
