import React, { useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import IUser from 'user/IUser'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import SmallPlaylistCard from 'catalogue/SmallPlaylistCard'
import LoadingSpinner from 'loading/LoadingSpinner'
import './SeedPlaylist.scss'

interface SeedPlaylistProps {
  user: IUser
  seedPlaylist: IPlaylist
  playlists: IPlaylist[]
  playlistsLoading: boolean
  fetchPlaylists(user: IUser): IAction
  handleNext(): void
  handleBack(): void
  onPlaylistSelected(playlist: IPlaylist | undefined): void
}

const SeedPlaylist = ({
  user,
  seedPlaylist,
  playlists,
  playlistsLoading,
  fetchPlaylists,
  onPlaylistSelected,
  handleBack,
  handleNext
}: SeedPlaylistProps) => {
  const playlistSelected = !!seedPlaylist
  const handlePlaylistSelected = (playlist: IPlaylist | undefined) => {
    onPlaylistSelected(playlist)
  }
  useEffect(() => {
    if (isEmpty(playlists) && !playlistsLoading) {
      fetchPlaylists(user)
    }
  }, [fetchPlaylists, playlists, playlistsLoading, user])

  return (
    <div className="SeedPlaylist-root">
      <Typography variant="h5" align="center">
        Select a playlist
      </Typography>
      {playlistsLoading ? (
        <div className="SeedPlaylist-loading-area">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="SeedPlaylist-grid-list-container">
          <GridList cols={2.5} className="SeedPlaylist-grid-list">
            {playlists
              .filter((playlist: IPlaylist) => playlist.tracks.total > 0)
              .map((playlist: IPlaylist) => (
                <div
                  key={playlist.id}
                  onClick={() => {
                    handlePlaylistSelected(playlist)
                  }}
                  className={`SeedPlaylist-playlist ${
                    playlistSelected && seedPlaylist.id === playlist.id
                      ? 'SeedPlaylist-playlist-selected'
                      : ''
                  }`}
                >
                  <SmallPlaylistCard
                    playlist={playlist}
                    classes={{ root: 'SeedPlaylist-playlist-card' }}
                  />
                </div>
              ))}
          </GridList>
        </div>
      )}

      <div className="SeedPlaylist-actions">
        <FormGroup className="SaveEvent-form-actions">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleBack()
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleNext()
            }}
          >
            {playlistSelected ? 'Next' : 'Skip'}
          </Button>
          {playlistSelected && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handlePlaylistSelected(undefined)
              }}
            >
              Clear Selection
            </Button>
          )}
        </FormGroup>
      </div>
    </div>
  )
}

export default SeedPlaylist
