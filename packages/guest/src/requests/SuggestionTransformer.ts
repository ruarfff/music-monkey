import { Suggestion } from 'mm-shared'
import IPlaylistSuggestion from './IPlaylistSuggestion'
import ITrackSuggestion from './ITrackSuggestion'

export default class SuggestionTransformer {
  public trackSuggestionToSuggestion(suggestion: ITrackSuggestion): Suggestion {
    return {
      eventId: suggestion.eventId,
      userId: suggestion.userId,
      type: 'track',
      trackUri: suggestion.trackUri,
      accepted: false,
      rejected: false
    } as Suggestion
  }

  public playlistSuggestionToSuggestions(
    suggestion: IPlaylistSuggestion
  ): Suggestion[] {
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
