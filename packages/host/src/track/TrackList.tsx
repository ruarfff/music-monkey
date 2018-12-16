import * as React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import ITrackVoteStatus from '../vote/ITrackVoteStatus'
import ITrack from './ITrack'
import ITrackWithFeatures from './ITrackWithFeatures'
import TrackListItem from './TrackListItem'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface ITrackListProps {
  tracks: ITrack[]
  tracksWithFeatures?: ITrackWithFeatures[]
  withVoting?: boolean
  votes?: Map<string, ITrackVoteStatus>
  onVote?: ((track: ITrack) => void)
  onTrackSelected?: ((track: ITrack) => void)
  onDragEnd?: ((result: any) => void)
  removeTrack: ((uri: string, position: number) => void)
  showNotification?: (() => void)
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
  onVote = (t: ITrack) => ({} as any),
  onTrackSelected = (t: ITrack) => ({} as any),
  onDragEnd = (result: any) => ({} as any),
  removeTrack = (uri: string, position: number) => ({} as any),
  showNotification = () => ({} as any),
}: ITrackListProps) => (
  <React.Fragment>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="track-list-droppable">
        {provided => (
          <div ref={provided.innerRef}>
            {tracks.map((track, i) => {
              const trackId = track.uri
              let numberOfVotes = 0
              let userVoted = false
              if (votes && votes.has(trackId)) {
                const voteStatus: ITrackVoteStatus =
                  votes.get(trackId) || ({} as ITrackVoteStatus)
                numberOfVotes = voteStatus.numberOfVotes
                userVoted = voteStatus.votedByCurrentUser
              }

              return (
                <Draggable key={i} draggableId={trackId} index={i}>
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
                        tracksWithFeature={tracksWithFeatures[i]}
                        track={track}
                        withVoting={withVoting}
                        currentUserVoted={userVoted}
                        numberOfVotes={numberOfVotes}
                        onTrackSelected={onTrackSelected}
                        onVote={onVote}
                        removeTrack={removeTrack}
                        handleShowNotification={showNotification}
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
