import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Track, TrackVoteStatus } from 'mm-shared'
import ITrackWithFeatures from './ITrackWithFeatures'
import TrackListItem from './TrackListItem'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface ITrackListProps {
  tracks: Track[]
  tracksWithFeatures?: ITrackWithFeatures[]
  disableRemoveTrack?: boolean
  withVoting?: boolean
  votes?: Map<string, TrackVoteStatus>
  avatar?: string
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

const TrackList = ({
  tracks = [],
  tracksWithFeatures = [],
  withVoting = false,
  votes = new Map(),
  avatar = undefined,
  onVote = (t: Track) => ({} as any),
  onTrackSelected = (t: Track) => ({} as any),
  onDragEnd = (result: any) => ({} as any),
  onTrackRemoved = (track: Track) => ({} as any),
  disableRemoveTrack = false
}: ITrackListProps) => (
  <React.Fragment>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="track-list-droppable">
        {provided => (
          <div ref={provided.innerRef}>
            {tracks.map((track, i) => {
              const trackId = track.uri
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
                      <TrackListItem
                        track={track}
                        tracksWithFeature={tracksWithFeatures[i]}
                        disableRemoveTrack={disableRemoveTrack}
                        withVoting={withVoting}
                        numberOfVotes={numberOfVotes}
                        onTrackSelected={onTrackSelected}
                        onVote={onVote}
                        onTrackRemoved={onTrackRemoved}
                        avatar={avatar}
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
  </React.Fragment>
)

export default TrackList
