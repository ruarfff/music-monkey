import React from 'react'
import { Typography } from '@material-ui/core'
import EventSelect from 'event/select/EventSelectContainer'
import './Insights.scss'

const Insights = () => (
  <div className="Insights-root">
    <EventSelect />
    <section className="Insights-content">
      <Typography align={'center'} variant={'h6'}>
        You don't have any insights yet. Once you have been to a few parties you
        will start to see more information here.
      </Typography>
    </section>
  </div>
)

export default Insights
