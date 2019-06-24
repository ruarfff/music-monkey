import { Icon } from '@material-ui/core'
import { debounce } from 'lodash'
import * as React from 'react'
import IAction from '../IAction'
import ITrack from '../track/ITrack'

import './Search.scss'

const WAIT_INTERVAL = 200

interface ISearchProps {
  tracks: ITrack[]
  clearSearch(): IAction
  searchTracks(searchTerm: string): IAction
}

interface ISearchState {
  searchTerm: string
  anchorEl: any
}

export default class Search extends React.Component<
  ISearchProps,
  ISearchState
> {
  private timer: any = debounce(() => this.triggerChange(), WAIT_INTERVAL)

  constructor(props: any) {
    super(props)

    this.state = {
      searchTerm: '',
      anchorEl: null
    }
  }

  public render() {
    return (
      <div className="Search-root">
        <div className="Search-block">
          <Icon className="Search-icon"> search</Icon>
          <input
            placeholder="Search for Tracks"
            className="Search-input"
            onChange={this.handleSearchChange}
          />
        </div>
      </div>
    )
  }

  private handleSearchChange = (elem: any) => {
    this.handleChange(elem.target.value)
  }

  private onSuggestionsClearRequested = () => {
    this.setState({ searchTerm: '' })
    this.props.clearSearch()
  }

  private handleChange = (searchTerm: string) => {
    if (!searchTerm.length) {
      this.props.clearSearch()
      this.onSuggestionsClearRequested()
    } else {
      this.setState({ searchTerm })

      this.timer()
    }
  }

  private triggerChange = () => {
    const { searchTerm } = this.state
    this.props.searchTracks(searchTerm)
  }
}
