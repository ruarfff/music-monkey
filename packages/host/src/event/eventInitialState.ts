import moment from 'moment'
import IEventSettings from './IEventSettings'
import IEventState from './IEventState'
import IPlaylist from '../playlist/IPlaylist'

export default {
  errors: {
    location: undefined,
    imageUpload: undefined,
    saving: undefined,
    fetchEvents: undefined
  },
  events: [],
  savingEvent: {
    description: '',
    dataUrl: '',
    eventCode: '',
    imageUrl: '',
    genre: 'None',
    location: { address: '', latLng: { lat: 0, lng: 0 } },
    name: '',
    organizer: '',
    playlistUrl: '',
    startDateTime: moment()
      .utc()
      .add(2, 'hours')
      .startOf('hour'),
    endDateTime: moment()
      .utc()
      .add(3, 'hours')
      .startOf('hour'),
    venue: '',
    invites: [],
    guests: [],
    settings: {} as IEventSettings,
    playlist: {} as IPlaylist
  },
  eventsLoading: false
} as IEventState
