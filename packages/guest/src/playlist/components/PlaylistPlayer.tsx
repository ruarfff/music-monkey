import {
  Avatar,
  Button,
  Icon,
  IconButton,
  ListItemText
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import './PlaylistPlayer.scss'

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
  const track = playlist.tracks ? playlist.tracks.items[0].track : {}
  const tracks = playlist.tracks
    ? playlist.tracks.items.map((s: any, index: number) => index)
    : []

  const [play, setPlay] = useState(false)
  const [time, setTime] = useState(0)
  const [trackNum, setTrackNum] = useState(0)
  const [random, setRandom] = useState(false)
  const [loop, setLoop] = useState(false)

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
  })

  useEffect(() => {
    if (!!selectedTrack) {
      playlist.tracks.items.forEach((tracks: any, index: number) => {
        if (tracks.track.id === selectedTrack.id) {
          setTrackNum(index)
        }
      })
    }
  })

  const skip = (next: boolean) => {
    if (random) {
      let rand = 0 + Math.random() * playlist.tracks.items.length
      rand = Math.floor(rand)

      while (trackNum === rand) {
        rand = 0 + Math.random() * playlist.tracks.items.length
        rand = Math.floor(rand)
      }
      setTrackNum(rand)
    } else {
      setTrackNum(
        next
          ? playlist.tracks.items.length - 1 === trackNum
            ? 0
            : trackNum + 1
          : trackNum === 0
          ? playlist.tracks.items.length - 1
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

  const currentTrack = playlist.tracks.items[tracks[trackNum]].track
  const voteStatus: ITrackVoteStatus =
    votes.get(track.uri) || ({} as ITrackVoteStatus)

  const numberOfVotes = voteStatus.numberOfVotes || 0
  const userVoted = voteStatus.votedByCurrentUser

  if (
    !currentTrack.preview_url &&
    playlist.tracks.items.length - 1 !== trackNum
  ) {
    setTrackNum(trackNum + 1)
  }

  if (time === 100) {
    setTime(0)
  }

  return (
    <div className="PlayerPlaylist-container">
      <div className="playlist-header-top-menu">
        <Icon>chevron_left</Icon>
      </div>
      <div className="PlayerPlaylist-track-img">
        <div className="PlayerPlaylist-track-img-container">
          <Avatar
            src={track.album.images[0].url}
            className="PlayerPlaylist-track-avatar"
          />
          <div className="progress-circle" data-progress={time || 0} />
        </div>
        <ListItemText
          primary={track.artists[0].name}
          secondary={track.name}
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
          <Button
            variant="fab"
            color="primary"
            className="finder-playlist-header-container-button"
            onClick={onPlay}
          >
            <Icon>{play ? 'pause' : 'play_arrow'}</Icon>
          </Button>
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
                  handleTrackVote(track)
                }}
                className={`playList-favorite-icon ${
                  userVoted ? '' : 'primary'
                }`}
              >
                favorite
              </Icon>
            </div>
          </div>
          <div className="PlayerPlaylist-control-white">
            <IconButton
              color="primary"
              component="span"
              disabled={true}
              classes={{ disabled: 'disabled' }}
            >
              <Icon>more_vert</Icon>
            </IconButton>
          </div>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <audio
          src={track.preview_url}
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
