import React, { FC } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Typography, Grid, Fab } from '@material-ui/core'
import { Link } from 'react-router-dom'
import partyPeople from '../assets/find-tracks.svg'

import './NoMaybeTracks.scss'

interface NoMaybeTracksProps {
  isHost: boolean
}

const NoMaybeTracks: FC<NoMaybeTracksProps> = ({ isHost }) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="NoMaybeTracks-root"
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography align={'center'} variant={'h6'}>
          No requests right now. {!isHost && 'Make some-?'}
        </Typography>
      </Grid>
      {!isHost && (
        <Grid item xs={12}>
          <div className="NoMaybeTracks-button">
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
      )}
      <Grid item xs={12}>
        <img
          src={partyPeople}
          alt="Party People"
          className="NoMaybeTracks-image"
        />
      </Grid>
    </Grid>
  )
}

export default NoMaybeTracks
