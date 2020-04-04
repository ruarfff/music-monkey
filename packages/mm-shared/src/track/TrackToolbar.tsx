import React, { FC } from 'react'
import {
  ListItem,
  ListItemText,
  Typography,
  Grid,
  FormControl,
  FormControlLabel
} from '@material-ui/core'
import { Track } from 'music'
import VoteButtonSmall from './VoteButtonSmall'
import VoteDetails from './VoteDetails'

import './TrackToolbar.scss'

interface TrackToolbarProps {
  track: Track
  voteDetails: VoteDetails
  onVote(track: Track): void
}

const TrackToolbar: FC<TrackToolbarProps> = ({
  track,
  voteDetails,
  onVote
}) => {
  const TrackLikes = () => (
    <Grid container spacing={0}>
      <Grid item xs={6} className="TrackToolbar-vote-icon">
        <FormControl>
          <FormControlLabel
            control={
              <VoteButtonSmall voteDetails={voteDetails} onVote={onVote} />
            }
            label={
              <Typography
                gutterBottom
                variant="subtitle2"
                className="TrackToolbar-vote-label"
              >
                {voteDetails.numberOfVotes} votes
              </Typography>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  )

  return (
    <ListItem className="TrackToolbar-root">
      <ListItemText inset primary={<TrackLikes />} />
    </ListItem>
  )
}

export default TrackToolbar
