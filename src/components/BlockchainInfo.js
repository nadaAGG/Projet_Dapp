import React, { useState, useEffect } from 'react';
import web3 from '../utils/web3';

const BlockchainInfo = () => {
  const [blockInfo, setBlockInfo] = useState({
    blockNumber: 0,
    account: '',
    balance: '0'
  });

  useEffect(() => {
    const loadBlockchainInfo = async () => {
      try {
        // Obtenir le numéro du dernier bloc
        const blockNumber = await web3.eth.getBlockNumber();
        
        // Obtenir les comptes
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0] || '';
        
        // Obtenir le solde du premier compte
        let balance = '0';
        if (account) {
          const balanceWei = await web3.eth.getBalance(account);
          balance = web3.utils.fromWei(balanceWei, 'ether');
        }
        
        setBlockInfo({
          blockNumber,
          account,
          balance
        });
      } catch (error) {
        console.error('Erreur lors du chargement des informations blockchain:', error);
      }
    };

    loadBlockchainInfo();
    
    // Actualiser toutes les 10 secondes
    const interval = setInterval(loadBlockchainInfo, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="blockchain-info">
      <h3>Informations Blockchain</h3>
      <div className="info-item">
        <strong>Dernier bloc:</strong> {blockInfo.blockNumber}
      </div>
      <div className="info-item">
        <strong>Compte connecté:</strong> 
        <br />
        <small>{blockInfo.account}</small>
      </div>
      <div className="info-item">
        <strong>Solde:</strong> {parseFloat(blockInfo.balance).toFixed(4)} ETH
      </div>
    </div>
  );
};

export default BlockchainInfo;