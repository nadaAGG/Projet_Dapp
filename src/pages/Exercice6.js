import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';
import contractBuild from '../contracts/Exercice6.json';

const Exercice6 = ({ onTransaction }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState('');
  const [index, setIndex] = useState('');
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
          
          // Charger le tableau actuel
          await loadArray(contractInstance);
        }
      } catch (error) {
        console.error('Erreur d\'initialisation:', error);
      }
    };
    
    init();
  }, []);

  const loadArray = async (contractInstance = contract) => {
    if (!contractInstance) return;
    try {
      const array = await contractInstance.methods.afficheTableau().call();
      setNumbers(array.map(n => n.toString()));
    } catch (error) {
      console.error('Erreur chargement tableau:', error);
    }
  };

  const handleAddNumber = async () => {
    if (!contract || !newNumber) return;
    setLoading(true);
    try {
      const tx = await contract.methods.ajouterNombre(newNumber).send({ from: account });
      await loadArray();
      setNewNumber('');
      onTransaction && onTransaction(tx);
    } catch (error) {
      console.error('Erreur ajout nombre:', error);
    }
    setLoading(false);
  };

  const handleGetElement = async () => {
    if (!contract || index === '') return;
    setLoading(true);
    try {
      const element = await contract.methods.getElement(index).call();
      setResults(prev => ({ ...prev, element: { index, value: element } }));
    } catch (error) {
      console.error('Erreur getElement:', error);
      setResults(prev => ({ ...prev, element: { index, error: error.message } }));
    }
    setLoading(false);
  };

  const handleCalculateSum = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const sum = await contract.methods.calculerSomme().call();
      setResults(prev => ({ ...prev, sum }));
    } catch (error) {
      console.error('Erreur calcul somme:', error);
    }
    setLoading(false);
  };

  const handleGetSize = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const size = await contract.methods.getTaille().call();
      setResults(prev => ({ ...prev, size }));
    } catch (error) {
      console.error('Erreur taille:', error);
    }
    setLoading(false);
  };

  return (
    <div className="exercise-page">
      <h2>Exercice 6 - Tableau de Nombres</h2>
      <Link to="/" className="back-link">← Retour au sommaire</Link>
      
      <div className="exercise-content">
        <div className="current-values">
          <h3>Tableau actuel:</h3>
          <div className="array-display">
            [{numbers.join(', ')}]
          </div>
        </div>

        <div className="form-section">
          <h3>Ajouter un nombre</h3>
          <div className="input-group">
            <input
              type="number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              placeholder="Nouveau nombre"
            />
            <button onClick={handleAddNumber} disabled={loading}>
              Ajouter
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Obtenir un élément par index</h3>
          <div className="input-group">
            <input
              type="number"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              placeholder="Index"
              min="0"
            />
            <button onClick={handleGetElement} disabled={loading}>
              Obtenir élément
            </button>
          </div>
          {results.element && (
            <div className="result">
              {results.element.error ? (
                <span className="error">Erreur: {results.element.error}</span>
              ) : (
                <span>Élément à l'index {results.element.index}: {results.element.value}</span>
              )}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Calculer la somme</h3>
          <button onClick={handleCalculateSum} disabled={loading}>
            Calculer somme
          </button>
          {results.sum && (
            <div className="result">Somme: {results.sum}</div>
          )}
        </div>

        <div className="form-section">
          <h3>Obtenir la taille</h3>
          <button onClick={handleGetSize} disabled={loading}>
            Obtenir taille
          </button>
          {results.size && (
            <div className="result">Taille du tableau: {results.size}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercice6;