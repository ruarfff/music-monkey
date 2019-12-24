import moment from 'moment'
import IEventSettings from 'event/IEventSettings'
import IEventState from 'event/IEventState'

export default {
  errors: {
    location: undefined,
    imageUpload: undefined,
    saving: undefined,
    fetchEvents: undefined,
    playlistCreation: undefined
  },
  events: [],
  createEventStep: 0,
  event: {
    description: '',
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
    settings: {} as IEventSettings
  },
  eventsLoading: false,
  showSavedDialogue: false,
  playlistReselected: false,
  shareEventMessage: '',
  playlistInput: '',
  loading: false,
  fetchError: {} as Error,
  copiedToClipboard: false,
  pendingSuggestions: [],
  rejectedSuggestions: [],
  savingEventPlaylist: false
} as IEventState
