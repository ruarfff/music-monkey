import { connect } from 'react-redux'
import withSizes, { Sizes } from 'react-sizes'
import IRootState from 'rootState'
import Layout from './Layout'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  userLoading: state.user.isLoading,
  userError: state.user.error,
  event: state.event.event
})

const mapDispatchToProps = {}

const mapSizesToProps = ({ width, height }: Sizes) => ({
  isDesktop: width > 1024,
  width,
  height
})

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withSizes<Sizes, any>(mapSizesToProps)(Layout))

export default LayoutContainer
