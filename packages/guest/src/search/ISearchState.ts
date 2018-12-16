import ITrack from "../track/ITrack";

export default interface ISearchState {
  tracks: ITrack[],
  searching: boolean
}
