import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Web3Provider, { Connectors } from 'web3-react';

const metaMask = new Connectors.MetaMaskConnector({ supportedNetworks: 1 });

ReactDOM.render(
  <div>
    <Web3Provider connectors={metaMask}>
      <App />
    </Web3Provider>
  </div>,
  document.getElementById('root')
);
