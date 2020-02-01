import React, { FC } from 'react'
import { List } from '@material-ui/core'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Event, Track, TrackVoteStatus, DecoratedSuggestion } from '../'
import { TrackListItem } from './TrackListItem'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface TrackListProps {
  tracks: Track[]
  suggestions?: DecoratedSuggestion[]
  disableRemoveTrack?: boolean
  withSuggestingEnabled?: boolean
  withVoting?: boolean
  votes?: Map<string, TrackVoteStatus>
  event?: Event
  onVote?(track: Track): void
  onTrackSelected?(track: Track): void
  onDragEnd?(result: any): void
  onTrackRemoved?(track: Track): void
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
  withVoting = false,
  votes = new Map(),
  disableRemoveTrack = true,
  withSuggestingEnabled = false,
  event,
  onVote = (t: Track) => ({} as any),
  onTrackSelected = (t: Track) => ({} as any),
  onDragEnd = (result: any) => ({} as any),
  onTrackRemoved = (track: Track) => ({} as any)
}) => (
  <List>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="track-list-droppable">
        {provided => (
          <div ref={provided.innerRef}>
            {tracks.map((track, i) => {
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
                <Draggable key={i} draggableId={trackId + '-' + i} index={i}>
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
                        withVoting={withVoting}
                        currentUserVoted={userVoted}
                        disableRemoveTrack={disableRemoveTrack}
                        numberOfVotes={numberOfVotes}
                        withSuggestingEnabled={withSuggestingEnabled}
                        event={event}
                        onTrackSelected={onTrackSelected}
                        onVote={onVote}
                        onTrackRemoved={onTrackRemoved}
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
