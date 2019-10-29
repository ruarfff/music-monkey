import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Snackbar from '@material-ui/core/Snackbar'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import CloseIcon from '@material-ui/icons/Close'
import Search from '@material-ui/icons/Search'
import { debounce, isEmpty } from 'lodash'
import * as React from 'react'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import ISearch from 'playlist/ISearch'
import Recommendations from 'recommendations/RecommendationsContainer'
import ITrack from 'track/ITrack'
import EventInput from 'components/EventInput/EventInput'
import TrackItem from './TrackItem'
import './EventSearchTracks.scss'

const WAIT_INTERVAL = 400

interface IEventSearchTracksProps {
  searchResult: ISearch
  playlist: IPlaylist
  notification: string
  layout?: string
  searchTrack(text: string): IAction
  addTrack(playlistId: string, track: ITrack): IAction
}

const decorate = withStyles(() => ({
  btn: {
    marginTop: '16px'
  }
}))

class EventSearchTracks extends React.PureComponent<
  IEventSearchTracksProps & WithStyles
> {
  public state = {
    searchQuery: '',
    isOpen: false
  }

  public timer: any = debounce(() => this.triggerChange(), WAIT_INTERVAL)

  public handleSearchSubmit = () => {
    this.props.searchTrack(this.state.searchQuery)
  }

  public handleSearchChange = (searchQuery: string) => {
    this.setState({ searchQuery })

    this.timer()
  }

  public handleClearSearch = () => {
    this.setState({ searchQuery: '' })
  }

  public triggerChange = () => {
    const { searchQuery } = this.state
    if (searchQuery !== '') {
      this.props.searchTrack(searchQuery)
    }
  }

  public componentWillReceiveProps(newProps: IEventSearchTracksProps) {
    if (newProps.notification !== this.props.notification) {
      this.handleShowNotification()
    }
  }

  public handleShowNotification = () => {
    this.setState({ isOpen: true })
  }

  public handleClose = () => {
    this.setState({ isOpen: false })
  }

  public render() {
    const {
      searchResult,
      classes,
      addTrack,
      playlist,
      notification,
      layout
    } = this.props

    const playlistTracks = playlist.tracks.items.map(track => track.track.uri)

    let filteredSearch

    if (!isEmpty(searchResult)) {
      filteredSearch = searchResult.items.filter(
        searchedTrack => playlistTracks.indexOf(searchedTrack.uri) === -1
      )
    }

    return (
      <div className="">
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          autoHideDuration={4000}
          open={this.state.isOpen}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{notification}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <div className="SearchSection">
          <EventInput
            value={this.state.searchQuery}
            label={'search'}
            onChange={this.handleSearchChange}
          />
          <Button className={classes.btn} onClick={this.handleSearchSubmit}>
            <Search />
          </Button>
        </div>

        <div className="SearchResults">
          <List>
            {filteredSearch ? (
              filteredSearch.map((track, index) => (
                <TrackItem
                  layout={layout}
                  handleClearSearch={this.handleClearSearch}
                  playlistId={playlist.id}
                  addTrack={addTrack}
                  track={track}
                  key={index}
                />
              ))
            ) : (
              <Recommendations playlist={playlist} layout={layout} />
            )}
          </List>
        </div>
      </div>
    )
  }
}

export default decorate(EventSearchTracks)
