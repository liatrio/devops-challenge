import React, { Component } from 'react';
import { Container, Step } from 'semantic-ui-react';

class Progress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( <Container>
      <Step.Group ordered stackable='tablet' vertical size='mini'>
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
        <Step>
          <Step.Content>
            <Step.Title>Add Travis CI Configuration</Step.Title>
          </Step.Content>
        </Step>
        <Step>
          <Step.Content>
            <Step.Title>Enable Travis CI</Step.Title>
          </Step.Content>
        </Step>
        <Step>
          <Step.Content>
            <Step.Title>Correct Build Error</Step.Title>
          </Step.Content>
        </Step>
        <Step>
          <Step.Content>
            <Step.Title>Run Sock-shop</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group> </Container>
    );
  }
}

export default Progress;
