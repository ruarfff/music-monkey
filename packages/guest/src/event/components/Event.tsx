import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { cloneDeep, isEmpty } from 'lodash'
import { Moment } from 'moment'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import IAction from '../../IAction'
import LoadingSpinner from '../../loading/LoadingSpinner'
import {
  onGuestUpdate,
  subscribeToPlaylistModified,
  subscribeToSuggestionsModified,
  subscribeToVotesModified,
  unSubscribeToPlaylistModified,
  unSubscribeToSuggestionsModified,
  unSubscribeToVotesModified
} from '../../notification'
import IRsvp from '../../rsvp/IRsvp'
import { ProfileImage } from '../../topbar/ProfileImage'
import IUser from '../../user/IUser'
import useMenuActive from '../../util/useMenuActive'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import IVote from '../../vote/IVote'
import IEvent from '../IEvent'
import IEventGuest from '../IEventGuest'
import './Event.scss'
import EventDetails from './EventDetails'
import EventGuests from './EventGuests'
import EventLocation from './EventLocation'

const React = require('react')
const { useEffect, useState } = React

interface IEventProps {
  user: IUser
  selectedEvent: IEvent
  inviteId: string
  inviteEvent: IEvent
  eventLoading: boolean
  votes: Map<string, ITrackVoteStatus>
  fetchingVotes: boolean
  createVote(vote: IVote): IAction
  deleteVote(voteId: string): IAction
  fetchEventVotes(eventId: string): IAction
  getEvent(eventId: string): IAction
  fetchUsersEvents(): IAction
  fetchOrCreateRsvp(inviteId: string, userId: string, eventId: string): IAction
  updateRsvp(rsvp: IRsvp): IAction
}

const options = ["I'm Going", 'Maybe', "I'm not going"]

