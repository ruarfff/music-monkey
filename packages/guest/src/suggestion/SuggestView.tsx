import {
  Avatar,
  Divider,
  Icon,
  ListItem,
  ListItemText
} from '@material-ui/core'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import './SuggestView.scss'

interface ISuggestViewProps extends RouteComponentProps<any> {
  event: IEvent
  suggestions: any
  getSuggestions(eventId: string): IAction
}

export default class SuggestView extends React.PureComponent<
  ISuggestViewProps,
  any
> {
  constructor(props: ISuggestViewProps) {
    super(props)

    this.state = {
      open: true
    }
  }

  public componentDidMount() {
    if (this.props.event) {
      this.props.getSuggestions(this.props.event.eventId)
    }
  }

  public renderSuggestions() {
    const { suggestions } = this.props

    return suggestions.map((suggestion: any, index: number) => {
      let trackImage = <span />
      if (
        suggestion.track.album &&
        suggestion.track.album.images &&
        suggestion.track.album.images.length > 0
      ) {
        trackImage = (
          <Avatar>
            <img
              src={
                suggestion.track.album.images[
                  suggestion.track.album.images.length - 1
                ].url
              }
              alt={suggestion.track.name}
            />
          </Avatar>
        )
      }
      return (
        <div key={index} className="event-list-item">
          <ListItem dense={true}>
            {trackImage}
            <ListItemText
              primary={suggestion.track.artists[0].name}
              secondary={suggestion.track.name}
            />
            {/* {votingButton} */}
            <Icon
              // onClick={handleTrackSelected}
              className={
                suggestion.suggestion.accepted
                  ? 'playlist_add_check'
                  : suggestion.suggestion.rejected
                  ? 'highlight_off'
                  : 'hourglass_empty'
              }
            >
              {suggestion.suggestion.accepted
                ? 'playlist_add_check'
                : suggestion.suggestion.rejected
                ? 'highlight_off'
                : 'hourglass_empty'}
              playlist_add{' '}
            </Icon>
          </ListItem>
          <Divider variant="inset" />
        </div>
      )
    })
  }

  public render() {
    return this.renderSuggestions()
  }
}
