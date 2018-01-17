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
    <Segment color='green'>
      <code>
				sudo: required<br />
				services:<br />
				- docker<br />
				script:<br />
					- docker build -t chico .<br />
      </code>
    </Segment>
    Click the button below when done.
    <br />
    <br />
  </div>,
  <div>
    On <a target="_blank" rel="noopener noreferrer" href="https://travis-ci.org/">travis-ci.org</a>, enable your fork of microservices-demo so that it will build.
    <br />
    <br />
    Trigger a build using the Travis CI web console.
    <br />
    <br />
    Click the button below when done.
    <br />
    <br />
  </div>,
  <div>
    The build failed! Fix the build by examining the cause of failure in the build logs on <a target="_blank" rel="noopener noreferrer" href="https://travis-ci.org/">travis-ci.org</a>.
    <br />
    <br />
    Click the button below after the latest build has passed.
    <br />
    <br />
  </div>,
  <div>
    Log in to <a target="_blank" rel="noopener noreferrer" href="https://labs.play-with-docker.com/">Play with Docker</a>.
    <br />
    <br />
    You will need a Docker Hub account to use Play with Docker. You can create an account at <a target="_blank" rel="noopener noreferrer" href="https://hub.docker.com/">hub.docker.com</a>.
    <br />
    <br />
    Once you are logged in on Play with Docker, hit the start button. On the left, select Add New Instance. This will create a Docker playground for you to run commands in.
    <br />
    <br />
    Run Sock-shop!
    <br />
    <Segment color='green'>
      <code>
		  $ git clone https://github.com/YOUR_USERNAME/microservices-demo <br />
		  $ cd microservices-demo/deploy/docker-compose<br />
		  $ docker-compose up
      </code>
    </Segment>
    After Sock-shop has finishing deploying, you should be able to click a blue port 80 link. Congratulations! You have configured Travis CI for a microservices application and deployed it using Docker Compose. Enter the URL of your deployment below to complete the DevOps Challenge.
    <br />
    <br />
  </div>
];

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      url: '',
      invalid: true,
      notUser: false
    }
    this.renderForm = this.renderForm.bind(this);
    this.renderUrlForm = this.renderUrlForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.checkUrl = this.checkUrl.bind(this);
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

  checkUrl(u) {
    return fetch(u)
      .then(function(a) {
        return true;/*
        return a.json();
      })
      .then(function(b) {
        return true;*/
      });
  }

  handleUrlSubmit(event) {
    var that = this;
    that.checkUrl(that.state.url).then(function(valid) {
      if (valid !== false) {
        that.props.done();
        that.setState({ url: '' });
        that.props.updateP();
      }
      else {
        that.setState({ url: '' });
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

  renderUrlForm() {
    return (
      <Form onSubmit={ this.handleUrlSubmit }>
        <Form.Group widths='equal'>
          <Form.Input
            label='Sock-shop URL'
            name='url'
            value={ this.state.url }
            onChange={ this.handleChange } 
            placeholder='http://ip123-45-6-78-abcdefghijklmno-80.direct.labs.play-with-docker.com/'
          />
        </Form.Group>
        <Form.Button
          type='submit'
          value='Set Sock-shop URL'
        >
          Set Sock-shop URL
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
        { this.getActiveIndex() === 5 ?
          this.renderUrlForm() : null }
        { this.getActiveIndex() === 0 ?
          this.renderForm() : null }
        { this.state.notUser && (this.getActiveIndex() === 0) ?
          <Segment color='red'>
            Please input a valid username.
          </Segment> : null }
        { this.getActiveIndex() !== (0 || 5) ?
          this.renderUpdater() : null }
      </Segment>
    );
  }
}

export default Instructions;
