import { connect } from 'react-redux'
import IRootState from 'rootState'
import { logout } from 'auth/authActions'
import UserMenu from './UserMenu'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data
})

const mapDispatchToProps = { logout }

const UserMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu)

export default UserMenuContainer
