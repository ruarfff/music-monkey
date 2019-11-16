import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import backgroundImg from 'assets/partycover.jpg'
import IUser from 'user/IUser'
import IEvent from 'event/IEvent'
import getPlaylistTracks from 'playlist/getPlaylistTracks'
import SaveEventFormValues from './SaveEventFormValues'

const saveEventInitialFormValues = (
  user: IUser,
  event: IEvent
): SaveEventFormValues => {
  console.log(event)
  const vals = !isEmpty(event)
    ? {
        user,
        eventName: event.name,
        eventDescription: event.description || '',
        organizer: event.organizer,
        tracks: getPlaylistTracks(event.playlist!),
        image: {
          name: 'event.jpg',
          data: null,
          url: event.imageUrl || backgroundImg
        },
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
          dynamicVotingEnabled: true,
          autoAcceptSuggestionsEnabled: true,
          suggestingPlaylistsEnabled: true
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
  console.log(vals)
  return vals
}

export default saveEventInitialFormValues