import React from 'react';

const TransactionInfo = ({ transaction }) => {
  if (!transaction) {
    return (
      <div className="transaction-info">
        <h3>Dernière Transaction</h3>
        <p>Aucune transaction récente</p>
      </div>
    );
  }

  return (
    <div className="transaction-info">
      <h3>Dernière Transaction</h3>
      <div className="info-item">
        <strong>Hash:</strong>
        <br />
        <small>{transaction.transactionHash}</small>
      </div>
      <div className="info-item">
        <strong>Gas utilisé:</strong> {transaction.gasUsed}
      </div>
      <div className="info-item">
        <strong>Bloc:</strong> {transaction.blockNumber}
      </div>
      <div className="info-item">
        <strong>Statut:</strong> 
        <span className={transaction.status ? 'success' : 'error'}>
          {transaction.status ? ' Réussi' : ' Échoué'}
        </span>
      </div>
    </div>
  );
};

export default TransactionInfo;