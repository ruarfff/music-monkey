import React, { useState, useEffect } from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import { ProfileImage } from '../../topbar/ProfileImage'
import IEvent from '../IEvent'
import { cloneDeep, isEmpty } from 'lodash'
import IEventGuest from '../IEventGuest'
import { Moment } from 'moment'
import useMenuActive from '../../util/useMenuActive'
import IUser from '../../user/IUser'
import IRsvp from '../../rsvp/IRsvp'
import IAction from '../../IAction'

interface IEventHeaderProps {
  event: IEvent
  user: IUser
  updateRsvp(rsvp: IRsvp): IAction
}

const EventHeader = ({ event, user, updateRsvp }: IEventHeaderProps) => {
  const options = ["I'm Going", 'Maybe', "I'm not going"]
  const [selected, selectOption] = useState('you going?')

  const [menuLink, handleMenuOpen, handleMenuClose] = useMenuActive()
  const isOpen = Boolean(menuLink)

  // handleEventResponse
  useEffect(() => {
    if (!isEmpty(event) && selected === 'you going?') {
      event.guests.forEach((guest: any) => {
        if (
          guest.rsvp.userId === user.userId &&
          guest.rsvp.status !== 'Pending'
        ) {
          selectOption(guest.rsvp.status)
        }
      })
    }
  }, [event, selected, user.userId])

  const handleMenuItemClick = (option: string) => () => {
    const guests = !isEmpty(event)
      ? cloneDeep(event.guests)
      : ([] as IEventGuest[])

    const rsvp = guests.map((guest: IEventGuest) => {
      if (guest.rsvp.userId === user.userId) {
        guest.rsvp.status = option
        return guest.rsvp
      }
      return guest.rsvp
    })

    updateRsvp(rsvp[0])

    handleMenuClose()
    selectOption(option)
  }

  const getEndDateFormat = (startDate: Moment, endDate: Moment) => {
    const message = `${
      startDate.format('DD') === endDate.format('DD') ? 'h:mm a' : 'h:mm a, Do '
    }
     ${startDate.format('MMMM') === endDate.format('MMMM') ? '' : 'MMMM'}`
    return message
  }
  const dateFormat = (event: any) => {
    if (isEmpty(event)) {
      return null
    }
    const { startDateTime, endDateTime } = event
    return `${startDateTime.format('Do MMMM, h:mm a')} to ${endDateTime.format(
      getEndDateFormat(startDateTime, endDateTime)
    )}`
  }

  const times = dateFormat(event)

  return (
    <div className="Event-header-container">
      <img className="Event-background" src={event.imageUrl} alt="" />
      <div className="Event-img">
        <div className="Event-header-top-menu">
          <Link to="/">
            <ChevronLeft className="Event-back-arrow" />
          </Link>
        </div>
        <div className="Event-img-info-block">
          <div className="Event-img-calendar">
            <div className="Event-img-calendar-month">
              {event.startDateTime.format('MMM')}
            </div>
            <div className="Event-img-calendar-number">
              {event.startDateTime.format('D')}
            </div>
          </div>
          <div className="Event-img-info">
            <div className="Event-img-info-title">{event.name}</div>
            <div className="Event-img-info-location">{event.description}</div>
            <div className="Event-img-info-location">
              <Icon>location_on</Icon>
              {event.location.address}
            </div>
          </div>
        </div>
        <div className="Event-img-secondRow">
          <div className="Event-img-organizer-wrapper">
            <span>Organizer</span>
            <div>
              <ProfileImage user={event.hostData} />
              <span>{event.organizer}</span>
            </div>
          </div>

          <Button
            aria-haspopup="true"
            onClick={handleMenuOpen}
            className="Event-response-button"
          >
            {selected}
            <Icon>arrow_drop_down</Icon>
          </Button>
          <Menu
            id="simple-menu"
            open={isOpen}
            anchorEl={menuLink}
            onClose={handleMenuClose}
          >
            {options.map((option, i) => (
              <MenuItem key={i} onClick={handleMenuItemClick(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>

          <div className="Event-times-container">
            <div className="Event-times-container-column">
              <div className="Event-description-title">Times</div>
              <div className="Event-times-container-column-desc">{times}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventHeader