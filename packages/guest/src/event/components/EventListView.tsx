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
  selectPage(value: string): IAction
  selectEvent(event: IEvent): IAction
  selectPlaylist(playlist: IPlaylist): IAction
  getEvent(eventId: string): IAction
}

const EventListView = ({
  events,
  eventsLoading,
  selectPlaylist,
  selectEvent
}: IEventListViewProps) => {
  if (eventsLoading || isEmpty(events)) {
    return <LoadingSpinner />
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
