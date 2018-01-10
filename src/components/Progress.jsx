import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';

const stepTitles = [
  'GitHub Account',
  'Fork Sock-shop',
  'Add Travis CI Configuration',
  'Enable Travis CI',
  'Correct Build Error',
  'Run Sock-shop'
];

class Progress extends Component {
  constructor(props) {
    super(props);
  }

  renderSteps() {
    let steps = [];
    stepTitles.forEach((t, i) => {
      steps.push(
        <Step
          active={ this.props.activeStep[i] }
          completed={ this.props.completedStep[i] }
        >
          <Step.Content>
            <Step.Title>{ t }</Step.Title>
          </Step.Content>
        </Step>
      );
    });
    return steps;
  }

  render() {
    return (
      <Step.Group ordered stackable='tablet' vertical size='mini'>
      { this.renderSteps() }
      </Step.Group>
    );
  }
}

export default Progress;
