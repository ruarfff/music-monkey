import React, { FunctionComponent } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Track, TrackVoteStatus } from 'mm-shared'
import SuggestionListItem from './SuggestionListItem'
import IDecoratedSuggestion from './IDecoratedSuggestion'

interface SuggestionListProps {
  suggestions: IDecoratedSuggestion[]
  withVoting?: boolean
  votes?: Map<string, TrackVoteStatus>
  disableRemoveTrack?: boolean
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

const SuggestionList: FunctionComponent<SuggestionListProps> = ({
  suggestions = [],
  withVoting = false,
  votes = new Map(),
  disableRemoveTrack = false,
  onVote = (t: Track) => ({} as any),
  onTrackSelected = (t: Track) => ({} as any),
  onDragEnd = (result: any) => ({} as any),
  onTrackRemoved = (track: Track) => ({} as any)
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="suggestion-list-droppable">
      {provided => (
        <div ref={provided.innerRef}>
          {suggestions.map((suggestion, i) => {
            const trackId = suggestion.track.uri
            let numberOfVotes = 0
            if (votes && votes.has(trackId)) {
              const voteStatus: TrackVoteStatus =
                votes.get(trackId) || ({} as TrackVoteStatus)
              numberOfVotes = voteStatus.numberOfVotes
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
                    <SuggestionListItem
                      suggestion={suggestion}
                      disableRemoveTrack={disableRemoveTrack}
                      withVoting={withVoting}
                      numberOfVotes={numberOfVotes}
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
)

export default SuggestionList
