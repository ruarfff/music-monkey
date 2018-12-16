import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Dispatch } from 'redux'
import BottomBar from './BottomBar'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const BottomBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomBar)

export default withRouter(BottomBarContainer)
