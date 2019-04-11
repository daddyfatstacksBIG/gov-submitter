import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        proposal: '',
        content: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <label>
          content:
          <input
            name="content"
            type="text"
            value={this.state.content}
            onChange={this.handleChange} />
        </label>
        <br />
        <label>
          proposal:
          <input
            name="proposal"
            type="text"
            value={this.state.proposal}
            onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

export default App;
