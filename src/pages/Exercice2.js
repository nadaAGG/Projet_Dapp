import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';
import contractBuild from '../contracts/Exercice2.json';

const Exercice2 = () => {
  const [contract, setContract] = useState(null);
  const [etherAmount, setEtherAmount] = useState('');
  const [weiAmount, setWeiAmount] = useState('');
  const [results, setResults] = useState({});
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

  const handleEtherToWei = async () => {
    if (!contract || !etherAmount) return;
    setLoading(true);
    try {
      const result = await contract.methods.etherEnWei(etherAmount).call();
      setResults(prev => ({ ...prev, etherToWei: result }));
    } catch (error) {
      console.error('Erreur conversion Ether vers Wei:', error);
    }
    setLoading(false);
  };

  const handleWeiToEther = async () => {
    if (!contract || !weiAmount) return;
    setLoading(true);
    try {
      const result = await contract.methods.weiEnEther(weiAmount).call();
      setResults(prev => ({ ...prev, weiToEther: result }));
    } catch (error) {
      console.error('Erreur conversion Wei vers Ether:', error);
    }
    setLoading(false);
  };

  return (
    <div className="exercise-page">
      <h2>Exercice 2 - Conversion Ether/Wei</h2>
      <Link to="/" className="back-link">← Retour au sommaire</Link>
      
      <div className="exercise-content">
        <div className="info-section">
          <h3>Information:</h3>
          <p>1 Ether = 10^18 Wei</p>
        </div>

        <div className="form-section">
          <h3>Convertir Ether en Wei</h3>
          <div className="input-group">
            <input
              type="number"
              value={etherAmount}
              onChange={(e) => setEtherAmount(e.target.value)}
              placeholder="Montant en Ether"
            />
            <button onClick={handleEtherToWei} disabled={loading}>
              Convertir en Wei
            </button>
          </div>
          {results.etherToWei && (
            <div className="result">
              {etherAmount} Ether = {results.etherToWei} Wei
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Convertir Wei en Ether</h3>
          <div className="input-group">
            <input
              type="number"
              value={weiAmount}
              onChange={(e) => setWeiAmount(e.target.value)}
              placeholder="Montant en Wei"
            />
            <button onClick={handleWeiToEther} disabled={loading}>
              Convertir en Ether
            </button>
          </div>
          {results.weiToEther && (
            <div className="result">
              {weiAmount} Wei = {results.weiToEther} Ether
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercice2;