import { connect } from 'react-redux'
import { getEvents } from 'event/eventActions'
import IRootState from 'rootState'
import { updateUserRequest } from 'user/userActions'
import AccountView from './AccountView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  events: state.event.events
})

const mapDispatchToProps = {
  updateUserRequest,
  getEvents
}

const AccountViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountView)

export default AccountViewContainer
