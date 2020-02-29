import React, { FC } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Typography, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
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
      spacing={8}
    >
      <Grid item xs={12}>
        <Typography align={'center'} variant={'h6'}>
          It looks like you don't have any {status && status + ' '}parties yet
          :( <Link to="/create-event">Create one?</Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <img src={partyPeople} alt="Party People" className="NoEvents-image" />
      </Grid>
      <Grid item xs={12}>
        <div className="NoEvents-button">
          <Link to="/create-event">
            <AddIcon color="secondary" style={{ fontSize: 100 }} />
          </Link>
        </div>
      </Grid>
    </Grid>
  )
}

export default NoEvents
