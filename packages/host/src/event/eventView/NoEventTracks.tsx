import React, { FC } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Typography, Grid, Fab } from '@material-ui/core'
import { Link } from 'react-router-dom'
import partyPeople from 'assets/find-tracks.svg'

import './NoEventStuff.scss'

interface NoEventTracksProps {}

const NoEventTracks: FC<NoEventTracksProps> = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="NoEventsStuff-root"
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography align={'center'} variant={'h6'}>
          No tracks. Add some?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className="NoEventsStuff-button">
          <Link to="/finder">
            <Fab
              aria-label="New Party"
              variant="extended"
              color="secondary"
              size="large"
            >
              <AddIcon />
            </Fab>
          </Link>
        </div>
      </Grid>
      <Grid item xs={12}>
        <img
          src={partyPeople}
          alt="Party People"
          className="NoEventsStuff-image"
        />
      </Grid>
    </Grid>
  )
}

export default NoEventTracks
