import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid } from 'semantic-ui-react';
import MainMenu from './components/MainMenu';
import Progress from './components/Progress';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    let localUser;
    if (window.localStorage) {
      localUser = JSON.parse(localStorage.getItem('USER'));
    }
    this.state = {
      user: localUser || '',
      gitHubActive: true,
      gitHubCompleted: false
    };
  }

  render() {
    return (
      <div>
        <MainMenu/>
        <Container style={{ marginTop: '7em' }}>
          <Grid>
            <Grid.Row>
              <Progress
                gitHubActive={this.state.gitHubActive}
                gitHubCompleted={this.state.gitHubCompleted}
              />
            </Grid.Row> 
            <Grid.Row>
              <Footer/>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
