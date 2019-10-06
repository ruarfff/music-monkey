import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import IRootState from 'rootState'
import { logout } from 'auth/authActions'
import MainAppBar from './MainAppBar'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.eventView.event
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleTitleClicked: () => {
    dispatch(push('/'))
  },
  ...bindActionCreators(
    {
      logout
    },
    dispatch
  )
})

const MainAppBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainAppBar)

export default MainAppBarContainer
