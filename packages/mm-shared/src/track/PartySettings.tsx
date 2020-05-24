import React, { FC, useState } from 'react'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import CheckIcon from '@material-ui/icons/Check'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import {
  ButtonGroup,
  Button,
  Dialog,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Event, EventSettings, IOSSwitch } from '../'
import './PartySettings.scss'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  })
interface PartySettingsProps extends WithStyles<typeof styles> {
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
  classes,
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
        <MuiDialogTitle
          disableTypography
          id="party-settings-dialog-title"
          className="PartySettings-dialog-content"
        >
          <Typography variant="h6">
            {' '}
            {setting.title} {setting.icon}
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent className="PartySettings-dialog-content">
          <DialogContentText id="party-settings-dialog-description">
            {setting.description}
          </DialogContentText>
          <DialogContent className="PartySettings-dialog-content">
            <FormControlLabel
              control={
                <IOSSwitch
                  value="Setting"
                  checked={event.settings[setting.type]}
                  onChange={() => {
                    if (isHost) {
                      let updatedSettings = { ...event.settings }
                      updatedSettings[setting.type] = !event.settings[
                        setting.type
                      ]
                      onSettingsUpdated(updatedSettings)
                    }
                  }}
                />
              }
              label="Setting"
            />
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
          color={event?.settings.dynamicVotingEnabled ? 'primary' : 'default'}
          onClick={handleOpen('vote')}
        >
          <ThumbsUpDownIcon />
        </Button>
        <Button
          aria-label="auto accept"
          color={
            event?.settings.autoAcceptSuggestionsEnabled ? 'primary' : 'default'
          }
          onClick={handleOpen('autoAccept')}
        >
          <CheckIcon />
        </Button>
        <Button
          aria-label="allow playlists"
          color={
            event?.settings.suggestingPlaylistsEnabled ? 'primary' : 'default'
          }
          onClick={handleOpen('playlist')}
        >
          <QueueMusicIcon />
        </Button>
      </ButtonGroup>
    </>
  )
}

export default withStyles(styles)(PartySettings)
