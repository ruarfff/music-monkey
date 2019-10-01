import Paper from '@material-ui/core/Paper'
import * as _ from 'lodash'
import * as React from 'react'
import IEvent from '../event/IEvent'
import ITrack from '../track/ITrack'
import './MostPopularTracks.scss'

interface IMostPopularTracksProps {
  events: IEvent[]
}

class MostPopularTracks extends React.Component<IMostPopularTracksProps> {
  public render() {
    const { events } = this.props

    const popularTracks = _.sortBy(
      _.uniqBy(
        _.flattenDeep<ITrack>(
          events.map(event =>
            event.playlist
              ? event.playlist.tracks.items.map(track => track.track)
              : []
          )
        ),
        'uri'
      ),
      'popularity'
    )

    return (
      <Paper className="MostPopularTracks-root">
        <span className="title">Most Popular Tracks</span>
        <div className="listWrapper">
          {popularTracks &&
            popularTracks
              .reverse()
              .slice(0, 5)
              .map((track: ITrack | undefined, i) => {
                return track ? (
                  <div key={i} className="listItem">
                    <div className="imgSection">
                      <img
                        alt="track"
                        className="trackImg"
                        src={track.album.images[0].url}
                      />
                    </div>
                    <div className="trackNumber">{i + 1 + '. '}</div>
                    <div className="nameSection">
                      <span>{track.name}</span>
                      <span className="artistName">
                        {track.album.artists[0].name}
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

export default MostPopularTracks
