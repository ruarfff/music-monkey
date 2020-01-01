import IPlaylistSuggestion from './IPlaylistSuggestion'
import ISuggestion from './ISuggestion'
import ITrackSuggestion from './ITrackSuggestion'
import SuggestionTransformer from './SuggestionTransformer'
describe('SuggestionTransformer', () => {
  let suggestionTransformer: SuggestionTransformer

  beforeEach(() => {
    suggestionTransformer = new SuggestionTransformer()
  })

  it('should transform a track suggestion to a suggestion', () => {
    const trackSuggestion: ITrackSuggestion = {
      eventId: '123',
      userId: 'iUser',
      trackUri: 'track:uri'
    } as ITrackSuggestion
    const suggestion: ISuggestion = suggestionTransformer.trackSuggestionToSuggestion(
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
    } as IPlaylistSuggestion

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
      } as ISuggestion,
      {
        eventId: playlistSuggestion.eventId,
        userId: playlistSuggestion.userId,
        type: 'playlist',
        playlistUri: playlistSuggestion.playlistUri,
        accepted: false,
        rejected: false,
        trackUri: 'track:uri:2'
      } as ISuggestion
    ])
  })
})
