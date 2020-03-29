import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { List, ListItem, Divider } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import { EventSettings, IOSSwitch } from 'mm-shared'
import './EventSettings.scss'

const EventSettingsView = () => {
  return (
    <div className="EventSettings-root">
      <Field name="settings">
        {({ field, form: { setFieldValue } }: FieldProps) => {
          const settings: EventSettings = field.value
          return (
            <FormGroup>
              <List>
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
                <Divider />
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
              </List>
            </FormGroup>
          )
        }}
      </Field>
    </div>
  )
}

export default EventSettingsView
