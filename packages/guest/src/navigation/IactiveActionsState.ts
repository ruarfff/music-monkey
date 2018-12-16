import IEvent from '../event/IEvent'
import IPlaylist from '../playlist/IPlaylist'

export default interface IActiveActionsState {
  selectedPage: string
  selectedTab: string
  selectedEvent: IEvent
  selectedPlayList: IPlaylist
  showFinderModalEvent: boolean
  showBars: boolean
  firstAuthenticated: boolean
  showSpinner: boolean
}
