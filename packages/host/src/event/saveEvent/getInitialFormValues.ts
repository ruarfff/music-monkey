import moment from 'moment'
import IUser from 'user/IUser'
import IEvent from 'event/IEvent'
import backgroundImg from 'assets/partycover.jpg'

const getInitialFormValues = (
  user: IUser,
  event: IEvent,
  isEditing: boolean
) => {
  return isEditing && !!event
    ? {
        user,
        eventName: event.name,
        eventDescription: event.description,
        organizer: event.organizer,
        tracks: undefined,
        image: { name: 'event.jpg', data: null, url: event.imageUrl },
        genre: event.genre,
        location: event.location,
        settings: event.settings,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime
      }
    : {
        user,
        eventName: '',
        eventDescription: '',
        organizer: user.displayName,
        tracks: undefined,
        image: { name: 'event.jpg', data: null, url: backgroundImg },
        genre: 'none',
        location: { address: 'Nowhere', latLng: { lat: 0, lng: 0 } },
        settings: {
          dynamicVotingEnabled: false,
          autoAcceptSuggestionsEnabled: false,
          suggestingPlaylistsEnabled: false
        },
        startDateTime: moment()
          .utc()
          .add(2, 'hours')
          .startOf('hour'),
        endDateTime: moment()
          .utc()
          .add(3, 'hours')
          .startOf('hour')
      }
}

export default getInitialFormValues
