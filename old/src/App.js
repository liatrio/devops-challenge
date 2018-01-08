import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'milligram';
import logo from './logo.png';
import Register from './components/Register'
import Instructions from './components/Instructions'
import Scoreboard from './components/Scoreboard'
import Info from './components/Info'
import './App.css';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  constructor() {
    super();
    const MKEY = "USERNAME";
    const localUser = JSON.parse(localStorage.getItem(MKEY));
    this.state = {
      user: localUser ? localUser : ''
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser(u) {
    this.setState({user: u});
    this.save(u);
  }

  save(u) {
    if (!u) return;
    const MKEY = "USERNAME";
    localStorage.setItem(MKEY, JSON.stringify(u));
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <img className="App-logo" src={logo} alt="logo" />
          <h1 className="App-title">DevOps Challenge</h1>
        </header>
        <br/>
        <div className="row">
          <Scoreboard user={this.state.user}/>
        </div>
        <div className="row">
          <Grid columns={2} stackable>
            <br />
            <Grid.Column width={8}>
              <Instructions/>
            </Grid.Column>
            <Grid.Column width={3}>
              <Register set={this.setUser}/>
            </Grid.Column>
          </Grid>
        </div>
        <div className="row">
          <Info/>
        </div>
      </div>
    );
  }
}

export default App;
