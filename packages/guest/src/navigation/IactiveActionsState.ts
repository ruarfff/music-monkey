import IEvent from '../event/IEvent'

export default interface IActiveActionsState {
  selectedPage: string
  selectedTab: string
  selectedEvent: IEvent
  showFinderModalEvent: boolean
  showBars: boolean
  firstAuthenticated: boolean
}
