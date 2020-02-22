import React, { FC } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Typography, Grid, Fab } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import partyPeople from 'assets/party-people.svg'

import './NoEvents.scss'

interface NoEventsProps {
  status?: string
}

const NoEvents: FC<NoEventsProps> = ({ status = '' }) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="NoEvents-root"
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography align={'center'} variant={'h6'}>
          It looks like you don't have any {status && status + ' '}events yet :({' '}
          <Link to="/create-event">Create one?</Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className="NoEvents-button">
          <Link to="/create-event">
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
        <Img
          src={[partyPeople]}
          alt="Party People"
          className="NoEvents-image"
        ></Img>
      </Grid>
    </Grid>
  )
}

export default NoEvents
