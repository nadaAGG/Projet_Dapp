import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';
import contractBuild from '../contracts/Exercice1.json';

const Exercice1 = ({ onTransaction }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [nombre1, setNombre1] = useState(0);
  const [nombre2, setNombre2] = useState(0);
  const [inputNombre1, setInputNombre1] = useState('');
  const [inputNombre2, setInputNombre2] = useState('');
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
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
          
          // Charger les valeurs actuelles
          const val1 = await contractInstance.methods.nombre1().call();
          const val2 = await contractInstance.methods.nombre2().call();
          setNombre1(val1);
          setNombre2(val2);
        }
      } catch (error) {
        console.error('Erreur d\'initialisation:', error);
      }
    };
    
    init();
  }, []);

  const handleAddition1 = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const result = await contract.methods.addition1().call();
      setResults(prev => ({ ...prev, addition1: result }));
    } catch (error) {
      console.error('Erreur addition1:', error);
    }
    setLoading(false);
  };

  const handleAddition2 = async () => {
    if (!contract || !inputA || !inputB) return;
    setLoading(true);
    try {
      const result = await contract.methods.addition2(inputA, inputB).call();
      setResults(prev => ({ ...prev, addition2: result }));
    } catch (error) {
      console.error('Erreur addition2:', error);
    }
    setLoading(false);
  };

  const handleSetNombre1 = async () => {
    if (!contract || !inputNombre1) return;
    setLoading(true);
    try {
      const tx = await contract.methods.setNombre1(inputNombre1).send({ from: account });
      setNombre1(inputNombre1);
      setInputNombre1('');
      onTransaction && onTransaction(tx);
    } catch (error) {
      console.error('Erreur setNombre1:', error);
    }
    setLoading(false);
  };

  const handleSetNombre2 = async () => {
    if (!contract || !inputNombre2) return;
    setLoading(true);
    try {
      const tx = await contract.methods.setNombre2(inputNombre2).send({ from: account });
      setNombre2(inputNombre2);
      setInputNombre2('');
      onTransaction && onTransaction(tx);
    } catch (error) {
      console.error('Erreur setNombre2:', error);
    }
    setLoading(false);
  };

  return (
    <div className="exercise-page">
      <h2>Exercice 1 - Addition</h2>
      <Link to="/" className="back-link">← Retour au sommaire</Link>
      
      <div className="exercise-content">
        <div className="current-values">
          <h3>Valeurs actuelles des variables d'état:</h3>
          <p>Nombre1: {nombre1}</p>
          <p>Nombre2: {nombre2}</p>
        </div>

        <div className="form-section">
          <h3>Modifier les variables d'état</h3>
          <div className="input-group">
            <input
              type="number"
              value={inputNombre1}
              onChange={(e) => setInputNombre1(e.target.value)}
              placeholder="Nouveau nombre1"
            />
            <button onClick={handleSetNombre1} disabled={loading}>
              Modifier Nombre1
            </button>
          </div>
          
          <div className="input-group">
            <input
              type="number"
              value={inputNombre2}
              onChange={(e) => setInputNombre2(e.target.value)}
              placeholder="Nouveau nombre2"
            />
            <button onClick={handleSetNombre2} disabled={loading}>
              Modifier Nombre2
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Addition1 (fonction view)</h3>
          <button onClick={handleAddition1} disabled={loading}>
            Calculer addition1()
          </button>
          {results.addition1 && (
            <div className="result">Résultat: {results.addition1}</div>
          )}
        </div>

        <div className="form-section">
          <h3>Addition2 (fonction pure)</h3>
          <div className="input-group">
            <input
              type="number"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              placeholder="Nombre A"
            />
            <input
              type="number"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              placeholder="Nombre B"
            />
            <button onClick={handleAddition2} disabled={loading}>
              Calculer addition2(A, B)
            </button>
          </div>
          {results.addition2 && (
            <div className="result">Résultat: {results.addition2}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercice1;