import { connect } from 'react-redux'
import IRootState from '../rootState'
import { updateUserRequest } from '../user/userActions'
import Account from './Account'
import './Account.scss'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data
})

const mapDispatchToProps = {
  updateUserRequest
}

const AccountViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

export default AccountViewContainer
