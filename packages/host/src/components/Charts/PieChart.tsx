import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import _ from 'lodash'
import * as React from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import IEvent from 'event/IEvent'
import IAction from 'IAction'
import IRsvp from 'rsvp/IRsvp'

const decorate = withStyles(() => ({
  title: {
    fontSize: '20px',
    padding: '10px'
  }
}))

interface IPieChartWidgetProps {
  events: IEvent[]
  pickedEvent: string
  filterByEventPick(id: any): IAction
}

class PieChartWidget extends React.Component<
  IPieChartWidgetProps & WithStyles
> {
  public state = {
    anchorEl: null,
    pickedEventName: 'All'
  }

  public handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleClose = (event: IEvent) => () => {
    this.setState({
      anchorEl: null,
      pickedEventName: event.name || event.eventId
    })
    this.props.filterByEventPick(event.eventId)
  }

  public render() {
    const { anchorEl } = this.state
    const COLORS = ['#0088FE', '#00C49F', '#FF8042', '#FFBB28']
    const { events, pickedEvent, classes } = this.props
    const data = this.guestsPieData(pickedEvent)

    return (
      <Paper>
        <div>
          <Button
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            Event: {this.state.pickedEventName}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose({ eventId: 'all' } as IEvent)}
          >
            <MenuItem onClick={this.handleClose({ eventId: 'all' } as IEvent)}>
              All
            </MenuItem>
            {events.map(
              (event, i) =>
                event.eventId && (
                  <MenuItem key={i} onClick={this.handleClose(event)}>
                    {event.name}
                  </MenuItem>
                )
            )}
          </Menu>
        </div>
        <Typography className={classes.title}>Guest statistic</Typography>
        <PieChart width={500} height={250}>
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

  private guestsPieData = (eventId: string) => {
    const { events } = this.props
    const selectedEvent =
      eventId !== 'all'
        ? events.filter(event => event.eventId === eventId)
        : events

    const allGuests = _.flattenDeep<IRsvp>(
      selectedEvent
        .filter(event => event.guests && event.guests.length > 0)
        .map(event => event.guests && event.guests.map(guest => guest.rsvp))
    )

    const pendingGuest = allGuests.filter(
      (guest: IRsvp | undefined) => guest && guest.status === 'Pending'
    )
    const goingGuest = allGuests.filter(
      (guest: IRsvp | undefined) => guest && guest.status === "I'm Going"
    )
    const notGoingGuest = allGuests.filter(
      (guest: IRsvp | undefined) => guest && guest.status === "I'm not going"
    )
    const maybeGuest = allGuests.filter(
      (guest: IRsvp | undefined) => guest && guest.status === 'Maybe'
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
}

export default decorate(PieChartWidget)
