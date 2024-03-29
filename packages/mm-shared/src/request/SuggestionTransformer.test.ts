import { Suggestion, TrackRequest, PlaylistRequest } from 'mm-shared'
import SuggestionTransformer from './SuggestionTransformer'

describe('SuggestionTransformer', () => {
  let suggestionTransformer: SuggestionTransformer

  beforeEach(() => {
    suggestionTransformer = new SuggestionTransformer()
  })

  it('should transform a track suggestion to a suggestion', () => {
    const trackSuggestion: TrackRequest = {
      eventId: '123',
      userId: 'iUser',
      trackUri: 'track:uri'
    } as TrackRequest
    const suggestion: Suggestion = suggestionTransformer.trackSuggestionToSuggestion(
      trackSuggestion
    )

    expect(suggestion).toEqual({
      eventId: trackSuggestion.eventId,
      userId: trackSuggestion.userId,
      type: 'track',
      trackUri: trackSuggestion.trackUri,
      accepted: false,
      rejected: false
    })
  })

  it('should transform a playlist suggestion to a collection of suggestions', () => {
    const playlistSuggestion = {
      eventId: '123',
      userId: 'iUser',
      playlistUri: 'playlist:uri',
      trackUris: ['track:uri:1', 'track:uri:2']
    } as PlaylistRequest

    const suggestions = suggestionTransformer.playlistSuggestionToSuggestions(
      playlistSuggestion
    )

    expect(suggestions).toEqual([
      {
        eventId: playlistSuggestion.eventId,
        userId: playlistSuggestion.userId,
        type: 'playlist',
        playlistUri: playlistSuggestion.playlistUri,
        accepted: false,
        rejected: false,
        trackUri: 'track:uri:1'
      } as Suggestion,
      {
        eventId: playlistSuggestion.eventId,
        userId: playlistSuggestion.userId,
        type: 'playlist',
        playlistUri: playlistSuggestion.playlistUri,
        accepted: false,
        rejected: false,
        trackUri: 'track:uri:2'
      } as Suggestion
    ])
  })
})
