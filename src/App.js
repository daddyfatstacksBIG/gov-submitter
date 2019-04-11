import React, { Component } from 'react';
import IPFS from 'ipfs-mini';

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

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
    ipfs.add(this.state.content)
        .then(hash => console.log(`https://ipfs.infura.io/ipfs/${hash}`))
        .catch(console.log);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
