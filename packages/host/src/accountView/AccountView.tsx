import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import { WithStyles } from '@material-ui/core/styles/withStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import * as React from 'react'
import IEvent from 'event/IEvent'
import IAction from 'IAction'
import IUser from 'user/IUser'
import AccountDetails from './AccountDetails'
import MyEvents from './MyEvents'
import MyGuests from './MyGuests'
import MyPlaylists from './MyPlaylists'

const decorate = withStyles(() => ({
  accountWrapper: {},
  accountLeftSide: {},
  tabContainer: {
    background: 'white',
    boxShadow: 'none'
  },
  tab: {},
  tabs: {
    color: '#5157ab',
    borderBottom: '1px solid #5157ab'
  }
}))

interface IAccountViewProps {
  user: IUser
  events: IEvent[]
  updateUserRequest(user: IUser): IAction
  getEvents(): IAction
}

function TabContainer({ children }: any) {
  return <div className="tabContainer">{children}</div>
}

class AccountView extends React.Component<IAccountViewProps & WithStyles> {
  public state = {
    tabIndex: 0
  }

  public componentDidMount() {
    this.props.getEvents()
  }

  public render() {
    const { tabIndex } = this.state
    const { user, classes, events, updateUserRequest } = this.props
    return (
      <Grid className={classes.accountWrapper} container={true} spacing={3}>
        <Grid
          container={true}
          item={true}
          md={3}
          className={classes.accountLeftSide}
        >
          <AccountDetails user={user} updateUserRequest={updateUserRequest} />
        </Grid>
        <Grid container={true} item={true} md={9}>
          <AppBar
            position="static"
            color="default"
            className={classes.tabContainer}
          >
            <Tabs
              value={tabIndex}
              onChange={this.handleTabChange}
              TabIndicatorProps={{ className: classes.tabs }}
              centered={true}
              className={classes.tabs}
              variant="fullWidth"
            >
              <Tab className={classes.tab} label="My events" />
              <Tab className={classes.tab} label="My playlists" />
              <Tab className={classes.tab} label="My guests" />
            </Tabs>
          </AppBar>
          {tabIndex === 0 && (
            <TabContainer className={classes.content}>
              <MyEvents events={events} />
            </TabContainer>
          )}
          {tabIndex === 1 && (
            <TabContainer className={classes.content}>
              <MyPlaylists events={events} />
            </TabContainer>
          )}
          {tabIndex === 2 && (
            <TabContainer className={classes.content}>
              <MyGuests events={events} />
            </TabContainer>
          )}
        </Grid>
      </Grid>
    )
  }

  private handleTabChange = (event: any, index: number) => {
    this.setState({ tabIndex: index })
  }
}

export default decorate(AccountView)
