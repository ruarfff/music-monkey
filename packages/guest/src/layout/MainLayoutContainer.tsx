import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchUsersEvents } from '../event/eventActions'
import IRootState from '../rootState'
import MainLayout from './MainLayout'

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  events: state.event.events
})

const mapDispatchToProps = {
  fetchUsersEvents
}

const MainLayoutContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainLayout)
)

export default MainLayoutContainer
