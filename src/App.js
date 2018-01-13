import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Button } from 'semantic-ui-react';
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
    this.updateActive = this.updateActive.bind(this);
    this.hasForked = this.hasForked.bind(this);
    this.hasAddedTravis = this.hasAddedTravis.bind(this);
    this.hasEnabledTravis = this.hasEnabledTravis.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.setRemainingToFalse = this.setRemainingToFalse.bind(this);

    // call updateProgress on page reload
    // add button at the bottom of each instruction "Validate Completion"
    // this button calls updateProgress , not sure on the name^
    // add somewhere that states the current username being tracked
  }

  prevStep() {
    const currentStep = this.state.active.indexOf(true);
    if (currentStep > 0) {
      let newActive = [ false, false, false, false, false, false ];
      newActive[currentStep - 1] = true;
      this.setState({ active: newActive });
    }
  }

  nextStep() {
    const currentStep = this.state.active.indexOf(true);
    if (currentStep < 5) { // length of active
      let newActive = [ false, false, false, false, false, false ];
      newActive[currentStep + 1] = true;
      this.setState({ active: newActive });
    }
  }

  hasEnabledTravis(u) {
    const url =
      'https://api.travis-ci.org/repo/' + u +
      '%2Fmicroservices-demo/builds?limit=5';
    fetch(url, { headers: { 'Travis-API-Version': '3' } })
      .then(function(a) {
        return a.json();
      })
      .then(function(b) {
        console.log(b);
      });
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

  setRemainingToFalse(start) {
    for (var i = start; i < this.state.completed.length; i++) {
      console.log("Setting "+i+" to false!");
      this.updateCompletion(i, false);
    }
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
                  that.hasEnabledTravis(that.state.user);
                  that.updateActive(that.state.completed.indexOf(false));
                } else {
                  that.setRemainingToFalse(2);
                  that.updateActive(that.state.completed.indexOf(false));
                }
              });
          } else {
            that.setRemainingToFalse(1);
            that.updateActive(that.state.completed.indexOf(false));
          }
        });
    } else {
      this.setRemainingToFalse(0);
      this.updateActive(this.state.completed.indexOf(false));
    }
  }

  render() {
    return (
      <div>
        <MainMenu user={ this.state.user }/>
        <Container style={{ marginTop: '7em' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <Progress
                  activeStep={ this.state.active }
                  completedStep={ this.state.completed }
                />
                <Button.Group fluid>
                  <Button compact
                    icon='left arrow'
                    onClick={ this.prevStep }
                  />
                  <Button compact
                    icon='refresh'
                    onClick={ this.updateProgress }
                  />
                  <Button compact
                    icon='right arrow'
                    onClick={ this.nextStep }
                  />
                </Button.Group>
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
