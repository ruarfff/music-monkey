import React, { FC } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import flattenDeep from 'lodash/flattenDeep'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import isEmpty from 'lodash/isEmpty'
import { Event, Rsvp } from 'mm-shared'

interface PieChartWidgetProps {
  events: Event[]
  event: Event
}

const PieChartWidget: FC<PieChartWidgetProps> = ({ events }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FF8042', '#FFBB28']
  const data = guestsPieData(events)

  return (
    <Paper>
      <Typography>Guest statistic</Typography>
      <PieChart width={300} height={250}>
        <Pie data={data} dataKey={'value'} innerRadius={60} outerRadius={80}>
          {data.map((entry: any, index: number) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" align="center" height={36} />
        <Tooltip />
      </PieChart>
    </Paper>
  )
}

function guestsPieData(events: Event[]) {
  const allGuests = flattenDeep<Rsvp>(
    events
      .filter(event => !isEmpty(event.guests))
      .map(event => (event.guests || []).map(guest => guest.rsvp))
  )

  const pendingGuest = allGuests.filter(
    (guest: Rsvp | undefined) => guest && guest.status === 'Pending'
  )
  const goingGuest = allGuests.filter(
    (guest: Rsvp | undefined) => guest && guest.status === "I'm Going"
  )
  const notGoingGuest = allGuests.filter(
    (guest: Rsvp | undefined) => guest && guest.status === "I'm not going"
  )
  const maybeGuest = allGuests.filter(
    (guest: Rsvp | undefined) => guest && guest.status === 'Maybe'
  )

  return [
    {
      value: pendingGuest.length,
      name: 'Pending'
    },
    {
      value: goingGuest.length,
      name: 'Going'
    },
    {
      value: notGoingGuest.length,
      name: 'Not going'
    },
    {
      value: maybeGuest.length,
      name: 'Maybe'
    }
  ]
}

export default PieChartWidget
