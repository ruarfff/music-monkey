import { isEmpty } from 'lodash'
import IAction from '../../IAction'
import LoadingSpinner from '../../loading/LoadingSpinnerContainer'
import IUser from '../../user/IUser'
import IEvent from '../IEvent'
import EventList from './EventList'
import './EventListView.scss'
import IPlaylist from '../../playlist/IPlaylist'


const React = require('react')

interface IEventListViewProps {
  user: IUser
  events: IEvent[]
  eventsLoading: boolean
  selectPage(value: string): IAction
  selectEvent(event: IEvent): IAction
  selectPlaylist(playlist: IPlaylist): IAction
  showSpinner(value: boolean): IAction
  getEvent(eventId: string): IAction
}

const EventListView = ({ events, eventsLoading, selectPlaylist, selectEvent }: IEventListViewProps) => {
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
