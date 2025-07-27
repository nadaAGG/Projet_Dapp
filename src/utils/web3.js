import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Nous sommes dans le navigateur et MetaMask est disponible
  web3 = new Web3(window.ethereum);
} else {
  // Nous sommes sur le serveur ou MetaMask n'est pas disponible
  // Utiliser Ganache
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
  web3 = new Web3(provider);
}

export default web3;