export default ({
  user,
  selectedEvent,
  inviteId,
  inviteEvent,
  eventLoading,
  votes,
  fetchingVotes,
  fetchUsersEvents,
  createVote,
  deleteVote,
  fetchEventVotes,
  getEvent,
  fetchOrCreateRsvp,
  updateRsvp,
  match
}: IEventProps & RouteComponentProps<any>) => {
  const eventId = match.params.eventId
  const [tabIndex, setTabIndex] = useState(0)
  const [selected, selectOption] = useState('you going?')
  const [menuLink, handleMenuOpen, handleMenuClose] = useMenuActive()
  const isOpen = Boolean(menuLink)

  useEffect(
    () => {
      if (eventId) {
        onGuestUpdate(eventId, getEvent(eventId))
        fetchUsersEvents()
      }
    },
    [eventId]
  )

  const userRsvp = (selectedEvent && selectedEvent.guests) && selectedEvent.guests
    .filter((guest: IEventGuest) => guest.user.userId === user.userId)[0]

  useEffect(
    () => {
      if (isEmpty(userRsvp) && eventId && !eventLoading) {
        getEvent(eventId)
      }
    }
  )

  const handleTabChange = (e: any, value: any) => {
    setTabIndex(value)
  }

  const handleMenuItemClick = (option: string) => () => {
    const guests = !isEmpty(selectedEvent)
      ? cloneDeep(selectedEvent.guests)
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

  const handleInvite = () => {
    useEffect(
      () => {
        if (
          !isEmpty(inviteEvent) &&
          !isEmpty(inviteId) &&
          eventId === inviteEvent.eventId
        ) {
          fetchOrCreateRsvp(inviteId, user.userId, eventId)
        }
      },
      [eventId]
    )
  }

  const handleSelectEvent = () => {
    useEffect(
      () => {
        getEvent(eventId)
        // TODO: Always getting event as a bit of a hack since event doesn't update in background when not in view.
        /*if (
          (isEmpty(selectedEvent) || selectedEvent.eventId !== eventId) &&
          !eventLoading
        ) {
        }*/
      },
      [eventId]
    )
  }

  const handleVotes = () => {
    useEffect(
      () => {
        if (isEmpty(votes) && !fetchingVotes) {
          fetchEventVotes(eventId)
        }
        subscribeToVotesModified(eventId, () => fetchEventVotes(eventId))

        return function cleanup() {
          unSubscribeToVotesModified(eventId)
        }
      },
      [eventId]
    )
  }

  const handleSuggestions = () => {
    useEffect(
      () => {
        subscribeToSuggestionsModified(eventId, () => getEvent(eventId))
        return function cleanup() {
          unSubscribeToSuggestionsModified(eventId)
        }
      },
      [eventId]
    )
  }

  const handlePlaylist = () => {
    useEffect(
      () => {
        if (!isEmpty(selectedEvent)) {
          subscribeToPlaylistModified(selectedEvent.playlist.id, () => {
            getEvent(eventId)
          })
        }

        return function cleanup() {
          if (!isEmpty(selectedEvent)) {
            unSubscribeToPlaylistModified(selectedEvent.playlist.id)
          }
        }
      },
      [selectedEvent]
    )
  }

  const handleEventResponse = () => {
    useEffect(
      () => {
        if (!isEmpty(selectedEvent) && selected === 'you going?') {
          selectedEvent.guests.map((guest: any) => {
            if (
              guest.rsvp.userId === user.userId &&
              guest.rsvp.status !== 'Pending'
            ) {
              selectOption(guest.rsvp.status)
            }
          })
        }
      },
      [selectedEvent]
    )
  }

  handleInvite()
  handleSelectEvent()
  handleVotes()
  handleSuggestions()
  handlePlaylist()
  handleEventResponse()

  if (isEmpty(selectedEvent)) {
    return <LoadingSpinner />
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

  const times = dateFormat(selectedEvent)

  return (
    <div className="Event-root">
      <div className="Event-header-top-menu">
        <Link to="/">
          <ChevronLeft className="Event-back-arrow" />
        </Link>
      </div>
      <div className="Event-header-container">
        <img className="Event-background" src={selectedEvent.imageUrl} alt="" />
        <div className="Event-img">
          <div className="Event-img-info-block">
            <div className="Event-img-calendar">
              <div className="Event-img-calendar-month">
                {selectedEvent.startDateTime.format('MMM')}
              </div>
              <div className="Event-img-calendar-number">
                {selectedEvent.startDateTime.format('D')}
              </div>
            </div>
            <div className="Event-img-info">
              <div className="Event-img-info-title">
                {selectedEvent.name}
              </div>
              <div className="Event-img-info-location">
                {selectedEvent.description}
              </div>
              <div className="Event-img-info-location">
                <Icon>location_on</Icon>
                {selectedEvent.location.address}
              </div>
            </div>
          </div>
          <div className="Event-img-secondRow">
            <div className="Event-img-organizer-wrapper">
              <span>Organizer</span>
              <div>
                <ProfileImage user={selectedEvent.hostData} />
                <span>{selectedEvent.organizer}</span>
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
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="secondary"
            fullWidth={true}
            classes={{ indicator: 'indicator-color' }}
            className="Event-tabs"
          >
            <Tab icon={<Icon>library_music</Icon>} className="Event-tab" />
            <Tab icon={<Icon>location_on</Icon>} className="Event-tab" />
            <Tab icon={<Icon>account_circle</Icon>} className="Event-tab" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && (
          <Typography component="div">
            <EventDetails
              user={user}
              fetchEventVotes={fetchEventVotes}
              createVote={createVote}
              deleteVote={deleteVote}
              votes={votes}
              event={selectedEvent}
            />
          </Typography>
        )}
        {tabIndex === 1 && (
          <Typography component="div" dir={'1'}>
            <EventLocation event={selectedEvent} />
          </Typography>
        )}
        {tabIndex === 2 && (
          <Typography component="div" dir={'2'}>
            <EventGuests event={selectedEvent} />
          </Typography>
        )}
      </div>
    </div>
  )
}
