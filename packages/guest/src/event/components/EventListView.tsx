import { Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import IAction from '../../IAction'
import LoadingSpinner from '../../loading/LoadingSpinner'
import IPlaylist from '../../playlist/IPlaylist'
import IUser from '../../user/IUser'
import IEvent from '../IEvent'
import EventList from './EventList'
import './EventListView.scss'

const React = require('react')

interface IEventListViewProps {
  user: IUser
  events: IEvent[]
  eventsLoading: boolean
  selectedEvent: IEvent
  selectPage(value: string): IAction
  selectEvent(event: IEvent): IAction
  selectPlaylist(playlist: IPlaylist): IAction
  fetchUsersEvents(): IAction
}

const EventListView = ({
  events,
  selectedEvent,
  eventsLoading,
  selectPlaylist,
  selectEvent,
  fetchUsersEvents,
}: IEventListViewProps) => {
  React.useEffect(() => {

    const shouldFetchEvent = !events.filter((event) =>
      !isEmpty(selectedEvent) && event.eventId === selectedEvent.eventId
    ).length
    if (!isEmpty(selectedEvent) && selectedEvent.eventId && shouldFetchEvent) {
      fetchUsersEvents()
    }
  }, [])

  if (eventsLoading) {
    return <LoadingSpinner />
  }

  if (isEmpty(events)) {
    return (
      <div>
        <Typography align={'center'} variant={'h6'}>
          It looks like you don't have any events yet :(
        </Typography>
      </div>
    )
  }

  return (
    <div>
      <EventList
        selectPlaylist={selectPlaylist}
        selectEvent={selectEvent}
        events={events}
      />
    </div>
  )
}

export default EventListView
