import React from 'react'
import Avatar from '@material-ui/core/Avatar/Avatar'
import { AccountCircle } from '@material-ui/icons'
import { flattenDeep, uniqBy } from 'lodash'
import IEvent from 'event/IEvent'
import IEventGuest from 'event/IEventGuest'

interface IMyGuestsProps {
  events: IEvent[]
}

const renderGuests = (guest: IEventGuest, key: number) => {
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
  const guests: IEventGuest[] = flattenDeep<IEventGuest>(
    events.map(event => event.guests || [])
  )

  // TODO: We should guarantee uniqueness from api
  const uniqueGuests: IEventGuest[] = uniqBy<IEventGuest>(guests, 'userId')

  return (
    <div className="MyGuests-root">
      {uniqueGuests.length > 0 ? (
        uniqueGuests.map((guest: IEventGuest, key: number) => {
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
