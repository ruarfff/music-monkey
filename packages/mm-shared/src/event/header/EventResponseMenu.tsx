import React, { useState, useRef } from 'react'
import find from 'lodash/find'
import { Button, MenuItem } from '@material-ui/core'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Action, Event, EventGuest, Rsvp, User } from '../../'
import './EventResponseMenu.scss'

interface IEventResponseMenu {
  event: Event
  user: User
  updateRsvp(rsvp: Rsvp): Action
}

const EventResponseMenu = ({ event, user, updateRsvp }: IEventResponseMenu) => {
  const options = ["I'm Going", 'Maybe', "I'm not going"]
  const [selected, selectOption] = useState('You Going?')
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const userStatus = event
    ? find(event.guests, guest => guest.rsvp.userId === user.userId)
    : ({ rsvp: { status: 'Pending' } } as EventGuest)

  function handleToggle() {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: any) => {
    if (
      anchorRef &&
      (anchorRef.current || ({} as any)).contains(event.target)
    ) {
      return
    }

    setOpen(false)
  }

  const handleMenuItemClick = (option: string) => {
    if (userStatus) {
      updateRsvp({ ...userStatus.rsvp, status: option })
    }

    setOpen(false)
    selectOption(option)
  }

  if (
    userStatus &&
    userStatus.rsvp.status !== 'Pending' &&
    userStatus.rsvp.status !== selected
  ) {
    selectOption(userStatus.rsvp.status)
  }

  return (
    <div>
      <span ref={anchorRef}>
        <Button
          variant="contained"
          aria-haspopup="true"
          color="secondary"
          onClick={handleToggle}
          className="EventResponseMenu-button"
        >
          {selected}
          <ArrowDropDownIcon />
        </Button>
      </span>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper id="event-response-menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options.map(option => (
                    <MenuItem
                      key={option}
                      selected={selected === option}
                      onClick={() => handleMenuItemClick(option)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default EventResponseMenu
