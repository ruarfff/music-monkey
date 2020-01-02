import {
  Avatar,
  Icon,
  IconButton,
  ListItemText,
  Fab,
  LinearProgress
} from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import React, { useEffect, useState } from 'react'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import './PlaylistPlayer.scss'
import { findIndex, isEmpty, pull } from 'lodash'
import { Track } from 'mm-shared'
import { Link } from 'react-router-dom'

interface IPlaylistPlayerProps {
  tracks: Track[]
  selectedTrack: Track
  selectedTrackVotes: ITrackVoteStatus
  onFavouriteClicked(track: Track): void
  onTrackChanged(track: Track): void
}

export default ({
  tracks,
  selectedTrack,
  selectedTrackVotes,
  onFavouriteClicked,
  onTrackChanged
}: IPlaylistPlayerProps) => {
  const [play, setPlay] = useState(false)
  const [time, setTime] = useState(0)
  const [random, setRandom] = useState(false)
  const [loop, setLoop] = useState(false)
  const userVoted = selectedTrackVotes.votedByCurrentUser
  const trackIndex = findIndex(tracks, selectedTrack)
  if (time >= 100) {
    setTime(0)
  }

  const randomTrack = () => {
    const filteredTracks: Track[] = pull(tracks, selectedTrack)
    onTrackChanged(
      filteredTracks[Math.floor(Math.random() * filteredTracks.length)]
    )
  }

  const nextTrack = () => {
    let track = null
    if (trackIndex < tracks.length - 1) {
      track = tracks[trackIndex + 1]
    } else {
      track = tracks[0]
    }
    onTrackChanged(track)
  }

  const previousTrack = () => {
    if (trackIndex > 0) {
      onTrackChanged(tracks[trackIndex - 1])
    } else {
      onTrackChanged(tracks[tracks.length - 1])
    }
  }

  useEffect(() => {
    if (!selectedTrack.preview_url) {
      nextTrack()
      return
    }
    const audio = document.getElementById(
      'playlist-player-audio'
    ) as HTMLMediaElement
    const audioSource = document.getElementById(
      'playlist-player-audio-source'
    ) as HTMLMediaElement

    if (audioSource.src !== selectedTrack.preview_url) {
      audioSource.src = selectedTrack.preview_url
      audio.load()
      if (play) {
        setTime(0)
        audio.play()
      }
    }

    const timeUpdater = () => {
      const timer = (audio.currentTime * 100) / audio.duration
      setTime(+timer.toFixed(0))
    }

    audio.onended = () => {
      if (!loop) {
        nextTrack()
      }
    }

    audio.addEventListener('timeupdate', timeUpdater)

    return () => {
      audio.removeEventListener('timeupdate', timeUpdater)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, onTrackChanged, tracks, tracks.length, selectedTrack])

  const onPlay = () => {
    const audio = document.getElementById(
      'playlist-player-audio'
    ) as HTMLMediaElement
    if (time === 100) {
      setPlay(false)
      setTime(0)
    }
    if (!play) {
      audio.play()
    } else {
      audio.pause()
    }
    setPlay(!play)
  }

  if (isEmpty(selectedTrack)) {
    return <div />
  }
  return (
    <div className="PlaylistPlayer-container">
      <Link to="/playlists" className="PlaylistPlayer-header-top-menu">
        <ChevronLeft className="Playlist-back-arrow" />
      </Link>
      <div className="PlaylistPlayer-track-img">
        <div className="PlaylistPlayer-track-img-container">
          <Avatar
            src={selectedTrack.album.images[0].url}
            className="PlaylistPlayer-track-avatar"
          />
        </div>
        <ListItemText
          primary={selectedTrack.artists[0].name}
          secondary={selectedTrack.name}
          className="PlaylistPlayer-track-name"
        />
      </div>
      <div className="PlaylistPlayer-control-container">
        <div className="PlaylistPlayer-control-container-flex">
          <div
            className={`PlaylistPlayer-control-white ${loop ? 'active' : ''}`}
          >
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                setLoop(!loop)
              }}
              classes={{ disabled: 'disabled' }}
            >
              <Icon>repeat</Icon>
            </IconButton>
          </div>
          <div
            className={`PlaylistPlayer-control-white ${random ? 'active' : ''}`}
          >
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                setRandom(!random)
              }}
              classes={{ disabled: 'disabled' }}
            >
              <Icon>shuffle</Icon>
            </IconButton>
          </div>
          <div className="PlaylistPlayer-control-white">
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                if (random) {
                  randomTrack()
                } else {
                  previousTrack()
                }
              }}
              classes={{ disabled: 'disabled' }}
            >
              <Icon>skip_previous</Icon>
            </IconButton>
          </div>
        </div>
        <div className="PlaylistPlayer-control-play">
          <Fab
            color="primary"
            className="PlaylistPlayer-control-play-button"
            onClick={onPlay}
          >
            <Icon>{play ? 'pause' : 'play_arrow'}</Icon>
          </Fab>
        </div>
        <div className="PlaylistPlayer-control-container-flex">
          <div className="PlaylistPlayer-control-white">
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                if (random) {
                  randomTrack()
                } else {
                  nextTrack()
                }
              }}
              classes={{ disabled: 'disabled' }}
            >
              <Icon>skip_next</Icon>
            </IconButton>
          </div>
          <div
            className={`PlaylistPlayer-control-white ${
              userVoted ? 'active' : ''
            }`}
          >
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                onFavouriteClicked(selectedTrack)
              }}
              classes={{ disabled: 'disabled' }}
            >
              <Icon>favorite</Icon>
            </IconButton>
          </div>
        </div>
      </div>

      <LinearProgress
        className={'PlaylistPlayer-progress'}
        variant="determinate"
        value={time}
      />

      <div style={{ display: 'none' }}>
        <audio
          id="playlist-player-audio"
          loop={loop}
          controls={true}
          preload="none"
        >
          <source id="playlist-player-audio-source" src="" />
        </audio>
      </div>
    </div>
  )
}
