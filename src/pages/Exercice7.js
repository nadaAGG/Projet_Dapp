import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';
import contractBuild from '../contracts/Rectangle.json';

const Exercice7 = ({ onTransaction }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ lo: 0, la: 0 });
  const [newX, setNewX] = useState('');
  const [newY, setNewY] = useState('');
  const [newLo, setNewLo] = useState('');
  const [newLa, setNewLa] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('🚀 Initialisation...');
        const accounts = await web3.eth.getAccounts();
        console.log('👤 Compte:', accounts[0]);
        setAccount(accounts[0]);
        
        const networkId = await web3.eth.net.getId();
        console.log('🌐 Network ID:', networkId);
        const deployedNetwork = contractBuild.networks[networkId];
        console.log('📋 Contract networks:', contractBuild.networks);
        
        if (deployedNetwork) {
          console.log('📍 Adresse du contrat:', deployedNetwork.address);
          const contractInstance = new web3.eth.Contract(
            contractBuild.abi,
            deployedNetwork.address
          );
          setContract(contractInstance);
          
          // Test direct des méthodes du contrat
          console.log('🧪 Test des méthodes du contrat...');
          try {
            const [x, y] = await contractInstance.methods.afficheXY().call();
            const [lo, la] = await contractInstance.methods.afficheLoLa().call();
            console.log('📊 Valeurs initiales du contrat:', { x: x.toString(), y: y.toString(), lo: lo.toString(), la: la.toString() });
          } catch (methodError) {
            console.error('❌ Erreur méthodes contrat:', methodError);
          }
          
          await loadCurrentValues(contractInstance);
        } else {
          console.error('❌ Contrat non déployé sur ce réseau');
        }
      } catch (error) {
        console.error('❌ Erreur d\'initialisation:', error);
      }
    };
    
    init();
  }, []);

  const loadCurrentValues = async (contractInstance = contract) => {
    if (!contractInstance) {
      console.error('❌ Pas de contrat disponible');
      return;
    }
    try {
      console.log('🔄 Rechargement des valeurs...');
      
      const xyResult = await contractInstance.methods.afficheXY().call();
      console.log('📊 Résultat afficheXY:', xyResult);
      const x = xyResult[0] || xyResult['0'];
      const y = xyResult[1] || xyResult['1'];
      
      const lolaResult = await contractInstance.methods.afficheLoLa().call();
      console.log('📊 Résultat afficheLoLa:', lolaResult);
      const lo = lolaResult[0] || lolaResult['0'];
      const la = lolaResult[1] || lolaResult['1'];
      
      console.log('📊 Valeurs récupérées:', { x: x.toString(), y: y.toString(), lo: lo.toString(), la: la.toString() });
      
      setCoordinates({ x: Number(x), y: Number(y) });
      setDimensions({ lo: Number(lo), la: Number(la) });
      
      console.log('✅ États mis à jour');
    } catch (error) {
      console.error('❌ Erreur chargement valeurs:', error);
    }
  };

  const handleMoveShape = async () => {
    if (!contract || newX === '' || newY === '') return;
    setLoading(true);
    try {
      const tx = await contract.methods.deplacerForme(newX, newY).send({ from: account });
      console.log('Transaction confirmée:', tx.transactionHash);
      
      setNewX('');
      setNewY('');
      
      // Attendre un peu avant de recharger les valeurs
      setTimeout(async () => {
        await loadCurrentValues();
      }, 1500);
      
      onTransaction && onTransaction(tx);
    } catch (error) {
      console.error('Erreur déplacement:', error);
    }
    setLoading(false);
  };

  const handleSetDimensions = async () => {
    if (!contract || newLo === '' || newLa === '') return;
    setLoading(true);
    try {
      const tx = await contract.methods.setDimensions(newLo, newLa).send({ from: account });
      console.log('Transaction confirmée:', tx.transactionHash);
      
      setNewLo('');
      setNewLa('');
      
      // Attendre un peu avant de recharger les valeurs
      setTimeout(async () => {
        await loadCurrentValues();
      }, 1500);
      
      onTransaction && onTransaction(tx);
    } catch (error) {
      console.error('Erreur modification dimensions:', error);
    }
    setLoading(false);
  };

  const handleGetSurface = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const surface = await contract.methods.surface().call();
      setResults(prev => ({ ...prev, surface }));
    } catch (error) {
      console.error('Erreur calcul surface:', error);
    }
    setLoading(false);
  };

  const handleGetInfo = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const info = await contract.methods.afficheInfos().call();
      setResults(prev => ({ ...prev, info }));
    } catch (error) {
      console.error('Erreur info:', error);
    }
    setLoading(false);
  };

  return (
    <div className="exercise-page">
      <h2>Exercice 7 - Héritage (Rectangle)</h2>
      <Link to="/" className="back-link">← Retour au sommaire</Link>
      
      <div className="exercise-content">
        <div className="current-values">
          <h3>Valeurs actuelles:</h3>
          <p>Coordonnées: x = {coordinates.x}, y = {coordinates.y}</p>
          <p>Dimensions: longueur = {dimensions.lo}, largeur = {dimensions.la}</p>
        </div>

        <div className="form-section">
          <h3>Déplacer la forme</h3>
          <div className="input-group">
            <input
              type="number"
              value={newX}
              onChange={(e) => setNewX(e.target.value)}
              placeholder="Nouvelle coordonnée X"
            />
            <input
              type="number"
              value={newY}
              onChange={(e) => setNewY(e.target.value)}
              placeholder="Nouvelle coordonnée Y"
            />
            <button onClick={handleMoveShape} disabled={loading}>
              Déplacer
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Modifier les dimensions</h3>
          <div className="input-group">
            <input
              type="number"
              value={newLo}
              onChange={(e) => setNewLo(e.target.value)}
              placeholder="Nouvelle longueur"
            />
            <input
              type="number"
              value={newLa}
              onChange={(e) => setNewLa(e.target.value)}
              placeholder="Nouvelle largeur"
            />
            <button onClick={handleSetDimensions} disabled={loading}>
              Modifier dimensions
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Calculer la surface</h3>
          <button onClick={handleGetSurface} disabled={loading}>
            Calculer surface()
          </button>
          {results.surface && (
            <div className="result">Surface: {results.surface}</div>
          )}
        </div>

        <div className="form-section">
          <h3>Afficher les informations</h3>
          <button onClick={handleGetInfo} disabled={loading}>
            afficheInfos()
          </button>
          {results.info && (
            <div className="result">Info: {results.info}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercice7;