import React, { FC } from 'react'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import EditIcon from '@material-ui/icons/Edit'
import { RouteComponentProps, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Event } from 'event'
import './EventTopMenu.scss'

interface EventTopMenuProps extends RouteComponentProps<any> {
  isHost?: boolean
  event: Event
  backTo?: string
}

const EventTopMenu: FC<EventTopMenuProps> = ({
  isHost,
  event,
  backTo,
  history
}) => {
  return (
    <div className="EventTopMenu-root">
      <ChevronLeft
        className="EventTopMenu-back-arrow"
        onClick={() => {
          if (backTo) {
            history.push(backTo)
          } else {
            history.goBack()
          }
        }}
      />
      {isHost && (
        <Link to={`/events/${event.eventId}/edit`}>
          <EditIcon className="EventTopMenu-edit" />
        </Link>
      )}
    </div>
  )
}

export default withRouter(EventTopMenu)
