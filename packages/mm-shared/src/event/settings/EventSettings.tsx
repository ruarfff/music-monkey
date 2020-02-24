import React, { FC, useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch'
import { List, ListItem, Divider } from '@material-ui/core'
import { Event } from '../'
import './EventSettings.scss'

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string
}

interface Props extends SwitchProps {
  classes: Styles
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1)
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none'
        }
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff'
      }
    },
    thumb: {
      width: 24,
      height: 24
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border'])
    },
    checked: {},
    focusVisible: {}
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  )
})

interface EventSettingsProps {
  isHost: boolean
  event: Event
  onChange(settings: any): void
}

const EventSettings: FC<EventSettingsProps> = ({ event, isHost, onChange }) => {
  const [settings, setSettings] = useState({ ...event.settings })
  return (
    <div className="EventSettings-root">
      <FormGroup>
        <List>
          <ListItem>
            <FormControlLabel
              control={
                <IOSSwitch
                  value="Auto Accept Suggestions Enabled"
                  checked={settings.autoAcceptSuggestionsEnabled}
                  disabled={!isHost}
                  onChange={() => {
                    const newSettings = {
                      ...settings,
                      autoAcceptSuggestionsEnabled: !settings.autoAcceptSuggestionsEnabled
                    }
                    setSettings(newSettings)
                    onChange(newSettings)
                  }}
                />
              }
              label="Auto Accept Suggestions"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <FormControlLabel
              control={
                <IOSSwitch
                  value="dynamic Voting Enabled"
                  checked={settings.dynamicVotingEnabled}
                  disabled={!isHost}
                  onChange={() => {
                    const newSettings = {
                      ...settings,
                      dynamicVotingEnabled: !settings.dynamicVotingEnabled
                    }
                    setSettings(newSettings)
                    onChange(newSettings)
                  }}
                />
              }
              label="Dynamic Voting"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <FormControlLabel
              control={
                <IOSSwitch
                  value="Suggesting Playlists Enabled"
                  checked={settings.suggestingPlaylistsEnabled}
                  disabled={!isHost}
                  onChange={() => {
                    const newSettings = {
                      ...settings,
                      suggestingPlaylistsEnabled: !settings.suggestingPlaylistsEnabled
                    }
                    setSettings(newSettings)
                    onChange(newSettings)
                  }}
                />
              }
              label="Allow Playlist Suggestions"
            />
          </ListItem>
          <Divider />
        </List>
      </FormGroup>
    </div>
  )
}

export default EventSettings
