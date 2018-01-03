import React, { Component } from 'react';

class Scoreboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="column">
        {this.props.user === '' ? 
          <p className="scoreboard">
          Input your GitHub username to track progress.</p> :
          <p className="scoreboard">Progress of {this.props.user}</p>}
      </div>
    );
  }
}

export default Scoreboard;
