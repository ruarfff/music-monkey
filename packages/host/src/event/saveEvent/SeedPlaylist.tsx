import React, { useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import Fab from '@material-ui/core/Fab'
import chunk from 'lodash/chunk'
import ClearIcon from '@material-ui/icons/Clear'
import { Hidden } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import IUser from 'user/IUser'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import SmallPlaylistCard from 'catalogue/SmallPlaylistCard'
import LoadingSpinner from 'loading/LoadingSpinner'
import LinkButton from 'components/LinkButton'
import './SeedPlaylist.scss'

interface SeedPlaylistProps {
  user: IUser
  seedPlaylist: IPlaylist
  playlists: IPlaylist[]
  playlistsLoading: boolean
  nextPath: string
  backPath: string
  fetchPlaylists(user: IUser): IAction
  onPlaylistSelected(playlist: IPlaylist | undefined): void
}

const SeedPlaylist = ({
  user,
  seedPlaylist,
  playlists,
  playlistsLoading,
  fetchPlaylists,
  onPlaylistSelected,
  backPath,
  nextPath
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

  if (playlistsLoading) {
    return (
      <div className="SeedPlaylist-root">
        <Typography variant="h5" align="center">
          Select a playlist
        </Typography>

        <div className="SeedPlaylist-loading-area">
          <LoadingSpinner />
        </div>
      </div>
    )
  }
  return (
    <div className="SeedPlaylist-root">
      <Typography variant="h5" align="center">
        Select a playlist
      </Typography>
      <Hidden smUp>
        <FormGroup className="SaveEvent-form-actions">
          {playlistSelected && (
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              className="SeedPlaylist-clear"
              onClick={() => {
                handlePlaylistSelected(undefined)
              }}
            >
              <ClearIcon />
            </Fab>
          )}
        </FormGroup>
      </Hidden>

      <Hidden smDown implementation="css">
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
      </Hidden>
      <Hidden smUp>
        <div className="SeedPlaylist-grid-list-container-mobile">
          {chunk(
            playlists.filter(
              (playlist: IPlaylist) => playlist.tracks.total > 0
            ),
            playlists.length / 2
          ).map((playlists: IPlaylist[], index) => (
            <GridList
              key={index}
              cellHeight={180}
              cols={1}
              className="SeedPlaylist-grid-list-col"
            >
              {playlists.map((playlist: IPlaylist) => (
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
          ))}
        </div>
      </Hidden>

      <Hidden smDown implementation="css">
        <div className="SeedPlaylist-actions">
          <FormGroup className="SaveEvent-form-actions">
            <LinkButton variant="contained" color="secondary" to={backPath}>
              Back
            </LinkButton>
            <LinkButton variant="contained" color="primary" to={nextPath}>
              {playlistSelected ? 'Next' : 'Skip'}
            </LinkButton>
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
      </Hidden>
    </div>
  )
}

export default SeedPlaylist
