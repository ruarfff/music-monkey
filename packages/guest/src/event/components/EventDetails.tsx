import { Button, Icon, Menu, MenuItem, withStyles, WithStyles } from '@material-ui/core'
import { isEmpty, cloneDeep } from 'lodash'
import { Moment } from 'moment'
import * as React from 'react'
import IEvent from '../IEvent'
import IUser from '../../user/IUser'
import './EventDetails.scss'
import IRsvp from '../../rsvp/IRsvp'
import IAction from '../../IAction'
import { ProfileImage } from '../../topbar/ProfileImage'

const decorate = withStyles((theme) => ({
  eventButton: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '20px',
    fontSize: '11px',
    padding: '0px 12px',
  },
}))

interface IEventDetailsProps {
  event: IEvent
  user: IUser
  updateRsvp(rsvp: IRsvp): IAction
}

const options = [
  'I\'m Going',
  'Maybe',
  'I\'m not going'
]

class EventDetails extends React.PureComponent<IEventDetailsProps & WithStyles> {
  public state = {
    isOpen: false,
    selected: this.props.event.guests.map((guest: any) => {
      if (guest.rsvp.userId === this.props.user.userId) {
        return guest.rsvp.status
      }
    }),
    anchorEl: undefined
  }

  // public componentDidMount() {
  //   this.props.event.guests.map((guest: any) => {
  //     if (guest.rsvp.userId === this.props.user.userId) {
  //       this.setState({
  //         selected: guest.rsvp.status
  //       })
  //     }
  //   })
  // }

  render() {
    const { event, classes, user } = this.props
    const { selected, isOpen, anchorEl } = this.state

    const times = this.dateFormat(event)
    return (
      <div className="EventDetails-root">
        <div className="EventDetails-container">
          <div className="EventDetails-select">
            <Button
              aria-haspopup="true"
              onClick={this.handleToggleMenu}
              className={classes.eventButton}
            >
              {selected}
              <Icon> arrow_drop_down</Icon>
            </Button>
            <Menu
              id="simple-menu"
              open={isOpen}
              anchorEl={anchorEl}
              onClose={this.handleToggleMenu}
            >
              {options.map((option, i) =>
                <MenuItem
                  key={i}
                  onClick={this.handleMenuItemClick(option)}
                >
                  {option}
                </MenuItem>
              )}
            </Menu>
          </div>
          <div>
            <div className="event-organiser-desc-container">
              <div className="event-description-container-column-desc">
                <span className='Event-description-title'>
                  Organizer
                </span><br/>
                <ProfileImage user={user}/>{event.organizer}
              </div>
            </div>
          </div>
        </div>
        {event.description &&
          <div className="event-description-container">
            <div className="Event-description-title">
              Description
            </div>
            <div className="event-description-container-column-desc">
              {event.description}
            </div>
          </div>
        }
        <div className="event-times-container">
          <div className="event-times-container-column">
            <div className="Event-description-title">
              Times
            </div>
            <div className="event-times-container-column-desc">
              {times}
            </div>
          </div>
        </div>
      </div>
    )
  }

  private handleMenuItemClick = (option: string) => () => {
    const { event, user } = this.props
    const guests = cloneDeep(event.guests)
    let rsvp = guests.map((guest) => {
      if (guest.rsvp.userId === user.userId) {
        guest.rsvp.status = option
        return guest.rsvp
      }
      return guest.rsvp
    })

    this.props.updateRsvp(rsvp[0])

    this.setState({
      selected: option,
      isOpen: false,
      anchorEl: undefined
    })
  }

  private handleToggleMenu = (e: any) => {
    this.setState({
      isOpen: !this.state.isOpen,
      anchorEl: e.currentTarget,
    })
  }

  private getEndDateFormat = (startDate: Moment, endDate: Moment) => {
    const message = `${
      startDate.format('DD') === endDate.format('DD') ? 'h:mm a' : 'h:mm a, Do '
      }
     ${startDate.format('MMMM') === endDate.format('MMMM') ? '' : 'MMMM'}`
    return message
  }

  private dateFormat = (event: any) => {
    if (isEmpty(event)) {
      return null
    }
    const { startDateTime, endDateTime } = event
    return `${startDateTime.format('Do MMMM, h:mm a')} to ${endDateTime.format(
      this.getEndDateFormat(startDateTime, endDateTime)
    )}`
  }
}



export default decorate(EventDetails)
