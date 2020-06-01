import IPlaylistState from './IPlaylistState'

export default {
  data: {
    items: [],
    href: '',
    next: '',
    previous: '',
    limit: 20,
    offset: 0,
    total: 0
  },
  error: {} as Error,
  isLoading: false
} as IPlaylistState
