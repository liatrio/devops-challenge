import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';

class Scoreboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="column">
        <center>
          <Step.Group ordered>
            <Step completed>
              <Step.Content>
                <Step.Title>GitHub Account</Step.Title>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Fork Sock-shop</Step.Title>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Add Travis CI Configuration</Step.Title>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Enable Travis CI</Step.Title>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Correct Build Error</Step.Title>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Run Sock-shop</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        {this.props.user === '' ? 
          <p>
          Input your GitHub username to track progress.</p> :
          <p>Progress of @{this.props.user}</p> }
        </center>
      </div>
    );
  }
}

export default Scoreboard;
