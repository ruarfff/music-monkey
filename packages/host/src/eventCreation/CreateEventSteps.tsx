import Grid from '@material-ui/core/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'

const decorate = withStyles((theme: Theme) => ({
  stepsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '16px',
    color: '#979797',
    padding: '20px 35px'
  },
  stepsText: {
    cursor: 'pointer',
    fontSize: '18px',
  },
  highlight: {
    cursor: 'pointer',
    color: '#FFB000',
    fontSize: '18px',
  }
}))

interface ICreateEventStepsProps {
  step: number,
  pickStep(step: number): void
}

class EventCard extends React.Component<
  ICreateEventStepsProps &
  WithStyles> {
  public setStep = (step: number) => () => {
    this.props.pickStep(step)
  }

  public render() {
    const { step, classes } = this.props

    return (
      <Grid
        container={true}
        spacing={24}
        justify="center"
        alignItems="center"
        direction="row"
        className={classes.stepsContainer}
      >
        <Typography
          className={step === 0 ? classes.highlight : classes.stepsText}
          onClick={this.setStep(0)}
        >
          STEP 1: CREATE EVENT
        </Typography>
        <Typography
          className={step === 1 ? classes.highlight : classes.stepsText}
          onClick={this.setStep(1)}
        >
          STEP 2: ADD DETAILS
        </Typography>
        <Typography
          className={step === 2 ? classes.highlight : classes.stepsText}
          onClick={this.setStep(2)}
        >
          STEP 3: SHARE EVENT
        </Typography>
      </Grid>
    )
  }
}

export default decorate(EventCard)