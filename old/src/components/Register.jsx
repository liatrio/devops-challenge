import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', invalid: true, notUser: false }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearUser = this.clearUser.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    // check if github username is valid here?
    nextState.invalid = !(nextState.user);
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
        if (b.message === "Not Found") {
          return false;
        }
        else {
          return b;
        }
      });
  }

  handleSubmit(event) {
    var that = this;
    this.checkUsername(this.state.user).then(function(valid) {
      if (valid !== false) {
        that.props.set(that.state.user);
        that.setState({ user: '', notUser: false });
      }
      else {
        that.setState({ notUser: true });
      }
    });
    event.preventDefault();
  }

  clearUser(event) {
    this.props.set('');
    this.setState({ user:'', notUser: false });
    localStorage.removeItem("USERNAME");
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h4>Track your Progress</h4>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>
              <input type="text" name="user" value={this.state.user}
               onChange={this.handleChange}/>
            </label>
            <input className="button-outline full-width" disabled={this.state.invalid} type="submit"
             value="Set GitHub Username"/>
            <button className="button-outline button-small full-width" onClick={this.clearUser}>Reset</button>
            { this.state.notUser === true ?
                <p>Please input a valid username.</p> :
                null }
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Register;
