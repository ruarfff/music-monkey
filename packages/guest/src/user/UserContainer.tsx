import { connect } from 'react-redux'
import IRootState from '../rootState'
import User from './User'
import { fetchUser } from './userActions'

const mapStateToProps = (state: IRootState) => ({ user: state.user })

const mapDispatchToProps = {
  fetchUser
}

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default UserContainer
