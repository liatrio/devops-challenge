import React, { Component } from 'react';

class Instructions extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="column column-80">
        <h4>Instructions</h4>
        <ol>
          <li>Create a GitHub Account</li>
          <li>Enter your GitHub Username to the right</li>
          <li>Fork repo https://github.com/liatrio/microservices-demo (Fork icon link here?)</li>
          <li>Enable Travis CI</li>
          <li>Fix the build error (rename the file correctly..)</li>
          <li>Register for relevant play-with-docker account</li>
          <li>On play-with-docker, git clone your fork, and do docker-compose-up to run sock-shop</li>
          <li>Enter your live sock-shop play-with-docker URL here:</li>
        </ol>
      </div>
    );
  }
}

export default Instructions;
