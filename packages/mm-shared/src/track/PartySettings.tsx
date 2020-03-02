import React, { FC, useState } from 'react'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import CheckIcon from '@material-ui/icons/Check'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import SettingsPowerIcon from '@material-ui/icons/SettingsPower'
import {
  ButtonGroup,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography
} from '@material-ui/core'
import { Event, EventSettings } from '../'
import './PartySettings.scss'

interface PartySettingsProps {
  isHost: boolean
  event: Event
  onSettingsUpdated(settings: EventSettings): void
}

interface Setting {
  type: string
  title: string
  description: string
  icon: any
}

const PartySettings: FC<PartySettingsProps> = ({
  isHost,
  event,
  onSettingsUpdated
}) => {
  const settings = {
    vote: {
      type: 'dynamicVotingEnabled',
      title: 'Dynamic Voting',
      icon: <ThumbsUpDownIcon />,
      description:
        'When activated, allows guest votes to determine the order of the music'
    },
    playlist: {
      type: 'suggestingPlaylistsEnabled',
      title: 'Playlist Submission',
      icon: <QueueMusicIcon />,
      description: 'When activated, allows any guest to submit a playlist'
    },
    autoAccept: {
      type: 'autoAcceptSuggestionsEnabled',
      title: 'Auto Accept',
      icon: <CheckIcon />,
      description:
        'When activated, allows any guest to add a song to the party playlist without needing approval'
    }
  }
  const [setting, setSetting] = useState<Setting>({} as Setting)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = (type: string) => () => {
    setSetting(settings[type])
    setOpen(true)
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="party-settings-dialog-title"
        aria-describedby="party-settings-dialog-description"
        className="PartySettings-dialog"
        open={open}
      >
        <DialogTitle
          id="party-settings-dialog-title"
          className="PartySettings-dialog-content"
        >
          {setting.title} {setting.icon}
        </DialogTitle>
        <DialogContent className="PartySettings-dialog-content">
          <DialogContentText id="party-settings-dialog-description">
            {setting.description}
          </DialogContentText>
          <DialogContent className="PartySettings-dialog-content">
            {isHost && (
              <IconButton
                aria-label="toggle-setting"
                color={event.settings[setting.type] ? 'primary' : 'secondary'}
                onClick={() => {
                  let updatedSettings = { ...event.settings }
                  updatedSettings[setting.type] = !event.settings[setting.type]
                  onSettingsUpdated(updatedSettings)
                }}
              >
                <SettingsPowerIcon />
              </IconButton>
            )}
            {!isHost && (
              <Typography>
                Currently {event.settings[setting.type] ? 'On' : 'Off'}
              </Typography>
            )}
          </DialogContent>
        </DialogContent>
      </Dialog>

      <ButtonGroup
        fullWidth
        className="PartySettings-root"
        color="primary"
        aria-label="event settings"
      >
        <Button
          aria-label="dynamic voting"
          color={event?.settings.dynamicVotingEnabled ? 'primary' : 'secondary'}
          onClick={handleOpen('vote')}
        >
          <ThumbsUpDownIcon />
        </Button>
        <Button
          aria-label="auto accept"
          color={
            event?.settings.autoAcceptSuggestionsEnabled
              ? 'primary'
              : 'secondary'
          }
          onClick={handleOpen('autoAccept')}
        >
          <CheckIcon />
        </Button>
        <Button
          aria-label="allow playlists"
          color={
            event?.settings.suggestingPlaylistsEnabled ? 'primary' : 'secondary'
          }
          onClick={handleOpen('playlist')}
        >
          <QueueMusicIcon />
        </Button>
      </ButtonGroup>
    </>
  )
}

export default PartySettings
