import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';
import contractBuild from '../contracts/GestionChaines.json';

const Exercice3 = ({ onTransaction }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [string1, setString1] = useState('');
  const [string2, setString2] = useState('');
  const [concatString, setConcatString] = useState('');
  const [lengthString, setLengthString] = useState('');
  const [compareString1, setCompareString1] = useState('');
  const [compareString2, setCompareString2] = useState('');
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
          
          // Charger le message actuel
          const message = await contractInstance.methods.getMessage().call();
          setCurrentMessage(message);
        }
      } catch (error) {
        console.error('Erreur d\'initialisation:', error);
      }
    };
    
    init();
  }, []);

  const handleSetMessage = async () => {
    if (!contract || !newMessage) return;
    setLoading(true);
    try {
      const tx = await contract.methods.setMessage(newMessage).send({ from: account });
      setCurrentMessage(newMessage);
      setNewMessage('');
      onTransaction && onTransaction(tx);
    } catch (error) {
      console.error('Erreur setMessage:', error);
    }
    setLoading(false);
  };

  const handleGetMessage = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const result = await contract.methods.getMessage().call();
      setResults(prev => ({ ...prev, getMessage: result }));
      setCurrentMessage(result);
    } catch (error) {
      console.error('Erreur getMessage:', error);
    }
    setLoading(false);
  };

  const handleConcatenate = async () => {
    if (!contract || !string1 || !string2) return;
    setLoading(true);
    try {
      const result = await contract.methods.concatener(string1, string2).call();
      setResults(prev => ({ ...prev, concatenate: result }));
    } catch (error) {
      console.error('Erreur concatener:', error);
    }
    setLoading(false);
  };

  const handleConcatenateWith = async () => {
    if (!contract || !concatString) return;
    setLoading(true);
    try {
      const result = await contract.methods.concatenerAvec(concatString).call();
      setResults(prev => ({ ...prev, concatenateWith: result }));
    } catch (error) {
      console.error('Erreur concatenerAvec:', error);
    }
    setLoading(false);
  };

  const handleLength = async () => {
    if (!contract || !lengthString) return;
    setLoading(true);
    try {
      const result = await contract.methods.longueur(lengthString).call();
      setResults(prev => ({ ...prev, length: result }));
    } catch (error) {
      console.error('Erreur longueur:', error);
    }
    setLoading(false);
  };

  const handleCompare = async () => {
    if (!contract || !compareString1 || !compareString2) return;
    setLoading(true);
    try {
      const result = await contract.methods.comparer(compareString1, compareString2).call();
      setResults(prev => ({ ...prev, compare: result }));
    } catch (error) {
      console.error('Erreur comparer:', error);
    }
    setLoading(false);
  };

  return (
    <div className="exercise-page">
      <h2>Exercice 3 - Gestion des Chaînes</h2>
      <Link to="/" className="back-link">← Retour au sommaire</Link>
      
      <div className="exercise-content">
        <div className="current-values">
          <h3>Message actuel: "{currentMessage}"</h3>
        </div>

        <div className="form-section">
          <h3>Modifier le message</h3>
          <div className="input-group">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Nouveau message"
            />
            <button onClick={handleSetMessage} disabled={loading}>
              Modifier le message
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Obtenir le message</h3>
          <button onClick={handleGetMessage} disabled={loading}>
            getMessage()
          </button>
          {results.getMessage && (
            <div className="result">Message: "{results.getMessage}"</div>
          )}
        </div>

        <div className="form-section">
          <h3>Concaténer deux chaînes</h3>
          <div className="input-group">
            <input
              type="text"
              value={string1}
              onChange={(e) => setString1(e.target.value)}
              placeholder="Chaîne 1"
            />
            <input
              type="text"
              value={string2}
              onChange={(e) => setString2(e.target.value)}
              placeholder="Chaîne 2"
            />
            <button onClick={handleConcatenate} disabled={loading}>
              Concaténer
            </button>
          </div>
          {results.concatenate && (
            <div className="result">Résultat: "{results.concatenate}"</div>
          )}
        </div>

        <div className="form-section">
          <h3>Concaténer avec le message</h3>
          <div className="input-group">
            <input
              type="text"
              value={concatString}
              onChange={(e) => setConcatString(e.target.value)}
              placeholder="Chaîne à concaténer"
            />
            <button onClick={handleConcatenateWith} disabled={loading}>
              Concaténer avec message
            </button>
          </div>
          {results.concatenateWith && (
            <div className="result">Résultat: "{results.concatenateWith}"</div>
          )}
        </div>

        <div className="form-section">
          <h3>Longueur d'une chaîne</h3>
          <div className="input-group">
            <input
              type="text"
              value={lengthString}
              onChange={(e) => setLengthString(e.target.value)}
              placeholder="Chaîne"
            />
            <button onClick={handleLength} disabled={loading}>
              Calculer longueur
            </button>
          </div>
          {results.length !== undefined && (
            <div className="result">Longueur: {results.length}</div>
          )}
        </div>

        <div className="form-section">
          <h3>Comparer deux chaînes</h3>
          <div className="input-group">
            <input
              type="text"
              value={compareString1}
              onChange={(e) => setCompareString1(e.target.value)}
              placeholder="Chaîne 1"
            />
            <input
              type="text"
              value={compareString2}
              onChange={(e) => setCompareString2(e.target.value)}
              placeholder="Chaîne 2"
            />
            <button onClick={handleCompare} disabled={loading}>
              Comparer
            </button>
          </div>
          {results.compare !== undefined && (
            <div className="result">
              Les chaînes sont {results.compare ? 'identiques' : 'différentes'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercice3;