import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';
import contractBuild from '../contracts/Payment.json';

const Exercice8 = ({ onTransaction }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [balance, setBalance] = useState('0');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = contractBuild.networks[networkId];
        
        if (deployedNetwork) {
          const contractInstance = new web3.eth.Contract(
            contractBuild.abi,
            deployedNetwork.address
          );
          setContract(contractInstance);
          
          await loadContractInfo(contractInstance);
        }
      } catch (error) {
        console.error('Erreur d\'initialisation:', error);
      }
    };
    
    init();
  }, []);

  const loadContractInfo = async (contractInstance = contract) => {
    if (!contractInstance) return;
    try {
      const recipientAddr = await contractInstance.methods.recipient().call();
      const contractBalance = await contractInstance.methods.getBalance().call();
      setRecipient(recipientAddr);
      setBalance(web3.utils.fromWei(contractBalance, 'ether'));
    } catch (error) {
      console.error('Erreur chargement info contrat:', error);
    }
  };

  const handleSendPayment = async () => {
    if (!contract || !paymentAmount || parseFloat(paymentAmount) <= 0) return;
    setLoading(true);
    try {
      const amountWei = web3.utils.toWei(paymentAmount, 'ether');
      const tx = await contract.methods.receivePayment().send({ 
        from: account, 
        value: amountWei 
      });
      await loadContractInfo();
      setPaymentAmount('');
      onTransaction && onTransaction(tx);
      setResults(prev => ({ ...prev, payment: 'Paiement envoyé avec succès!' }));
    } catch (error) {
      console.error('Erreur envoi paiement:', error);
      setResults(prev => ({ ...prev, payment: 'Erreur: ' + error.message }));
    }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const tx = await contract.methods.withdraw().send({ from: account });
      await loadContractInfo();
      onTransaction && onTransaction(tx);
      setResults(prev => ({ ...prev, withdraw: 'Retrait effectué avec succès!' }));
    } catch (error) {
      console.error('Erreur retrait:', error);
      setResults(prev => ({ ...prev, withdraw: 'Erreur: ' + error.message }));
    }
    setLoading(false);
  };

  const handleGetSender = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const sender = await contract.methods.getSender().call();
      setResults(prev => ({ ...prev, sender }));
    } catch (error) {
      console.error('Erreur getSender:', error);
    }
    setLoading(false);
  };

  return (
    <div className="exercise-page">
      <h2>Exercice 8 - Gestion des Paiements</h2>
      <Link to="/" className="back-link">← Retour au sommaire</Link>
      
      <div className="exercise-content">
        <div className="current-values">
          <h3>Informations du contrat:</h3>
          <p>Destinataire: {recipient}</p>
          <p>Solde du contrat: {balance} ETH</p>
          <p>Votre adresse: {account}</p>
        </div>

        <div className="form-section">
          <h3>Envoyer un paiement</h3>
          <div className="input-group">
            <input
              type="number"
              step="0.001"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Montant en ETH"
            />
            <button onClick={handleSendPayment} disabled={loading}>
              Envoyer paiement
            </button>
          </div>
          {results.payment && (
            <div className={`result ${results.payment.includes('Erreur') ? 'error' : 'success'}`}>
              {results.payment}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Retirer les fonds</h3>
          <p><small>Seul le destinataire peut retirer les fonds</small></p>
          <button onClick={handleWithdraw} disabled={loading}>
            Retirer tous les fonds
          </button>
          {results.withdraw && (
            <div className={`result ${results.withdraw.includes('Erreur') ? 'error' : 'success'}`}>
              {results.withdraw}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Obtenir l'adresse de l'appelant</h3>
          <button onClick={handleGetSender} disabled={loading}>
            getSender()
          </button>
          {results.sender && (
            <div className="result">
              Adresse de l'appelant: {results.sender}
            </div>
          )}
        </div>

        <div className="info-section">
          <h3>Information:</h3>
          <p>Ce contrat permet de recevoir des paiements en Ether.</p>
          <p>Seul le destinataire configuré peut retirer les fonds.</p>
          <p>Les paiements doivent être supérieurs à 0.</p>
        </div>
      </div>
    </div>
  );
};

export default Exercice8;