import React, { FC, useEffect } from 'react'
import { FieldProps, Field } from 'formik'
import isEmpty from 'lodash/isEmpty'
import { addTracksToPlaylist } from 'playlist/playlistClient'
import { useSnackbarAlert, Action, Track, Playlist } from 'mm-shared'
import Finder from 'finder/FinderContainer'

import './AddTracks.scss'

interface AddTracksProps {
  playlist: Playlist
  recommendedTracks: Track[]
  getRecommendations(): Action
}

const AddTracks: FC<AddTracksProps> = ({
  playlist,
  recommendedTracks,
  getRecommendations
}) => {
  const { showSuccess, showError } = useSnackbarAlert()

  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
    }
    // eslint-disable-next-line
  }, [recommendedTracks])

  return (
    <Field name="tracks">
      {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
        const handleAddTrack = async (track: Track) => {
          try {
            await addTracksToPlaylist(playlist.id, [track.uri])
            setFieldValue('tracks', [...value, track])
            showSuccess('Track Added')
          } catch (err) {
            console.error(err)
            showError('Failed to add track')
          }
        }

        const handleAddTracks = (tracks: Track[]) => {
          try {
            addTracksToPlaylist(
              playlist.id,
              tracks.map(track => track.uri)
            )
            setFieldValue('tracks', [...value, ...tracks])
            showSuccess('Track Added')
          } catch (err) {
            console.error(err)
            showError('Failed to add track')
          }
        }

        const handleTracksChanges = (tracks: Track[]) => {
          setFieldValue('tracks', tracks)
        }

        const handlePlaylistSelected = (playlist: Playlist) => {
          handleAddTracks(playlist.tracks.items.map(item => item.track))
        }

        return (
          <Finder
            onTrackSelected={handleAddTrack}
            onPlaylistSelected={handlePlaylistSelected}
            onPlaylistTracksChanged={handleTracksChanges}
          />
        )
      }}
    </Field>
  )
}

export default AddTracks
