import React, { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import EventSelect from 'event/select/EventSelectContainer'
import PieChartWidget from './PieChart'
import MostPopularTracks from 'insights/MostPopularTracks'
import { Event } from 'mm-shared'
import './Insights.scss'

interface InsightsProps {
  event: Event
  events: Event[]
}

const Insights: FC<InsightsProps> = ({ event, events }) => {
  return (
    <Grid container spacing={2} className="Insights-root">
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item={true} xs={12}>
        <MostPopularTracks events={events} />
      </Grid>
      <Grid item={true} xs={12}>
        <PieChartWidget event={event} events={events} />
      </Grid>
    </Grid>
  )
}

export default Insights
