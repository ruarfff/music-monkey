// import { isEmpty } from 'lodash'
import * as React from 'react'
import IEvent from '../IEvent'
import './EventDetails.scss'

interface IEventDetailsProps {
  event: IEvent
}

class EventDetails extends React.PureComponent<IEventDetailsProps> {

  public render() {
    const { event } = this.props

    return (
      <div className="EventDetails-root">
        <div className="EventDetails-playlist-description">
          <div className="EventDetails-playlist-info">
            <span className="EventDetails-playlist-title">
              Playlist Name
            </span><br/>
            <span>
              {event.playlist.name}
            </span>
            <br/>
            {event.playlist.description !== '' && (
              <>
                <span className="EventDetails-playlist-title">
                  Playlist Description
                </span><br/>
                <span>
                {event.playlist.description}
                </span>
              </>
            )}
          </div>

          {!event.genre &&
            <div className="EventDetails-playlist-genre">
              <span className="EventDetails-playlist-title">
                  Genre
              </span><br/>
              {event.genre}test
            </div>
          }
        </div>
      </div>
    )
  }
}



export default EventDetails
