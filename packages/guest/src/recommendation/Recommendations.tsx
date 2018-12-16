import List from '@material-ui/core/List/List'
import * as React from 'react'
import IAction from '../IAction'
import ITrack from '../track/ITrack'
import TrackList from '../track/TrackList'

interface IRecommendationsProps {
  tracks: ITrack[]
  getRecommendations(): IAction
  onRecommendationSelected?(track: ITrack): void
}

export default class Recommendations extends React.PureComponent<
  IRecommendationsProps
> {
  public componentDidMount() {
    this.props.getRecommendations()
  }
  public render() {
    const { tracks, onRecommendationSelected } = this.props
    return (
      <List>
        <TrackList
          tracks={tracks}
          onTrackSelected={onRecommendationSelected}
          withSuggestingEnabled={true}
        />
      </List>
    )
  }
}
