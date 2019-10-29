import React from 'react'
import IEvent from 'event/IEvent'
import eventIcon from 'assets/date-icon.svg'
import locationIcon from 'assets/location-marker-icon.svg'
import CatalogueCard from './CatalogueCard'

interface EventCardProps {
  event: IEvent
}

const EventCard = ({ event }: EventCardProps) => {
  const descriptionLines = [
    {
      image: eventIcon,
      text: event.startDateTime
        ? event.startDateTime.format('Do MMMM YYYY')
        : ''
    },
    {
      image: locationIcon,
      text: event.location ? event.location.address : ''
    }
  ]

  const cardActions = [
    { link: '/events/' + event.eventId, text: 'GO TO EVENT' }
    // { link: '/events/' + event.eventId + '/edit', text: 'EDIT EVENT' }
  ]
  return (
    <CatalogueCard
      key={event.eventId}
      link={'/events/' + event.eventId}
      imageUrl={event.imageUrl}
      title={event.name}
      descriptionLines={descriptionLines}
      cardActions={cardActions}
    />
  )
}

export default EventCard
