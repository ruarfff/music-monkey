import React from 'react'
import Avatar from '@material-ui/core/Avatar/Avatar'
import { AccountCircle } from '@material-ui/icons'
import { flattenDeep, uniqBy } from 'lodash'
import { Event } from 'mm-shared'
import { EventGuest } from 'mm-shared'

interface IMyGuestsProps {
  events: Event[]
}

const renderGuests = (guest: EventGuest, key: number) => {
  return (
    <div key={key} className="guest">
      {guest.user.image && (
        <Avatar alt={guest.user.displayName} src={guest.user.image} />
      )}
      {!guest.user.image && <AccountCircle />}
      <div>{guest.user.displayName}</div>
    </div>
  )
}

export default ({ events }: IMyGuestsProps) => {
  const guests: EventGuest[] = flattenDeep<EventGuest>(
    events.map(event => event.guests || [])
  )

  // TODO: We should guarantee uniqueness from api
  const uniqueGuests: EventGuest[] = uniqBy<EventGuest>(guests, 'userId')

  return (
    <div className="MyGuests-root">
      {uniqueGuests.length > 0 ? (
        uniqueGuests.map((guest: EventGuest, key: number) => {
          if (guest) {
            return renderGuests(guest, key)
          } else {
            return null
          }
        })
      ) : (
        <h3>You don't have any guests</h3>
      )}
    </div>
  )
}
