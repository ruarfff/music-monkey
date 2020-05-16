import React, { useState, useEffect } from 'react'
import find from 'lodash/find'
import { Button, MenuItem, MenuProps, Menu } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Action, Event, EventGuest, Rsvp, User } from '../../'
import './EventResponseMenu.scss'

interface IEventResponseMenu {
  event: Event
  user: User
  updateRsvp(rsvp: Rsvp): Action
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem)

const EventResponseMenu = ({ event, user, updateRsvp }: IEventResponseMenu) => {
  const options = ["I'm Going", 'Maybe', "I'm not going"]
  const [selected, selectOption] = useState('You Going?')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const userStatus = event
    ? find(event.guests, (guest) => guest.rsvp.userId === user.userId)
    : ({ rsvp: { status: 'Pending' } } as EventGuest)

  const handleMenuItemClick = (option: string) => {
    if (userStatus) {
      updateRsvp({ ...userStatus.rsvp, status: option })
    }
    selectOption(option)
    handleClose()
  }

  useEffect(() => {
    if (
      userStatus &&
      userStatus.rsvp.status !== 'Pending' &&
      userStatus.rsvp.status !== selected
    ) {
      selectOption(userStatus.rsvp.status)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatus])

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        variant="contained"
        aria-haspopup="true"
        color="secondary"
        onClick={handleClick}
        className="EventResponseMenu-button"
        size="medium"
      >
        {selected}
        <ArrowDropDownIcon />
      </Button>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <StyledMenuItem
            className="EventResponseMenu-menu-item"
            key={option}
            selected={selected === option}
            onClick={() => handleMenuItemClick(option)}
          >
            {option}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  )
}

export default EventResponseMenu
