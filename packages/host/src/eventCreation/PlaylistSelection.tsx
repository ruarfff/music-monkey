import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton/IconButton'
import List from '@material-ui/core/List/List'
import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import CachedIcon from '@material-ui/icons/Cached'
import CloseIcon from '@material-ui/icons/Close'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IAction from '../IAction'
import notification from '../notification/notificationReducer'
import IPlaylist from '../playlist/IPlaylist'
import TrackList from '../track/TrackList'
import IUser from '../user/IUser'
import { formatDuration } from '../util/formatDuration'
import { numTracks, img, durationSeconds } from '../playlist/playlistUtil'
import { createPlaylist } from '../playlist/playlistClient'
import './PlaylistSelection.scss'
import LoadingSpinner from '../loading/LoadingSpinner'
import PlaylistCardSmall from '../event/PlaylistCardSmall'

interface IPlaylistSelectionProps {
  deselectPlaylist(): void
  onPlaylistSelected(playlist: IPlaylist): void
  fetchPlaylists(user: IUser): IAction
  getMoreUsersPlaylists(user: IUser, offset: number): void
  onPlaylistDragDrop(
    playlist: IPlaylist,
    fromIndex: number,
    toIndex: number
  ): IAction
  playlistDescription: string
  playlistName: string
  playlists: IPlaylist[]
  selectedPlaylist: IPlaylist
  tryRemoveTrack(playlistId: string, uri: string, position: number): IAction
  user: IUser
}

const SweetAlert = withReactContent(Swal) as any

const PlaylistSelection = ({
  deselectPlaylist,
  fetchPlaylists,
  getMoreUsersPlaylists,
  onPlaylistDragDrop,
  playlistDescription,
  playlistName,
  playlists,
  selectedPlaylist,
  tryRemoveTrack,
  user,
  onPlaylistSelected
}: IPlaylistSelectionProps) => {
  const [offset, setOffset] = useState(50)
  const [isOpen, setIsOpen] = useState(false)
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)
  useEffect(() => {
    fetchPlaylists(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const showFillPlaylistErrorDialog = () => {
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: 'Set playlist name',
      type: 'error'
    })
  }

  const handleLoadMore = () => {
    getMoreUsersPlaylists(user, offset)
    setOffset(offset + 50)
  }

  const handlePlaylistCreation = async () => {
    if (!isCreatingPlaylist) {
      if (playlistName) {
        setIsCreatingPlaylist(true)
        const playlist = await createPlaylist(playlistName, playlistDescription)
        setIsCreatingPlaylist(false)
        onPlaylistSelected(playlist)
      } else {
        showFillPlaylistErrorDialog()
      }
    }
  }

  const handlePlaylistDragDrop = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    onPlaylistDragDrop(
      selectedPlaylist,
      result.source.index,
      result.destination.index
    )
  }

  const handleRemoveTrack = (uri: string, position: number) => {
    tryRemoveTrack(selectedPlaylist.id, uri, position)
  }

  const trackCount = numTracks(selectedPlaylist)
  const formattedDuration = formatDuration(durationSeconds(selectedPlaylist))

  return (
    <div>
      {!isEmpty(selectedPlaylist) && (
        <React.Fragment>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            autoHideDuration={4000}
            open={isOpen}
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">{notification}</span>}
            action={[
              <IconButton key="close" aria-label="Close" color="inherit">
                <CloseIcon />
              </IconButton>
            ]}
          />
          <div className="PlaylistSummary">
            <div className="PlaylistImg">
              <img alt="playlist" src={img(selectedPlaylist)} />
            </div>
            <div className="PlaylistDescription">
              <div>{selectedPlaylist.name}</div>
              <div>{formattedDuration}</div>
              <div>{trackCount + ' Tracks'}</div>
              <Button
                color={'secondary'}
                variant={'contained'}
                onClick={deselectPlaylist}
              >
                CHOOSE OTHER PLAYLIST
              </Button>
            </div>
          </div>
          <List>
            <TrackList
              removeTrack={handleRemoveTrack}
              onDragEnd={handlePlaylistDragDrop}
              tracks={cloneDeep(selectedPlaylist.tracks.items).map(
                i => i.track
              )}
            />
          </List>
        </React.Fragment>
      )}

      {isCreatingPlaylist && <LoadingSpinner />}
      {!isCreatingPlaylist && (
        <div className="PlaylistCardsContainer">
          {isEmpty(selectedPlaylist) && (
            <React.Fragment>
              <div className="Plus" onClick={handlePlaylistCreation}>
                +
              </div>
              {playlists.map((playlist: IPlaylist, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    onPlaylistSelected(playlist)
                  }}
                >
                  <PlaylistCardSmall playlist={playlist} disableLink={true} />
                </div>
              ))}
              <div className="Plus" onClick={handleLoadMore}>
                <CachedIcon fontSize={'inherit'} />
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  )
}

export default PlaylistSelection
