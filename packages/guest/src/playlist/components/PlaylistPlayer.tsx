import {
  Avatar,
  Icon,
  IconButton,
  ListItemText,
  Fab,
  LinearProgress
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import './PlaylistPlayer.scss'
import { findIndex, isEmpty, pull } from 'lodash'
import ITrack from '../../track/ITrack'

interface IPlaylistPlayerProps {
  tracks: ITrack[]
  selectedTrack: ITrack
  selectedTrackVotes: ITrackVoteStatus
  onFavouriteClicked(track: ITrack): void
  onTrackChanged(track: ITrack): void
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
  const numberOfVotes = selectedTrackVotes.numberOfVotes || 0
  const userVoted = selectedTrackVotes.votedByCurrentUser
  const trackIndex = findIndex(tracks, selectedTrack)
  if (time >= 100) {
    setTime(0)
  }

  const randomTrack = () => {
    const filteredTracks: ITrack[] = pull(tracks, selectedTrack)
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
    const audio = document.getElementById('PlayerPlaylist') as HTMLMediaElement
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
    const audio = document.getElementById('PlayerPlaylist') as HTMLMediaElement
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
    <div className="PlayerPlaylist-container">
      <div className="playlist-header-top-menu">
        <Icon>chevron_left</Icon>
      </div>
      <div className="PlayerPlaylist-track-img">
        <div className="PlayerPlaylist-track-img-container">
          <Avatar
            src={selectedTrack.album.images[0].url}
            className="PlayerPlaylist-track-avatar"
          />
          <div className="progress-circle" data-progress={time || 0} />
        </div>
        <ListItemText
          primary={selectedTrack.artists[0].name}
          secondary={selectedTrack.name}
          className="PlayerPlaylist-track-name"
        />
      </div>
      <div className="PlayerPlaylist-control-container">
        <div className="PlayerPlaylist-control-container-flex">
          <div
            className={`PlayerPlaylist-control-white ${loop ? 'active' : ''}`}
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
            className={`PlayerPlaylist-control-white ${random ? 'active' : ''}`}
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
          <div className="PlayerPlaylist-control-white">
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
        <div className="PlayerPlaylist-control-play">
          <Fab
            color="primary"
            className="finder-playlist-header-container-button"
            onClick={onPlay}
          >
            <Icon>{play ? 'pause' : 'play_arrow'}</Icon>
          </Fab>
        </div>
        <div className="PlayerPlaylist-control-container-flex">
          <div className="PlayerPlaylist-control-white">
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
          <div className="PlayerPlaylist-control-white">
            <div
              className="playList-button-favorite"
              style={{ color: userVoted ? 'secondary' : 'primary' }}
            >
              <span className="playList-favorite-count black">
                {' '}
                {numberOfVotes}{' '}
              </span>
              <Icon
                onClick={() => {
                  onFavouriteClicked(selectedTrack)
                }}
                className={`playList-favorite-icon ${
                  userVoted ? '' : 'primary'
                }`}
              >
                favorite
              </Icon>
            </div>
          </div>
        </div>
      </div>
      <div className="player-control-duration">
        <LinearProgress
          className={'TimeLine-progress'}
          variant="determinate"
          value={time}
        />
      </div>
      <div style={{ display: 'none' }}>
        <audio
          id="PlayerPlaylist"
          loop={loop}
          controls={true}
          className="EventSuggestions-audio"
          preload="none"
        >
          <source id="playlist-player-audio-source" src="" />
        </audio>
      </div>
    </div>
  )
}
