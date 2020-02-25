import React, { FC } from 'react'
import { Typography, Grid } from '@material-ui/core'
import partyPeople from 'assets/undraw_missed_chances.svg'

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
          It looks like you don't have any {status && status + ' '}parties yet
          :(
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <img src={partyPeople} alt="Party People" className="NoEvents-image" />
      </Grid>
    </Grid>
  )
}

export default NoEvents
