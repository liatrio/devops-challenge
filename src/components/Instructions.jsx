import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const instructionText = [
  <div>
    Create a <a target="_blank" rel="noopener noreferrer" href="https://github.com/join">GitHub</a> account if you don't already have one.
    <br />
    <br />
    Enter your username in the field below to start tracking your progress.
    <br />
    <br />
  </div>,
  <div>
    Fork <a target="_blank" rel="noopener noreferrer" href="https://github.com/liatrio/microservices-demo#fork-destination-box">liatrio/microservices-demo</a> on GitHub.
    <br />
    <br />
    Click the button below when done.
    <br />
    <br />
  </div>,
  <div>
    Add the following Travis CI configuration as a new file called <code>.travis.yml</code> to your fork.
    <br />
    <br />
    <code>
      some travis ci config
    </code>
    <br />
    <br />
    Click the button below when done.
    <br />
    <br />
  </div>,
  <div>
    On <a target="_blank" rel="noopener noreferrer" href="https://travis-ci.org/">travis-ci.org</a>, enable your fork of microservices-demo so that it will build.
    <br />
    <br />
    Click the button below when done.
    <br />
    <br />
  </div>,
  <div>
    Fix the build error (rename the file correctly..)
  </div>,
  <div>
    Register for relevant play-with-docker account
    Run Sock-shop on play-with-docker:

    <Segment color='green'>
    <code>
		$ git clone https://github.com/YOUR_USERNAME/microservices-demo <br />
		$ cd microservices-demo/deploy/docker-compose<br />
		$ docker-compose up
    </code></Segment>
  </div>
];

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      invalid: true,
      notUser: false
    }
    this.renderForm = this.renderForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.renderUpdater = this.renderUpdater.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalid = !(nextState.username);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  checkUsername(u) {
    return fetch('https://api.github.com/users/' + u)
      .then(function(a) {
        return a.json();
      })
      .then(function(b) {
        if (b.message === 'Not Found') {
          return false;
        }
        else {
          return b;
        }
      });
  }

  handleSubmit(event) {
    var that = this;
    that.checkUsername(that.state.username).then(function(valid) {
      if (valid !== false) {
        that.props.set(that.state.username);
        that.setState({ username: '', notUser: false });
        that.props.updateP();
      }
      else {
        that.setState({ username: '', notUser: true });
      }
    });
    event.preventDefault();
  }

  renderForm() {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <Form.Group widths='equal'>
          <Form.Input
            label='GitHub Username'
            name='username'
            value={ this.state.username }
            onChange={ this.handleChange }
          />
        </Form.Group>
        <Form.Button
          disabled={ this.state.invalid }
          type='submit'
          value='Set GitHub Username'
        >
          Set Username
        </Form.Button>
      </Form>
    );
  }

  renderUpdater() {
    return (
      <Button
        onClick={ this.props.updateP }
        basic
        color='green'
      >
        Complete!
      </Button>
    );
  }

  getActiveIndex() {
    return this.props.activeStep.indexOf(true);
  }

  render() {
    return (
      <Segment>
        { instructionText[ this.getActiveIndex() ] }
        { this.getActiveIndex() === 0 ?
          this.renderForm() : null }
        { this.state.notUser && (this.getActiveIndex() === 0) ?
          <Segment color='red'>
            Please input a valid username.
          </Segment> : null }
        { this.getActiveIndex() !== 0 ?
          this.renderUpdater() : null }
      </Segment>
    );
  }
}

export default Instructions;
