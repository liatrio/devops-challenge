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
      user: localUser || 'shanemacbride',
      active: [ true, false, false, false, false, false ],
      completed: [ false, false, false, false, false, false ]
    };
    this.updateProgress = this.updateProgress.bind(this);
    this.updateCompletion = this.updateCompletion.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.hasForked = this.hasForked.bind(this);
    this.hasAddedTravis = this.hasAddedTravis.bind(this);
    setInterval(this.updateProgress, 5000);
  }

  hasAddedTravis(u) {
    const url =
      'https://api.github.com/repos/'+u+'/microservices-demo/contents/'
    return fetch(url)
      .then(function(a) {
        return a.json();
      })
      .then(function(b) {
        for (var key in b) {
          if (b[key].name === '.travis.yml') {
            return true;
          }
        }
        return false;
      });
  }

  hasForked(u) {
    const url =
      'https://api.github.com/repos/liatrio/microservices-demo/forks';
    return fetch(url)
      .then(function(a) {
        return a.json();
      })
      .then(function(b) {
        for (var key in b) {
          if (b[key].owner.login === u) {
            return true;
          }
        }
        return false;
      });
  }

  updateCompletion(index, value) {
    let newCompleted = this.state.completed;
    newCompleted[index] = value;
    this.setState({ completed: newCompleted });
  }

  updateActive(index) {
    let newActive = [ false, false, false, false, false, false ];
    newActive[index] = true;
    this.setState({ active: newActive });
  }

  updateProgress() {
    if (this.state.user !== '') {
      this.updateCompletion(0, true);
      var that = this;
      this.hasForked(this.state.user)
        .then(function(forked) {
          if (forked === true) {
            that.updateCompletion(1, true);
            that.hasAddedTravis(that.state.user)
              .then(function(addedTravis) {
                if (addedTravis === true) {
                  that.updateCompletion(2, true);
                  that.updateActive(that.state.completed.indexOf(false));
                } else {
                  that.updateCompletion(2, false);
                  that.updateCompletion(3, false);
                  that.updateCompletion(4, false);
                  that.updateCompletion(5, false);
                  that.updateActive(that.state.completed.indexOf(false));
                }
              });
          } else {
            that.updateCompletion(1, false);
            that.updateCompletion(2, false);
            that.updateCompletion(3, false);
            that.updateCompletion(4, false);
            that.updateCompletion(5, false);
            that.updateActive(that.state.completed.indexOf(false));
          }
        });
    } else {
      this.updateCompletion(0, false);
      this.updateCompletion(1, false);
      this.updateCompletion(2, false);
      this.updateCompletion(3, false);
      this.updateCompletion(4, false);
      this.updateCompletion(5, false);
      this.updateActive(this.state.completed.indexOf(false));
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
