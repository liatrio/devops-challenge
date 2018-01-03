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
          <li>Fork repo</li>
          <li>Enable Travis CI</li>
        </ol>
      </div>
    );
  }
}

export default Instructions;
