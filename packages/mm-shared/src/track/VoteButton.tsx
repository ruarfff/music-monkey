import React, { FC, useState, useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIconFill from '@material-ui/icons/Favorite'
import { Track } from 'music'
import { Badge } from '@material-ui/core'

import './VoteButton.scss'

interface VoteDetails {
  isHost: boolean
  currentUserVoted: boolean
  numberOfVotes: number
  track: Track
}

interface VoteButtonProps {
  voteDetails: VoteDetails
  onVote(track: Track): void
}
const VoteButton: FC<VoteButtonProps> = ({ voteDetails, onVote }) => {
  const [vote, setVote] = useState<VoteDetails>({
    currentUserVoted: false,
    numberOfVotes: 0,
    isHost: false,
    track: {} as Track
  })

  useEffect(() => {
    if (!isEqual(vote, voteDetails)) {
      setVote(voteDetails)
    }
  }, [vote, voteDetails])

  const handleTrackVote = () => {
    if (!vote.isHost) {
      setVote({
        isHost: vote.isHost,
        track: vote.track,
        currentUserVoted: !vote.currentUserVoted,
        numberOfVotes: vote.currentUserVoted
          ? vote.numberOfVotes - 1
          : vote.numberOfVotes + 1
      })
      const doVote = async () => {
        onVote(vote.track)
      }

      doVote()
    }
  }

  return (
    <div onClick={handleTrackVote} className="VoteButton-root">
      {vote.currentUserVoted ? (
        <Badge badgeContent={vote.numberOfVotes} className="current-user">
          <FavoriteIconFill color="primary" fontSize="large" />
        </Badge>
      ) : (
        <Badge badgeContent={vote.numberOfVotes}>
          <FavouriteIcon fontSize="large" />
        </Badge>
      )}
    </div>
  )
}

export default VoteButton
