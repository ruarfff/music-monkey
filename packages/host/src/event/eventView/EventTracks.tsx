import React, { FC, useState, useEffect } from 'react'
import { isEmpty, remove } from 'lodash'
import { DropResult } from 'react-beautiful-dnd'
import {
  Event,
  TrackVoteStatus,
  DecoratedSuggestion,
  TrackList,
  useSnackbarAlert,
  getPlaylistTracks,
  Track,
  arrayMove
} from 'mm-shared'
import {
  reOrderPlaylist,
  removeTrackFromPlaylist
} from 'playlist/playlistClient'
import NoEventTracks from './NoEventTracks'
import './EventTracks.scss'

interface EventTracksProps {
  event: Event
  votes: Map<string, TrackVoteStatus>
  suggestions: DecoratedSuggestion[]
}

const EventTracks: FC<EventTracksProps> = ({ event, votes, suggestions }) => {
  const { showSuccess, showError } = useSnackbarAlert()
  const playlist = event.playlist!
  const [tracks, setTracks] = useState([] as Track[])

  useEffect(() => {
    setTracks(getPlaylistTracks(playlist!))
  }, [event, playlist])

  const handleTrackMoved = (from: number, to: number) => {
    const oldTracks = [...tracks]
    if (from !== to) {
      try {
        let reorderedTracks = [...tracks]
        arrayMove(reorderedTracks, from, to)
        setTracks(reorderedTracks)
        reOrderPlaylist(playlist, from, to)
      } catch (err) {
        setTracks(oldTracks)
        showError('Error moving track')
      }
    }
  }

  const handleTrackRemoved = (trackToRemove: Track) => {
    const oldTracks = [...tracks]
    try {
      setTracks(remove(tracks, (track: Track) => track.id !== trackToRemove.id))
      const position = tracks.indexOf(trackToRemove)
      removeTrackFromPlaylist(playlist.id, trackToRemove.uri, position)
      showSuccess('Track removed')
    } catch (err) {
      setTracks(oldTracks)
      showError('Error removing track')
    }
  }

  if (isEmpty(event.playlist) || isEmpty(event.playlist!.tracks.items)) {
    return <NoEventTracks />
  }

  return (
    <div className="EventTracks-root">
      <TrackList
        isHost={true}
        event={event}
        tracks={tracks}
        suggestions={suggestions}
        votes={votes}
        options={{
          showSummary: true,
          allowDragDrop: true,
          canRemove: true,
          canVote: true
        }}
        onDragEnd={(result: DropResult) => {
          if (!result.destination) {
            return
          }
          handleTrackMoved(result.source.index, result.destination.index)
        }}
        onRemoved={(track: Track) => {
          handleTrackRemoved(track)
        }}
      />
    </div>
  )
}

export default EventTracks
