import { call, put, takeEvery } from 'redux-saga/effects'
import { EVENT_FETCH_BY_ID_INITIATED } from '../eventView/eventViewActions'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import IPlaylistItem from '../playlist/IPlaylistItem'
import {
  reOrderPlaylist,
  replaceTracksInPlaylist
} from '../playlist/playlistClient'
import { addTracksToPlaylist } from '../playlist/playlistClient'
import IDecoratedSuggestion from '../suggestion/IDecoratedSuggestion'
import {
  CLEAR_STAGED_SUGGESTIONS
} from '../suggestion/suggestionActions'
import { acceptSuggestions } from '../suggestion/suggestionClient'
import ITrackVoteStatus from '../vote/ITrackVoteStatus'
import {
  MOVE_ITEM_IN_EVENT_PLAYLIST,
  PLAYLIST_SORTED_BY_VOTES_DESCENDING,
  SAVE_EVENT_PLAYLIST,
  SAVE_EVENT_PLAYLIST_ERROR,
  SAVE_EVENT_PLAYLIST_SUCCESS,
  SORT_PLAYLIST_BY_VOTES_DESCENDING
} from './eventPlaylistActions'

interface ISavePlaylistArgs {
  eventId: string
  playlist: IPlaylist
  suggestions: Map<string, IDecoratedSuggestion>
}

async function saveEventPlaylist({
  eventId,
  playlist,
  suggestions
}: ISavePlaylistArgs) {
  if (!playlist) {
    return Promise.reject(new Error('No Event Playlist'))
  }
  const playlistTrackUris: string[] = playlist.tracks.items.map(
    pl => pl.track.uri
  )
  const suggestedTrackUris: string[] = Array.from(suggestions.keys())

  const trackUrisNotInPlaylist = suggestedTrackUris.filter(
    trackUri => !playlistTrackUris.includes(trackUri)
  )

  if (trackUrisNotInPlaylist.length < 1) {
    await acceptSuggestions(eventId, Array.from(suggestions.values()).map(s => s.suggestion));
    return eventId;
  }

  await addTracksToPlaylist(playlist.id, trackUrisNotInPlaylist);
  await acceptSuggestions(eventId, Array.from(suggestions.values()).map(s => s.suggestion));
  return eventId;
}

function* saveEventPlaylistFlow(action: IAction) {
  try {
    const eventId = yield call(saveEventPlaylist, action.payload)
    yield put({ type: SAVE_EVENT_PLAYLIST_SUCCESS })
    yield put({ type: CLEAR_STAGED_SUGGESTIONS })
    yield put({ type: EVENT_FETCH_BY_ID_INITIATED, payload: eventId })
  } catch (err) {
    yield put({ type: SAVE_EVENT_PLAYLIST_ERROR, payload: err })
  }
}

export function* watchSaveEventPlaylist() {
  yield takeEvery(SAVE_EVENT_PLAYLIST, saveEventPlaylistFlow)
}

function moveItemInEventPlaylistFlow(action: IAction) {
  try {
    const { playlist, fromIndex, toIndex } = action.payload
    reOrderPlaylist(playlist, fromIndex, toIndex)
  } catch (err) {
    console.error(err)
  }
}

export function* watchMoveItemInEventPlaylist() {
  yield takeEvery(MOVE_ITEM_IN_EVENT_PLAYLIST, moveItemInEventPlaylistFlow)
}

function sortPlaylistByVotesDescending(
  playlist: IPlaylist,
  votes: Map<string, ITrackVoteStatus>
) {
  const playlistItems = [...playlist.tracks.items]
  playlistItems.sort((a: any, b: any) => {
    let numA = 0
    let numB = 0
    if (votes.has(a.track.uri)) {
      numA = votes.get(a.track.uri)!.numberOfVotes
    }
    if (votes.has(b.track.uri)) {
      numB = votes.get(b.track.uri)!.numberOfVotes
    }
    if (numA < numB) {
      return 1
    }
    if (numA > numB) {
      return -1
    }

    return 0
  })
  return {
    ...playlist,
    tracks: { ...playlist.tracks, items: playlistItems }
  }
}

function* sortPlaylistByVotesDescendingFlow({ payload }: IAction) {
  const { playlist, votes } = payload
  const sortedPlaylist: IPlaylist = sortPlaylistByVotesDescending(
    playlist,
    votes
  )
  const trackIUris = sortedPlaylist.tracks.items.map(
    (p: IPlaylistItem) => p.track.uri
  )
  yield call(replaceTracksInPlaylist, sortedPlaylist.id, trackIUris)
  yield put({
    type: PLAYLIST_SORTED_BY_VOTES_DESCENDING,
    payload: sortedPlaylist
  })
}

export function* watchSortPlaylistByVotesDescending() {
  yield takeEvery(
    SORT_PLAYLIST_BY_VOTES_DESCENDING,
    sortPlaylistByVotesDescendingFlow
  )
}
