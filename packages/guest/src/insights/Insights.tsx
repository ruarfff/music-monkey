import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import EventSelect from 'event/select/EventSelectContainer'
import './Insights.scss'

const Insights = () => (
  <Grid container spacing={2} className="Insights-root">
    <Grid item xs={12}>
      <EventSelect />
    </Grid>
    <Grid item xs={12} className="Insights-content">
      <Typography align={'center'} variant={'h6'}>
        You don't have any insights yet. Once you have been to a few parties you
        will start to see more information here.
      </Typography>
    </Grid>
  </Grid>
)

export default Insights
