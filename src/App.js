import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid } from 'semantic-ui-react';
import MainMenu from './components/MainMenu';
import Progress from './components/Progress';
import Instructions from './components/Instructions';
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
      active: [ true, false, false, false, false, false ],
      completed: [ false, false, false, false, false, false ]
    };
    this.updateProgress = this.updateProgress.bind(this);
    this.updateCompletion = this.updateCompletion.bind(this);
    setInterval(this.updateProgress, 5000);
  }

  updateCompletion(index, value) {
    let newCompleted = this.state.completed;
    newCompleted[index] = value;
    this.setState({ completed: newCompleted });
  }

  updateProgress() {
    console.log("Hello world");
    if (this.state.user !== '') {
      this.updateCompletion(0, true);
    } else {
      this.updateCompletion(0, false);
    }
  }

  render() {
    return (
      <div>
        <MainMenu />
        <Container style={{ marginTop: '7em' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <Progress
                  activeStep={ this.state.active }
                  completedStep={ this.state.completed }
                />
              </Grid.Column>
              <Grid.Column width={11}>
                <Instructions activeStep={ this.state.active } />
              </Grid.Column>
            </Grid.Row> 
            <Grid.Row centered>
              <Footer />
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
