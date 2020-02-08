import React, { FC, useState, useEffect } from 'react'
import { List, ListSubheader } from '@material-ui/core'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import isEmpty from 'lodash/isEmpty'
import { TrackListItem } from './TrackListItem'
import { TrackConfig } from './TrackConfig'
import {
  Event,
  Track,
  TrackVoteStatus,
  DecoratedSuggestion,
  formatDuration
} from '../'
import { Suggestion } from 'request'
interface TrackListProps {
  tracks: Track[]
  suggestions?: DecoratedSuggestion[]
  votes?: Map<string, TrackVoteStatus>
  event?: Event
  options?: TrackConfig
  filterList?: Track[]
  onVote?(track: Track): void
  onSelected?(track: Track): void
  onAccept?(suggestion: Suggestion): void
  onDragEnd?(result: any): void
  onRemoved?(track: Track): void
  onReject?(suggestion: Suggestion): void
}

const getItemStyle = (isDragging: any, draggableStyle: any) => {
  if (isDragging) {
    return {
      border: 'solid 1px',
      borderRadius: '6px',
      ...draggableStyle
    }
  } else {
    return { ...draggableStyle }
  }
}

export const TrackList: FC<TrackListProps> = ({
  tracks = [],
  suggestions = [],
  filterList = [],
  votes = new Map(),
  event,
  options = {
    canRemove: false,
    canRequest: false,
    canVote: false,
    showSummary: false,
    allowDragDrop: false
  },
  onVote = (t: Track) => {},
  onSelected = (t: Track) => {},
  onAccept = (s: Suggestion) => {},
  onDragEnd = (result: any) => {},
  onRemoved = (track: Track) => {},
  onReject = (s: Suggestion) => {}
}) => {
  const [nowPlaying, setNowPlaying] = useState()
  const [trackPlaying, setTrackPlaying] = useState(false)
  const [trackTime, setTrackTime] = useState(0)
  const duration = isEmpty(tracks)
    ? 0
    : tracks.map(track => track.duration_ms).reduce((acc, dur) => acc + dur)
  const numTracks = tracks.length
  const existingTracks = filterList.map(track => track.uri)
  useEffect(() => {
    const audio = document.getElementById('TrackList-audio') as HTMLMediaElement
    const timeUpdater = () => {
      const timer = (audio.currentTime * 100) / audio.duration
      setTrackTime(+timer.toFixed(0))
    }
    audio.addEventListener('timeupdate', timeUpdater)

    return () => {
      audio.removeEventListener('timeupdate', timeUpdater)
    }
  }, [])

  const onPlay = (track: Track) => {
    const audio = document.getElementById('TrackList-audio') as HTMLMediaElement
    const audioSource = document.getElementById(
      'TrackList-audio-source'
    ) as HTMLMediaElement
    if (audioSource.src !== track.preview_url) {
      setNowPlaying(track)
      audioSource.src = track.preview_url
      audio.load()
      audio.play()
      setTrackPlaying(true)
    } else {
      if (trackTime === 100) {
        setTrackPlaying(false)
        setTrackTime(0)
      }
      if (!trackPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
      setTrackPlaying(!trackPlaying)
    }
  }

  const handleOnSelect = (track: Track, suggestion: Suggestion) => {
    onSelected(track)
    if (suggestion) {
      onAccept(suggestion)
    }
  }

  const handleRemove = (track: Track, suggestion: Suggestion) => {
    onRemoved(track)
    if (suggestion) {
      onReject(suggestion)
    }
  }

  return (
    <List
      subheader={
        options.showSummary ? (
          <ListSubheader component="div">
            {numTracks} tracks : {formatDuration(duration)}
          </ListSubheader>
        ) : (
          <span />
        )
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="track-list-droppable">
          {provided => (
            <div ref={provided.innerRef}>
              {tracks
                .filter(track => existingTracks.indexOf(track.uri) === -1)
                .map((track, i) => {
                  const trackId = track.uri
                  let numberOfVotes = 0
                  let userVoted = false
                  if (votes && votes.has(trackId)) {
                    const voteStatus: TrackVoteStatus =
                      votes.get(trackId) || ({} as TrackVoteStatus)
                    numberOfVotes = voteStatus.numberOfVotes
                    userVoted = voteStatus.votedByCurrentUser
                  }

                  return (
                    <Draggable
                      key={i}
                      draggableId={trackId + '-' + i}
                      index={i}
                      isDragDisabled={!options.allowDragDrop}
                    >
                      {(draggableProvided, draggableSnapshot) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          style={getItemStyle(
                            draggableSnapshot.isDragging,
                            draggableProvided.draggableProps.style
                          )}
                        >
                          <TrackListItem
                            track={track}
                            onPlay={onPlay}
                            isPlaying={
                              trackPlaying &&
                              nowPlaying &&
                              nowPlaying.uri === track.uri
                            }
                            suggestion={suggestions.find(
                              s => s.track.uri === trackId
                            )}
                            numberOfVotes={numberOfVotes}
                            event={event}
                            currentUserVoted={userVoted}
                            options={options}
                            onSelected={handleOnSelect}
                            onVote={onVote}
                            onRemoved={handleRemove}
                          />
                        </div>
                      )}
                    </Draggable>
                  )
                })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div style={{ display: 'none' }}>
        <audio
          id="TrackList-audio"
          controls={true}
          preload="none"
          crossOrigin="anonymous"
        >
          <source id="TrackList-audio-source" src="" />
        </audio>
      </div>
    </List>
  )
}
