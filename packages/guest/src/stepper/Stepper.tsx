import { Button, MobileStepper } from '@material-ui/core'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import Images from '../img/ImportImg'
import LinkButton from '../util/LinkButton'

import { Redirect } from 'react-router'
import './Stepper.scss'

class Stepper extends React.Component<any, any> {
  public state = { activeStep: 0 }

  public handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    })
  }

  public handleStepChange = (activeStep: number) => {
    this.setState({ activeStep })
  }

  public render() {
    return (
      <div>
        <div className="content-stepper">
          <SwipeableViews
            axis={'x'}
            index={this.state.activeStep}
            onChangeIndex={this.handleStepChange}
            enableMouseEvents={true}
            className={'stepper'}
          >
            <div className="stepper-container">
              <img className="img-logo" src={Images.Logo} />
              <img src={Images.Success} className="img-success" />
              <div className="stepper-container-text">
                Music Monkey is nuts about helping <br />
                you find your favourite tracks that <br />
                can be played at your next event.
              </div>
            </div>
            <div className="stepper-container blue">
              <img className="img-logo" src={Images.LogoBlue} />
              <img src={Images.Search} className="img-success" />
              <div className="stepper-container-text">
                Music Monkey is nuts about helping <br />
                you find your favourite tracks that <br />
                can be played at your next event.
              </div>
            </div>

            <div className="stepper-container yellow">
              <img className="img-logo" src={Images.LogoYellow} />
              <img src={Images.Like} className="img-success" />
              <div className="stepper-container-text">
                Music Monkey is nuts about helping <br />
                you find your favourite tracks that <br />
                can be played at your next event.
              </div>
            </div>
            <div>{this.state.activeStep === 3 && <Redirect to="/login" />}</div>
          </SwipeableViews>
          <MobileStepper
            steps={4}
            position="static"
            activeStep={this.state.activeStep}
            className={`stepper-menu ${
              this.state.activeStep === 0
                ? ''
                : this.state.activeStep === 1
                  ? 'blue'
                  : this.state.activeStep === 2 && 'yellow'
            }`}
            classes={{ dots: 'dot-white', dotActive: 'dot-white-active' }}
            nextButton={
              <Button size="small" onClick={this.handleNext}>
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <LinkButton
                size="small"
                to="/login"
                className={'button-skip-stepper'}
              >
                Skip
              </LinkButton>
            }
          />
        </div>
      </div>
    )
  }
}

export default Stepper
