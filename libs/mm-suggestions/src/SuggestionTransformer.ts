import IPlaylistSuggestion from './IPlaylistSuggestion'
import ISuggestion from './ISuggestion'
import ITrackSuggestion from './ITrackSuggestion'

export default class SuggestionTransformer {
  public trackSuggestionToSuggestion(
    suggestion: ITrackSuggestion
  ): ISuggestion {
    return {
      eventId: suggestion.eventId,
      userId: suggestion.userId,
      type: 'track',
      trackUri: suggestion.trackUri,
      accepted: false,
      rejected: false
    } as ISuggestion
  }

  public playlistSuggestionToSuggestions(
    suggestion: IPlaylistSuggestion
  ): ISuggestion[] {
    return suggestion.trackUris.map(trackUri => ({
      eventId: suggestion.eventId,
      userId: suggestion.userId,
      type: 'playlist',
      playlistUri: suggestion.playlistUri,
      accepted: false,
      rejected: false,
      trackUri
    }))
  }
}
