import React, { Component } from 'react';
import GoRepoForked from 'react-icons/lib/go/repo-forked';

class Instructions extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h4>Instructions</h4>
        <ol>
          <li>Create a <a target="_blank" rel="noopener noreferrer" href="https://github.com/join">GitHub</a> account if you don't already have one. Enter your GitHub username in the field to the right.</li>
          <li>Fork <a target="_blank" rel="noopener noreferrer" href="https://github.com/liatrio/microservices-demo#fork-destination-box">liatrio/microservices-demo</a> on GitHub. <GoRepoForked /></li>
          <li>Enable Travis CI</li>
          <li>Fix the build error (rename the file correctly..)</li>
          <li>Register for relevant play-with-docker account</li>
          <li>Run Sock-shop on play-with-docker:
            <pre><code>
            $ git clone https://github.com/your_github_username/microservices-demo <br />
            $ cd microservices-demo/deploy/docker-compose<br />
            $ docker-compose up
            </code></pre>
          </li>
          <li>Enter your live sock-shop play-with-docker URL here:</li>
        </ol>
      </div>
    );
  }
}

export default Instructions;
