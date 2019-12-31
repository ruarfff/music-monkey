import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import ITrackVoteStatus from 'vote/ITrackVoteStatus'
import ITrack from 'track/ITrack'
import SuggestionListItem from './SuggestionListItem'
import IDecoratedSuggestion from './IDecoratedSuggestion'

interface SuggestionListProps {
  suggestions: IDecoratedSuggestion[]
  withVoting?: boolean
  votes?: Map<string, ITrackVoteStatus>
  disableRemoveTrack?: boolean
  onVote?(track: ITrack): void
  onTrackSelected?(track: ITrack): void
  onDragEnd?(result: any): void
  onTrackRemoved?(track: ITrack): void
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

const SuggestionList = ({
  suggestions = [],
  withVoting = false,
  votes = new Map(),
  disableRemoveTrack = false,
  onVote = (t: ITrack) => ({} as any),
  onTrackSelected = (t: ITrack) => ({} as any),
  onDragEnd = (result: any) => ({} as any),
  onTrackRemoved = (track: ITrack) => ({} as any)
}: SuggestionListProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="suggestion-list-droppable">
      {provided => (
        <div ref={provided.innerRef}>
          {suggestions.map((suggestion, i) => {
            const trackId = suggestion.track.uri
            let numberOfVotes = 0
            if (votes && votes.has(trackId)) {
              const voteStatus: ITrackVoteStatus =
                votes.get(trackId) || ({} as ITrackVoteStatus)
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
