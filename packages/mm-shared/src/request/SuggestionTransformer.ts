import { Suggestion, TrackRequest, PlaylistRequest } from 'mm-shared'

export default class SuggestionTransformer {
  public trackSuggestionToSuggestion(suggestion: TrackRequest): Suggestion {
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
    suggestion: PlaylistRequest
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
