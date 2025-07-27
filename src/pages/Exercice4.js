import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';
import contractBuild from '../contracts/Exercice4.json';

const Exercice4 = () => {
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

  const handleCheckPositive = async () => {
    if (!contract || number === '') return;
    setLoading(true);
    try {
      const isPositive = await contract.methods.estPositif(number).call();
      setResult({ number, isPositive });
    } catch (error) {
      console.error('Erreur estPositif:', error);
    }
    setLoading(false);
  };

  return (
    <div className="exercise-page">
      <h2>Exercice 4 - Vérification Nombre Positif</h2>
      <Link to="/" className="back-link">← Retour au sommaire</Link>
      
      <div className="exercise-content">
        <div className="form-section">
          <h3>Vérifier si un nombre est positif</h3>
          <div className="input-group">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Entrez un nombre (peut être négatif)"
            />
            <button onClick={handleCheckPositive} disabled={loading}>
              Vérifier
            </button>
          </div>
          
          {result && (
            <div className="result">
              <p>Nombre testé: {result.number}</p>
              <p>
                Le nombre {result.number} est{' '}
                <span className={result.isPositive ? 'positive' : 'negative'}>
                  {result.isPositive ? 'positif' : 'négatif ou zéro'}
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="info-section">
          <h3>Information:</h3>
          <p>Un nombre est considéré comme positif s'il est strictement supérieur à 0.</p>
          <p>Les nombres négatifs et zéro retournent false.</p>
        </div>
      </div>
    </div>
  );
};

export default Exercice4;