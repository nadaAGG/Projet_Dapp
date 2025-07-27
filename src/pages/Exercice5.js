import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';
import contractBuild from '../contracts/Exercice5.json';

const Exercice5 = () => {
  const [contract, setContract] = useState(null);
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = contractBuild.networks[networkId];
        
        if (deployedNetwork) {
          const contractInstance = new web3.eth.Contract(
            contractBuild.abi,
            deployedNetwork.address
          );
          setContract(contractInstance);
        }
      } catch (error) {
        console.error('Erreur d\'initialisation:', error);
      }
    };
    
    init();
  }, []);

  const handleCheckParity = async () => {
    if (!contract || number === '') return;
    setLoading(true);
    try {
      const isEven = await contract.methods.estPair(number).call();
      const isOdd = await contract.methods.estImpair(number).call();
      setResult({ number, isEven, isOdd });
    } catch (error) {
      console.error('Erreur vérification parité:', error);
    }
    setLoading(false);
  };

  return (
    <div className="exercise-page">
      <h2>Exercice 5 - Vérification de Parité</h2>
      <Link to="/" className="back-link">← Retour au sommaire</Link>
      
      <div className="exercise-content">
        <div className="form-section">
          <h3>Vérifier la parité d'un nombre</h3>
          <div className="input-group">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Entrez un nombre entier"
              min="0"
            />
            <button onClick={handleCheckParity} disabled={loading}>
              Vérifier parité
            </button>
          </div>
          
          {result && (
            <div className="result">
              <p>Nombre testé: {result.number}</p>
              <p>
                Le nombre {result.number} est{' '}
                <span className={result.isEven ? 'even' : 'odd'}>
                  {result.isEven ? 'pair' : 'impair'}
                </span>
              </p>
              <div className="detailed-results">
                <p>estPair(): {result.isEven ? 'true' : 'false'}</p>
                <p>estImpair(): {result.isOdd ? 'true' : 'false'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="info-section">
          <h3>Information:</h3>
          <p>Un nombre pair est divisible par 2 (reste = 0).</p>
          <p>Un nombre impair n'est pas divisible par 2 (reste = 1).</p>
          <p>Exemples: 2, 4, 6 sont pairs | 1, 3, 5 sont impairs</p>
        </div>
      </div>
    </div>
  );
};

export default Exercice5;