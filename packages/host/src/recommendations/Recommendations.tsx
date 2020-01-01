import React from 'react'
import TrackItem from 'components/SearchTracks/TrackItemContainer'
import { Action } from 'mm-shared'
import IPlaylist from 'playlist/IPlaylist'
import ITrack from 'track/ITrack'

interface IRecommendationsProps {
  recommendedTracks: ITrack[]
  playlist?: IPlaylist
  layout?: string
  getRecommendations(): Action
}

class Recommendations extends React.PureComponent<IRecommendationsProps> {
  public componentDidMount() {
    this.props.getRecommendations()
  }

  public render() {
    const { recommendedTracks, layout } = this.props

    //const playlistTracks = playlist.tracks.items.map(track => track.track.uri)

    let filteredRecommendedTracks = recommendedTracks

    // if (!isEmpty(recommendedTracks)) {
    //   filteredRecommendedTracks = recommendedTracks.filter(
    //     searchedTrack => playlistTracks.indexOf(searchedTrack.uri) === -1
    //   )
    // }

    return (
      <div>
        <span>Recommended tracks</span>
        {filteredRecommendedTracks.map((track: ITrack, index: number) => (
          <TrackItem
            layout={layout}
            key={index}
            playlistId={''}
            track={track}
          />
        ))}
      </div>
    )
  }
}

export default Recommendations
