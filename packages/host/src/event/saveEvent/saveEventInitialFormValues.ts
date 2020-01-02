import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import backgroundImage from 'assets/music-monkey.jpg'
import { User } from 'mm-shared'
import { Event } from 'mm-shared'
import getPlaylistTracks from 'playlist/getPlaylistTracks'
import SaveEventFormValues from './SaveEventFormValues'

const saveEventInitialFormValues = (
  user: User,
  event: Event
): SaveEventFormValues => {
  const defaultSettings = {
    dynamicVotingEnabled: false,
    autoAcceptSuggestionsEnabled: false,
    suggestingPlaylistsEnabled: false
  }

  return !isEmpty(event)
    ? {
        user,
        eventName: event.name,
        eventDescription: event.description || '',
        organizer: event.organizer,
        tracks: getPlaylistTracks(event.playlist!),
        imageUrl: event.imageUrl || backgroundImage,
        genre: event.genre,
        location: event.location,
        settings: event.settings || defaultSettings,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime
      }
    : {
        user,
        eventName: '',
        eventDescription: '',
        organizer: user.displayName,
        tracks: undefined,
        imageUrl: backgroundImage,
        genre: 'none',
        location: { address: 'Nowhere', latLng: { lat: 0, lng: 0 } },
        settings: defaultSettings,
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

export default saveEventInitialFormValues
