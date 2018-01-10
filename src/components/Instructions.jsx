import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

const instructionText = [
  <p>
    Create a <a target="_blank" rel="noopener noreferrer" href="https://github.com/join">GitHub</a> account if you don't already have one. Enter your GitHub username in the field to the right. 
  </p>,
  <p>
    Fork <a target="_blank" rel="noopener noreferrer" href="https://github.com/liatrio/microservices-demo#fork-destination-box">liatrio/microservices-demo</a> on GitHub.
  </p>,
  <p>
    Enable Travis CI
  </p>,
  <p>
    Fix the build error (rename the file correctly..)
  </p>,
  <p>
    Register for relevant play-with-docker account
  </p>,
  <p>
    Run Sock-shop on play-with-docker:
    <br />
		$ git clone https://github.com/your_github_username/microservices-demo <br />
		$ cd microservices-demo/deploy/docker-compose<br />
		$ docker-compose up
  </p>
];

class Instructions extends Component {
  constructor(props) {
    super(props);
  }

  getActiveIndex() {
    return this.props.activeStep.indexOf(true);
  }

  render() {
    return (
      <Segment>
        { instructionText[ this.getActiveIndex() ] }
      </Segment>
    );
  }
}

export default Instructions;
