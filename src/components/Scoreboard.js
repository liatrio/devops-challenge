import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="column">
        <center>
          <Step.Group ordered>
            <Step completed>
              <Step.Content>
                <Step.Title>GitHub Account</Step.Title>
                <Step.Description><a target="_blank" rel="noopener noreferrer" href="https://github.com/join">Sign Up</a></Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Fork Sock-shop</Step.Title>
                <Step.Description><a target="_blank" rel="noopener noreferrer" href="https://help.github.com/articles/fork-a-repo/#fork-an-example-repository">How to Fork</a></Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Add Travis CI Configuration</Step.Title>
                <Step.Description><a target="_blank" rel="noopener noreferrer" href="https://help.github.com/articles/adding-a-file-to-a-repository/">How to Add a File on GitHub</a></Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Enable Travis CI</Step.Title>
                <Step.Description><a target="_blank" rel="noopener noreferrer" href="https://docs.travis-ci.com/user/getting-started/">Travis CI Help</a></Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Correct Build Error</Step.Title>
                <Step.Description><a target="_blank" rel="noopener noreferrer" href="https://help.github.com/articles/editing-files-in-your-repository/">Editing Files on GitHub</a></Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Run Sock-shop</Step.Title>
                <Step.Description><a target="_blank" rel="noopener noreferrer" href="https://labs.play-with-docker.com/">Play with Docker</a></Step.Description>
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
