import React, { FC } from 'react'
import { List } from '@material-ui/core'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TrackListItem } from './TrackListItem'
import { TrackConfig } from './TrackConfig'
import { Event, Track, TrackVoteStatus, DecoratedSuggestion } from '../'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface TrackListProps {
  tracks: Track[]
  suggestions?: DecoratedSuggestion[]
  votes?: Map<string, TrackVoteStatus>
  event?: Event
  options?: TrackConfig
  filterList?: Track[]
  onVote?(track: Track): void
  onSelected?(track: Track): void
  onDragEnd?(result: any): void
  onRemoved?(track: Track): void
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
  options = { canRemove: false, canRequest: false, canVote: false },
  onVote = (t: Track) => ({} as any),
  onSelected = (t: Track) => ({} as any),
  onDragEnd = (result: any) => ({} as any),
  onRemoved = (track: Track) => ({} as any)
}) => {
  const existingTracks = filterList.map(track => track.uri)

  return (
    <List>
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
                            suggestion={suggestions.find(
                              s => s.track.uri === trackId
                            )}
                            numberOfVotes={numberOfVotes}
                            event={event}
                            currentUserVoted={userVoted}
                            options={options}
                            onSelected={onSelected}
                            onVote={onVote}
                            onRemoved={onRemoved}
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
    </List>
  )
}
