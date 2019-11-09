import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch'
import { List, ListItem, Divider } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import IEventSettings from 'event/IEventSettings'
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

const EventSettings = () => {
  return (
    <div className="EventSettings-root">
      <Field name="settings">
        {({ field, form: { setFieldValue } }: FieldProps) => {
          const settings: IEventSettings = field.value
          return (
            <FormGroup>
              <List>
                <ListItem>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        value="Suggesting Playlists Enabled"
                        checked={settings.suggestingPlaylistsEnabled}
                        onChange={() => {
                          setFieldValue('settings', {
                            ...settings,
                            suggestingPlaylistsEnabled: !settings.suggestingPlaylistsEnabled
                          })
                        }}
                      />
                    }
                    label="Allow Playlist Suggestions"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        value="Auto Accept Suggestions Enabled"
                        checked={settings.autoAcceptSuggestionsEnabled}
                        onChange={() => {
                          setFieldValue('settings', {
                            ...settings,
                            autoAcceptSuggestionsEnabled: !settings.autoAcceptSuggestionsEnabled
                          })
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
                        onChange={() => {
                          setFieldValue('settings', {
                            ...settings,
                            dynamicVotingEnabled: !settings.dynamicVotingEnabled
                          })
                        }}
                      />
                    }
                    label="Dynamic Voting"
                  />
                </ListItem>
              </List>
            </FormGroup>
          )
        }}
      </Field>
    </div>
  )
}

export default EventSettings
