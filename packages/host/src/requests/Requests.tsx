import React, { useEffect } from 'react'
import IEvent from 'event/IEvent'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'
import isEmpty from 'lodash/isEmpty'
import flattenDeep from 'lodash/flattenDeep'
import LoadingSpinner from 'loading/LoadingSpinner'
import ITrack from 'track/ITrack'
import { Paper } from '@material-ui/core'
import IAction from 'IAction'

import './Requests.scss'

interface RequestsProps {
  events: IEvent[]
  eventsLoading: boolean
  getEvents(): IAction
}

const Requests = ({ events, eventsLoading, getEvents }: RequestsProps) => {
  useEffect(() => {
    if (isEmpty(events) && !eventsLoading) {
      getEvents()
    }
  })
  if (eventsLoading) {
    return <LoadingSpinner />
  }
  const popularTracks = sortBy(
    uniqBy(
      flattenDeep<ITrack>(
        events.map(event =>
          event.playlist
            ? event.playlist.tracks.items.map(track => track.track)
            : []
        )
      ),
      'uri'
    ),
    'popularity'
  )
  return (
    <Paper className="Requests-root">
      <div className="listWrapper">
        {popularTracks &&
          popularTracks
            .reverse()
            .slice(0, 10)
            .map((track: ITrack | undefined, i) => {
              return track ? (
                <div key={i} className="listItem">
                  <div className="imgSection">
                    <img
                      alt="track"
                      className="trackImg"
                      src={track.album.images[0].url}
                    />
                  </div>
                  <div className="trackNumber">{i + 1 + '. '}</div>
                  <div className="nameSection">
                    <span>{track.name}</span>
                    <span className="artistName">
                      {track.album.artists[0].name}
                    </span>
                  </div>
                </div>
              ) : (
                <div key={i} />
              )
            })}
      </div>
    </Paper>
  )
}

export default Requests
