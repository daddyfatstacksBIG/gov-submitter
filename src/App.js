import React, { Component } from 'react';
import { useWeb3Context } from 'web3-react'
import IPFS from 'ipfs-mini';
import './App.css';

const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

let context = null;
const Web3Setter = props => {
  if (context === null) {
    context = useWeb3Context();
    context.setConnector('metaMask');
  }
  console.log(context);

  return <div />;
};

class App extends Component {
  state = {
    proposal: '',
    content: ''
  };

  handleChange = ({ target }) => {
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const hash = await ipfs.add(this.state.content);
      console.log('content added successfully!');
      console.log(`https://ipfs.infura.io/ipfs/${hash}`);
    } catch (err) {
      console.error(`failed to add content ${this.state.content} to ipfs`, err);
    }

  };

  render() {
    return (
	  <>

	   <div hidden>
	     <Web3Setter />
	   </div>

       <div className="App">
         <form onSubmit={this.handleSubmit}>
           <label>
             content
             <textarea
               name="content"
               type="text"
               value={this.state.content}
               onChange={this.handleChange}
             />
           </label>

           <br />

           <label>
             proposal
             <input
               name="proposal"
               type="text"
               value={this.state.proposal}
               onChange={this.handleChange}
             />
           </label>

           <br />

           <input type="submit" value="Submit" />
         </form>
       </div>
	  </>
    );
  }
}

export default App;
