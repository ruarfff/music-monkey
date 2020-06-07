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
  arrayMove,
  EventSettings,
  Suggestion
} from 'mm-shared'
import {
  reOrderPlaylist,
  removeTrackFromPlaylist
} from 'playlist/playlistClient'
import { updateEvent } from 'event/eventClient'
import NoEventTracks from './NoEventTracks'
import './EventTracks.scss'

interface EventTracksProps {
  event: Event
  votes: Map<string, TrackVoteStatus>
  suggestions: DecoratedSuggestion[]
  acceptedTracks: string[]
  onReject(request: Suggestion): any
}

const EventTracks: FC<EventTracksProps> = ({
  event,
  votes,
  suggestions,
  acceptedTracks = [],
  onReject
}) => {
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

  const handleSettingsUpdate = async (settings: EventSettings) => {
    try {
      await updateEvent({ ...event, settings })
      showSuccess('Setting changed')
    } catch (err) {
      showError('Error updating setting')
    }
  }

  if (isEmpty(tracks)) {
    return <NoEventTracks />
  }

  return (
    <TrackList
      isHost={true}
      event={event}
      tracks={tracks}
      showSettings={true}
      suggestions={suggestions}
      tracksToHighlight={acceptedTracks}
      votes={votes}
      options={{
        showSummary: true,
        allowDragDrop: true,
        canRemove: true,
        canVote: true,
        showProfile: true,
        deleteSecondary: true
      }}
      onSettingsUpdated={handleSettingsUpdate}
      onDragEnd={(result: DropResult) => {
        if (!result.destination) {
          return
        }
        handleTrackMoved(result.source.index, result.destination.index)
      }}
      onRemoved={(track: Track) => {
        handleTrackRemoved(track)
      }}
      onReject={onReject}
    />
  )
}

export default EventTracks
