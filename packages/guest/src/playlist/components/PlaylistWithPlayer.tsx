import * as React from 'react'
import IPlaylist from '../IPlaylist';
import { isEmpty } from 'lodash'
import { Icon, ListItemText, Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { formatDuration } from '../../util/formatDuration'

interface IPlaylistWithPlayerProps {
playlist: IPlaylist
onPlayerClicked: (() => void)
}


export default ({playlist, onPlayerClicked}: IPlaylistWithPlayerProps) => {
    let durationSeconds = 0
    if (
      !isEmpty(playlist) &&
      playlist.tracks.items.length > 0
    ) {
      durationSeconds = playlist.tracks.items
        .map(item => item.track.duration_ms)
        .reduce((acc, dur) => acc + dur)
    }

    return (
      <div className="playlist-header">
        <div className="playlist-header-top-menu">
          <Link to={'/playlists'}>
            <Icon>chevron_left</Icon>
          </Link>
        </div>
        <div className="playlist-content">
          <div className="playlist-content-img">
            <img
              alt="playlist"
              src={
                (playlist.images.length > 0 &&
                  playlist.images[0].url) ||
                ''
              }
            />
          </div>
          <div className="playlist-content-title-block">
            <ListItemText
              className="playlist-content-title"
              primary={playlist.name}
            />
            <div className="playlist-content-title-length">
              <div>
                <span className="playlist-content-title-songs">
                  {`Total time: ${formatDuration(durationSeconds)}`}
                </span>
                <br />
                <span className="playlist-content-title-songs">
                  {`${playlist.tracks &&
                    playlist.tracks.total} Songs`}
                </span>
              </div>

              <Fab
                color="primary"
                className="finder-playlist-header-container-button"
                onClick={onPlayerClicked}
              >
                <Icon>{'play_arrow'}</Icon>
              </Fab>
            </div>
          </div>
        </div>
      </div>
    )
}
