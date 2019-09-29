import { createMuiTheme } from '@material-ui/core/styles'
import styles from './theme.module.scss'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: styles.primaryMain
    },
    secondary: {
      light: styles.secondaryLight,
      main: styles.secondaryMain
    }
  }
})

export default theme
