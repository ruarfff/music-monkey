import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { logout } from '../auth/authActions'
import {
  getNotifications,
  updateNotification,
} from '../notification/notificationActions'
import IRootState from '../rootState'
import MainAppBar from './MainAppBar'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.eventView.event,
  location: state.home.location,
  notification: state.notification
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleTitleClicked: () => {
    dispatch(push('/'))
  },
  ...bindActionCreators(
    {
      logout,
      getNotifications,
      updateNotification
    },
    dispatch
  )
})

const MainAppBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainAppBar)

export default MainAppBarContainer
