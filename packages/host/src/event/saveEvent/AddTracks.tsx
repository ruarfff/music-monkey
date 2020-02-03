import React, { FC, useEffect } from 'react'
import { FieldProps, Field } from 'formik'
import isEmpty from 'lodash/isEmpty'
import remove from 'lodash/remove'
import {
  addTracksToPlaylist,
  reOrderPlaylist,
  removeTrackFromPlaylist
} from 'playlist/playlistClient'
import {
  useSnackbarAlert,
  Action,
  Track,
  Playlist,
  arrayMove,
  getPlaylistTracks
} from 'mm-shared'
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

        const handlePlaylistSelected = (playlist: Playlist) => {
          handleAddTracks(playlist.tracks.items.map(item => item.track))
        }

        const handleTrackMoved = (from: number, to: number) => {
          let reorderedTracks = [...getPlaylistTracks(playlist)]
          arrayMove(reorderedTracks, from, to)
          reOrderPlaylist(playlist, from, to)
          setFieldValue('tracks', reorderedTracks)
        }

        const handleTrackRemoved = (trackToRemove: Track) => {
          const position = value.indexOf(trackToRemove)
          removeTrackFromPlaylist(playlist.id, trackToRemove.uri, position)
          setFieldValue(
            'tracks',
            remove(value, (track: Track) => track.id !== trackToRemove.id)
          )
        }

        return (
          <Finder
            isHost={true}
            eventTracks={value}
            allowSuggestPlaylist={true}
            onTrackSelected={handleAddTrack}
            onPlaylistSelected={handlePlaylistSelected}
            onTrackRemoved={handleTrackRemoved}
            onTrackMoved={handleTrackMoved}
          />
        )
      }}
    </Field>
  )
}

export default AddTracks
