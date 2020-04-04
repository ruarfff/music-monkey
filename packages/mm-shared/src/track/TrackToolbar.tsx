import React, { FC } from 'react'
import {
  ListItem,
  ListItemText,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  Box
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { Track } from 'music'
import VoteButtonSmall from './VoteButtonSmall'
import VoteDetails from './VoteDetails'

import './TrackToolbar.scss'
import { TrackConfig } from './TrackConfig'

interface TrackToolbarProps {
  track: Track
  voteDetails: VoteDetails
  options: TrackConfig
  onVote(track: Track): void
}

const TrackToolbar: FC<TrackToolbarProps> = ({
  track,
  voteDetails,
  options = {},
  onVote
}) => {
  const TrackLikes = () => (
    <Grid container spacing={0}>
      <Grid item xs={6} className="TrackToolbar-vote-icon">
        {options.canVote && (
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
        )}
      </Grid>
      <Grid item xs={3}>
        <Box component="fieldset" mb={1} borderColor="transparent">
          <Rating
            name="popularity"
            defaultValue={Math.abs(track.popularity / 20)}
            max={5}
            size="small"
          />
        </Box>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  )

  return (
    <ListItem className="TrackToolbar-root">
      <ListItemText inset primary={<TrackLikes />} />
    </ListItem>
  )
}

export default TrackToolbar
