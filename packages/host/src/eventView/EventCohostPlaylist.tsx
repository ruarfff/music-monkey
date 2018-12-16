import { ListItemIcon } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import Paper from '@material-ui/core/Paper'
import { WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import club from '../assets/club.png'
import EventInput from '../components/EventInput/EventInput'
import IAction from '../IAction'
import IDecoratedSuggestion from '../suggestion/IDecoratedSuggestion'
import ISuggestion from '../suggestion/ISuggestion'
import ITrack from '../track/ITrack'
import { formatDuration } from '../util/formatDuration'
import './components/Playlist/Styles/EventSuggestions.scss'

const decorate = withStyles(() => ({
  accept: {
    background: '#27AE60',
    color: 'white'
  },
  trackBand: {
    padding: 0,
    fontWeight: 800
  },
  trackName: {
    padding: 0
  },
  listItem: {
    borderBottom: '1px solid #979797'
  },
  listItemContent: {
    maxWidth: '700px'
  },
  img: {
    width: '150px',
    height: '100px',
    borderRadius: '5px 5px 0 0'
  },
  playlistTitle: {
    fontSize: '16px'
  },
  playlistCardWrapper: {
    marginBottom: '10px'
  },
  playlistCard: {
    marginBottom: '10px'
  },
  playlistCardContent: {
    paddingLeft: '5px'
  }
}))

interface IEventRejectedSuggestionsProps {
  suggestions: IDecoratedSuggestion[]
  stageSuggestion(suggestion: ISuggestion): IAction
}

class EventCohostPlaylist extends React.PureComponent<
  IEventRejectedSuggestionsProps & WithStyles
> {
  public state = {
    tracksBeingRemoved: {},
    search: ''
  }

  public render() {
    const { suggestions, classes } = this.props
    const filteredSuggestions = suggestions.filter(
      suggest => !suggest.suggestion.accepted
    )
    if (!filteredSuggestions || filteredSuggestions.length < 1) {
      return (
        <Typography align="center" variant="subtitle1">
          Currently no Rejected Suggestions
        </Typography>
      )
    }
    return (
      <div>
        <Grid container={true} spacing={24}>
          <Grid item={true} md={8}>
            <List>
              {filteredSuggestions.map((decoratedSuggestion, i) =>
                this.renderSuggestion(decoratedSuggestion, i)
              )}
            </List>
          </Grid>
          <Grid item={true} md={4}>
            <EventInput
              label={'Search'}
              value={this.state.search}
              onChange={this.handleSearch('search')}
            />

            <Typography className={classes.playlistTitle}>Playlists</Typography>

            <Grid container={true} spacing={24}>
              <Grid item={true} className={classes.playlistCardWrapper}>
                <Paper className={classes.playlistCard}>
                  <img className={classes.img} src={club} />
                  <Grid className={classes.playlistCardContent}>
                    <Typography>test name</Typography>
                    <Button color={'primary'}>view</Button>
                  </Grid>
                </Paper>
                <Button className={classes.accept}>add</Button>
              </Grid>

              <Grid item={true} className={classes.playlistCardWrapper}>
                <Paper className={classes.playlistCard}>
                  <img className={classes.img} src={club} />
                  <Grid className={classes.playlistCardContent}>
                    <Typography>test name</Typography>
                    <Button color={'primary'}>view</Button>
                  </Grid>
                </Paper>
                <Button className={classes.accept}>add</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  private handleSuggestionAccepted = (
    decoratedSuggestion: IDecoratedSuggestion
  ) => () => {
    const { track, suggestion } = decoratedSuggestion
    this.setState({ tracksBeingRemoved: track })
    setTimeout(() => {
      this.setState({ tracksBeingRemoved: {} as ITrack })
      this.props.stageSuggestion(suggestion)
    }, 700)
  }

  private handleSearch = (key: string) => (content: any) => {
    this.setState({ [key]: content })
  }

  private renderSuggestion = (
    decoratedSuggestion: IDecoratedSuggestion,
    i: number
  ) => {
    const { classes } = this.props
    const { track } = decoratedSuggestion
    let trackImage = <span />
    if (track.album && track.album.images && track.album.images.length > 0) {
      trackImage = (
        <ListItemIcon>
          <img
            className="EventSuggestions-trackImage"
            src={track.album.images[track.album.images.length - 1].url}
            alt={track.name}
          />
        </ListItemIcon>
      )
    }

    return (
      <React.Fragment key={i}>

        <ListItem
          className={classes.listItem}
          dense={true}
          button={true}
          key={track.uri}
        >
          {trackImage}
          <Grid
            className={classes.listItemContent}
            container={true}
            spacing={24}
          >
            <Grid
              item={true}
              md={12}
              container={true}
              direction={'row'}
              alignItems={'flex-end'}
            >
              <Grid
                container={true}
                direction={'column'}
                justify={'center'}
                md={6}
                item={true}
              >
                <ListItemText
                  className={classes.trackBand}
                  primary={track.album.artists[0].name}
                />
                <ListItemText
                  className={classes.trackName}
                  primary={track.name}
                />
              </Grid>
              <ListItemText primary={formatDuration(track.duration_ms)} />
            </Grid>
          </Grid>
          <ListItemSecondaryAction>
            <Button
              className={classes.accept}
              variant="contained"
              onClick={this.handleSuggestionAccepted(decoratedSuggestion)}
            >
              ADD
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </React.Fragment>
    )
  }
}

export default decorate(EventCohostPlaylist)
