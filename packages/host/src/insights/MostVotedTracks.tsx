import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { isEmpty } from 'lodash'
import * as React from 'react'
import IAction from 'IAction'
import IEvent from 'event/IEvent'
import IPlaylist from 'playlist/IPlaylist'
import IPlaylistItem from 'playlist/IPlaylistItem'
import ITrackVoteStatus from 'vote/ITrackVoteStatus'
import './MostPopularTracks.scss'

interface IMostPopularTracksProps {
  votes: Map<string, ITrackVoteStatus>
  events: IEvent[]
  playlist: IPlaylist
  sortPlaylistByVotesDescending(
    playlist: IPlaylist,
    votes: Map<string, ITrackVoteStatus>
  ): IAction
  fetchEventVotes(eventId: string): IAction
}

class MostVotedTracks extends React.Component<IMostPopularTracksProps> {
  public state = {
    anchorEl: null,
    pickedEvent: {} as IEvent
  }

  public componentWillReceiveProps(nextProps: IMostPopularTracksProps) {
    const { pickedEvent } = this.state
    const { votes } = this.props

    if (nextProps.votes !== votes && pickedEvent.playlist) {
      this.props.sortPlaylistByVotesDescending(
        pickedEvent.playlist,
        this.props.votes
      )
    } else if (
      nextProps.votes !== votes &&
      !pickedEvent.playlist &&
      nextProps.events[0].playlist
    ) {
      this.props.sortPlaylistByVotesDescending(
        nextProps.events[0].playlist,
        this.props.votes
      )
    }
  }

  public handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleClose = (event?: IEvent) => () => {
    this.setState({ anchorEl: null })
    if (event && event.eventId) {
      this.setState({ pickedEvent: event })
      this.props.fetchEventVotes(event.eventId)
    }
  }

  public render() {
    const { anchorEl, pickedEvent } = this.state
    const { events, playlist } = this.props

    const eventsWithTracks = events.filter(
      event => event.playlist && event.playlist.tracks.items.length > 0
    )

    return (
      <Paper className="MostPopularTracks-root">
        <span className="title">Most Voted Tracks</span>
        <span
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          className="menuBtn"
          onClick={this.handleClick}
        >
          {!isEmpty(pickedEvent) ? pickedEvent.name : 'Pick Event'}
        </span>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose()}
        >
          {eventsWithTracks &&
            eventsWithTracks.map((event: IEvent, index: number) => {
              if (event.eventId) {
                return (
                  <MenuItem key={index} onClick={this.handleClose(event)}>
                    {event.name}
                  </MenuItem>
                )
              }
              return (
                <MenuItem key={index} onClick={this.handleClose()}>
                  no events
                </MenuItem>
              )
            })}
        </Menu>
        <div className="listWrapper">
          {playlist &&
            playlist.tracks.items.slice(0, 5).map((item: IPlaylistItem, i) => {
              return item ? (
                <div key={i} className={'listItem'}>
                  <div className={'imgSection'}>
                    <img
                      alt="track"
                      className={'trackImg'}
                      src={item.track.album.images[0].url}
                    />
                  </div>
                  <div className={'trackNumber'}>{i + 1 + '. '}</div>
                  <div className={'nameSection'}>
                    <span>{item.track.name}</span>
                    <span className="artistName">
                      {item.track.album.artists[0].name}
                    </span>
                  </div>
                </div>
              ) : (
                <div key={i} />
              )
            })}
        </div>
      </Paper>
    )
  }
}

export default MostVotedTracks
