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
import IPlaylistItem from '../IPlaylistItem'
import { findIndex, isEmpty } from 'lodash'

interface IPlaylistPlayerProps {
  playlist: any
  selectedTrack: any
  votes: Map<string, ITrackVoteStatus>
  handleTrackVote(track: any): any
}

export default ({
  playlist,
  selectedTrack,
  votes,
  handleTrackVote
}: IPlaylistPlayerProps) => {
  const [play, setPlay] = useState(false)
  const [time, setTime] = useState(0)
  const [trackNum, setTrackNum] = useState(0)
  const [random, setRandom] = useState(false)
  const [loop, setLoop] = useState(false)
  const tracks =
    playlist.tracks && playlist.tracks.items
      ? playlist.tracks.items.map((item: IPlaylistItem) => item.track)
      : []
  if (!!selectedTrack) {
    const selectedIndex = findIndex(tracks, { id: selectedTrack.id })
    if (trackNum !== selectedIndex) {
      setTrackNum(selectedIndex)
    }
  }
  const currentTrack = tracks[trackNum] || {}
  const voteStatus: ITrackVoteStatus =
    votes.get(currentTrack.uri) || ({} as ITrackVoteStatus)
  const numberOfVotes = voteStatus.numberOfVotes || 0
  const userVoted = voteStatus.votedByCurrentUser

  if (time === 100) {
    setTime(0)
  }

  useEffect(() => {
    const audio = document.getElementById('PlayerPlaylist') as HTMLMediaElement
    if (!!audio) {
      audio.onended = () => {
        if (!loop) {
          if (tracks.length - 1 === trackNum) {
            setTrackNum(0)
          } else {
            setTrackNum(trackNum + 1)
          }
        }
      }

      audio.addEventListener('timeupdate', () => {
        const timer = (audio.currentTime * 100) / audio.duration
        setTime(+timer.toFixed(0))
      })
    }
  }, [loop, trackNum, tracks.length])

  const skip = (next: boolean) => {
    if (random) {
      let rand = 0 + Math.random() * tracks.length
      rand = Math.floor(rand)

      while (trackNum === rand) {
        rand = 0 + Math.random() * tracks.length
        rand = Math.floor(rand)
      }
      setTrackNum(rand)
    } else {
      setTrackNum(
        next
          ? tracks.length - 1 === trackNum
            ? 0
            : trackNum + 1
          : trackNum === 0
          ? tracks.length - 1
          : trackNum - 1
      )
    }
  }

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

  if (isEmpty(currentTrack)) {
    return <span />
  }
  return (
    <div className="PlayerPlaylist-container">
      <div className="playlist-header-top-menu">
        <Icon>chevron_left</Icon>
      </div>
      <div className="PlayerPlaylist-track-img">
        <div className="PlayerPlaylist-track-img-container">
          <Avatar
            src={currentTrack.album.images[0].url}
            className="PlayerPlaylist-track-avatar"
          />
          <div className="progress-circle" data-progress={time || 0} />
        </div>
        <ListItemText
          primary={currentTrack.artists[0].name}
          secondary={currentTrack.name}
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
                skip(false)
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
                skip(true)
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
                  handleTrackVote(currentTrack)
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
          src={currentTrack.preview_url}
          id="PlayerPlaylist"
          loop={loop}
          controls={true}
          className="EventSuggestions-audio"
          preload="none"
        />
      </div>
    </div>
  )
}
