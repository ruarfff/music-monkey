import React, { FC, useState, useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import FavouriteIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIconFill from '@material-ui/icons/Favorite'
import { Badge } from '@material-ui/core'
import { Track } from 'music'
import VoteDetails from './VoteDetails'

import './VoteButtonSmall.scss'

interface VoteButtonSmallProps {
  voteDetails: VoteDetails
  onVote(track: Track): void
}
const VoteButtonSmall: FC<VoteButtonSmallProps> = ({ voteDetails, onVote }) => {
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
    <div onClick={handleTrackVote} className="VoteButtonSmall-root">
      {vote.currentUserVoted ? (
        <Badge badgeContent={vote.numberOfVotes} className="current-user">
          <FavoriteIconFill color="primary" fontSize="small" />
        </Badge>
      ) : (
        <Badge badgeContent={vote.numberOfVotes}>
          <FavouriteIcon fontSize="small" />
        </Badge>
      )}
    </div>
  )
}

export default VoteButtonSmall
